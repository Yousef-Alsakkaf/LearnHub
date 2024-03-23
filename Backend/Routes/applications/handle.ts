import { error } from "ajv/dist/vocabularies/applicator/dependencies.js";
import { ServerCommandBuilder } from "../../Applications/Commands/Builder.js";
import { UserAccessLevels, CommandExecuteArguments } from "../../Applications/Commands/Context.js";
import { v4 as uuid } from "uuid";
import emailProvider from "Applications/Email/emailProvider.js";



const command = new ServerCommandBuilder("handle-application")
  .setAccessLevel(UserAccessLevels.ADMIN)
  .setOutgoingChannel("handle-application-response")
  .setIncomingValidationSchema({
        type: "object",
        additionalProperties: false,
        properties: {
            id : {"type":"number"},
            response: {"type":"boolean"},
        }, required:["response","id"]  
      })
  .setExecute(callback)
  .setOutgoingValidationSchema({})
  .build();

async function callback({ Client,Data,Database,EmailProvider }: CommandExecuteArguments) {
    try {
        const{id,response} = Data;
        let application:any = await Database.executeQuery('SELECT * FROM requests WHERE id = ?', [id]);
        application = application[0];
    if(response){
        let password = uuid();
        password=password.substring(0,8);
        const UID=await Database.generateUID("student"); 
        await Database.executeQuery('INSERT INTO users(username, password, fName, lName, UID, type, email) Values (?,?,?,?,?,?,?)',[application?.username, password, application?.fName, application?.lName,UID,"student", application?.email]);
        await EmailProvider.sendEmail({to:application?.email, subject: "Application Accepted", text: `Congratulations! Your application has been accepted. Your username is ${application?.username} your password is ${password} Your id is ${UID}. Please login to your account and change your password.`});
        await Database.executeQuery('DELETE FROM requests WHERE id = ?', [id]);
        return{
            notification: {
            type: "success",
            message: "Application handled successfully!",
            },
            error: false,
        }
    }
    else{
        await EmailProvider.sendEmail({to: application?.email, subject: "Application Rejected", text: `We are sorry' your application has been rejected.`})
        await Database.executeQuery('DELETE FROM request WHERE id = ?', [id]);
        
    }
    
        
    } catch (error) {
        console.log(error); 
        if(error.code === 'ER_DUP_ENTRY'){
            return{
                notification: {
                type: "error",
                message: "an account with the same username already exists!",
                },
                error: true,
            }
        }
        return{
            notification: {
            type: "error",
            message: "An error occurred!",
            },
            error: true,
        }
        
    }
}

export default command;


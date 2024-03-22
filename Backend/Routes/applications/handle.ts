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
    if(response){
        let application:any = await Database.executeQuery('SELECT * FROM requests WHERE id = ?', [id]);
        application = application[0];
        console.log(application);
        let password = uuid();
        password=password.substring(0,8);
        console.log(password)
        const UID=await Database.generateUID("student"); 
        console.log(UID);  
        await Database.executeQuery('INSERT INTO users(username, password, fName, lName, UID, type, email) Values (?,?,?,?,?,?,?)',[application?.username, password, application?.fName, application?.lName,UID,"student", application?.email]);
        await EmailProvider.sendEmail({to:[ application?.email], subject: "Application Accepted", htmlContent: `Congratulations! Your application has been accepted. Your username is ${application?.username} your password is ${password} Your id is ${UID}. Please login to your account and change your password.`});
        return{
            notification: {
            type: "success",
            message: "Application handled successfully!",
            },
            error: false,
        }
    }
    else{
        //email the student that they got rejected
        await Database.executeQuery('DELETE FROM request WHERE id = ?', [id]);
        
    }
    
        
    } catch (error) {
        console.log(error); 
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


import { error } from "ajv/dist/vocabularies/applicator/dependencies.js";
import { ServerCommandBuilder } from "../../Applications/Commands/Builder.js";
import { UserAccessLevels, CommandExecuteArguments } from "../../Applications/Commands/Context.js";
import { v4 as uuid } from "uuid";

const command = new ServerCommandBuilder("apply")
  .setAccessLevel(UserAccessLevels.UNAUTHENTICATED)
  .setOutgoingChannel("apply-response")
  .setIncomingValidationSchema({
        type: "object",
        additionalProperties: false,
        // username, email, major, fName, lName, letter
        properties: {
            username: {"type":"string"},
            email: {"type":"string"},
            major: {"type":"string"},
            fName: {"type":"string"},
            lName: {"type":"string"},
            letter: {"type":"string"},
        },required:["username","email","major","fName","lName","letter"]    
      })
  .setExecute(callback)
  .setOutgoingValidationSchema({})
  .build();

async function callback({ Client, Data,EmailProvider, Database }: CommandExecuteArguments) {

    const {username, email, major, fName, lName, letter} =Data;
    try {
           
        let password = uuid();
        password=password.substring(0,8);
        const UID=await Database.generateUID("student"); 
        await Database.executeQuery('INSERT INTO users(username, password, fName, lName, UID, type, email,major) Values (?,?,?,?,?,?,?,?)',[username, password, fName, lName,UID,"student",email,"Computer Science"]);
        await EmailProvider.sendEmail({to:email, subject: "Application Accepted", text: `Congratulations! Your application has been accepted. Your username is ${username} your password is ${password} Your UID is ${UID}. Please login to your account and change your password.`});
        
        
        return{
              notification: {
              type: "success",
              message: "Application submitted successfully!",
              },
              error: false,
         }
        
    } catch (error) {
        console.log(error);
        if(error.code === 'ER_DUP_ENTRY'){
            return{
                notification: {
                type: "error",
                message: "USERNAME ALREADY EXISTS!",
                },
                error: true,
            }
        }
        else{
            return{
                notification: {
                type: "error",
                message: "An error occurred!",
                },
                error: true,
            }
        }
    }

}

export default command;

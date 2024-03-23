import { error } from "ajv/dist/vocabularies/applicator/dependencies.js";
import { ServerCommandBuilder } from "../../Applications/Commands/Builder.js";
import { UserAccessLevels, CommandExecuteArguments } from "../../Applications/Commands/Context.js";
import emailProvider from "Applications/Email/emailProvider.js";
import e from "express";


const command = new ServerCommandBuilder("forget-password")
  .setAccessLevel(UserAccessLevels.UNAUTHENTICATED)
  .setOutgoingChannel("forget-password-response")
  .setIncomingValidationSchema({
        type: "object",
        additionalProperties: false,
        properties: {
            email: {type: "string"},
        },       
      })
  .setExecute(callback)
  .setOutgoingValidationSchema({})
  .build();

async function callback({ Client, Data,EmailProvider, Database }: CommandExecuteArguments) {
    const { email } = Data;

    try {

        let password = Database.executeQuery('SELECT password FROM users WHERE email=?',[email]);
        password = password[0]["password"];
        if(!password)
        throw new Error("Email not found");

        EmailProvider.sendEmail({to:email,subject:"Forget Password", text:"Please click the link to reset your password"});
        return {
            notification: {
                type: "success",
                message: "Email sent successfully!",
            },
            error: false,
        };
        
    } catch (error) {

        if(error.message){
            return {
                notification: {
                    type: "error",
                    message: error.message,
                },
                error: true,
            };
        }
        
    }

   

    
}

export default command;

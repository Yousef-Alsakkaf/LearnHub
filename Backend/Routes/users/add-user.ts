import { error } from "ajv/dist/vocabularies/applicator/dependencies.js";
import { ServerCommandBuilder } from "../../Applications/Commands/Builder.js";
import { UserAccessLevels, CommandExecuteArguments } from "../../Applications/Commands/Context.js";
import { v4 as uuid } from "uuid";

const command = new ServerCommandBuilder("add-user")
  .setAccessLevel(UserAccessLevels.ADMIN)
  .setOutgoingChannel("add-user-response")
  .setIncomingValidationSchema({
        type: "object",
        additionalProperties: false,
        properties: {
            username: { type: "string" },
            password: { type: "string" },
            fName: { type: "string" },
            lName: { type: "string" },
            type: { type: "string" },
            email: { type: "string" },
            image: { type: "string" },
            
        },required:["username","password","fName","lName","type","email","image"] 
      })
  .setExecute(callback)
  .setOutgoingValidationSchema({})
  .build();

async function callback({ Client, Data, Database }: CommandExecuteArguments) {

    try {
        const id=Client.getId();
        const user=Client.getName();
        const {username, password, fName, lName, type, email, image}=Data;
        const uid = await Database.generateUID(type);
        await Database.executeQuery("INSERT INTO users (username, password, fName, lName, type, email, image,UID) VALUES (?,?,?,?,?,?,?,?)", [username, password, fName, lName, type, email, image,uid])       
        await Database.createLog({ event: "Add user", details: `User ${user} added user ${username}`, initiator: id });
        return{
              notification: {
                type: "success",
                message: "User Added successfully!",
                },
              error: false,
        };
        
    } catch (error) {
        console.log(error);
        
        if(error.code === 'ER_DUP_ENTRY'){
            return {
                notification: {
                  type: "error",
                  message: "Username already exists!",
                },
                error: true,
              };
        }

        return {
            notification: {
              type: "error",
              message: "Failed to add user!",
            },
            error: true,
          };
        
    }
  

}

export default command;

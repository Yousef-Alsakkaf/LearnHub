import { error } from "ajv/dist/vocabularies/applicator/dependencies.js";
import { ServerCommandBuilder } from "../../Applications/Commands/Builder.js";
import { UserAccessLevels, CommandExecuteArguments } from "../../Applications/Commands/Context.js";
import { v4 as uuid } from "uuid";

const command = new ServerCommandBuilder("add-courses")
  .setAccessLevel(UserAccessLevels.ADMIN)
  .setOutgoingChannel("add-courses-response")
  .setIncomingValidationSchema({
        type: "object",
        additionalProperties: false,
        properties: {
            title: { type: "string" },
            course_code: { type: "string" },
            academic_year: { type: "string" },
            image: { type: "string" },
            description: { type: "string" },
        },required:["title","course_code","academic_year","image","description"]       
      })
  .setExecute(callback)
  .setOutgoingValidationSchema({})
  .build();

async function callback({ Client, Data, Database }: CommandExecuteArguments) {

    try {
        const id=Client.getId();
        const user=Client.getName();
        const {title,course_code,academic_year,image,description}=Data;
        await Database.executeQuery('INSERT INTO courses (title,course_code,academic_year,image,description) VALUES(?,?,?,?,?)',[title,course_code,academic_year,image,description]);
        await Database.createLog({ event: "Add course", details: `User ${user} added course ${title}`, initiator: id });
        return{
              notification: {
                type: "success",
                message: "Course Added successfully!",
                },
              error: false,
        };
        
    } catch (error) {

        return {
            notification: {
              type: "error",
              message: "Failed to add course!",
            },
            error: true,
          };
        
    }
  

}

export default command;

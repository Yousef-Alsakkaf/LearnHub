import { error } from "ajv/dist/vocabularies/applicator/dependencies.js";
import { ServerCommandBuilder } from "../../Applications/Commands/Builder.js";
import { UserAccessLevels, CommandExecuteArguments } from "../../Applications/Commands/Context.js";
import { v4 as uuid } from "uuid";

const command = new ServerCommandBuilder("edit-course")
  .setAccessLevel(UserAccessLevels.ADMIN)
  .setOutgoingChannel("edit-course-response")
  .setIncomingValidationSchema({
        type: "object",
        additionalProperties: false,
        properties: {
            id: { type: "number" },
            title: { type: "string" },
            course_code: { type: "string" },
            academic_year: { type: "string" },
            image: { type: "string" },
            description: { type: "string" },
        },required:["id","title","course_code","academic_year","image","description"]       
      })
  .setExecute(callback)
  .setOutgoingValidationSchema({})
  .build();

async function callback({ Client, Data, Database }: CommandExecuteArguments) {

    try {
        const Userid=Client.getId();
        const user=Client.getName();
        const {title,course_code,academic_year,image,description}=Data;
        await Database.executeQuery('UPDATE courses SET title=?,course_code=?,academic_year=?,image=?,description=? WHERE id=?',[title,course_code,academic_year,image,description,Data.id]);
        await Database.createLog({ event: "edit course", details: `User ${user} edited course ${title}`, initiator: Userid });
        return{
              notification: {
                type: "success",
                message: "Course updated successfully!",
                },
              error: false,
        };
        
    } catch (error) {

        return {
            notification: {
              type: "error",
              message: "Failed to edit course!",
            },
            error: true,
          };
        
    }
  

}

export default command;

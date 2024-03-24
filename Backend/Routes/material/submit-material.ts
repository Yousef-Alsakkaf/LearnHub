import { error } from "ajv/dist/vocabularies/applicator/dependencies.js";
import { ServerCommandBuilder } from "../../Applications/Commands/Builder.js";
import { UserAccessLevels, CommandExecuteArguments } from "../../Applications/Commands/Context.js";
import { v4 as uuid } from "uuid";

const command = new ServerCommandBuilder("submit-material")
  .setAccessLevel(UserAccessLevels.STUDENT)
  .setOutgoingChannel("submit-material-response")
  .setIncomingValidationSchema({
        type: "object",
        additionalProperties: false,
        properties: {
            material_id: { type: "number" },
            course_id: { type: "number" },
            submission: { type: "string" },
        },required:["course_id","student_id","material_id","submission"]       
      })
  .setExecute(callback)
  .setOutgoingValidationSchema({})
  .build();

async function callback({ Client, Data, Database,EmailProvider }: CommandExecuteArguments) {

    try {
        const id=Client.getId();
        const user=Client.getName();
        const {material_id,course_id,submission}=Data;
        const course = await Database.executeQuery('SELECT title FROM courses WHERE id=?',[course_id]);
        const student = await Database.executeQuery('SELECT CONCAT(fName," ",lName) AS name, email FROM users WHERE id=?',[id]);

        await Database.executeQuery('INSERT INTO m_grade (material_id,student_id,course_id,submission) VALUES(?,?,?,?)',[material_id,id,course_id,submission]);
        await Database.createLog({ event: "submission", details: `User ${user} submitted an answer to ${course[0].title}`, initiator: id });
        await EmailProvider.sendEmail({to:student[0].email,subject:"Submission recived",text:`your submission in ${course[0].title} has been recievd successfully!`});
        return{
              notification: {
                type: "success",
                message: "Submission Recieved",
                },
              error: false,
        };
        
    } catch (error) {

        return {
            notification: {
              type: "error",
              message: "Failed to Submit!",
            },
            error: true,
          };
        
    }
  

}

export default command;

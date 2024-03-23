import { error } from "ajv/dist/vocabularies/applicator/dependencies.js";
import { ServerCommandBuilder } from "../../Applications/Commands/Builder.js";
import { UserAccessLevels, CommandExecuteArguments } from "../../Applications/Commands/Context.js";
import { v4 as uuid } from "uuid";

const command = new ServerCommandBuilder("add-instructor-to-course")
  .setAccessLevel(UserAccessLevels.ADMIN)
  .setOutgoingChannel("add-instructor-to-course-response")
  .setIncomingValidationSchema({
        type: "object",
        additionalProperties: false,
        properties: {
            course_id: { type: "number" },
            instructor_id: { type: "number" },
        },required:["course_id","instructor_id"]       
      })
  .setExecute(callback)
  .setOutgoingValidationSchema({})
  .build();

async function callback({ Client, Data, Database,EmailProvider }: CommandExecuteArguments) {

    try {
        const id=Client.getId();
        const user=Client.getName();
        const {course_id,instructor_id}=Data;
        const course = await Database.executeQuery('SELECT title FROM courses WHERE id=?',[course_id]);
        const instructor = await Database.executeQuery('SELECT CONCAT(fName," ",lName) AS name,email FROM users WHERE id=?',[instructor_id]);

        await Database.executeQuery('INSERT INTO teaches (course_id,student_id) VALUES(?,?)',[course_id,instructor_id]);
        await Database.createLog({ event: "assign instructor", details: `User ${user} assigned instructor ${instructor[0].name} to Course ${course[0].title}`, initiator: id });
        await EmailProvider.sendEmail({to:instructor[0].email,subject:"Course Enrollment",text:`You have been assigned to ${course[0].title} course`});
        return{
              notification: {
                type: "success",
                message: "Instructor assigned to course successfully!",
                },
              error: false,
        };
        
    } catch (error) {

        return {
            notification: {
              type: "error",
              message: "Failed to assign instructor to course!",
            },
            error: true,
          };
        
    }
  

}

export default command;

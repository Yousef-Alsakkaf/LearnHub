import { error } from "ajv/dist/vocabularies/applicator/dependencies.js";
import { ServerCommandBuilder } from "../../Applications/Commands/Builder.js";
import { UserAccessLevels, CommandExecuteArguments } from "../../Applications/Commands/Context.js";
import { v4 as uuid } from "uuid";

const command = new ServerCommandBuilder("add-student-to-course")
  .setAccessLevel(UserAccessLevels.INSTRUCTOR)
  .setOutgoingChannel("add-student-to-course-response")
  .setIncomingValidationSchema({
        type: "object",
        additionalProperties: false,
        properties: {
            course_id: { type: "number" },
            student_id: { type: "number" },
        },required:["course_id","student_id"]       
      })
  .setExecute(callback)
  .setOutgoingValidationSchema({})
  .build();

async function callback({ Client, Data, Database,EmailProvider }: CommandExecuteArguments) {

    try {
        const id=Client.getId();
        const user=Client.getName();
        const {course_id,student_id}=Data;
        const course = await Database.executeQuery('SELECT title FROM courses WHERE id=?',[course_id]);
        const student = await Database.executeQuery('SELECT CONCAT(fName," ",lName) AS name, email FROM users WHERE id=?',[student_id]);

        await Database.executeQuery('INSERT INTO studies (course_id,student_id) VALUES(?,?)',[course_id,student_id]);
        await Database.createLog({ event: "enroll student", details: `User ${user} added student ${student[0].name} to Course ${course[0].title}`, initiator: id });
        await EmailProvider.sendEmail({to:student[0].email,subject:"Course Enrollment",text:`You have been enrolled in ${course[0].title} course`});
        return{
              notification: {
                type: "success",
                message: "student Enrolled in course successfully!",
                },
              error: false,
        };
        
    } catch (error) {

        return {
            notification: {
              type: "error",
              message: "Failed to add student to course!",
            },
            error: true,
          };
        
    }
  

}

export default command;

import { error } from "ajv/dist/vocabularies/applicator/dependencies.js";
import { ServerCommandBuilder } from "../../Applications/Commands/Builder.js";
import { UserAccessLevels, CommandExecuteArguments } from "../../Applications/Commands/Context.js";


const command = new ServerCommandBuilder("final-grade")
  .setAccessLevel(UserAccessLevels.INSTRUCTOR)
  .setOutgoingChannel("final-grade-response")
  .setIncomingValidationSchema({
        type: "object",
        additionalProperties: false,
        properties: {
            course_id: {type: "number"},
        },       
      })
  .setExecute(callback)
  .setOutgoingValidationSchema({})
  .build();

async function callback({ Client, Data,EmailProvider, Database }: CommandExecuteArguments) {

    try {
        const weight=await Database.executeQuery('SELECT sum(weight) AS weight FROM material where course_id=?',[Data.course_id]);
        if(weight[0].weight!=100){
            throw new Error("Material weights do not add up to 100%");
        }

        await Database.executeQuery('CALL calcFinalGrade(?)',[Data.course_id]);
        const course = await Database.executeQuery("SELECT title FROM courses WHERE id=?", [Data.course_id]);
        const courseName = course[0].title;        
        const students = await Database.getCourseStudents(Data.course_id);
        for (const student of students) {
            const email = student["email"];
            await EmailProvider.sendEmail({ to: email, subject: "new material", text: ` Your final grade to ${courseName} has been posted` });
        }
            return {
            notification: {
                type: "success",
                message: "Final Grade Posted successfully!",
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
        else{
            return {
                notification: {
                    type: "error",
                    message: "An error occured",
                },
                error: true,
            };
        }
        
    }

    
}

export default command;

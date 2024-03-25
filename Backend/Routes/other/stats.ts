import { error } from "ajv/dist/vocabularies/applicator/dependencies.js";
import { ServerCommandBuilder } from "../../Applications/Commands/Builder.js";
import { UserAccessLevels, CommandExecuteArguments } from "../../Applications/Commands/Context.js";


const command = new ServerCommandBuilder("get-stats")
  .setAccessLevel(UserAccessLevels.STUDENT)
  .setOutgoingChannel("get-stats-response")
  .setIncomingValidationSchema({
        type: "object",
        additionalProperties: false,
        properties: {},   
      })
  .setExecute(callback)
  .setOutgoingValidationSchema({})
  .build();

async function callback({ Client,Database }: CommandExecuteArguments) {
    let courses = await Database.executeQuery('SELECT COUNT(*) as count FROM courses',[]);
    let students = await Database.executeQuery('SELECT COUNT(*) as count FROM users WHERE type="student"',[]);
    let instructors = await Database.executeQuery('SELECT COUNT(*) as count FROM users WHERE type="instructor"',[]);
    
    courses = courses[0].count;
    students = students[0].count;
    instructors = instructors[0].count;
    return {courses,students,instructors};
}

export default command;

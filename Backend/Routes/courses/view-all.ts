import { error } from "ajv/dist/vocabularies/applicator/dependencies.js";
import { ServerCommandBuilder } from "../../Applications/Commands/Builder.js";
import { UserAccessLevels, CommandExecuteArguments } from "../../Applications/Commands/Context.js";
import { v4 as uuid } from "uuid";

const command = new ServerCommandBuilder("get-all-courses")
  .setAccessLevel(UserAccessLevels.ADMIN)
  .setOutgoingChannel("get-all-courses-response")
  .setIncomingValidationSchema({
        type: "object",
        additionalProperties: false,
        properties: {},       
      })
  .setExecute(callback)
  .setOutgoingValidationSchema({})
  .build();

async function callback({ Client, Data, Database }: CommandExecuteArguments) {
  const courses = Database.executeQuery('SELECT id, title, course_code, academic_year, image, description,COUNT(student_id) AS no_of_enrolled FROM courses JOIN studies ON courses.id=student_id GROUP BY id, title, course_code, academic_year, image, description',[]);
  return courses;
}

export default command;

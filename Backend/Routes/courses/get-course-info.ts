import { error } from "ajv/dist/vocabularies/applicator/dependencies.js";
import { ServerCommandBuilder } from "../../Applications/Commands/Builder.js";
import { UserAccessLevels, CommandExecuteArguments } from "../../Applications/Commands/Context.js";
import { v4 as uuid } from "uuid";

const command = new ServerCommandBuilder("get-courses-info")
  .setAccessLevel(UserAccessLevels.STUDENT)
  .setOutgoingChannel("get-courses-info-response")
  .setIncomingValidationSchema({
        type: "object",
        additionalProperties: false,
        properties: {
            id: { type: "number" },// course id
        },required:["id"]       
      })
  .setExecute(callback)
  .setOutgoingValidationSchema({})
  .build();

async function callback({ Client, Data, Database }: CommandExecuteArguments) {
  const id=Data.id;
  const courses =await Database.executeQuery('SELECT id, title, course_code, academic_year, image, description,COUNT(student_id) AS no_of_enrolled FROM courses  JOIN studies ON courses.id=student_id WHERE courses.id=? GROUP BY id, title, course_code, academic_year, image, description',[id]);
  return courses;
}

export default command;

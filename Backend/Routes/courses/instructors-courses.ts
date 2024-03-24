import { error } from "ajv/dist/vocabularies/applicator/dependencies.js";
import { ServerCommandBuilder } from "../../Applications/Commands/Builder.js";
import { UserAccessLevels, CommandExecuteArguments } from "../../Applications/Commands/Context.js";

const command = new ServerCommandBuilder("instructor-courses")
  .setAccessLevel(UserAccessLevels.INSTRUCTOR)
  .setOutgoingChannel("instructor-courses-response")
  .setIncomingValidationSchema({
        type: "object",
        additionalProperties: false,
        properties: {
            id: { type: "number" },//instructor id
        },required:["id"]       
      })
  .setExecute(callback)
  .setOutgoingValidationSchema({})
  .build();

async function callback({ Client, Data, Database }: CommandExecuteArguments) {
  const id=Data.id;
  const courses = Database.executeQuery('SELECT title, course_code, academic_year, image FROM courses JOIN teaches ON id=course_id WHERE instructor_id=?',[id]);
  return courses ;
}

export default command;

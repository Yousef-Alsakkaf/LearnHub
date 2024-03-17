import { error } from "ajv/dist/vocabularies/applicator/dependencies.js";
import { ServerCommandBuilder } from "../../Applications/Commands/Builder.js";
import { UserAccessLevels, CommandExecuteArguments } from "../../Applications/Commands/Context.js";
import { v4 as uuid } from "uuid";

const command = new ServerCommandBuilder("student-courses")
  .setAccessLevel(UserAccessLevels.STUDENT)
  .setOutgoingChannel("student-courses-response")
  .setIncomingValidationSchema({
        type: "object",
        additionalProperties: false,
        properties: {
            id: { type: "number" },//student id
        },required:["id"]       
      })
  .setExecute(callback)
  .setOutgoingValidationSchema({})
  .build();

async function callback({ Client, Data, Database }: CommandExecuteArguments) {
  const id=Data.id;
  const roaster = Database.executeQuery('SELECT title, course_code, academic_year, image FROM courses JOIN studies ON id=course_id WHERE student_id=?',[id]);
  return roaster;
}

export default command;

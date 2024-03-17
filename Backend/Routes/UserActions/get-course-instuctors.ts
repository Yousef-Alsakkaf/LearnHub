import { error } from "ajv/dist/vocabularies/applicator/dependencies.js";
import { ServerCommandBuilder } from "../../Applications/Commands/Builder.js";
import { UserAccessLevels, CommandExecuteArguments } from "../../Applications/Commands/Context.js";
import { v4 as uuid } from "uuid";

const command = new ServerCommandBuilder("get-course-instructors")
  .setAccessLevel(UserAccessLevels.STUDENT)
  .setOutgoingChannel("get-course-instructors-response")
  .setIncomingValidationSchema({
        type: "object",
        additionalProperties: false,
        properties: {
            id: { type: "number" },
        },required:["id"]       
      })
  .setExecute(callback)
  .setOutgoingValidationSchema({})
  .build();

async function callback({ Client, Data, Database }: CommandExecuteArguments) {
  const id=Data.id;
  const instructors = Database.executeQuery('SELECT fName,lName,image from teaches JOIN users ON teaches.instructor_id=users.id WHERE course_id=?',[id]);
  return instructors;
}

export default command;

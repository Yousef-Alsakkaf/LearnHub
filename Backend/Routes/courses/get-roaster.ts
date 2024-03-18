import { error } from "ajv/dist/vocabularies/applicator/dependencies.js";
import { ServerCommandBuilder } from "../../Applications/Commands/Builder.js";
import { UserAccessLevels, CommandExecuteArguments } from "../../Applications/Commands/Context.js";
import { v4 as uuid } from "uuid";

const command = new ServerCommandBuilder("get-course-roaster")
  .setAccessLevel(UserAccessLevels.STUDENT)
  .setOutgoingChannel("get-course-roaster-response")
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
  const roaster = Database.executeQuery('SELECT fName,lName,image,type from studies JOIN users ON student_id=users.id WHERE course_id=? UNION (SELECT fName,lName,image,type from teaches JOIN users ON instructor_id=users.id WHERE course_id=?) ORDER BY type',[id,id]);
  return roaster;
}

export default command;

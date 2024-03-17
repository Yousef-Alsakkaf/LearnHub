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
  const courses = Database.executeQuery("SELECT * FROM courses",[]);
  return courses;
}

export default command;

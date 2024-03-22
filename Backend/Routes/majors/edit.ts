import { error } from "ajv/dist/vocabularies/applicator/dependencies.js";
import { ServerCommandBuilder } from "../../Applications/Commands/Builder.js";
import { UserAccessLevels, CommandExecuteArguments } from "../../Applications/Commands/Context.js";
import { v4 as uuid } from "uuid";

const command = new ServerCommandBuilder("edit-major")
  .setAccessLevel(UserAccessLevels.ADMIN)
  .setOutgoingChannel("edit-major-response")
  .setIncomingValidationSchema({
        type: "object",
        additionalProperties: false,
        properties: {
            name: {"type":"string"},
            new_name: {"type":"string"},
        },required:["name","new_name"]      
      })
  .setExecute(callback)
  .setOutgoingValidationSchema({})
  .build();

async function callback({ Client, Data, Database }: CommandExecuteArguments) {
  await this.Database.executeQuery('UPDATE majors SET name = ? WHERE name = ?', [Data.new_name, Data.name]);
  return{
    notification: {
      type: "success",
      message: "Major updated successfully!",
    },
    error: false,
  }
}

export default command;

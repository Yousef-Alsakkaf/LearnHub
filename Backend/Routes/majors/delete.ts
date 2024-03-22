import { error } from "ajv/dist/vocabularies/applicator/dependencies.js";
import { ServerCommandBuilder } from "../../Applications/Commands/Builder.js";
import { UserAccessLevels, CommandExecuteArguments } from "../../Applications/Commands/Context.js";
import { v4 as uuid } from "uuid";

const command = new ServerCommandBuilder("delete-major")
  .setAccessLevel(UserAccessLevels.ADMIN)
  .setOutgoingChannel("delete-major-response")
  .setIncomingValidationSchema({
        type: "object",
        additionalProperties: false,
        properties: {
            name: {"type":"string"},
            
        },required:["name"]       
      })
  .setExecute(callback)
  .setOutgoingValidationSchema({})
  .build();

async function callback({ Client, Data, Database }: CommandExecuteArguments) {
await Database.executeQuery('DELETE FROM majors WHERE name = ?', [Data.name]);

    return{
        notification: {
        type: "success",
        message: "Major deleted successfully!",
        },
        error: false,
    }
}

export default command;

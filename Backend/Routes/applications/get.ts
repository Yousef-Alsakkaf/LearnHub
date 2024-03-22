import { error } from "ajv/dist/vocabularies/applicator/dependencies.js";
import { ServerCommandBuilder } from "../../Applications/Commands/Builder.js";
import { UserAccessLevels, CommandExecuteArguments } from "../../Applications/Commands/Context.js";
import { v4 as uuid } from "uuid";

const command = new ServerCommandBuilder("view-applications")
  .setAccessLevel(UserAccessLevels.ADMIN)
  .setOutgoingChannel("view-applications-response")
  .setIncomingValidationSchema({
        type: "object",
        additionalProperties: false,
        properties: {},   
      })
  .setExecute(callback)
  .setOutgoingValidationSchema({})
  .build();

async function callback({ Client,Database }: CommandExecuteArguments) {
    const applications = await Database.executeQuery('SELECT * FROM request',[]);
    return applications;
}

export default command;

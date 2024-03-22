import { error } from "ajv/dist/vocabularies/applicator/dependencies.js";
import { ServerCommandBuilder } from "../../Applications/Commands/Builder.js";
import { UserAccessLevels, CommandExecuteArguments } from "../../Applications/Commands/Context.js";


const command = new ServerCommandBuilder("delete-book")
  .setAccessLevel(UserAccessLevels.ADMIN)
  .setOutgoingChannel("delete-book-response")
  .setIncomingValidationSchema({
        type: "object",
        additionalProperties: false,
        properties: {
            barcode: {type: "number"},
        },       
      })
  .setExecute(callback)
  .setOutgoingValidationSchema({})
  .build();

async function callback({ Client, Data, Database }: CommandExecuteArguments) {
  await this.Database.executeQuery('DELETE FROM books WHERE barcode=?',[Data.barcode]);
}

export default command;

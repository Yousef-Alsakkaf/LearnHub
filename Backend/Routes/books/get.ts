import { error } from "ajv/dist/vocabularies/applicator/dependencies.js";
import { ServerCommandBuilder } from "../../Applications/Commands/Builder.js";
import { UserAccessLevels, CommandExecuteArguments } from "../../Applications/Commands/Context.js";


const command = new ServerCommandBuilder("get-books")
  .setAccessLevel(UserAccessLevels.STUDENT)
  .setOutgoingChannel("get-books-response")
  .setIncomingValidationSchema({
        type: "object",
        additionalProperties: false,
        properties: {},       
      })
  .setExecute(callback)
  .setOutgoingValidationSchema({})
  .build();

async function callback({ Client, Data, Database }: CommandExecuteArguments) {
  const books = Database.executeQuery('SELECT * FROM books',[]);
  return books;
}

export default command;

import { error } from "ajv/dist/vocabularies/applicator/dependencies.js";
import { ServerCommandBuilder } from "../../Applications/Commands/Builder.js";
import { UserAccessLevels, CommandExecuteArguments } from "../../Applications/Commands/Context.js";
import { v4 as uuid } from "uuid";

const command = new ServerCommandBuilder("add-user")
  .setAccessLevel(UserAccessLevels.ADMIN)
  .setOutgoingChannel("add-user-response")
  .setIncomingValidationSchema({
    type: "object",
    additionalProperties: false,
    properties: {
      username: { type: "string" },
      password: { type: "string" },
      fName: { type: "string" },
      lName: { type: "string" },
      type: { type: "string" },
      email: { type: "string" },
    },
    required: ["username", "password", "fName", "lName", "type", "email"],
  })
  .setExecute(callback)
  .setOutgoingValidationSchema({})
  .build();

async function callback({ Client, Data, Database }: CommandExecuteArguments) {
  try {
    const id = Client.getId();
    const user = Client.getName();
    const { username, password, fName, lName, type, email } = Data;
    const uid = await Database.generateUID(type);
    await Database.executeQuery("INSERT INTO users (username, password, fName, lName, type, email,UID) VALUES (?,?,?,?,?,?,?)", [username, password, fName, lName, type, email, uid]);
    await Database.createLog({ event: "Add user", details: `User ${user} added user ${username}`, initiator: id });

    return {
      notification: {
        type: "success",
        message: "User Added successfully!",
      },
      error: false,
    };
  } catch (error) {
    let errMessage = error.code == "ER_DUP_ENTRY" ? "Username already exists!" : "Failed to add user!";

    return {
      notification: {
        type: "error",
        message: errMessage,
      },
      error: true,
    };
  }
}

export default command;

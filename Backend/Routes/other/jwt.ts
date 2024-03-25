import { error } from "ajv/dist/vocabularies/applicator/dependencies.js";
import { ServerCommandBuilder } from "../../Applications/Commands/Builder.js";
import { UserAccessLevels, CommandExecuteArguments } from "../../Applications/Commands/Context.js";
import jsonwebtoken from "jsonwebtoken";
import fs from "fs";

const command = new ServerCommandBuilder("get-jwt")
  .setAccessLevel(UserAccessLevels.STUDENT)
  .setOutgoingChannel("get-jwt-response")
  .setIncomingValidationSchema({
    type: "object",
    additionalProperties: false,
    properties: {},
  })
  .setExecute(callback)
  .setOutgoingValidationSchema({})
  .build();

async function callback({ Client, Data, Database }: CommandExecuteArguments) {
  const id = Client.getId();

  const existingToken = await Database.executeQuery("SELECT * FROM JWT WHERE userid=?", [id]);

  if (existingToken[0]?.JWT == null) {
    let user = await Database.executeQuery("SELECT * FROM users WHERE id=?", [id]);
    user = user[0];
    const privateKey = fs.readFileSync("/Users/abdulrahmananas/Desktop/Projects/LearnHub/Backend/key.pk");
    const token = jsonwebtoken.sign(
      {
        id: user["UID"], // You can generate your own id and replace uuid()
        name: user["username"], // Set the user name
        email: user["email"], // Set the user email
        avatar: user["image"], // Set the user avatar
        appId: "vpaas-magic-cookie-c5fe3f41ced041b2a410174bffd4a537", // Your AppID
        kid: "vpaas-magic-cookie-c5fe3f41ced041b2a410174bffd4a537/ed7f8e", // Set the api key, see https://jaas.8x8.vc/#/apikeys for more info.
      },
      privateKey,
      { algorithm: "RS256" }
    );

    await Database.executeQuery("INSERT INTO JWT (userid,JWT) VALUES(?,?)", [id, token]);
    return token;
  } else return existingToken[0].JWT;
}

export default command;

import { error } from "ajv/dist/vocabularies/applicator/dependencies.js";
import { ServerCommandBuilder } from "../../Applications/Commands/Builder.js";
import { UserAccessLevels, CommandExecuteArguments } from "../../Applications/Commands/Context.js";
import { v4 as uuid } from "uuid";

const command = new ServerCommandBuilder("get-leaderboard")
  .setAccessLevel(UserAccessLevels.INSTRUCTOR)
  .setOutgoingChannel("get-leaderboard-response")
  .setIncomingValidationSchema({
        type: "object",
        additionalProperties: false,
        properties: {},       
      })
  .setExecute(callback)
  .setOutgoingValidationSchema({})
  .build();

async function callback({ Client, Data, Database }: CommandExecuteArguments) {
    //uid,last name,first name,cgpa,major
  const leaderboard = Database.executeQuery(`
SELECT UID AS id,lName AS lastName,fname AS firstName,0 AS CGPA,major AS Major
FROM users
WHERE type='student' AND active=1`,[]);
return leaderboard;
}

export default command;

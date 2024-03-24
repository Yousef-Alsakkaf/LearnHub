import { error } from "ajv/dist/vocabularies/applicator/dependencies.js";
import { ServerCommandBuilder } from "../../Applications/Commands/Builder.js";
import { UserAccessLevels, CommandExecuteArguments } from "../../Applications/Commands/Context.js";


const command = new ServerCommandBuilder("get-submissions")
  .setAccessLevel(UserAccessLevels.INSTRUCTOR)
  .setOutgoingChannel("get-submissions-response")
  .setIncomingValidationSchema({
        type: "object",
        additionalProperties: false,
        properties: {
            material_id: { type: "number" }, // material id
        },       
      })
  .setExecute(callback)
  .setOutgoingValidationSchema({})
  .build();

async function callback({ Client, Data, Database }: CommandExecuteArguments) {
  const submission = await Database.executeQuery(`SELECT weight, title,material_id, student_id, grade, submission,concat(lName,' ',fName) AS name FROM material JOIN m_grade ON material.id=material_id JOIN users on student_id=users.id where material_id=?`,[]);
  return submission;
}

export default command;

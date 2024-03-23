import { error } from "ajv/dist/vocabularies/applicator/dependencies.js";
import { ServerCommandBuilder } from "../../Applications/Commands/Builder.js";
import { UserAccessLevels, CommandExecuteArguments } from "../../Applications/Commands/Context.js";


const command = new ServerCommandBuilder("get-unenrolled-students")
  .setAccessLevel(UserAccessLevels.INSTRUCTOR)
  .setOutgoingChannel("get-unenrolled-students-response")
  .setIncomingValidationSchema({
    type: "object",
    additionalProperties: false,
    properties: {
      course_id: { type: "number" },
    },
    required: ["course_id"],
  })
  .setExecute(callback)
  .setOutgoingValidationSchema({})
  .build();

async function callback({ Client, Data, Database }: CommandExecuteArguments) {
  const course_id = Data.course_id;
  const roaster = await Database.executeQuery(
    "SELECT fName,lName,image,type,UID from users where type='student' and users.id NOT IN (select student_id from studies where course_id=?)",
    [course_id]
  );
  
  return roaster;
}

export default command;

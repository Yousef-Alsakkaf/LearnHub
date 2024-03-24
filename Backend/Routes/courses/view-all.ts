import { error } from "ajv/dist/vocabularies/applicator/dependencies.js";
import { ServerCommandBuilder } from "../../Applications/Commands/Builder.js";
import { UserAccessLevels, CommandExecuteArguments } from "../../Applications/Commands/Context.js";

const command = new ServerCommandBuilder("get-all-courses")
  .setAccessLevel(UserAccessLevels.STUDENT)
  .setOutgoingChannel("get-all-courses-response")
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

  let type = await Database.executeQuery("SELECT type FROM users WHERE id=?", [id]);
  type = type[0].type;

  if (type == "student") {
    const courses = await Database.executeQuery(
      "SELECT courses.id, title, course_code, academic_year, image, description,COUNT(student_id) AS no_of_enrolled FROM courses  LEFT OUTER JOIN studies ON courses.id=course_id WHERE student_id=? GROUP BY courses.id, title, course_code, academic_year, image, description",
      [id]
    );
    return courses;
  } else if (type == "instructor") {
    const courses = await Database.executeQuery(
      "SELECT courses.id, title, course_code, academic_year, image, description FROM courses  LEFT OUTER JOIN teaches ON courses.id=course_id WHERE instructor_id=? GROUP BY courses.id, title, course_code, academic_year, image, description",
      [id]
    );
    return courses;
  } else {
    const courses = await Database.executeQuery(
      "SELECT courses.id, title, course_code, academic_year, image, description,COUNT(student_id) AS no_of_enrolled FROM courses  LEFT OUTER JOIN studies ON courses.id=course_id GROUP BY courses.id, title, course_code, academic_year, image, description",
      []
    );
    return courses;
  }
}

export default command;

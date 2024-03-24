import { error } from "ajv/dist/vocabularies/applicator/dependencies.js";
import { ServerCommandBuilder } from "../../Applications/Commands/Builder.js";
import { UserAccessLevels, CommandExecuteArguments } from "../../Applications/Commands/Context.js";


const command = new ServerCommandBuilder("get-gpa")
  .setAccessLevel(UserAccessLevels.STUDENT)
  .setOutgoingChannel("get-gpa-response")
  .setIncomingValidationSchema({
        type: "object",
        additionalProperties: false,
        properties: {
            course_id: { type: "number"},
            student_id: { type: "number"}
        },required: ["course_id","student_id"]       
      })
  .setExecute(callback)
  .setOutgoingValidationSchema({})
  .build();

async function callback({ Client, Data, Database }: CommandExecuteArguments) {
    const {course_id,student_id} = Data;
  const books = Database.executeQuery(`SELECT 
  u.UID AS id,
  u.lName AS lastName,
  u.fname AS firstName,
  u.image AS img,
  ROUND((
      SELECT 
          SUM(
              CASE 
                  WHEN s.final_grade BETWEEN 80 AND 100 THEN 4.0
                  WHEN s.final_grade BETWEEN 77 AND 79 THEN 3.7
                  WHEN s.final_grade BETWEEN 74 AND 76 THEN 3.3
                  WHEN s.final_grade BETWEEN 70 AND 73 THEN 3.0
                  WHEN s.final_grade BETWEEN 67 AND 69 THEN 2.7
                  WHEN s.final_grade BETWEEN 64 AND 66 THEN 2.3
                  WHEN s.final_grade BETWEEN 60 AND 63 THEN 2.0
                  WHEN s.final_grade BETWEEN 57 AND 59 THEN 1.7
                  WHEN s.final_grade BETWEEN 54 AND 56 THEN 1.3
                  WHEN s.final_grade BETWEEN 50 AND 53 THEN 1.0
                  ELSE 0.0
              END
          )
      FROM
          studies s
      WHERE
          s.student_id = u.id AND course_id=?
  ), 2) AS CGPA,
  u.major AS Major
FROM
  users u
WHERE
  u.type = 'student'
  AND u.active = 1
  AND u.id=?
ORDER BY CGPA DESC;`,[course_id,student_id]);
  return books;
}

export default command;

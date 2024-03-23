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
  const leaderboard = await Database.executeQuery(`
  SELECT 
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
            ) / COUNT(s.final_grade)
        FROM
            studies s
        WHERE
            s.student_id = u.id
    ), 2) AS CGPA,
    u.major AS Major
FROM
    users u
WHERE
    u.type = 'student'
    AND u.active = 1
ORDER BY CGPA DESC;

`,[]);
return leaderboard;
}

export default command;

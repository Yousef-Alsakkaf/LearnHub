import { error } from "ajv/dist/vocabularies/applicator/dependencies.js";
import { ServerCommandBuilder } from "../../Applications/Commands/Builder.js";
import { UserAccessLevels, CommandExecuteArguments } from "../../Applications/Commands/Context.js";
import { v4 as uuid } from "uuid";

const command = new ServerCommandBuilder("get-course-material")
  .setAccessLevel(UserAccessLevels.STUDENT)
  .setOutgoingChannel("get-course-material-response")
  .setIncomingValidationSchema({
    type: "object",
    additionalProperties: false,
    properties: {
      id: { type: "number" }, // course id
    },
    required: ["id"],
  })
  .setExecute(callback)
  .setOutgoingValidationSchema({})
  .build();

async function callback({ Client, Data, Database }: CommandExecuteArguments) {
  try {
    const id = Data.id;
    const doesCourseExist = await Database.doesCourseExist(id);
    if (!doesCourseExist) {
      console.log("Course does not exist");
      return {
        notification: {
          type: "error",
          message: "Course does not exist!",
        },
        error: true,
      };
    }

    let type =await Database.executeQuery('SELECT type FROM courses WHERE id=?',[id]);
    type = type[0].type;
    if(type === 'student'){
      const user = Client.getId();
      const material = await Database.executeQuery(`SELECT  studies.student_id,material.id, material.course_id, CONCAT (IFNULL(m.grade,"-"),' / ', weight) AS 'weight', material.title, material.deadline, material.description, m.submission
      FROM studies
      JOIN material ON studies.course_id = material.course_id 
      LEFT OUTER JOIN m_grade m ON material.id = m.material_id AND studies.student_id=m.student_id
      WHERE  studies.course_id = ? AND studies.student_id=? `,[id,user]);
      
      return material;
      
    }
    const material = await Database.executeQuery('SELECT  material.id,course_id, weight, material.title, deadline,material.description FROM courses JOIN material ON courses.id=course_id WHERE course_id=?',[id]);
    return material;

    
    
  } catch (error) {
    console.log(error);
    return {
      notification: {
        title: "Error",
        message: "An error occured while getting course material",
        error: true,
      },
    };
  }
}

export default command;

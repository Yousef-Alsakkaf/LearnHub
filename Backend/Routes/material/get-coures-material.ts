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

    const material = await Database.executeQuery("SELECT course_id, weight, material.title, deadline FROM courses JOIN material ON courses.id=course_id WHERE course_id=?", [id]);
    
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

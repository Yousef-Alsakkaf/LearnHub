import { error } from "ajv/dist/vocabularies/applicator/dependencies.js";
import { ServerCommandBuilder } from "../../Applications/Commands/Builder.js";
import {
  UserAccessLevels,
  CommandExecuteArguments,
} from "../../Applications/Commands/Context.js";

const command = new ServerCommandBuilder("grade-material")
  .setAccessLevel(UserAccessLevels.INSTRUCTOR)
  .setOutgoingChannel("grade-material-response")
  .setIncomingValidationSchema({
    type: "object",
    additionalProperties: false,
    properties: {
      material_id: { type: "number" },
      student_id: { type: "number" },
      course_id: { type: "number" },
      mark: { type: "number" },
    },
  })
  .setExecute(callback)
  .setOutgoingValidationSchema({})
  .build();

async function callback({
  Client,
  Data,
  EmailProvider,
  Database,
}: CommandExecuteArguments) {
  const { material_id, student_id, course_id, mark } = Data;
  try {
    const weight = await Database.executeQuery(
      "SELECT weight AS weight FROM material where id=?",
      [material_id]
    );
    if (weight[0].weight < mark) {
      throw new Error("grade greater than material weight");
    }

    let submission = await Database.executeQuery(
      `Select * from m_grade where material_id=? and student_id=?`,
      [material_id, student_id]
    );
    submission = submission[0].submission;

    if (submission == null)
      await Database.executeQuery(
        "INSERT INTO m_grade (material_id,student_id,grade) VALUES (?,?,?)",
        [material_id, student_id, mark]
      );
    else
      await Database.executeQuery(
        "UPDATE m_grade SET grade=? WHERE material_id=? AND student_id=?",
        [mark, material_id, student_id]
      );

    const email = await Database.getStudentEmail(student_id);
    const course = await Database.executeQuery(
      "SELECT title FROM courses WHERE id=?",
      [course_id]
    );
    // await EmailProvider.sendEmail({
    //   to: email,
    //   subject: "Final Grade posted",
    //   text: `Your Final Grade on course ${course[0].title} has been posted`,
    // });
    return {
      notification: {
        type: "success",
        message: "Material graded successfully!",
      },
      error: false,
    };
  } catch (error) {
    if (error.message) {
      return {
        notification: {
          type: "error",
          message: error.message,
        },
        error: true,
      };
    } else {
      return {
        notification: {
          type: "error",
          message: "An error occured",
        },
        error: true,
      };
    }
  }
}

export default command;

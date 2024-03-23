import { error } from "ajv/dist/vocabularies/applicator/dependencies.js";
import { ServerCommandBuilder } from "../../Applications/Commands/Builder.js";
import { UserAccessLevels, CommandExecuteArguments } from "../../Applications/Commands/Context.js";
import emailProvider from "Applications/Email/emailProvider.js";
import e from "express";


const command = new ServerCommandBuilder("add-announcement")
  .setAccessLevel(UserAccessLevels.STUDENT)
  .setOutgoingChannel("add-announcement-response")
  .setIncomingValidationSchema({
        type: "object",
        additionalProperties: false,
        properties: {
            course_id: {type: "number"},
            subject: {type: "string"},
            message: {type: "string"},
        },       
      })
  .setExecute(callback)
  .setOutgoingValidationSchema({})
  .build();

async function callback({ Client, Data,EmailProvider, Database }: CommandExecuteArguments) {
    const { course_id, subject, message } = Data;
    const user = Client.getName();
    const id= Client.getId();
    await Database.executeQuery('INSERT INTO announcments (course_id, subject, message, sender_id) VALUES (?,?,?,?)',[course_id, subject, message, id]);
    await Database.createLog({ event: "Add announcement", details: `User ${user} added announcement ${subject}`, initiator:id });
    const students = await Database.getCourseStudents(course_id)
    console.log(students);
    for(const student of students){
        const email = student["email"];
        await EmailProvider.sendEmail({to:email,subject, text:message});
    }
    return {
        notification: {
            type: "success",
            message: "Announcement Added successfully!",
        },
        error: false,
    };
}

export default command;

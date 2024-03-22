import { error } from "ajv/dist/vocabularies/applicator/dependencies.js";
import { ServerCommandBuilder } from "../../Applications/Commands/Builder.js";
import { UserAccessLevels, CommandExecuteArguments } from "../../Applications/Commands/Context.js";

const command = new ServerCommandBuilder("add-book")
  .setAccessLevel(UserAccessLevels.ADMIN)
  .setOutgoingChannel("add-book-response")
  .setIncomingValidationSchema({
        type: "object",
        additionalProperties: false,

        properties: {
            title: {type: "string"},
            author: {type: "string"},
            language: {type: "string"},
            year_of_prod: {type: "number"},
            publisher: {type: "string"},
            subjects: {type: "string"},
            no_of_pages: {type: "number"},
            price: {type: "number"},
            rack: {type: "string"},
            image: {type: "string"},
        },required: ["title", "author", "language", "year_of_prod", "publisher", "subjects", "no_of_pages", "price", "rack", "image"]       
      })
  .setExecute(callback)
  .setOutgoingValidationSchema({})
  .build();

async function callback({ Client, Data, Database }: CommandExecuteArguments) {
    const { title, author,language, year_of_prod, publisher, subjects, no_of_pages, price, rack, image } = Data;
    const user = Client.getName();
    const id= Client.getId();
    await Database.executeQuery('INSERT INTO books (title, author, language, year_of_prod, publisher, subjects, no_of_pages, price, rack, borrower, image) VALUES (?,?,?,?,?,?,?,?,?,?)',[title, author, language, year_of_prod, publisher, subjects, no_of_pages, price, rack, image]);
    await Database.createLog({ event: "Add book", details: `User ${user} added book ${title}`, initiator:id });
    return {
        notification: {
            type: "success",
            message: "Book Added successfully!",
        },
        error: false,
    };

}

export default command;

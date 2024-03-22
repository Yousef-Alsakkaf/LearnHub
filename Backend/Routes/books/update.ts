import { error } from "ajv/dist/vocabularies/applicator/dependencies.js";
import { ServerCommandBuilder } from "../../Applications/Commands/Builder.js";
import { UserAccessLevels, CommandExecuteArguments } from "../../Applications/Commands/Context.js";


const command = new ServerCommandBuilder("update-book")
  .setAccessLevel(UserAccessLevels.ADMIN)
  .setOutgoingChannel("update-book-response")
  .setIncomingValidationSchema({
        type: "object",
        additionalProperties: false,
        //title, author, barcode, language, year_of_prod, publisher, subjects, no_of_pages, price, rack, borrower, image
        properties: {
            title: {type: "string"},
            author: {type: "string"},
            barcode: {type: "number"},
            language: {type: "string"},
            year_of_prod: {type: "number"},
            publisher: {type: "string"},
            subjects: {type: "string"},
            no_of_pages: {type: "number"},
            price: {type: "number"},
            rack: {type: "string"},
            borrower: {type: "string"},
            image: {type: "string"},
        },required: ["title", "author", "barcode", "language", "year_of_prod", "publisher", "subjects", "no_of_pages", "price", "rack", "borrower", "image"]   
      })
  .setExecute(callback)
  .setOutgoingValidationSchema({})
  .build();

async function callback({ Client, Data, Database }: CommandExecuteArguments) {
    const { title, author, barcode, language, year_of_prod, publisher, subjects, no_of_pages, price, rack, borrower, image } = Data;
    const user = Client.getName();
    const id= Client.getId();
    await Database.executeQuery(`UPDATE books SET title=?, author=?, barcode=?, language=?, year_of_prod=?, publisher=?, subjects=?, no_of_pages=?, price=?, rack=?, borrower=?, image=? WHERE barcode=?`,[title, author, barcode, language, year_of_prod, publisher, subjects, no_of_pages, price, rack, borrower, image, barcode])
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

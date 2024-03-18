import { error } from "ajv/dist/vocabularies/applicator/dependencies.js";
import { ServerCommandBuilder } from "../../Applications/Commands/Builder.js";
import { UserAccessLevels, CommandExecuteArguments } from "../../Applications/Commands/Context.js";
import { v4 as uuid } from "uuid";

const command = new ServerCommandBuilder("delete-course-material")
  .setAccessLevel(UserAccessLevels.INSTRUCTOR)
  .setOutgoingChannel("delete-course-material-response")
  .setIncomingValidationSchema({
        type: "object",
        additionalProperties: false,
        //course_id, weight, title, deadline
        properties: {
            id: { type: "number" },// material id
        },required:["id"]       
      })
  .setExecute(callback)
  .setOutgoingValidationSchema({})
  .build();

async function callback({ Client, Data, Database }: CommandExecuteArguments) {
    const{id}=Data;
    const ClientId=Client.getId();
    const ClientName=Client.getName();

 try {
    const doesMaterialExist = await Database.doesMaterialExist(id);
    if(!doesMaterialExist)
        throw new Error("Material does not exist");

        const isMaterialUsed = await Database.isMaterialUsed(id);
        if(isMaterialUsed)
            throw new Error("Material has grades");
       
        await Database.executeQuery('DELETE FROM material WHERE id=?',[id]);
        Database.createLog({ event: "Delete Material", details: `User ${ClientName} deleted material ${id}`, initiator: ClientId });
        console.log("Material deleted successfully");
        return {
            notification: {
              type: "success",
              message: "Material deleted successfully!",
            },
            error: false,
          };
       

    
 } catch (error) {
    console.log(error.message);

    if(error.message==="Material has grades")
        return {
            notification: {
              type: "error",
              message: "Material has grades! ",
            },
            error: true,
          };
   
     else if(error.message==="Material does not exist")
        return {
            notification: {
              type: "error",
              message: "Material does not exist!",
            },
            error: true,
          };
    
    else return {
        notification:{
            title:"Error",
            message:"Unable to delete material",
            error:true
        }
    }
 }


}

export default command;

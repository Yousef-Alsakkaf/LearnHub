import { useEffect } from "react"
import socket from "../../../socket"

function Roster() {
    useEffect(() => {
        socket.emit("get-course-roaster", {id: 1});
        socket.on("get-course-roaster-response", (message) => {
            console.log("This is the response from getting the course roaster: ", message);
        
        })
    })
  return (
    <div></div>
  )
}

export default Roster

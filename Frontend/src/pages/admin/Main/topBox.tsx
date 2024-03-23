import { useEffect, useState } from "react";
import "../../../styles/topBox.css"
import {topStudents} from "./data"
import socket from "@/socket";


interface User {
id: string;  
img: string;
lastName: string;
firstName: string;
CGPA: number;
}

function TopBox() {
  const [rows, setRows] = useState<User [] | null>(null);
  useEffect(() => {
    socket.emit("get-leaderboard");
    socket.on("get-leaderboard-response", (response) => {
      setRows(response);
    });
    return () => {
      socket.off("get-leaderboard-response");
    };
  }, []);

  return (
    <div className="topBox">
       <h1>Top Students</h1>
       <div className="list">
        {rows && rows.map(row=>(
         <div className="listItem" key={row.id}>
            <div className="user">
                <img src={row.img} alt="" />
                <div className="userTexts">
                    <span className="username">{row.firstName} {" "} {row.lastName}</span>
                </div>
              <span className="CGPA">
                {row.CGPA}
              </span>
            </div>
         </div>
        ))}
       </div>
    </div>
  )
}
export default TopBox;
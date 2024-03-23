import React from "react";
import "../../../styles/Leaderboard.css"
import DataTable from "./DataTable";

function Leaderboard() {
  return (
        <div className="users">
          <div className="info">
            <h1 id="leaderBoardTitle">Leaderboard</h1>
            {/* <button>Add New User</button> */}
          </div>
          <DataTable />
        </div>
  )
}

export default Leaderboard;

import React from 'react'
import "../../../styles/AdminDashBoard.scss"
import TopBox from './topBox'
import ChartBox2 from "./ChartBox2"
import ChartBox3 from "./ChartBox3"
import ChartBox4 from "./ChartBox4"
import ChartBox from "./ChartBox"



function MainAdmin() {
  return (
  <div>
    <h1 id="dashBoardTitle">Dashboard</h1>
     <div className="home">
    <div className="box box1">
      <TopBox />
    </div>
    <div className="box box2"><ChartBox2/></div>
    <div className="box box3"><ChartBox3/></div>
    {/* <div className="box box4">box4</div> */}
    <div className="box box5"><ChartBox4/></div>
    {/* <div className="box box6">box6</div> */}
    <div className="box box7"><ChartBox/></div>

  </div> 
  </div>
    
  )
}

export default MainAdmin

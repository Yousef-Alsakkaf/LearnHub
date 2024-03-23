import "../../../styles/chartBox.scss"
import allUsers from "../../../assets/images/studentsIcon66.png"
import { Link } from "react-router-dom"
import React, { PureComponent, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import socket from "@/socket";

const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 3800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  


const ChartBox2 = () => {
  const [studentsCount, setStudentsCount] = React.useState<number | null>(null);
  useEffect(() => { 
    socket.emit("get-stats", {});
    socket.on("get-stats-response", (response) => {
    setStudentsCount(response.students);
    console.log("this is response from get-stats", response );
    });
    return () => {
      socket.off("get-stats-response");
    };
  },[])

  return (
    <div className="chartBox">
        <div className="boxInfo">
            <div className="title">
                <img src ={allUsers} alt=" "/>
                <span>Total Students</span>
            </div>
            <h1>{studentsCount}</h1>
            {/* <Link to="">View All</Link> */}
        </div>
        <div className="chartInfo">
            <div className="chart">
            <ResponsiveContainer width="100%" height="100%">
            <LineChart width={300} height={100} data={data}>
            <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
            </ResponsiveContainer>
            </div>
            <div className="texts">
                {/* <span className="percentage"></span>
                <span className="duration">This Month</span> */}
            </div>
        </div>
    </div>
  )
}

export default ChartBox2



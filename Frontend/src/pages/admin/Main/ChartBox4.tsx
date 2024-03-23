import "../../../styles/chartBox.scss"
import allUsers from "../../../assets/images/coursesIcon66.png"
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
      uv: 2000,
      pv: 1698,
      amt: 2310,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 4800,
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
      uv: 3890,
      pv: 1800,
      amt: 3181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 2490,
      pv: 6300,
      amt: 3100,
    },
  ];
  


const ChartBox4 = () => {
  const [coursesCount, setCoursesCount] = React.useState<number | null>(null);
  useEffect(() => { 
    socket.emit("get-stats", {});
    socket.on("get-stats-response", (response) => {
      setCoursesCount(response.courses);
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
                <span>Total Courses</span>
            </div>
            <h1>{coursesCount}</h1>
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

export default ChartBox4



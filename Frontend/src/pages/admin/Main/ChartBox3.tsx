import "../../../styles/chartBox.scss"
import allUsers from "../../../assets/images/InstructorsImage66.png"
import { Link } from "react-router-dom"
import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    {
      name: 'Page A',
      uv: 3500,
      pv: 2200,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3200,
      pv: 1898,
      amt: 2410,
    },
    {
      name: 'Page C',
      uv: 1500,
      pv: 3800,
      amt: 2690,
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
      uv: 2490,
      pv: 1300,
      amt: 2100,
    },
  ];
  


const ChartBox3 = () => {
  return (
    <div className="chartBox">
        <div className="boxInfo">
            <div className="title">
                <img src ={allUsers} alt=" "/>
                <span>Total Instrcuctors</span>
            </div>
            <h1>13</h1>
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

export default ChartBox3



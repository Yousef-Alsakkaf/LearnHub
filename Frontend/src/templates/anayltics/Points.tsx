import React from "react";
import { TEChart } from "tw-elements-react";

export default function ChartBubble(): JSX.Element {
  return (
    <TEChart
      type="bubble"
      data={{
        datasets: [
          {
            label: "Students",
            data: [
              {
                x: 3,
                y: 7,
                r: 10,
              },
            ],
          },
          {
            label: "Instructors",
            data: [
              {
                x: 9,
                y: 7,
                r: 10,
              },
            ],
            backgroundColor: "rgba(66, 133, 244, 0.2)",
          },
          {
            label: "Admin",
            data: [
              {
                x: 15,
                y: 20,
                r: 10,
              },
            ],
            backgroundColor: "rgba(66, 133, 244, 0.8)",
          },
          {
            label: "Global",
            data: [
              {
                x: 19,
                y: 9,
                r: 10,
              },
            ],
          },
        ],
      }}
    />
  );
}
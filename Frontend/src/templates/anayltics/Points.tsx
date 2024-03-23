import React from "react";
import { TEChart } from "tw-elements-react";

export default function ChartBubble(): JSX.Element {
  return (
    <TEChart
      type="bubble"
      data={{
        datasets: [
          {
            label: "student",
            data: [
              {
                x: 3,
                y: 7,
                r: 10,
              },
            ],
          },
          {
            label: "admin",
            data: [
              {
                x: 5,
                y: 7,
                r: 10,
              },
            ],
            backgroundColor: "rgba(66, 133, 244, 0.2)",
          },
          {
            label: "instructor",
            data: [
              {
                x: 7,
                y: 7,
                r: 10,
              },
            ],
            backgroundColor: "rgba(66, 133, 244, 0.8)",
          },
          {
            label: "global",
            data: [
              {
                x: 10,
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
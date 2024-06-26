import React from "react";
import { TEChart } from "tw-elements-react";

export default function ChartLine(): JSX.Element {
  return (
    <TEChart
      type="line"
      data={{
        labels: [
          "first year",
          "second year",
          "third year",
          "fourth year",
          
        ],
        datasets: [
          {
            label: "Attendance",
            data: [0.2, 0.3, 0.5, 0.7, 0.8, 0.9, 1],
          },
        ],
      }}
    />
  );

}


import React from "react";
import { TEChart } from "tw-elements-react";

export default function ChartBar(): JSX.Element {
  return (
      <TEChart
        type="bar"
        data={{
          labels: [
            "Student",
            "admin",
            "instructor",
            "global"
          ],
          datasets: [
            {
              label: "users",
              data: [20, 25, 30, 35, 49],
            },
          ],
        }}
      />
  );
}
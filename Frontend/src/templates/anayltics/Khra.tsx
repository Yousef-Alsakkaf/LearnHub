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
          ],
          datasets: [
            {
              label: "users",
              data: [5, 10, 20, 25, 30, 35, 49],
            },
          ],
        }}
      />
  );
}
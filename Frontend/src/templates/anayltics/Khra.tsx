import socket from "@/socket";
import React, { useEffect } from "react";
import { TEChart } from "tw-elements-react";

export default function ChartBar(): JSX.Element {
  const [instructorsCount, setinstructorsCount] = React.useState<number | null>(null);
  const [khra, setKhra] = React.useState<number | null>(null);
  const [airee, setAiree] = React.useState<number | null>(null);

  useEffect(() => { 
    socket.emit("get-stats", {});
    socket.on("get-stats-response", (response) => {
      setinstructorsCount(response.instructors);
      setKhra(response.students)
      setAiree(response.admin)
    console.log("this is response from get-stats", response );
    });
    return () => {
      socket.off("get-stats-response");
    };
  },[])
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
              data: [khra, 15, 30, instructorsCount, 59],
            },
          ],
        }}
      />
  );
}
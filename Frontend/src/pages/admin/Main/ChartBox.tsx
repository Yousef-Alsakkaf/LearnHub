import socket from "@/socket";
import { useEffect, useState } from "react";

interface Log {
  logId: string;
  date: string;
  details: string;
}

const ChartBox = () => {
  const [logs, setLogs] = useState<Log[]>([]); // this now is set as a placeholder until the requests come

  useEffect(() => {
    socket.emit("get-logs", {});
    socket.on("logs-response", (response) => {
      console.log("this is response from Logs", response );
      setLogs(response.reverse());
    });

    return () => {
      socket.off("logs-response");
    };
  }, []);


  return (
    <div className="max-w-screen-md mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Logs</h2>
      {logs && logs.length > 0 ? (
        <div className="grid gap-4">
          {logs.map((log, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg hover:shadow-lg transition duration-300 ease-in-out">
              <h3 className="text-lg font-semibold text-gray-800">Log ID: {log.logId}</h3>
              <p className="text-sm text-gray-600">Date: {log.date}</p>
              <p className="text-sm text-gray-600">Details: {log.details}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No logs available.</p>
      )}
    </div>
  );
}
export default ChartBox;

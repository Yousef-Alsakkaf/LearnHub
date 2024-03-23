import React, { useEffect, useState } from "react";
import socket from "@/socket";

interface User {
  type: string;
  fName: string;
  lName?: string;
}

type id = {
    id: number
}

const ViewAllStudents: React.FC<id> = ({id}) => {
  const [students, setStudents] = useState<User[]>([]);


  console.log("this is the id", id);
  useEffect(() => {
    socket.emit("get-course-roaster", { id: id });
    socket.on("get-course-roaster-response", (response: User[]) => {
      console.log("this is the response from get-users from roster", response);
      setStudents(response);
    });

    return () => {
      socket.off("get-all-users-response");
    };
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Students</h1>
      <table className="table-auto w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">User type</th>
            <th className="px-4 py-2">Full Name</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index} className="hover:bg-gray-100 transform hover:scale-105 transition duration-300 ease-in-out">
              <td className="border px-4 py-2">{student.type}</td>
              <td className="border px-4 py-2">{`${student.fName} ${student.lName || ""}`}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewAllStudents;

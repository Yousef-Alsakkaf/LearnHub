import { useState } from "react";
import Users from '../../../templates/users/Users'
interface Student {
  username: string;
  password: string;
  id: number;
  first_name: string;
  last_name: string;
  email_address: string;
  mobile_number: string;
  enrolled: number;
  user_type: string;
}

function Enrolled() {
  const [students, setStudents] = useState<Student[]>([]);


  return (
    <Users>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {students.map((student) => (
        <div key={student.id} className="bg-white shadow-md rounded-lg p-4 transition duration-300 ease-in-out transform hover:scale-105">
          <h2 className="text-xl font-bold mb-2">
            {student.first_name} {student.last_name}
          </h2>
          <p>
            <strong>Username:</strong> {student.username}
          </p>
          <p>
            <strong>Email:</strong> {student.email_address}
          </p>
          <p>
            <strong>Mobile Number:</strong> {student.mobile_number}
          </p>
          
          <p>
            <strong>Enrolled:</strong>{" "}
            {student.enrolled === 1 ? "Enrolled" : "Not Enrolled"}
          </p>

          <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-3">
            Accept
          </button>

          <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Reject
          </button>
        </div>
      ))}
    </div>
    </Users>
  );
}

export default Enrolled;

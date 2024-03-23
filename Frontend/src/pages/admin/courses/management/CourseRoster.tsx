import BookModal from "@/components/modal/ViewMonal";
import socket from "@/socket";
import React, { useEffect, useState } from "react";

type BookProps = {
  id: number;
};
interface UserData {
  fName: string;
  lName: string;
  type: string;
  UID: string;
  id: number;
}

const CourseRoster: React.FC<BookProps> = ({ id }) => {
  const [students, setStudents] = React.useState<UserData[] | null>(null);
  const [unenrolled, setunenrolled] = useState<UserData[] | null>(null);
  const [showModal, setShowModal] = useState(false);

  let [selectedStudentId, setSelectedStudentId] = useState<number | null>(null); // State to store selected student's ID

  const handleSelectChange = (e: any) => {
    setSelectedStudentId(e.target.value); 
  };
  useEffect(() => {
    socket.emit("get-course-roaster", { id: id });

    socket.on("get-course-roaster-response", (data) => {
      console.log("this is the response from the roaster", data);
      setStudents(data);
    });

    return () => {
      socket.off("get-course-roaster-response");
      socket.off("get-course-roaster");
    };
  }, []);
  const unenrolledStudents = () => {
    socket.emit("get-unenrolled-students", {course_id: id});
    socket.on("get-unenrolled-students-response", (data) => {
      setunenrolled(data);
      console.log("This ois the unenrolled students", data);
    });
  };

  const handleEnroll = ( student_id: number | null) => {
    console.log("this is the student id", student_id);
    socket.emit("add-student-to-course", {course_id: id, student_id: student_id} );

    socket.on("add-student-to-course-response", (data) => {
      console.log("this is the response from the roaster", data);
    })
  }
  

  const exportToCSV = () => {
    if (!students) return;

    const csvContent =
      "data:text/csv;charset=utf-8," +
      students
        .map((user) => {
          return `${user.fName},${user.lName},${user.type}`;
        })
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "course_roster.csv");
    document.body.appendChild(link);
    link.click();
  };
  return (
    <div className="flex justify-center">
      <div className="w-screen">
        <div className="mx-auto mt-8 max-w-screen-lg">
          <div className="sm:flex sm:items-center sm:justify-between flex-col sm:flex-row">
            <p className="flex-1 text-base font-bold text-gray-900">Roster</p>

            <div className="mt-4 sm:mt-0">
              <div className="flex items-center justify-start sm:justify-end">
                <div className="flex items-center">
                  <label
                    htmlFor=""
                    className="mr-2 flex-shrink-0 text-sm font-medium text-gray-900"
                  ></label>
                </div>

                <button
                  type="button"
                  className="inline-flex cursor-pointer items-center rounded-lg border border-gray-400 bg-white py-2 px-3 text-center text-sm font-medium text-gray-800 shadow hover:bg-gray-100 focus:shadow mr-5"
                  onClick={() => {
                    setShowModal(true);
                    unenrolledStudents();
                  }}
                >
                  <svg
                    className="mr-1 h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Enroll student
                </button>

                <button
                  type="button"
                  className="inline-flex cursor-pointer items-center rounded-lg border border-gray-400 bg-white py-2 px-3 text-center text-sm font-medium text-gray-800 shadow hover:bg-gray-100 focus:shadow"
                  onClick={exportToCSV}
                >
                  <svg
                    className="mr-1 h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      className=""
                    ></path>
                  </svg>
                  Export to CSV
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 overflow-hidden rounded-xl border shadow">
            <table className="min-w-full border-separate border-spacing-y-2 border-spacing-x-2">
              <thead className="hidden border-b lg:table-header-group">
                <tr className="">
                  <td
                    width="50%"
                    className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6"
                  >
                    username
                  </td>

                  <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                    year
                  </td>

                  <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                    usertype
                  </td>

                  <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                    Status
                  </td>
                </tr>
              </thead>

              <tbody className="lg:border-gray-300">
                {students &&
                  students.length > 0 &&
                  students.map((user, index) => {
                    const randomYear = Math.floor(Math.random() * 4) + 1;

                    return (
                      <tr key={index} className="">
                        <td
                          width="50%"
                          className="whitespace-no-wrap py-4 text-sm font-bold text-gray-900 sm:px-6"
                        >
                          {user.fName} {user.lName}
                          <div className="mt-1 lg:hidden">
                            <p className="font-normal text-gray-500">
                              {user.type === "instructor" ? "" : "year"}{" "}
                              {user.type === "instructor"
                                ? "already graduate"
                                : randomYear}
                            </p>
                          </div>
                        </td>

                        <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                          {user.type === "instructor" ? "" : "year"}{" "}
                          {user.type === "instructor"
                            ? "already graduate"
                            : randomYear}
                        </td>

                        <td className="whitespace-no-wrap py-4 px-6 text-right text-sm text-gray-600 lg:text-left">
                          {user.type}
                          <div className="flex mt-1 ml-auto w-fit items-center rounded-full bg-blue-600 py-2 px-3 text-left text-xs font-medium text-white lg:hidden">
                            {index % 2 === 0 ? "active" : "inactive"}
                          </div>
                        </td>

                        <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                          <div className="inline-flex items-center rounded-full bg-blue-600 py-2 px-3 text-xs text-white">
                            {index % 2 === 0 ? "active" : "inactive"}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div>
      {showModal && (
        <div className="fixed inset-0 overflow-y-auto z-50 flex justify-center items-center">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 bg-white p-6 rounded-lg shadow-xl">
            <h2 className="text-2xl font-bold mb-4">Enroll student</h2>
            <div className="relative">
              <select
                className="block w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400 max-h-300 overflow-y-auto"
                // onChange={handleSelectChange} 
                value={selectedStudentId?.toString()} 
              >
                <option value="">Select a student</option>
                {unenrolled &&
                  unenrolled.length > 0 &&
                  unenrolled.map((student, index) => (
                    <option key={index} value={student.id} onClick={() => setSelectedStudentId(student.id)}>
                      {`${student.fName} ${student.lName}`}
                      {"-"}{selectedStudentId = student.id}
                    </option>
                  ))}
              </select>
            </div>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-sm font-semibold text-white bg-gray-600 rounded-md hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-500"
              >
                Close
              </button>
              <button
                onClick={() => handleEnroll((selectedStudentId))}
                className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500"
              >
                Enroll
              </button>
            </div>
          </div>
        </div>
      )}


      </div>
    </div>
  );
};

export default CourseRoster;

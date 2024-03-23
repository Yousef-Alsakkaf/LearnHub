import socket from "@/socket";
import React, { useEffect } from "react";

type BookProps = {
  id: number;
};
interface UserData {
  fName: string;
  lName: string;
  type: string;
}
const CourseRoster:React.FC<BookProps> = ({id}) => {
  const [students, setStudents] = React.useState<UserData[] | null>(null);
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

  const exportToCSV = () => {
    if (!students) return;

    const csvContent = "data:text/csv;charset=utf-8," + students.map((user) => {
      return `${user.fName},${user.lName},${user.type}`;
    }).join("\n");

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
                >
                
                </label>
                
              </div>

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
                        {user.type === "instructor" ? "" : "year"} {user.type === "instructor" ? "already graduate" :  randomYear}
                          </p>
                        </div>
                      </td>

                      <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                       {user.type === "instructor" ? "" : "year"} {user.type === "instructor" ? "already graduate" :  randomYear}
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
    </div>
  );
};

export default CourseRoster;

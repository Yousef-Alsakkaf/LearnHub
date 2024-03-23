import { useState, useEffect } from "react";
import Users from "../../../templates/users/Users";
import UsersData from "../../../temp/ViewAllUsers";
import socket from "../../../socket";

interface UserData {
  UID: string;
  accessToken: string;
  active: number;
  email: string;
  fName: string;
  id: number;
  lName: string;
  password: string;
  type: string;
  username: string;
  image: string;
}

function AllUsers() {
  const [students, setStudents] = useState<UserData[]>();
  const [filteredData, setFilteredData] = useState<UserData[]>();
  const [filterType, setFilterType] = useState<string>("All");
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    socket.emit("get-all-users", {});

    socket.on("get-all-users-response", (response: UserData[]) => {
      console.log("This is the response from the get-all-users command", response);

      setStudents(response);
      setFilteredData(response);
    });

    return () => {
      socket.off("get-all-users-response");
    };
  }, []);

  return (
    <Users name="viewAllUsers">
      <div className="mx-auto max-w-screen-md py-6 leading-6">
        <form className="flex flex-col sm:flex-row sm:items-center sm:p-0">
          <div className="flex flex-grow">
            <label className="focus-within:ring h-14 rounded-md bg-gray-200 px-2 ring-emerald-200" htmlFor="category">
              <select className="bg-transparent px-6 py-4 outline-none" name="category" id="category" onChange={(e) => setFilterType(e.target.value)}>
                <option value="All">All</option>
                <option value="student">student</option>
                <option value="instructor">instructor</option>
                <option value="admin">admin</option>
              </select>
            </label>
            <input
              type="name"
              name="search"
              className="ml-1 h-14 flex-grow cursor-text rounded-md border py-4 pl-6 outline-none ring-emerald-200 sm:border-0 sm:pr-40 sm:pl-12 focus:ring"
              placeholder="Enter name of user..."
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button
            className="mt-2 inline-flex h-14 w-full sm:w-auto items-center justify-center rounded-md bg-emerald-500 px-10 text-center align-middle text-base font-medium normal-case text-white outline-none ring-emerald-200 ring-offset-1 focus:ring"
            onClick={(e) => {
              e.preventDefault();

              setFilteredData(() => {
                if (filterType === "All") {
                  return students;
                }
                return students?.filter((student) => {
                  return (
                    student.type.toLowerCase().includes(filterType.toLowerCase()) &&
                    student.fName.toLowerCase().includes(search.toLowerCase())
                  );
                });
              });
            }}
          >
            Search
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredData &&
          filteredData.map((student) => (
            <div key={student.id} className="max-w-sm">
              <div className="group rounded-lg border bg-white p-4 shadow-lg transition-transform transform hover:-translate-y-1 hover:shadow-xl">
                <div className="relative mx-auto w-36 h-36 rounded-full overflow-hidden">
                  <img className="object-cover h-full w-full z-0" src={student.image} alt="" />
                </div>

                <h1 className="my-1 text-center text-xl font-bold leading-8 text-gray-900">
                  {student.fName} {student.lName}
                </h1>
                <h3 className="font-lg text-semibold text-center leading-6 text-gray-600">{student.type}</h3>

                <ul className="mt-3 divide-y rounded bg-gray-100 py-2 px-3 text-gray-600 shadow-sm group-hover:bg-gray-200">
                  <li className="flex items-center py-1 text-sm">
                    <span>Status:</span>
                    <span className="ml-auto">
                      <span className={`rounded-full py-1 px-2 text-xs font-medium text-white ${student.active === 1 ? "bg-green-500" : "bg-orange-400"}`}>
                        {student.active === 1 ? "Active" : "Not Active"}
                      </span>
                    </span>
                  </li>
                  <li className="flex items-center py-1 text-sm">
                    <span>Username:</span>
                    <span className="ml-auto">{student.username}</span>
                  </li>
                  <li className="flex items-center py-1 text-sm">
                    <span>ID:</span>
                    <span className="ml-auto">{student.UID}</span>
                  </li>
                  <li className="flex items-center py-1 text-sm">
                    <span>Email:</span>
                    <span className="ml-auto">{student.email}</span>
                  </li>
                </ul>
              </div>
            </div>
          ))}
      </div>
    </Users>
  );
}

export default AllUsers;

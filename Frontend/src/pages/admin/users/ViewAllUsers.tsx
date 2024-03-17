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
  const [students, setStudents] = useState<UserData[]>(UsersData);

  useEffect(()=>{
    socket.emit("get-all-users", {});
    socket.on("get-all-users-response", (response: UserData[]) => {
      console.log("This is the response from the get-all-users command", response);

      setStudents(prevStudents => [...prevStudents, ...response]);
    })
  }, [])

  return (
    <Users>
      <div className="mx-auto max-w-screen-md py-6 leading-6">
        <form className="flex flex-col sm:flex-row sm:items-center sm:p-0">
          <div className="flex flex-grow">
            <label
              className="focus-within:ring h-14 rounded-md bg-gray-200 px-2 ring-emerald-200"
              htmlFor="category"
            >
              <select
                className="bg-transparent px-6 py-4 outline-none"
                name="category"
                id="category"
              >
                <option value="All">All</option>
              </select>
            </label>
            <input
              type="name"
              name="search"
              className="ml-1 h-14 flex-grow cursor-text rounded-md border py-4 pl-6 outline-none ring-emerald-200 sm:border-0 sm:pr-40 sm:pl-12 focus:ring"
              placeholder="Enter anything"
            />
          </div>
          <button
            type="submit"
            className="mt-2 inline-flex h-14 w-full sm:w-auto items-center justify-center rounded-md bg-emerald-500 px-10 text-center align-middle text-base font-medium normal-case text-white outline-none ring-emerald-200 ring-offset-1 focus:ring"
          >
            Search
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {students.map((student) => (
          <div key={student.id} className="max-w-sm">
            <div className="group rounded-lg border bg-white p-4 shadow-lg transition-transform transform hover:-translate-y-1 hover:shadow-xl">
              <div className="relative mx-auto w-36 h-36 rounded-full overflow-hidden">
                <span className="absolute right-0 m-3 h-3 w-3 rounded-full bg-green-500 ring-2 ring-green-300 ring-offset-2 z-1000"></span>
                <img
                  className="object-cover h-full w-full z-0"
                  src={student.image}
                  alt=""
                />
              </div>

              <h1 className="my-1 text-center text-xl font-bold leading-8 text-gray-900">
                {student.fName} {student.lName}
              </h1>
              <h3 className="font-lg text-semibold text-center leading-6 text-gray-600">
                {student.type}
              </h3>

              <ul className="mt-3 divide-y rounded bg-gray-100 py-2 px-3 text-gray-600 shadow-sm group-hover:bg-gray-200">
                <li className="flex items-center py-1 text-sm">
                  <span>Status:</span>
                  <span className="ml-auto">
                    <span
                      className={`rounded-full py-1 px-2 text-xs font-medium text-white ${
                        student.active === 1 ? "bg-green-500" : "bg-orange-400"
                      }`}
                    >
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

import React, { useEffect, useState } from "react";
import ViewModal from "../../components/modal/ViewMonal";
import socket from "../../socket";

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
interface Props {
    isVisible: boolean;
    onClose: () => void;
  }

function Roster({ isVisible, onClose }: Props) {
  const [users, setUsers] = useState<UserData[]>();

  useEffect(() => {
    socket.emit("get-course-roaster", {id : 1});
    socket.on("get-course-roaster-response", (response) => {
      console.log(
        "Khra response",
        response
      );

      setUsers(response);
    });
    return () => {
        socket.off("get-course-roaster-response");
      };
  }, []);
  return (
    <ViewModal onClose={onClose} isVisible={isVisible}>
      <div className="mx-auto max-w-screen-lg px-4 py-8 sm:px-8">
        <div className="flex items-center justify-between pb-6">
          <div>
            <h2 className="font-semibold text-gray-700">User info</h2>
          </div>
          <div className="flex items-center justify-between">
            <div className="ml-10 space-x-8 lg:ml-40">
              <button className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white focus:outline-none focus:ring hover:bg-blue-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75"
                  />
                </svg>
                CSV
              </button>
            </div>
          </div>
        </div>
        <div className="overflow-y-hidden rounded-lg border">
          <div className="overflow-x-auto">
            <table className="w-full h-36">
              <thead>
                <tr className="bg-blue-600 text-left text-xs font-semibold uppercase tracking-widest text-white">
                  <th className="px-5 py-3">ID</th>
                  <th className="px-5 py-3">Full Name</th>
                  <th className="px-5 py-3">User Role</th>

                  <th className="px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="text-gray-500">
                {users &&
                  users.map((user) => (
                    <tr key={user.UID}>
                      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <p className="whitespace-no-wrap">{user.UID}</p>
                      </td>
                      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img
                              className="h-full w-full rounded-full"
                              src={user.image}
                              alt=""
                            />
                          </div>
                          <div className="ml-3">
                            <p className="whitespace-no-wrap">{`${user.fName} ${user.lName}`}</p>
                          </div>
                        </div>
                      </td>
                      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <p className="whitespace-no-wrap">{user.type}</p>
                      </td>
                      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <span
                          className={`rounded-full ${
                            user.active ? "bg-green-200" : "bg-red-200"
                          } px-3 py-1 text-xs font-semibold text-green-900`}
                        >
                          {user.active ? "Active" : "no active"}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col items-center border-t bg-white px-5 py-5 sm:flex-row sm:justify-between"></div>
        </div>
      </div>
    </ViewModal>
  );
}

export default Roster;

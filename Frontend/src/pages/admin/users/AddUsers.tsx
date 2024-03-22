import React, { useState } from "react";
import Users from "../../../templates/users/Users";
import socket from "../../../socket";

function AddUsers() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [userType, setUserType] = useState("student");

  const submitAddUser = async (e: any) => {
    e.preventDefault();
    const addUser = {
      username: username,
      password: password,
      "fName": firstName,
      "lName": lastName,
      "email": emailAddress,
      "type": userType,
    };

    console.log("add-user", addUser);
    socket.emit("add-user", addUser);
  };

  return (
    <Users name="add-users" data-name="add-students">
      <div className="pt-4 div" data-name="add-book-admin">
        <h1 className="py-2 text-2xl font-semibold">Add users settings</h1>
      </div>
      <div className="p-6" style={{ maxHeight: "500px", overflowY: "auto" }}>
        <h3 className="text-xl font-semibold text-gray-900 mb-5">Add a new user</h3>
        <form>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-bold mb-2">
              username
            </label>
            <input
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              id="username"
              name="username"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
              password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="firstName" className="block text-gray-700 font-bold mb-2">
              First Name
            </label>
            <input
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              id="firstName"
              name="firstName"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="lastName" className="block text-gray-700 font-bold mb-2">
              Last Name
            </label>
            <input
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              id="lastName"
              name="lastName"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="emailAddress" className="block text-gray-700 font-bold mb-2">
              Email address
            </label>
            <input
              type="email"
              id="emailAddress"
              name="emailAddress"
              onChange={(e) => setEmailAddress(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="userType" className="block text-gray-700 font-bold mb-2">
              User Type
            </label>
            <select
              id="userType"
              onChange={(e) => setUserType(e.target.value)}
              name="userType"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select User Type</option>
              <option value="student">Student</option>
              <option value="librarian">Librarian</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="mb-4 button">
            <button onClick={submitAddUser} className="hover:bg-blue-700 bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline test">
              Add user
            </button>
          </div>
        </form>
      </div>
    </Users>
  );
}

export default AddUsers;

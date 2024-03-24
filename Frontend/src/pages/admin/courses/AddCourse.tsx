import React, { useState } from "react";
import Courses from "../../../templates/courses/Courses";
import socket from "../../../socket";
type course = {
  title: string;
  course_code: string;
  academic_year: string;
  image: string;
  description: string;
};

function AddCourse() {
  const [formData, setFormData] = useState({
    title: "",
    course_code: "",
    academic_year: "",
    image: "",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const title = (event.currentTarget.elements.namedItem("title") as HTMLInputElement)?.value;
    const course_code = (event.currentTarget.elements.namedItem("course_code") as HTMLInputElement)?.value;
    const academic_year = (event.currentTarget.elements.namedItem("academic_year") as HTMLInputElement)?.value;
    const description = (event.currentTarget.elements.namedItem("description") as HTMLInputElement)?.value;
    const image = (event.currentTarget.elements.namedItem("image") as HTMLInputElement)?.value;

    if (!title || !course_code || !academic_year || !image || !description) {
      console.log("fields' values are missing");
      return;
    }

    console.log("this is the form data", formData);
    socket.emit("add-courses", formData);

    socket.once("add-courses-response", (response) => {
      console.log("this is the response from add-courses", response);
    });
  };

  return (
    <Courses name="addCourse">
      <div className="p-6" style={{ maxHeight: "700px", overflowY: "auto" }}>
        <h3 className="text-xl font-semibold text-gray-900 mb-5">Add a new course</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleChange}
            />
          </div>
          {/* course_code */}

          <div className="mb-4">
            <label htmlFor="course_code" className="block text-gray-700 font-bold mb-2">
              course_code
            </label>
            <input
              type="text"
              id="course_code"
              name="course_code"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleChange}
            />
          </div>

          {/* academic_year */}
          <div className="mb-4">
            <label htmlFor="academic_year" className="block text-gray-700 font-bold mb-2">
              academic_year
            </label>
            <input
              type="text"
              id="academic_year"
              name="academic_year"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleChange}
            />
          </div>
          {/* image */}

          <div className="mb-4">
            <label htmlFor="image" className="block text-gray-700 font-bold mb-2">
              Image
            </label>
            <input
              type="text"
              id="image"
              name="image"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleChange}
            />
          </div>

          {/* isbn */}
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
              description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleChange}
            />
          </div>

          <div className="mb-4 button">
            <button type="submit" className="hover:bg-blue-700 bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline test">
              Add course
            </button>
          </div>
        </form>
      </div>
    </Courses>
  );
}

export default AddCourse;

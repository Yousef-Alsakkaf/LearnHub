import React, { useEffect, useState } from "react";
import Courses from "../../../templates/courses/Courses";
import socket from "../../../socket";
import { coursesInfo } from "../../../temp/ViewAllCourses";

interface Course {
  title: string;
  description: string;
  image: string;
}

function ViewAllCourses() {
  const [courses, setCourses] = useState<Course []>(coursesInfo);

  useEffect(() => {
    socket.emit("get-all-courses", {});
    socket.on("get-all-courses-response", (response: Course[]) => {
      console.log(
        "This is the response from the get-all-courses command",
        response
      );
      setCourses(response); 
    });
  }, []);
  

  return (
    <Courses>
      <div className="mx-auto my-10 grid max-w-screen-xl gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course, index) => (
          <div key={index} className="group cursor mx-4 overflow-hidden rounded-2xl bg-white shadow-xl duration-200 hover:-translate-y-4">
            <div className="flex h-48 flex-col justify-between overflow-hidden"> 
              <img
                src={course.image}
                className="group-hover:scale-110 h-full w-full object-cover duration-200"
                alt={course.title}
              />
            </div>
            <div className="flex-1 overflow-hidden bg-white px-6 py-8">
              <h5 className="group-hover:text-indigo-600 mb-4 text-xl font-bold">
                {course.title}
              </h5>
              <p className="mb-8 text-gray-600">
                {course.description}
              </p>
              <div className="flex justify-between">
                <a
                  href="#"
                  className="group text-lg font-bold focus:text-indigo-600 hover:text-indigo-600"
                >
                  <span className="underline">View course</span>
                </a>
                <div className="max-w-full flex-none lg:px-4"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Courses>
  );
}

export default ViewAllCourses;

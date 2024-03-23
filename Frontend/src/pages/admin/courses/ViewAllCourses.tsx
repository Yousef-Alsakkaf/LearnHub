import React, { useEffect, useState } from "react";
import Courses from "../../../templates/courses/Courses";
import socket from "../../../socket";
import { coursesInfo } from "../../../temp/ViewAllCourses";
import CoursesInfo from "../../../templates/courses/CoursesInfo";
import Roster from "../../../templates/courses/Roster";
import first from "../../../assets/courses/first.jpg";
import second from "../../../assets/courses/second.jpg";
import third from "../../../assets/courses/third.jpg";
import fourth from "../../../assets/courses/fourth.jpg";
import CourseDetails from "../../../templates/courses/CourseDetails";
import { useNavigate } from "react-router-dom";

interface Course {
  title: string;
  description: string;
  image: string;
  academic_year: string;
  course_code: string;
  id: string;
  no_of_enrolled: string;
}

function ViewAllCourses() {
  const [courses, setCourses] = useState<Course[] | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showRoster, setShowRoster] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    socket.emit("get-all-courses", {});
    socket.on("get-all-courses-response", (response: Course[]) => {
      console.log(
        "This is the response from the get-all-courses command",
        response
      );
      setCourses(response); 
    });

    return () => {
      socket.off("get-all-courses-response");
    };
  }, []);


  const images = [first, second, third, fourth];

  const handleView = (course: Course) => {
    // setSelectedCourse(course);
    // setShowModal(true);

    navigate("/admin/courseManagement");
  };

  return (
    <>
      <Courses name="courses">
        <div className="mx-auto my-10 grid max-w-screen-xl gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {courses &&
            courses.length > 0 &&
            courses.map((course, index) => (
              <div key={index} className="group cursor mx-4 overflow-hidden rounded-2xl bg-white shadow-xl duration-200 hover:-translate-y-4">
                <div className="flex h-48 flex-col justify-between overflow-hidden"> 
                  <img
                    src={images[index % images.length]} 
                    className="group-hover:scale-110 h-full w-full object-cover duration-200 cursor-pointer"
                    alt={course.title}
                    onClick={() => handleView(course)}
                  />
                </div>
                <div className="flex-1 overflow-hidden bg-white px-6 py-8">
                  <h5 className="group-hover:text-indigo-600 mb-4 text-xl font-bold cursor-pointer" onClick={() => handleView(course)}>
                    {course.title}
                  </h5>
                  <p className="mb-8 text-gray-600">
                    {course.description}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </Courses>
      <CoursesInfo courses={selectedCourse} onClose={() => setShowModal(false)} isVisible={showModal}/>
      {/* <CourseDetails onClose={() => setShowModal(false)} isVisible={showModal}></CourseDetails> */}
    </>
  );
}

export default ViewAllCourses;

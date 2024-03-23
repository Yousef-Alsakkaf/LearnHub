import React, { useEffect, useState } from "react";
import ViewModal from "../../components/modal/ViewMonal";
import socket from "../../socket";
import Roster from "../../templates/courses/Roster";
import CourseDetails from "./CourseDetails";

interface Course {
  title: string;
  description: string;
  image: string;
  academic_year: string;
  course_code: string;
  id: string;
  no_of_enrolled: string;
}
interface Props {
  courses: Course | null;
  isVisible: boolean;
  onClose: () => void;
}
function CoursesInfo({ courses, isVisible, onClose }: Props) {
  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [roster, setRoster] = useState(false);

  const [details, setDetails] = useState(false);
  console.log("This is the course", courses);
  let [updateData, setUpdateData] = useState({
    title: courses?.title,
    description: courses?.description,
    academic_year: courses?.academic_year,
    course_code: courses?.course_code,
    id: courses?.id,
    image: courses?.image,
  });


  const handleUpdatingData = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setUpdateData({
      title: courses?.title,
    description: courses?.description,
    academic_year: courses?.academic_year,
    course_code: courses?.course_code,
    id: courses?.id,
    image: courses?.image,
    })
    console.log("title", updateData.title);
    console.log("description", updateData.description);
    console.log("academic_year", updateData.academic_year);
    console.log("course_code", updateData.course_code);
    console.log("fields' values are missing");
    console.log("This is the data to be updated", updateData);
    if(updateData.academic_year && updateData.id) {
      updateData.academic_year = updateData.academic_year?.toString();
     
    }
    
    socket.emit("edit-course", updateData);

    socket.once("edit-course-response", (response) => {
      console.log(
        "This is the response from the edit-course command",
        response
      );

      setShowModal(false);
    });
  };

  const handleUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateData({
      ...updateData,
      [event.target.name]: event.target.value,
    });
  }

  return (
    <>
 

      <ViewModal isVisible={isVisible} onClose={onClose}>
        {courses && (
          <div
            className="p-6"
            style={{
              maxHeight: "500px",
              overflowY: "auto",
              display: details ? "none" : "block" 
            }}
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-5">
              Course Info
            </h3>

            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-gray-700 font-bold mb-2"
              >
                Title
              </label>
              <p>{courses.title}</p>
            </div>

            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-gray-700 font-bold mb-2"
              >
                description
              </label>
              <p>{courses.description}</p>
            </div>

            <div className="mb-4">
              <label
                htmlFor="barcode"
                className="block text-gray-700 font-bold mb-2"
              >
                Academic year
              </label>
              <p>{courses.academic_year}</p>
            </div>

            <div className="mb-4">
              <label
                htmlFor="language"
                className="block text-gray-700 font-bold mb-2"
              >
                course_id
              </label>
              <p>{courses.course_code}</p>
            </div>

            <div className="mb-4">
              <label
                htmlFor="year_of_prod"
                className="block text-gray-700 font-bold mb-2"
              >
                Number of enrolled students
              </label>
              <p>{courses.no_of_enrolled}</p>
            </div>

            <div className="mb-4 button">
              <button
                type="submit"
                className="hover:bg-green-700 bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline test mr-5"
                onClick={() => {
                  setShowModal(true);
                  setSelectedCourse(courses);
                }}
              >
                Update
              </button>

              <button
                type="submit"
                className="hover:bg-green-700 bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline test mr-5"
                onClick={() => setRoster(true)}
              >
                Roster
              </button>

              <button
                type="submit"
                className="hover:bg-green-700 bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline test"
                onClick={() => setDetails(true)}
              >
                Show details
              </button>
            </div>
          </div>
        )}
      </ViewModal>

   

      <ViewModal onClose={() => setShowModal(false)} isVisible={showModal}>
        <div className="p-6" style={{ maxHeight: "500px", overflowY: "auto" ,display: details ? "none" : "block" }}>
          <h3 className="text-xl font-semibold text-gray-900 mb-5">
            Update a course
          </h3>
          <form onSubmit={handleUpdatingData}>
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-gray-700 font-bold mb-2"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                defaultValue={selectedCourse ? selectedCourse.title : ""}
                onChange={handleUpdate}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="author"
                className="block text-gray-700 font-bold mb-2"
              >
                description
              </label>
              <input
                type="text"
                id="description"
                name="description"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={handleUpdate}
                defaultValue={selectedCourse?.description}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="academic_year"
                className="block text-gray-700 font-bold mb-2"
              >
                academic_year
              </label>
              <input
                type="text"
                id="academic_year"
                name="academic_year"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={handleUpdate}
                defaultValue={selectedCourse?.academic_year}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="course_code"
                className="block text-gray-700 font-bold mb-2"
              >
                course_code
              </label>
              <input
                type="text"
                id="course_code"
                name="course_code"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={handleUpdate}
                defaultValue={selectedCourse?.course_code}
              />
            </div>

            <div className="mb-4">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </ViewModal>
     
      <Roster isVisible={roster} onClose={() => setRoster(false)}></Roster>
      <CourseDetails courses={selectedCourse} isVisible={true} onClose={() => setDetails(false)}/>
    </>
  );
}

export default CoursesInfo;

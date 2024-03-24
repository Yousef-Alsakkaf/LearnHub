import BookModal from "@/components/modal/ViewMonal";
import socket from "@/socket";
import React, { useEffect } from "react";
import { BookCheck } from "lucide-react";

type props = {
  isVisible: boolean;
  onClose: () => void;
  id: number | null;

  course_id: number | null;
};

interface assignment {
  name: string;
  weight: number;
  student_id: number;
  grade: number;
}

const AssignmentPopUp: React.FC<props> = ({ isVisible, onClose, id, course_id }) => {
  const [assignments, setAssignments] = React.useState<assignment[] | null>(null);

  const [grade, setGrade] = React.useState<number | null>(null);
  const [studentId, setStudentId] = React.useState<number | null>(null);

  const handleGrade = () => {
    console.log({
      material_id: id,
      course_id: course_id,
      mark: grade,
      student_id: studentId,
    });

    socket.emit("grade-material", {
      material_id: id,
      course_id: course_id,
      mark: grade,
      student_id: studentId,
    });

    socket.on("grade-material-response", (response) => {});
  };

  useEffect(() => {
    socket.emit("get-submissions", { material_id: id });

    socket.on("get-submissions-response", (response) => {
      setAssignments(response);
    });

    return () => {
      socket.off("get-submissions-response");
    };
  }, [id]);

  return (
    <BookModal onClose={onClose} isVisible={isVisible}>
      <div className="mx-auto max-w-screen-lg px-4 py-8 sm:px-8">
        <div className="overflow-y-hidden rounded-lg border">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-blue-600 text-left text-xs font-semibold uppercase tracking-widest text-white">
                  <th className="px-5 py-3">ID</th>
                  <th className="px-5 py-3">Full Name</th>
                  <th className="px-5 py-3">Grade</th>
                  <th className="px-5 py-3">Save</th>
                </tr>
              </thead>
              <tbody className="text-gray-500">
                {assignments ?
                  assignments.map((assignment) => (
                    <tr key={assignment.student_id}>
                      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <p className="whitespace-no-wrap">{assignment.student_id}</p>
                      </td>
                      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <div className="flex items-center">
                          <div className="ml-3">
                            <p className="whitespace-no-wrap">{assignment.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <div style={{ display: "flex" }}>
                          <input
                            type="text"
                            maxLength={3}
                            className="whitespace-no-wrap mr-[-150px] px-4 border-2 border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
                            defaultValue={assignment.grade}
                            style={{ width: "calc(100% - 1rem)" }}
                            onChange={(e: any) => {
                              setGrade(parseInt(e?.target?.value));
                              setStudentId(assignment.student_id);
                            }}
                          />
                        </div>
                      </td>
                      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <BookCheck size={20} className="ml-2 cursor-pointer transition duration-500 ease-in-out transform hover:text-blue-500" onClick={handleGrade} />
                      </td>
                    </tr>
                  )) : <tr></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </BookModal>
  );
};

export default AssignmentPopUp;

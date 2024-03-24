import BookModal from "@/components/modal/ViewMonal";
import socket from "@/socket";
import React, { useEffect } from "react";
type props = {
  isVisible: boolean;
  onClose: () => void;
  id: number | null;
};

const AssignmentPopUp: React.FC<props> = ({ isVisible, onClose, id }) => {
  
    console.log("This is the id", typeof id);
    console.log("This is the id", id);
    socket.emit("get-submissions", { material_id: id });
    socket.on("get-submissions-response", (response) => {
      console.log("This is the response from the get assignment", response);
    });
    console.log("ended")
 
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
                </tr>
              </thead>
              <tbody className="text-gray-500">
                <tr>
                  <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                    <p className="whitespace-no-wrap">0</p>
                  </td>
                  <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                    <div className="flex items-center">
                      <div className="ml-3">
                        <p className="whitespace-no-wrap">Yousef alsakkaf</p>
                      </div>
                    </div>
                  </td>
                  <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                    <p className="whitespace-no-wrap">0</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </BookModal>
  );
};

export default AssignmentPopUp;

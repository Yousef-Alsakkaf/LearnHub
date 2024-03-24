import BookModal from "@/components/modal/ViewMonal";
import socket from "@/socket";
import React, { useEffect } from "react";
type props = {
  isVisible: boolean;
  onClose: () => void;

};



const AssignmentPopUp: React.FC<props> = ({
  isVisible,
  onClose,

}) => {
  

  return (
    <BookModal onClose={onClose} isVisible={isVisible}>
      <div className="mx-2 my-10 rounded-xl border bg-white px-4 shadow-md sm:mx-auto sm:max-w-xl sm:px-8">
        <div className="mb-2 flex flex-col gap-y-6 border-b py-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center">
            
            <div className="ml-4 w-56">
              <p className="text-slate-800 text-xl font-extrabold">
                Name of assignment
              </p>
            </div>
          </div>
          
        </div>
        <div className="mb-2 flex justify-between border-b py-8 text-sm sm:text-base">
          Description
        </div>
        <div className="mb-2 flex justify-between border-b py-8 text-sm sm:text-base">
          
        </div>
        <div className="flex justify-between py-8">
          <button className="text-slate-500 hover:bg-slate-100 rounded-lg border-2 px-4 py-2 font-medium focus:outline-none focus:ring">
            Message
          </button>
          <button className="rounded-lg border-2 border-transparent bg-blue-600 px-4 py-2 font-medium text-white focus:outline-none focus:ring hover:bg-blue-700">
            Follow
          </button>
        </div>
      </div>
    </BookModal>
  );
};

export default AssignmentPopUp;

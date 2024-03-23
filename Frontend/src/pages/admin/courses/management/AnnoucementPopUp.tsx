import BookModal from "@/components/modal/ViewMonal";
import React from "react";

type Announcement = {
  sender: string;
  message: string;
  email: string;
  userType: string;
  username: string;
  attendance: number;
  courses: number;
};

type BookModalProps = {
  isVisible: boolean;
  onClose: () => void;
  selectedAnnouncement: Announcement | null;
};

const AnnoucementPopUp: React.FC<BookModalProps> = ({
  isVisible,
  onClose,
  selectedAnnouncement,
}) => {
  return (
    <BookModal onClose={onClose} isVisible={isVisible}>
      {selectedAnnouncement && (
        <div className="mx-2 my-10 rounded-xl border bg-white px-4 shadow-md sm:mx-auto sm:max-w-xl sm:px-8">
          <div className="mb-2 flex flex-col gap-y-6 border-b py-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center">
              <img
                className="h-14 w-14 rounded-full object-cover"
                src="https://m.media-amazon.com/images/I/81ZAC67DE1S._AC_UF1000,1000_QL80_.jpg"
                alt="Avatar"
              />
              <div className="ml-4 w-56">
                <p className="text-slate-800 text-xl font-extrabold">
                  {selectedAnnouncement.username}
                </p>
                <p className="text-slate-500">
                  {selectedAnnouncement.userType}
                </p>
              </div>
            </div>
            
          </div>
          <div className="mb-2 flex justify-between border-b py-8 text-sm sm:text-base">
            <div className="flex flex-col items-center">
              <p className="text-slate-700 mb-1 text-xl font-extrabold">
                {selectedAnnouncement.attendance}
              </p>
              <p className="text-slate-500 text-sm font-medium">Attendance</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-slate-700 mb-1 text-xl font-extrabold">
                {selectedAnnouncement.courses}
              </p>
              <p className="text-slate-500 text-sm font-medium">Courses</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-slate-700 mb-1 text-xl font-extrabold">25</p>
              <p className="text-slate-500 text-sm font-medium">year</p>
            </div>
          </div>
          <div className="flex justify-between py-8">
            {selectedAnnouncement.message}
          </div>
        </div>
      )}
    </BookModal>
  );
};

export default AnnoucementPopUp;

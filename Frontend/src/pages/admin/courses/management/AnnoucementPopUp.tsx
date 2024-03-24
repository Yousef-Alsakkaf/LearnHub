import BookModal from "@/components/modal/ViewMonal";
import React from "react";
import AssignmentPopUp from "./AssignmentPopUp";

type Announcement = {
  image: string;
  sender_id: number;
  subject: string;
  message: string;
  name: string;
  date?: string;
};

type BookModalProps = {
  isVisible: boolean;
  onClose: () => void;
  selectedAnnouncement: Announcement | null;
};

const AnnoucementPopUp: React.FC<BookModalProps> = ({ isVisible, onClose, selectedAnnouncement }) => {
  return (
    <BookModal onClose={onClose} isVisible={isVisible}>
      {selectedAnnouncement && (
        <div className="mx-2 my-10 rounded-xl border bg-white px-4 shadow-md sm:mx-auto sm:max-w-xl sm:px-8">
          <div className="mb-2 flex flex-col gap-y-6 border-b py-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center">
              <img className="h-14 w-14 rounded-full object-cover" src={selectedAnnouncement.image} alt="Avatar" />
              <div className="ml-4 w-56">
                <p className="text-slate-800 text-xl font-extrabold">{selectedAnnouncement.name}</p>
                <p className="text-slate-500">{selectedAnnouncement.subject}</p>
                <p className="text-slate-500">{new Date(selectedAnnouncement?.date!).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
          <div className="flex justify-between py-8">{selectedAnnouncement.message}</div>
        </div>
      )}

     
    </BookModal>
  );
};

export default AnnoucementPopUp;

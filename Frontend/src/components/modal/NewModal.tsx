import React from "react";
interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}
const NewModal: React.FC<ModalProps> = ({ isVisible, onClose, children }: ModalProps) => {
  if (!isVisible) return null;

  const handleClose = (e: any) => {
    if (e.target.id === "wrapper") onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center lg:ml-[200px]"
      id="wrapper"
      onClick={handleClose}
    >
      <div className="bg-white p-4 rounded-lg relative" style={{ width: '70%', height: '80%' }}>
        <button
          className="text-gray-600 text-xl absolute top-2 right-2"
          onClick={() => onClose()}
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
};
export default NewModal;
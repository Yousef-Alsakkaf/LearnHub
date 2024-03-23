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
      className=""
      id="wrapper"
      onClick={handleClose}
    >
      <div>
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
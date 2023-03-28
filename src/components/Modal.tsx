import React, { useState } from "react";

interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ title, isOpen, onClose}) => {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);

  const closeModal = () => {
    setIsModalOpen(false);
    onClose();
    };
    

  return isModalOpen ? (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2 className="descr">{title}</h2>
          <button onClick={closeModal}>Restart</button>
        </div>
        <div className="modal-body"></div>
      </div>
    </div>
  ) : null;
};

export default Modal;
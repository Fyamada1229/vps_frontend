import React from "react";

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-start">
      <div className="top-[30%] left-[30%] w-[60%] p-5 bg-white border-2 border-gray-400 rounded-lg z-1000 absolute">
        <button onClick={onClose} className="absolute top-2 right-2">
          ×
        </button>
        <h2 className="mb-4">コメントを送信しました。</h2>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default Modal;

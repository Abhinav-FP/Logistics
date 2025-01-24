import React from "react";
import { IoCloseSharp } from "react-icons/io5";

const Popup = ({ isOpen, onClose, children, size }) => {
  if (!isOpen) return null; // Render nothing if the popup is not open

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-300 bg-opacity-50 z-50">
      <div className={`bg-white rounded-lg shadow-lg ${size}`}>
        <div className="flex justify-end items-center px-4 py-3 border-b border-gray-300">
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            <IoCloseSharp size={24} />
          </button>
        </div>
        <div className="p-4 text-gray-800 overflow-y-auto max-h-[80vh]">
          {children}
        </div>
      </div>
    </div>
  );
};
export default Popup;

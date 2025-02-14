import React from "react";
import { IoCloseSharp } from "react-icons/io5";

export default function Sidepopup({ isOpen, onClose, children }) {
  if (!isOpen) return null; // Render nothing if the popup is not open

  return (
    <div className="fixed inset-0 bg-gray-300 bg-opacity-50 z-[999]">
      <div className="fixed right-0 top-0 h-full w-full max-w-[560px] bg-white shadow-lg">
        <button
          onClick={onClose}
          className="text-gray-600 hover:text-gray-800 focus:outline-none absolute right-4 top-3 z-[2]"
        >
          <IoCloseSharp size={24} />
        </button>
        <div className="text-gray-800 overflow-y-auto h-full relative">
          {children}
        </div>
      </div>
    </div>
  );
}

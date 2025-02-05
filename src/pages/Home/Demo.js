import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

const ResponsiveTable = () => {
  const [isdropdownopen, setIsdropdownopen] = useState(null);
  const [dropdownPosition, setIsdropdownopendownPosition] = useState({ top: 0, left: 0 });
  const dropdownRefs = useRef({});

  const toogleButton = (id, event) => {
    event.stopPropagation();
    if (isdropdownopen === id) {
      setIsdropdownopen(null);
    } else {
      const button = event.currentTarget;
      const rect = button.getBoundingClientRect();
      setIsdropdownopendownPosition({
        top: rect.top + window.scrollY + button.offsetHeight,
        left: rect.left + window.scrollX,
      });
      setIsdropdownopen(id);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isdropdownopen &&
        dropdownRefs.current[isdropdownopen] &&
        !dropdownRefs.current[isdropdownopen].contains(event.target)
      ) {
        setIsdropdownopen(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isdropdownopen]);

  const tableData = [1, 2, 3];

  return (
    <div className="overflow-auto border rounded-md">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">#</th>
            <th className="p-2 border">Actions</th>
            {Array.from({ length: 11 }).map((_, index) => (
              <th key={index} className="p-2 border">Table Heading</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((item) => (
            <tr key={item} className="bg-white">
              <td className="p-2 border">{item}</td>
              <td className="p-2 border relative">
                <div className="inline-block">
                  <button className="bg-red-500 text-white px-3 py-1 rounded-l-md">
                    Action
                  </button>
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded-r-md"
                    onClick={(e) => toogleButton(item, e)}
                  >
                    ▼
                  </button>
                  {isdropdownopen === item &&
                    createPortal(
                      <ul
                        ref={(el) => (dropdownRefs.current[item] = el)}
                        className="absolute w-40 bg-white border rounded-md shadow-md z-10"
                        style={{ top: `${dropdownPosition.top}px`, left: `${dropdownPosition.left}px`, position: "absolute" }}
                      >
                        <li className="p-2 hover:bg-gray-100 cursor-pointer">Action</li>
                        <li className="p-2 hover:bg-gray-100 cursor-pointer">Another Action</li>
                        <li className="p-2 hover:bg-gray-100 cursor-pointer">Something Else</li>
                        <li className="border-t"></li>
                        <li className="p-2 hover:bg-gray-100 cursor-pointer">Separated Link</li>
                      </ul>,
                      document.body
                    )}
                </div>
              </td>
              {Array.from({ length: 11 }).map((_, index) => (
                <td key={index} className="p-2 border">Table Cell</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResponsiveTable;

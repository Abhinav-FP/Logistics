import React, { useState, useEffect, useRef } from "react";

const TableWithDropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const buttonRefs = useRef([]);
  const dropdownRefs = useRef([]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !dropdownRefs.current.some(
          (ref) => ref && ref.contains(event.target)
        ) &&
        !buttonRefs.current.some(
          (ref) => ref && ref.contains(event.target)
        )
      ) {
        setIsDropdownOpen(null);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleButtonClick = (index) => {
    setIsDropdownOpen((prevState) => (prevState === index ? null : index));
    if (isDropdownOpen !== index) {
      positionDropdown(index);
    }
  };

  const positionDropdown = (index) => {
    const button = buttonRefs.current[index];
    const dropdown = dropdownRefs.current[index];

    if (button && dropdown) {
      document.body.appendChild(dropdown);

      const buttonRect = button.getBoundingClientRect();
      setDropdownPosition({
        top: buttonRect.bottom + window.scrollY,
        left: buttonRect.left + window.scrollX,
      });

      dropdown.style.top = `${buttonRect.bottom + window.scrollY}px`;
      dropdown.style.left = `${buttonRect.left + window.scrollX}px`;
      dropdown.style.position = "absolute";
    }
  };

  const rows = [
    { id: 1, name: "John Doe", age: 28 },
    { id: 2, name: "Jane Smith", age: 34 },
    { id: 3, name: "Michael Johnson", age: 45 },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">ID</th>
            <th className="px-4 py-2 border-b">Name</th>
            <th className="px-4 py-2 border-b">Age</th>
            <th className="px-4 py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={row.id} className="hover:bg-gray-100">
              <td className="px-4 py-2 border-b">{row.id}</td>
              <td className="px-4 py-2 border-b">{row.name}</td>
              <td className="px-4 py-2 border-b">{row.age}</td>
              <td className="px-4 py-2 border-b">
                <div className="relative inline-block text-left">
                  <button
                    ref={(el) => (buttonRefs.current[index] = el)}
                    onClick={() => handleButtonClick(index)}
                    className="inline-flex justify-center w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                  >
                    Options
                  </button>
                  {isDropdownOpen === index && (
                    <div
                      ref={(el) => (dropdownRefs.current[index] = el)}
                      className="bg-white text-gray-700 shadow-lg rounded-md mt-2 w-48 py-1 z-10"
                    >
                      <a href="#" className="block px-4 py-2 text-sm">
                        Action 1
                      </a>
                      <a href="#" className="block px-4 py-2 text-sm">
                        Action 2
                      </a>
                      <a href="#" className="block px-4 py-2 text-sm">
                        Action 3
                      </a>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableWithDropdown;

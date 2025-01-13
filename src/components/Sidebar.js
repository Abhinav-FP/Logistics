import React, { useState } from "react";
import { RxDashboard } from "react-icons/rx";
import { FiTruck } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineAnalytics } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { PiTrolleySuitcaseLight } from "react-icons/pi";
import { MdOutlineDocumentScanner } from "react-icons/md";
import { AiOutlineDollar } from "react-icons/ai";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { IoIosMenu, IoMdClose } from "react-icons/io";
import { IoMdArrowRoundBack } from "react-icons/io";


export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex">
    {isOpen && 
      <button
        className="md:hidden p-2 absolute left-[216px] bottom-5 text-red-700 border border-red-700"
        onClick={toggleSidebar}
      >
     <IoMdArrowRoundBack size={24}/>
      </button>}
      {!isOpen &&
      <button
        className="md:hidden p-2 absolute font-bold top-3 text-[#727272]"
        onClick={toggleSidebar}
      >
        {!isOpen && <IoIosMenu size={24}/> }
      </button>}

      <div className={`w-64 bg-white shadow-md text-[#727272] ${isOpen ? "block" : "hidden"} md:block`}>
        <div className="p-4 flex gap-2 items-center border-b border-gray-200">
          <img src="/Logo.png" alt="FriegtFlow Logo" className="h-[41px] w-[98px]" />
          <div className="flex flex-col">
            <span className="text-xl font-medium text-[#151517]">FriegtFlow</span>
            <span className="text-sm font-medium text-[#727272]">User</span>
          </div>
        </div>

        <div className="p-4 ">
          <div className="flex items-center mb-4 shadow-md py-4 pl-3">
            <div className="h-12 w-12 bg-gray-300 rounded-full"></div>
            <div className="ml-2">
              <div className="text-md text-[#151517] font-medium">Ismael Maddox</div>
              <div className="text-xs ">User</div>
            </div>
          </div>

          <div className="mb-4 font-medium">
            <div className="text-xs ">MAIN MENU</div>
            <ul className="mt-2">
              <Link href="" className={`flex items-center p-2 gap-2 ${pathname === "/" ? "text-blue-500 bg-blue-100" : "hover:bg-gray-100"} rounded-md`}>
                <RxDashboard size={20} />
                Dashboard
              </Link>
              <Link href="/shipment" className={`flex items-center p-2 gap-2 ${pathname === "/shipment" ? "text-blue-500 bg-blue-100" : "hover:bg-gray-100"} rounded-md`}>
                <FiTruck size={20} />
                <span className="ml-2">Shipment</span>
              </Link>
              <Link href="/drivers" className={`flex items-center p-2 gap-2 ${pathname === "/drivers" ? "text-blue-500 bg-blue-100" : "hover:bg-gray-100"} rounded-md`}>
                <PiTrolleySuitcaseLight size={20} />
                Drivers
              </Link>
              <Link href="/users" className={`flex items-center p-2 gap-2 ${pathname === "/users" ? "text-blue-500 bg-blue-100" : "hover:bg-gray-100"} rounded-md`}>
                <FaRegUser size={20} />
                User Management
              </Link>
              <Link href="/carriers" className={`flex items-center p-2 gap-2 ${pathname === "/carriers" ? "text-blue-500 bg-blue-100" : "hover:bg-gray-100"} rounded-md`}>
                <FaRegUser size={20} />
                Carrier
              </Link>
              <Link href="/analytics" className={`flex items-center p-2 gap-2 ${pathname === "/analytics" ? "text-blue-500 bg-blue-100" : "hover:bg-gray-100"} rounded-md`}>
                <MdOutlineAnalytics size={20} />
                Analytics
              </Link>
              <Link href="/settings" className={`flex items-center p-2 gap-2 ${pathname === "/settings" ? "text-blue-500 bg-blue-100" : "hover:bg-gray-100"} rounded-md`}>
                <IoSettingsOutline size={20} />
                Settings
              </Link>
            </ul>
          </div>

          <div>
            <div className="text-xs font-medium">PAYMENT</div>
            <ul className="mt-2">
              <Link href="/taxes" className={`flex items-center p-2 gap-2 ${pathname === "/taxes" ? "text-blue-500 bg-blue-100" : "hover:bg-gray-100"} rounded-md`}>
                <MdOutlineDocumentScanner size={20} />
                Taxes
              </Link>
              <Link href="/payments" className={`flex items-center p-2 gap-2 ${pathname === "/payments" ? "text-blue-500 bg-blue-100" : "hover:bg-gray-100"} rounded-md`}>
                <AiOutlineDollar size={24} />
                Payments
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

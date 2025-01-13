import Sidebar from "@/components/Sidebar";
import React from "react";

export default function Layout({ children }) {
  return (
    <div className="md:flex flex-wrap  bg-[#F5F6FB] items-start">
      <Sidebar />
      <div className="w-full lg:ml-[304px] lg:w-[calc(100%-304px)]">
        <div className="fixed top-0 h-16 font-bold bg-white text-2xl sm:pl-3 pl-12 flex items-center shadow-sm w-full mb-6">
          Dashboard
        </div>
        <div className="sm:px-3 mt-16">
        {children}
        </div>
      </div>
    </div>
  );
}

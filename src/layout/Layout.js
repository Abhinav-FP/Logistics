import Sidebar from "@/components/Sidebar";
import React from "react";

export default function Layout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="">
        <div className="text-white h-16 w-screen sm:pl-3 pl-12 flex items-center bg-black">
          Dashboard
        </div>
        {children}
      </div>
    </div>
  );
}

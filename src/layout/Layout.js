import Sidebar from "@/components/Sidebar";
import React from "react";

export default function Layout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full">
        <div className="h-16 font-bold text-2xl sm:pl-3 pl-12 flex items-center shadow-sm mb-6">
          Dashboard
        </div>
        <div className="sm:px-3">
        {children}
        </div>
      </div>
    </div>
  );
}

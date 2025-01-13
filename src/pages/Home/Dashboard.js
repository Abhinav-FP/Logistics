import React from "react";
import { RiTruckLine } from "react-icons/ri";

export default function Dashboard(){
  const metrics = [
    { title: "IN TRANSIT", value: 621 },
    { title: "DELIVERED", value: 621 },
    { title: "DELAYED", value: 621 },
    { title: "TOTAL SHIPMENT", value: 621 },
    { title: "ON-TIME DELIVERIES", value: 621 },
    { title: "PENDING SHIPMENTS", value: 621 },
  ];

  return (
    <div className="p-4">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0">
        <h1 className="text-xl font-bold">Overview</h1>
        <div className="flex flex-wrap items-center space-x-2">
          <select className="border rounded p-2">
            <option>Week</option>
          </select>
          <button className="bg-[#1C5FE8] text-white rounded p-2 rounded-md">
            + New Shipments
          </button>
        </div>
      </div>

      {/* Metrics Section */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded shadow border border-gray-200"
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-normal text-[#7A7A7A]">
                {metric.title}
              </h2>
              <div className="border border-gray-300 py-2 px-3 rounded-md">
                <RiTruckLine size={24} color={"#1C5FE8"} />
              </div>
            </div>
            <p className="text-2xl font-bold">{metric.value}</p>
            <p className="text-[#7A7A7A] font-normal">In last Week</p>
          </div>
        ))}
      </div>
    </div>
  );
};
import Layout from "@/layout/Layout";
import React from "react";

export default function MainPage() {
  const Dashboard = () => {
    const metrics = [
      { title: 'IN TRANSIT', value: 621 },
      { title: 'DELIVERED', value: 621 },
      { title: 'DELAYED', value: 621 },
      { title: 'TOTAL SHIPMENT', value: 621 },
      { title: 'ON-TIME DELIVERIES', value: 621 },
      { title: 'PENDING SHIPMENTS', value: 621 },
    ];
  
    return (
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Overview</h1>
          <div className="flex items-center space-x-2">
            <select className="border rounded p-2">
              <option>Week</option>
            </select>
            <button className="bg-blue-500 text-white rounded p-2">+ New Shipments</button>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-white p-4 rounded shadow">
              <div className="flex items-center space-x-2 mb-2">
                <div className="bg-blue-100 p-2 rounded">
                  <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h18v18H3V3z"></path>
                  </svg>
                </div>
                <h2 className="text-lg font-semibold">{metric.title}</h2>
              </div>
              <p className="text-2xl font-bold">{metric.value}</p>
              <p className="text-gray-500">In last Week</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
      <Layout>
        <Dashboard/>
      </Layout>
  );
}

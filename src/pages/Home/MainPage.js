import Layout from "@/layout/Layout";
import React from "react";
import { RiTruckLine } from "react-icons/ri";

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
          <button className="bg-[#1C5FE8] text-white rounded p-2 rounded-md ">+ New Shipments</button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white p-4 rounded shadow">
            <div className="flex items-center space-x-10 mb-2">
              <h2 className="text-lg font-normal text-[#7A7A7A]">{metric.title}</h2>
                <div className="border border-gray-300 py-2 px-3 rounded-md">
                  <RiTruckLine size={24} color={"#1C5FE8"}/>
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

const ShipmentTable = () => {
  const shipments = [
    { id: 'SHP-001', title: 'Electronics Delivery', pickup: 'New York, NY', delivery: 'Los Angeles, CA', status: 'In Transit', shipmentDate: '2024-12-01', expectedDelivery: '2024-12-08' },
    { id: 'SHP-002', title: 'Furniture Delivery', pickup: 'Chicago, IL', delivery: 'Houston, TX', status: 'Delivered', shipmentDate: '2024-11-15', expectedDelivery: '2024-11-20' },
    { id: 'SHP-003', title: 'Books Shipment', pickup: 'San Francisco, CA', delivery: 'Seattle, WA', status: 'In Transit', shipmentDate: '2024-12-05', expectedDelivery: '2024-12-10' },
    { id: 'SHP-004', title: 'Clothing Shipment', pickup: 'Miami, FL', delivery: 'Boston, MA', status: 'Pending', shipmentDate: '2024-12-03', expectedDelivery: '2024-12-09' },
    { id: 'SHP-005', title: 'Medical Supplies', pickup: 'Denver, CO', delivery: 'Phoenix, AZ', status: 'In Transit', shipmentDate: '2024-12-06', expectedDelivery: '2024-12-11' },
    { id: 'SHP-006', title: 'Food Delivery', pickup: 'Las Vegas, NV', delivery: 'San Diego, CA', status: 'Cancelled', shipmentDate: '2024-11-25', expectedDelivery: '2024-11-28' },
    { id: 'SHP-007', title: 'Automobile Parts', pickup: 'Detroit, MI', delivery: 'Dallas, TX', status: 'In Transit', shipmentDate: '2024-12-07', expectedDelivery: '2024-12-12' },
    { id: 'SHP-008', title: 'Toy Shipment', pickup: 'Atlanta, GA', delivery: 'Orlando, FL', status: 'Delivered', shipmentDate: '2024-11-20', expectedDelivery: '2024-11-24' },
    { id: 'SHP-009', title: 'Sporting Goods', pickup: 'Philadelphia, PA', delivery: 'Washington, DC', status: 'In Transit', shipmentDate: '2024-12-08', expectedDelivery: '2024-12-14' },
    { id: 'SHP-010', title: 'Office Supplies', pickup: 'Boston, MA', delivery: 'Newark, NJ', status: 'Pending', shipmentDate: '2024-12-02', expectedDelivery: '2024-12-05' }
  ];
  return (
    <div className="container mx-auto">
      <h2 className="text-lg font-medium mb-3">Shipment Listing </h2>
      <table className="table-auto border-gray-200">
        <thead>
          <tr className="text-[#9090AD] bg-[#F4F6F8] border border-gray-200 uppercase">
            <th className="px-4 py-2 whitespace-nowrap">Shipment ID</th>
            <th className="px-4 py-2 whitespace-nowrap">Title</th>
            <th className="px-4 py-2 whitespace-nowrap">Pickup Location</th>
            <th className="px-4 py-2 whitespace-nowrap">Delivery Location</th>
            <th className="px-4 py-2 whitespace-nowrap">Status</th>
            <th className="px-4 py-2 whitespace-nowrap">Shipment Date</th>
            <th className="px-4 py-2 whitespace-nowrap">Expected Delivery</th>
          </tr>
        </thead>
        <tbody>
          {shipments.map((shipment) => (
            <tr key={shipment.id} className="border border-gray-200 font-medium">
              <td className="px-4 py-2">{shipment.id}</td>
              <td className="px-4 py-2">{shipment.title}</td>
              <td className="px-4 py-2">{shipment.pickup}</td>
              <td className="px-4 py-2">{shipment.delivery}</td>
              {/* {shipment?.status === ""} */}
              <td className="px-4 py-2">
              <div className={`px-2 py-1 ${
                shipment.status === "In Transit" ? "bg-[#C2970A1A] text-[#C2970A]" :
                shipment.status === "Delivered" ? "bg-green-300 text-green-700" :
                shipment.status === "Cancelled" ? "bg-red-400 text-red-700" : 
                shipment.status === "Pending" ? "bg-orange-300 text-orange-500" : ""
                } flex justify-center items-center rounded-md`}>
                {shipment.status}
              </div>
                </td>
              <td className="px-4 py-2">{shipment.shipmentDate}</td>
              <td className="px-4 py-2">{shipment.expectedDelivery}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default function MainPage() {

  return (
      <Layout>
        <Dashboard/>
        <ShipmentTable/>
      </Layout>
  );
}

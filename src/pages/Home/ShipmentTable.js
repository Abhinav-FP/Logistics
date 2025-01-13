import React from "react";

export default function ShipmentTable({shipments}){
    return (
        <div className="overflow-x-auto">
        <table className="table-auto border-gray-200">
          <thead>
            <tr className="text-[#9090AD] bg-[#F4F6F8] border border-gray-200 uppercase">
              <th className="px-4 py-2 ">Shipment ID</th>
              <th className="px-4 py-2 ">Title</th>
              <th className="px-4 py-2 ">Pickup Location</th>
              <th className="px-4 py-2 ">Delivery Location</th>
              <th className="px-4 py-2 ">Status</th>
              <th className="px-4 py-2 ">Shipment Date</th>
              <th className="px-4 py-2 ">Expected Delivery</th>
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
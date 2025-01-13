import React from "react";

export default function ShipmentTable(){
    const shipments = [
      { id: 'SHP-001', title: 'Electronics Delivery', pickup: 'New York, NY', delivery: 'Los Angeles, CA', status: 'In Transit', shipmentDate: '2024-12-01', expectedDelivery: '2024-12-08' },
      { id: 'SHP-002', title: 'Furniture Delivery', pickup: 'Chicago, IL', delivery: 'Houston, TX', status: 'Delivered', shipmentDate: '2024-11-15', expectedDelivery: '2024-11-20' },
      { id: 'SHP-003', title: 'Clothing Shipment', pickup: 'Miami, FL', delivery: 'Boston, MA', status: 'Pending', shipmentDate: '2024-12-03', expectedDelivery: '2024-12-09' },
      { id: 'SHP-004', title: 'Food Delivery', pickup: 'Las Vegas, NV', delivery: 'San Diego, CA', status: 'Cancelled', shipmentDate: '2024-11-25', expectedDelivery: '2024-11-28' },
      { id: 'SHP-004', title: 'Food Delivery', pickup: 'Las Vegas, NV', delivery: 'San Diego, CA', status: 'Cancelled', shipmentDate: '2024-11-25', expectedDelivery: '2024-11-28' },
      { id: 'SHP-004', title: 'Food Delivery', pickup: 'Las Vegas, NV', delivery: 'San Diego, CA', status: 'Cancelled', shipmentDate: '2024-11-25', expectedDelivery: '2024-11-28' },
      { id: 'SHP-004', title: 'Food Delivery', pickup: 'Las Vegas, NV', delivery: 'San Diego, CA', status: 'Cancelled', shipmentDate: '2024-11-25', expectedDelivery: '2024-11-28' },
      { id: 'SHP-004', title: 'Food Delivery', pickup: 'Las Vegas, NV', delivery: 'San Diego, CA', status: 'Cancelled', shipmentDate: '2024-11-25', expectedDelivery: '2024-11-28' },

    ];
    return (
      <div className="container mx-auto">
        <h2 className="text-lg font-medium mb-3">Shipment Listing </h2>
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
      </div>
    );
  };
import React from "react";

export default function ShipmentTable({ shipments }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-none">
        <thead>
          <tr className="text-[#9090AD] bg-[#F4F6F8] border border-black border-opacity-10 uppercase ">
            <th className="px-4 py-3  tracking-[-0.04em] text-sm font-medium text-left">Shipment ID</th>
            <th className="px-4 py-3  tracking-[-0.04em] text-sm font-medium text-left">Title</th>
            <th className="px-4 py-3  tracking-[-0.04em] text-sm font-medium text-left">Pickup Location</th>
            <th className="px-4 py-3  tracking-[-0.04em] text-sm font-medium text-left">Delivery Location</th>
            <th className="px-4 py-3  tracking-[-0.04em] text-sm font-medium text-left">Status</th>
            <th className="px-4 py-3  tracking-[-0.04em] text-sm font-medium text-left">Shipment Date</th>
            <th className="px-4 py-3  tracking-[-0.04em] text-sm font-medium text-left">Expected Delivery</th>
          </tr>
        </thead>
        <tbody>
          {shipments && shipments?.map((shipment) => (
            <tr key={shipment.id} className="border-b  border-black border-opacity-10 font-medium">
              <td className="px-3 py-5 text-[#1D1D42] tracking-[-0.04em] text-sm font-medium text-left">{shipment?.id}</td>
              <td className="px-3 py-5 text-[#1D1D42] tracking-[-0.04em] text-sm font-medium text-left">{shipment?.title}</td>
              <td className="px-3 py-5 text-[#1D1D42] tracking-[-0.04em] text-sm font-medium text-left">{shipment?.pickup}</td>
              <td className="px-3 py-5 text-[#1D1D42] tracking-[-0.04em] text-sm font-medium text-left">{shipment?.delivery}</td>
              {/* {shipment?.status === ""} */}
              <td className="px-3 py-5 text-[#1D1D42] tracking-[-0.04em] text-sm font-medium text-left">
                <div className={`px-2 py-1 ${shipment?.status === "In Transit" ? "bg-[#C2970A1A] text-[#C2970A]" :
                    shipment?.status === "Delivered" ? "bg-green-300 text-green-700" :
                      shipment?.status === "Cancelled" ? "bg-red-400 text-red-700" :
                        shipment?.status === "Pending" ? "bg-orange-300 text-orange-500" : ""
                  } flex justify-center items-center rounded-md`}>
                  {shipment?.status}
                </div>
              </td>
              <td className="px-3 py-5 text-[#1D1D42] tracking-[-0.04em] text-sm font-medium text-left">{shipment?.shipmentDate}</td>
              <td className="px-3 py-5 text-[#1D1D42] tracking-[-0.04em] text-sm font-medium text-left">{shipment?.expectedDelivery}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
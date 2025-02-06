import React from "react";

const Status = ({ status }) => {
  const statusStyles = {
    "in transit": "bg-[#C2970A1A] text-[#C2970A]",
    "payondelivery": "bg-[#C2970A1A] text-[#C2970A]",
    "delivered": "bg-[#0BB6351A] text-[#0BB635]",
    "done": "bg-[#0BB6351A] text-[#0BB635]",
    "cancelled": "bg-[#CF000033] text-[#CF0000]",
    "pending": "bg-[#E1F1FF] text-[#0367F7]",
    "pick-up": "bg-[#759D3D1A] text-[#C2970A]",
  };

  const getStatusStyles = (status) => statusStyles[status?.toLowerCase()] || "";

  return (
    <div
      className={`px-2 py-1 ${getStatusStyles(status)} flex justify-center items-center rounded-md  capitalize`}
    >
      {status === "PayOnDelivery" ? "pay on delivery" : status || "Unknown"}
    </div>
  );
};

export default Status;

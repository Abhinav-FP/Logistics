import React from "react";

const Status = ({ status }) => {
  // console.log("status",status)
  const getStatusStyles = (status) => {
    const lowerCaseStatus = status?.toLowerCase();
    switch (lowerCaseStatus) {
      case "in transit":
        return "bg-[#C2970A1A] text-[#C2970A]";
      case "delivered":
        return "bg-[#0BB6351A] text-[#0BB635]";
        case "done":
          return "bg-[#0BB6351A] text-[#0BB635]";
      case "cancelled":
        return "bg-[#CF000033] text-[#CF0000]";
      case "pending":
        return "bg-[#E1F1FF] text-[#0367F7]";
        case "payondelivery":
        return "bg-[#0BB6351A] text-[#0BB635]";
      default:
        return "";
    }
  };

  return (
    <div
      className={`px-2 py-1 ${getStatusStyles(status)} flex justify-center items-center rounded-md  capitalize`}
    >
      {status || "Unknown"}
    </div>
  );
};

export default Status;

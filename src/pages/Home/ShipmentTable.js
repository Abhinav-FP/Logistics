import Popup from "@/components/Popup";
import React, { useState } from "react";
import { FaEdit, FaEye } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import Details from "../api/Listing/Details";
import toast from "react-hot-toast";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import Link from "next/link";
import Status from "@/components/Status";


export default function ShipmentTable({ shipments, getShipments, DeleteOption = false, role }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [data, setData] = useState({});

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  const deleteshipment = (id) => {
    const main = new Details();
    main
      .deleteShipment(id)
      .then((r) => {
        toast.success(r?.data?.message);
        getShipments(role === "broker");
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
        console.log("error", err);
      });
  };


  console.log("shipments", shipments);
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-none">
        <thead>
          <tr className="text-[#9090AD] bg-[#F4F6F8] border border-black border-opacity-10 uppercase ">
            <th className="px-4 py-3 tracking-[-0.04em] text-sm font-medium text-left">Shipment ID</th>
            <th className="px-4 py-3 tracking-[-0.04em] text-sm font-medium text-left">Title</th>
            <th className="px-4 py-3 tracking-[-0.04em] text-sm font-medium text-left">Pickup Location</th>
            <th className="px-4 py-3 tracking-[-0.04em] text-sm font-medium text-left">Delivery Location</th>
            <th className="px-4 py-3 tracking-[-0.04em] text-sm font-medium text-left">Status</th>
            <th className="px-4 py-3 tracking-[-0.04em] text-sm font-medium text-left">Shipment Date</th>
            <th className="px-4 py-3 tracking-[-0.04em] text-sm font-medium text-left">Expected Delivery</th>
            <th className="px-4 py-3 tracking-[-0.04em] text-sm font-medium text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {shipments && shipments?.map((shipment, index) => (
            <tr key={index} className="border-b border-black border-opacity-10 font-medium">
              <td className="px-3 py-5 text-[#1D1D42] tracking-[-0.04em] text-sm font-medium text-left">
                {index < 10 ? `SHP-00${index + 1}` : `SHP-0${index + 1}`}
              </td>
              <td className="px-3 py-5 text-[#1D1D42] tracking-[-0.04em] text-sm font-medium text-left capitalize">{shipment?.name}</td>
              <td className="px-3 py-5 text-[#1D1D42] tracking-[-0.04em] text-sm font-medium text-left capitalize">{shipment?.pickup_location}</td>
              <td className="px-3 py-5 text-[#1D1D42] tracking-[-0.04em] text-sm font-medium text-left capitalize">{shipment?.drop_location}</td>
              <td className="px-3 py-5 text-[#1D1D42] tracking-[-0.04em] text-sm font-medium text-left capitalize">
                <Status status={shipment?.status} />
              </td>
              <td className="px-3 py-5 text-[#1D1D42] tracking-[-0.04em] text-sm font-medium text-left">{shipment?.shippingDate}</td>
              <td className="px-3 py-5 text-[#1D1D42] tracking-[-0.04em] text-sm font-medium text-left">{shipment?.deliveryDateExpect}</td>
              <td className="px-3 py-5 text-[#1D1D42] tracking-[-0.04em] text-sm font-medium text-left">
                {DeleteOption ?
                  <div className="flex gap-2 items-center">
                    <FaEye size={20} className="cursor-pointer" color={"#3b82f6"} onClick={() => {
                      setData(shipment);
                      openPopup();
                    }} />
                    <Link href={`/shipment/add/${shipment?._id}`} className="">

                      <FaEdit size={20} className="cursor-pointer" color={"#16A34A"} />
                    </Link>
                    <FaRegTrashCan size={20} color={"#Ff0000"} className="cursor-pointer"
                      onClick={() => deleteshipment(shipment?._id)}
                    />
                  </div>
                  :
                  <HiOutlineDotsHorizontal size={20} color={"#9090AD"} className="cursor-pointer" />
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Popup isOpen={isPopupOpen} onClose={closePopup}>
        <div className="p-4 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Shipment Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="font-medium text-gray-600">Shipment ID:</p>
              <p className="text-gray-800 capitalize">{data?._id}</p>
            </div>
            <div>
              <p className="font-medium text-gray-600">Name:</p>
              <p className="text-gray-800 capitalize">{data?.name}</p>
            </div>
            <div>
              <p className="font-medium text-gray-600">Description:</p>
              <p className="text-gray-800 capitalize">{data?.description}</p>
            </div>
            <div>
              <p className="font-medium text-gray-600">Pickup Location:</p>
              <p className="text-gray-800 capitalize">{data?.pickup_location}</p>
            </div>
            <div>
              <p className="font-medium text-gray-600">Drop Location:</p>
              <p className="text-gray-800 capitalize">{data?.drop_location}</p>
            </div>
            <div>
              <p className="font-medium text-gray-600">Current Location:</p>
              <p className="text-gray-800 capitalize">{data?.current_location || "Not Available"}</p>
            </div>
            <div>
              <p className="font-medium text-gray-600">Shipping Date:</p>
              <p className="text-gray-800 capitalize">{data?.shippingDate}</p>
            </div>
            <div>
              <p className="font-medium text-gray-600">Expected Delivery:</p>
              <p className="text-gray-800 capitalize">{data?.deliveryDateExpect}</p>
            </div>
            <div>
              <p className="font-medium text-gray-600">Cost:</p>
              <p className="text-gray-800 capitalize">${data?.cost}</p>
            </div>
            <div>
              <p className="font-medium text-gray-600">Payment Status:</p>
              <p className={`text-gray-800 capitalize ${data?.paymentStatus === "Done" ? "text-green-600" : "text-red-600"}`}>
                {data?.paymentStatus}
              </p>
            </div>
            <div>
              <p className="font-medium text-gray-600">Quantity:</p>
              <p className="text-gray-800 capitalize">{data?.quantity} units</p>
            </div>
            <div>
              <p className="font-medium text-gray-600">Weight:</p>
              <p className="text-gray-800 capitalize">{data?.weight} kg</p>
            </div>
            <div>
              <p className="font-medium text-gray-600">Dimensions:</p>
              <p className="text-gray-800 capitalize">{data?.dimensions}</p>
            </div>
            <div>
              <p className="font-medium text-gray-600">Type of Goods:</p>
              <p className="text-gray-800 capitalize">{data?.typeOfGoods}</p>
            </div>
            <div>
              <p className="font-medium text-gray-600">Status:</p>
              <p
                className="px-2 py-1 rounded-md capitalize max-w-fit "
              >
                <Status status={data?.status}/>
                
              </p>
            </div>
          </div>
          <p className="text-gray-600 text-sm">
            Created At: {new Date(data?.created_at).toLocaleString()}
          </p>
        </div>
      </Popup>
    </div>
  );
};
import Popup from "@/components/Popup";
import React, { useEffect, useState } from "react";
import { FaEdit, FaEye } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import Details from "../api/Listing/Details";
import toast from "react-hot-toast";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import Link from "next/link";
import Status from "@/components/Status";
import { BsDownload } from "react-icons/bs";
import { IoInformationCircleOutline } from "react-icons/io5";
import { FiTruck } from "react-icons/fi";
import ViewShipment from "@/components/ViewShipment";
import Sidepopup from "@/components/Sidepopup";

export default function ShipmentTable({
  shipments,
  getShipments,
  DeleteOption = false,
  role,
}) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isCarrierPopupOpen, setIsCarrierPopupOpen] = useState(false);
  const [isSidePopupOpen, setIsSidePopupOpen] = useState(false);
  const [data, setData] = useState({});
  const [isdropdownopen, setIsdropdownopen] = useState(null);
  const [listing, setLisitng] = useState("");
  const [selectedCarrier, setSelectedCarrier] = useState();
  const [selectedShipment, setselectedShipment] = useState();
  const toogleButton = (id) => {
    setIsdropdownopen(isdropdownopen === id ? null : id);
  };

  const [activeTab, setActiveTab] = useState("shippingInfo");

  const getcarriers = () => {
    const main = new Details();
    main
      .Carrierget()
      .then((r) => {
        setLisitng(r?.data?.data);
      })
      .catch((err) => {
        setLisitng([]);
        console.log("error", err);
      });
  };

  useEffect(() => {
    getcarriers();
  }, []);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  const openCarrierPopup = () => setIsCarrierPopupOpen(true);
  const closeCarrierPopup = () => setIsCarrierPopupOpen(false);

  const openSidePopup = () => setIsSidePopupOpen(true);
  const closeSidePopup = () => setIsSidePopupOpen(false);

  const deleteshipment = (id) => {
    const main = new Details();
    main
      .deleteShipment(id)
      .then((r) => {
        toast.success(r?.data?.message);
        getShipments(role === "broker");
        getShipments();
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
        console.log("error", err);
      });
  };
  console.log("selectedcarrier", selectedCarrier)
  console.log("listing", listing);

  console.log("listing", listing);
  console.log("selectedCarrier", selectedCarrier);
  console.log("selectedShipment", selectedShipment);
  const assigncarrier = () => {
    const main = new Details();
    const response = main.UpdateShipment(selectedShipment, {
      carrier_id: selectedCarrier,
    });
    response
      .then((res) => {
        if (res && res?.data && res?.data?.status) {
          toast.success(res.data.message);
          closeCarrierPopup();
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
        console.log("error", error);
      });
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-none">
        <thead>
          <tr className="text-[#9090AD] bg-[#F4F6F8] border border-black border-opacity-10 uppercase ">
            <th className="px-4 py-3 tracking-[-0.04em] text-sm font-medium text-left">
              Shipment ID
            </th>
            <th className="px-4 py-3 tracking-[-0.04em] text-sm font-medium text-left">
              Title
            </th>
            <th className="px-4 py-3 tracking-[-0.04em] text-sm font-medium text-left">
              Pickup Location
            </th>
            <th className="px-4 py-3 tracking-[-0.04em] text-sm font-medium text-left">
              Delivery Location
            </th>
            <th className="px-4 py-3 tracking-[-0.04em] text-sm font-medium text-left">
              Status
            </th>
            <th className="px-4 py-3 tracking-[-0.04em] text-sm font-medium text-left">
              Shipment Date
            </th>
            <th className="px-4 py-3 tracking-[-0.04em] text-sm font-medium text-left">
              Expected Delivery
            </th>
            <th className="px-4 py-3 tracking-[-0.04em] text-sm font-medium text-left">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {shipments &&
            shipments?.map((shipment, index) => (
              <tr
                key={index}
                className="border-b border-black border-opacity-10 font-medium"
              >
                <td className="px-3 py-5 text-[#1D1D42] tracking-[-0.04em] text-sm font-medium text-left">
                  {index < 10 ? `SHP-00${index + 1}` : `SHP-0${index + 1}`}
                </td>
                <td className="px-3 py-5 text-[#1D1D42] tracking-[-0.04em] text-sm font-medium text-left capitalize">
                  {shipment?.name}
                </td>
                <td className="px-3 py-5 text-[#1D1D42] tracking-[-0.04em] text-sm font-medium text-left capitalize">
                  {shipment?.pickup_location}
                </td>
                <td className="px-3 py-5 text-[#1D1D42] tracking-[-0.04em] text-sm font-medium text-left capitalize">
                  {shipment?.drop_location}
                </td>
                <td className="px-3 py-5 text-[#1D1D42] tracking-[-0.04em] text-sm font-medium text-left capitalize">
                  <Status status={shipment?.status} />
                </td>
                <td className="px-3 py-5 text-[#1D1D42] tracking-[-0.04em] text-sm font-medium text-left">
                  {shipment?.shippingDate}
                </td>
                <td className="px-3 py-5 text-[#1D1D42] tracking-[-0.04em] text-sm font-medium text-left">
                  {shipment?.deliveryDateExpect}
                </td>
                {role === "shipper" ? (
                  <td className="px-3 py-5 text-[#1D1D42] tracking-[-0.04em] text-sm font-medium text-left">
                    {DeleteOption ? (
                      <div className="flex gap-2 items-center">
                        <FaEye
                          size={20}
                          className="cursor-pointer"
                          color="#3b82f6"
                          onClick={() => {
                            setData(shipment);
                            openPopup();
                          }}
                        />
                        <Link href={`/shipment/add/${shipment?._id}`}>
                          <FaEdit
                            size={20}
                            className="cursor-pointer"
                            color="#16A34A"
                          />
                        </Link>
                        <FaRegTrashCan
                          size={20}
                          className="cursor-pointer"
                          color="#Ff0000"
                          onClick={() => deleteshipment(shipment?._id)}
                        />
                      </div>
                    ) : (
                      <HiOutlineDotsHorizontal
                        size={20}
                        color="#9090AD"
                        className="cursor-pointer"
                      />
                    )}
                  </td>
                ) : role === "broker" ? (
                  <td className="px-3 py-5 text-[#1D1D42] tracking-[-0.04em] text-sm font-medium text-left">
                    <div className="relative">
                      <button onClick={() => toogleButton(index)}>
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            x="0.5"
                            y="0.5"
                            width="23"
                            height="23"
                            rx="11.5"
                            stroke="#999999"
                          />
                          <path
                            d="M6 12C6 12.1989 6.07902 12.3897 6.21967 12.5303C6.36032 12.671 6.55109 12.75 6.75 12.75C6.94891 12.75 7.13968 12.671 7.28033 12.5303C7.42098 12.3897 7.5 12.1989 7.5 12C7.5 11.8011 7.42098 11.6103 7.28033 11.4697C7.13968 11.329 6.94891 11.25 6.75 11.25C6.55109 11.25 6.36032 11.329 6.21967 11.4697C6.07902 11.6103 6 11.8011 6 12ZM11.25 12C11.25 12.1989 11.329 12.3897 11.4697 12.5303C11.6103 12.671 11.8011 12.75 12 12.75C12.1989 12.75 12.3897 12.671 12.5303 12.5303C12.671 12.3897 12.75 12.1989 12.75 12C12.75 11.8011 12.671 11.6103 12.5303 11.4697C12.3897 11.329 12.1989 11.25 12 11.25C11.8011 11.25 11.6103 11.329 11.4697 11.4697C11.329 11.6103 11.25 11.8011 11.25 12ZM16.5 12C16.5 12.1989 16.579 12.3897 16.7197 12.5303C16.8603 12.671 17.0511 12.75 17.25 12.75C17.4489 12.75 17.6397 12.671 17.7803 12.5303C17.921 12.3897 18 12.1989 18 12C18 11.8011 17.921 11.6103 17.7803 11.4697C17.6397 11.329 17.4489 11.25 17.25 11.25C17.0511 11.25 16.8603 11.329 16.7197 11.4697C16.579 11.6103 16.5 11.8011 16.5 12Z"
                            stroke="#999999"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                      <div
                        className={`after:h-5 after:w-5 after:border-t after:border-l after:bg-white after:absolute after:left-12 after:top-[-10px] after:rotate-45 fixed min-w-[198px] -ml-10 mt-2 border border-black border-opacity-10 rounded-xl z-10 bg-white ${isdropdownopen === index ? "block" : "hidden"
                          }`}
                      >
                        <ul>
                          <li className="py-2 tracking-[-0.04em] [&:not(:last-child)]:border-b border-black border-opacity-10 px-4 lg:px-6">
                            <button className="flex gap-2 text-[#1B1B1B] bg-transparent border-none text-sm font-medium">
                              Download PDF{" "}
                              <BsDownload size={18} color="#1C5FE8" />
                            </button>
                          </li>
                          <li className="py-2 tracking-[-0.04em] [&:not(:last-child)]:border-b border-black border-opacity-10 px-4 lg:px-6">
                            <button
                              className="flex gap-2 items-center text-[#1B1B1B] bg-transparent border-none text-sm font-medium"
                              onClick={() => {
                                setData(shipment);
                                openPopup();
                                setIsdropdownopen(null);
                              }}
                            >
                              View <IoInformationCircleOutline size={18} />
                            </button>
                          </li>
                          <li className="py-2 tracking-[-0.04em] [&:not(:last-child)]:border-b border-black border-opacity-10 px-4 lg:px-6">
                            <button
                              className="flex gap-2 text-[#1B1B1B] bg-transparent border-none text-sm font-medium"
                              onClick={() => {
                                setselectedShipment(shipment?._id);
                                openCarrierPopup();
                                setIsdropdownopen(null);
                              }}
                            >
                              Assign Carrier <FiTruck size={18} />
                              {/* <CiNoWaitingSign size={18} color="#CF0000" /> */}
                            </button>
                          </li>
                          <li className="py-2 tracking-[-0.04em] [&:not(:last-child)]:border-b border-black border-opacity-10 px-4 lg:px-6">
                            <button
                              className="flex gap-2 items-center text-[#1B1B1B] bg-transparent border-none text-sm font-medium"
                              onClick={() => {
                                openSidePopup();
                                setIsdropdownopen(null);
                              }}
                            >
                              Tracking <IoInformationCircleOutline size={18} />
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </td>
                ) : null}
              </tr>
            ))}
        </tbody>
      </table>
      <Popup
        isOpen={isCarrierPopupOpen}
        onClose={closeCarrierPopup}
        size={"max-w-[570px]"}
      >
        <div className="lg:px-2.5 lg:pb-2.5">
          <div className="overflow-x-auto mt-8">
            <table className="w-full border-none">
              <thead>
                <tr className="text-[#9090AD] bg-[#F4F6F8] border border-black border-opacity-10 uppercase ">
                  <th className="px-4 py-3  tracking-[-0.04em] text-sm font-medium text-left">
                    Carrier ID{" "}
                  </th>
                  <th className="px-4 py-3  tracking-[-0.04em] text-sm font-medium text-left">
                    Carrier Name
                  </th>
                  <th className="px-4 py-3  tracking-[-0.04em] text-sm font-medium text-left">
                    Company Name
                  </th>
                  <th className="px-4 py-3  tracking-[-0.04em] text-sm font-medium text-left">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {listing &&
                  listing?.map((carrier, index) => (
                    <tr
                      key={index}
                      className="border-b  border-black border-opacity-10 font-medium"
                    >
                      <td className="px-4 py-5 text-[#1D1D42] tracking-[-0.04em] text-sm font-medium text-left">
                        {carrier?.carrier_id_given}
                      </td>
                      <td className="px-4 py-5 text-[#1D1D42] tracking-[-0.04em] text-sm font-medium text-left">
                        {carrier?.career_id_ref?.name}
                      </td>
                      <td className="px-4 py-5 text-[#1D1D42] tracking-[-0.04em] text-sm font-medium text-left">
                        {carrier?.companyname}
                      </td>
                      <td className="px-4 py-5 text-[#1D1D42] tracking-[-0.04em] text-sm font-medium text-center">
                        <button onClick={() => {
                          setSelectedCarrier(carrier?.career_id_ref?._id);
                        }}>
                          {selectedCarrier && selectedCarrier === carrier?.career_id_ref?._id ?
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <rect width="24" height="24" rx="12" fill="#0BB635" />
                              <path d="M4 12C4 9.87827 4.84285 7.84344 6.34315 6.34315C7.84344 4.84285 9.87827 4 12 4C14.1217 4 16.1566 4.84285 17.6569 6.34315C19.1571 7.84344 20 9.87827 20 12C20 14.1217 19.1571 16.1566 17.6569 17.6569C16.1566 19.1571 14.1217 20 12 20C9.87827 20 7.84344 19.1571 6.34315 17.6569C4.84285 16.1566 4 14.1217 4 12ZM12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2ZM17.457 9.457L16.043 8.043L11 13.086L8.207 10.293L6.793 11.707L11 15.914L17.457 9.457Z" fill="white" />
                            </svg>
                            :
                            <svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M2 10C2 7.87827 2.84285 5.84344 4.34315 4.34315C5.84344 2.84285 7.87827 2 10 2C12.1217 2 14.1566 2.84285 15.6569 4.34315C17.1571 5.84344 18 7.87827 18 10C18 12.1217 17.1571 14.1566 15.6569 15.6569C14.1566 17.1571 12.1217 18 10 18C7.87827 18 5.84344 17.1571 4.34315 15.6569C2.84285 14.1566 2 12.1217 2 10ZM10 0C4.477 0 0 4.477 0 10C0 15.523 4.477 20 10 20C15.523 20 20 15.523 20 10C20 4.477 15.523 0 10 0ZM15.457 7.457L14.043 6.043L9 11.086L6.207 8.293L4.793 9.707L9 13.914L15.457 7.457Z" fill="#999999" />
                            </svg>
                          }
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <button className="bg-[#1C5FE8] hover:bg-[#0a3fab] px-10 py-2.5 text-white flex mx-auto mt-6 rounded-lg"
            onClick={() => {
              assigncarrier();
            }}>
            Save
          </button>
        </div>
      </Popup>
      <Sidepopup isOpen={isSidePopupOpen} onClose={closeSidePopup}>
        <div className="px-8 pt-12 pb-8 flex justify-between items-center">
          <h2 className="text-[#151547] text-medium text-lg md:text-2xl tracking-[-0.04em]">SD-752069247</h2>
          <Link href="/" className="inline-block text-[#1C5FE8] px-3 py-2 border border-[#1C5FE81A] rounded-md lg:rounded-xl hover:bg-gray-100 focus:outline-none focus:ring focus:ring-offset-.5 focus:ring-[#1C5FE8]"> View Driver’s details
          </Link>
        </div>

        <div className="border-b border-black border-opacity-10 px-6">
          <ul className="flex">
            <li><button onClick={() => setActiveTab("shippingInfo")} className={`px-4 py-2.5 text-[#646567] tracking-[-0.04em] text-base font-medium ${activeTab === "shippingInfo" ? "border-b border-[#1C5FE8]" : "border-b border-[#1C5FE8] border-opacity-0"}`}> Shipping Info</button></li>
            <li><button onClick={() => setActiveTab("vehicleInfo")} className={`px-4 py-2.5 text-[#646567] tracking-[-0.04em] text-base font-medium ${activeTab === "vehicleInfo" ? "border-b border-[#1C5FE8]" : "border-b border-[#1C5FE8] border-opacity-0"}`}>Shipping Info</button></li>
            {/* <li><button onClick={() => setActiveTab("document")} className={`px-4 py-2.5 text-[#646567] tracking-[-0.04em] text-base font-medium ${activeTab === "document" ? "border-b border-[#1C5FE8]" : "border-b border-[#1C5FE8] border-opacity-0"}`} >Document</button></li>
            <li><button onClick={() => setActiveTab("billing")} className={`px-4 py-2.5 text-[#646567] tracking-[-0.04em] text-base font-medium ${activeTab === "billing" ? "border-b border-[#1C5FE8]" : "border-b border-[#1C5FE8] border-opacity-0"}`} >Billing</button></li> */}
          </ul>
        </div>
        <div className="p-4 lg:p-6">
          {activeTab === "shippingInfo" &&
            <div>
              <div className="border border-black border-opacity-10 rounded-md lg:rounded-xl p-2.5 flex flex-wrap items-center mb-3 lg:mb-4">
                <div className="w-10/12 pl-8 pr-2 relative">
                  <svg className="absolute left-2 top-4" width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.66667 6.33333C4.22464 6.33333 3.80072 6.15774 3.48816 5.84518C3.1756 5.53262 3 5.10869 3 4.66667C3 4.22464 3.1756 3.80072 3.48816 3.48816C3.80072 3.17559 4.22464 3 4.66667 3C5.1087 3 5.53262 3.17559 5.84518 3.48816C6.15774 3.80072 6.33334 4.22464 6.33334 4.66667C6.33334 4.88554 6.29023 5.10226 6.20647 5.30447C6.12271 5.50668 5.99994 5.69041 5.84518 5.84518C5.69042 5.99994 5.50668 6.12271 5.30447 6.20647C5.10226 6.29022 4.88554 6.33333 4.66667 6.33333ZM4.66667 0C3.42899 0 2.24201 0.491665 1.36684 1.36683C0.491665 2.242 0 3.42899 0 4.66667C0 8.16667 4.66667 13.3333 4.66667 13.3333C4.66667 13.3333 9.33334 8.16667 9.33334 4.66667C9.33334 3.42899 8.84167 2.242 7.9665 1.36683C7.09133 0.491665 5.90435 0 4.66667 0Z" fill="#1C5FE8" />
                  </svg>
                  <h3 className="text-black  tracking-[-0.04em] text-sm font-medium m-0">Mountain View, IL 65757</h3>
                  <p className="text-[#666666] text-[13px] font-medium tracking-[-0.04em] mb-0">#21 maple Lane</p>
                </div>
                <div className="w-2/12 text-right">
                  <button className="border-0 bg-transparent p-0">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.545 6.765L11.235 7.455L4.44 14.25H3.75V13.56L10.545 6.765ZM13.245 2.25C13.0575 2.25 12.8625 2.325 12.72 2.4675L11.3475 3.84L14.16 6.6525L15.5325 5.28C15.602 5.21061 15.6572 5.1282 15.6948 5.03747C15.7325 4.94674 15.7518 4.84948 15.7518 4.75125C15.7518 4.65302 15.7325 4.55576 15.6948 4.46503C15.6572 4.3743 15.602 4.29189 15.5325 4.2225L13.7775 2.4675C13.6275 2.3175 13.44 2.25 13.245 2.25ZM10.545 4.6425L2.25 12.9375V15.75H5.0625L13.3575 7.455L10.545 4.6425Z" fill="#1C5FE8" />
                    </svg>
                  </button>
                </div>
              </div>
              <div class="mb-3 lg:mb-4">
                <iframe class="rounded-md md:rounded-xl w-full border-0" src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d2510041.546925639!2d-5.405544239113983!3d52.09406503175645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x487bc2b6df4b4ebb%3A0x435f66ea8a40e5fa!2s40%20Broomfield%20Ave%2C%20Halifax%2C%20UK!3m2!1d53.7050426!2d-1.8706405!4m5!1s0x486b79ecb050b0bf%3A0xd5cb6cfda4810baf!2sHellandbridge%2C%20Bodmin%20PL30%204QR%2C%20UK!3m2!1d50.510976899999996!2d-4.7311059!5e0!3m2!1sen!2sin!4v1737700026096!5m2!1sen!2sin" width="100%" height="350" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
              </div>
              <div className="border border-black border-opacity-10 rounded-md lg:rounded-xl mb-3 lg:mb-4">
                <div className="border-b border-black border-opacity-10  px-4 lg:px-5 py-3 lg:py-4 flex flex-wrap justify-between">
                  <div className="w-7/12">
                    <h3 className="text-[#151547] text-medium text-base tracking-[-0.04em] m-0"><span className="text-[#727272]">Cargo ID:</span> #64756757</h3>
                  </div>
                  <div className="max-w-[100px]">
                    <Status status={"Pick-Up"} />
                  </div>
                </div>
                <div className="border-b border-black border-opacity-10 px-4 lg:px-5 py-3 lg:py-4  ">
                  <div className="flex flex-wrap relative pb-8">
                    <div className="w-6/12 pl-6 relative">
                      <div className="h-[68px] w-[1px] border-r-2 border-black border-dashed border-opacity-20 absolute top-[10px] left-[7px]"></div>
                      <div className="absolute rounded-full left-0 top-1 bg-white border-4 border-[#1C5FE8] h-[15px] w-[15px]" ></div>
                      <h3 className="text-black  tracking-[-0.04em] text-sm font-medium m-0">06.05.2023</h3>
                      <p className="text-[#666666] text-[12px] font-medium tracking-[-0.04em] mb-0">8:00 AM</p>
                    </div>
                    <div className="w-6/12 ">
                      <h3 className="text-black  tracking-[-0.04em] text-sm font-medium m-0">Anytown, NY 12335</h3>
                      <p className="text-[#666666] text-[12px] font-medium tracking-[-0.04em] mb-0">1234 Main St</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap relative">
                    <div className="w-6/12 pl-6 relative">
                      <div className="absolute rounded-full left-0 top-1 bg-[#fff] border-4 border-[#1C5FE8]  h-[15px] w-[15px]" ></div>
                      <h3 className="text-black  tracking-[-0.04em] text-sm font-medium m-0">06.05.2023</h3>
                      <p className="text-[#666666] text-[12px] font-medium tracking-[-0.04em] mb-0">8:00 AM</p>
                    </div>
                    <div className="w-6/12 ">
                      <h3 className="text-black  tracking-[-0.04em] text-sm font-medium m-0">Anytown, NY 12335</h3>
                      <p className="text-[#666666] text-[12px] font-medium tracking-[-0.04em] mb-0">1234 Main St</p>
                    </div>
                  </div>
                </div>
                <div className="px-4 lg:px-5 py-3 lg:py-4 flex flex-wrap justify-between items-center">
                  <div className="w-10/12 pl-12 pr-2 relative">
                    <div className="absolute rounded-full left-0 top-1 bg-[#D9D9D9] h-[35px] w-[35px]" ></div>
                    <h3 className="text-black  tracking-[-0.04em] text-sm font-medium m-0">Ava Thomas</h3>
                    <p className="text-[#666666] text-[12px] font-medium tracking-[-0.04em] mb-0">User</p>
                  </div>
                  <div className="w-2/12 text-right">
                    <button className="bg-[#1C5FE8] bg-opacity-10 rounded-lg text-[#1C5FE8] px-5 py-2.5">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.48578 1.54494L5.59264 1.21123C5.95794 1.10127 6.35076 1.12795 6.69784 1.28629C7.04492 1.44464 7.32254 1.72383 7.47892 2.0718L8.25492 3.79751C8.38961 4.0969 8.42715 4.43095 8.36227 4.75276C8.2974 5.07457 8.13336 5.36798 7.89321 5.5918L6.71206 6.69237C6.55378 6.84266 6.67378 7.42837 7.25206 8.43066C7.83092 9.43351 8.27835 9.83008 8.48464 9.76837L10.0321 9.29523C10.3457 9.19929 10.6816 9.2039 10.9925 9.30842C11.3034 9.41295 11.5738 9.61214 11.7658 9.87808L12.8686 11.4067C13.0914 11.7153 13.1945 12.0944 13.1589 12.4733C13.1233 12.8523 12.9513 13.2055 12.6749 13.4672L11.8223 14.2747C11.5471 14.5353 11.2077 14.7183 10.8387 14.8049C10.4696 14.8915 10.0842 14.8787 9.72178 14.7678C7.93549 14.2209 6.28121 12.5981 4.73664 9.92208C3.18864 7.24208 2.60406 4.98151 3.01149 3.13466C3.09367 2.76252 3.2736 2.41902 3.53275 2.13959C3.79189 1.86015 4.12088 1.65488 4.48578 1.54494Z" fill="#1C5FE8" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          }
          {activeTab === "vehicleInfo" && <div>
            <div className="border border-black border-opacity-10 rounded-md lg:rounded-xl mb-3 lg:mb-4 p-4 ">
              <div className="flex flex-wrap items-center mb-4">
                <div class="border border-black border-opacity-10 py-2 px-3 rounded-md lg:rounded-xl mr-2">
                  <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" color="#1C5FE8" height="24" width="24" xmlns="http://www.w3.org/2000/svg"  ><path d="M8.96456 18C8.72194 19.6961 7.26324 21 5.5 21C3.73676 21 2.27806 19.6961 2.03544 18H1V6C1 5.44772 1.44772 5 2 5H16C16.5523 5 17 5.44772 17 6V8H20L23 12.0557V18H20.9646C20.7219 19.6961 19.2632 21 17.5 21C15.7368 21 14.2781 19.6961 14.0354 18H8.96456ZM15 7H3V15.0505C3.63526 14.4022 4.52066 14 5.5 14C6.8962 14 8.10145 14.8175 8.66318 16H14.3368C14.5045 15.647 14.7296 15.3264 15 15.0505V7ZM17 13H21V12.715L18.9917 10H17V13ZM17.5 19C18.1531 19 18.7087 18.5826 18.9146 18C18.9699 17.8436 19 17.6753 19 17.5C19 16.6716 18.3284 16 17.5 16C16.6716 16 16 16.6716 16 17.5C16 17.6753 16.0301 17.8436 16.0854 18C16.2913 18.5826 16.8469 19 17.5 19ZM7 17.5C7 16.6716 6.32843 16 5.5 16C4.67157 16 4 16.6716 4 17.5C4 17.6753 4.03008 17.8436 4.08535 18C4.29127 18.5826 4.84689 19 5.5 19C6.15311 19 6.70873 18.5826 6.91465 18C6.96992 17.8436 7 17.6753 7 17.5Z"></path></svg>
                </div>
                <div>
                  <h3 className="text-[#151547] text-base font-medium tracking-[-0.05em] uppercase">Driver</h3>
                  <p className="text-[#666666] text-[13px] font-medium tracking-[-0.04em] mb-0">Truck</p>
                </div>
              </div>
              <div className="flex flex-wrap">
                <div className="w-4/12 pr-1 flex">
                  <div>
                    <h3 className="text-black  tracking-[-0.04em] text-sm font-medium m-0">Truck number</h3>
                    <p className="text-[#666666] text-[12px] font-medium tracking-[-0.04em] mb-0">XL 436464</p>
                  </div>
                </div>
                <div className="w-4/12 pr-1 pl-1 text-center border-r border-l border-black border-opacity-10 flex justify-center ">
                  <div>
                    <h3 className="text-black  tracking-[-0.04em] text-sm font-medium m-0">Truck type</h3>
                    <p className="text-[#666666] text-[12px] font-medium tracking-[-0.04em] mb-0">Flatbed truck</p>
                  </div>
                </div>
                <div className="w-4/12 pr-1 flex justify-end">
                  <div>
                    <h3 className="text-black  tracking-[-0.04em] text-sm font-medium m-0 ">Trailer Number</h3>
                    <p className="text-[#666666] text-[12px] font-medium tracking-[-0.04em] mb-0">TN- 33-34-1</p>
                  </div>
                </div>
              </div>
            </div>

          </div>}
          {/* {activeTab === "document" && <div>document Information Content</div>}
            {activeTab === "billing" && <div>document Information Content</div>} */}
        </div>


      </Sidepopup>
      <ViewShipment isOpen={isPopupOpen} onClose={closePopup} data={data} />
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { RiTruckLine } from "react-icons/ri";
import Link from "next/link";
import RecentShipment from "./RecentShipment";
import Demo from "./Demo";
import Details from "../api/Listing/Details";
import ShipmentTable from "./ShipmentTable";
import Loader from "@/components/Loader";
import NoData from "@/components/NoData";

export default function CarrierDashboard() {
  const [listing, setLisitng] = useState("");
  const [Loading, setLoading] = useState(false);

  const getData = () => {
    setLoading(true);
    const main = new Details();
    main
      .Dashboard()
      .then((r) => {
        setLoading(false);
        setLisitng(r?.data?.data);
      })
      .catch((err) => {
        setLoading(false);
        setLisitng([]);
        console.log("error", err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const metrics = [
    {
      id: 1,
      title: "Total Shipment",
      value: listing?.Shipment || 0,
    },
    {
      id: 2,
      title: "Pending",
      value:
        listing?.statusCounts?.find((user) => user._id === "pending")?.count ||
        0,
    },
    {
      id: 3,
      title: "In Transit",
      value:
        listing?.statusCounts?.find((user) => user._id === "transit")?.count ||
        0,
    },
    {
      id: 3,
      title: "Delivered",
      value:
        listing?.statusCounts?.find((user) => user._id === "delivered")
          ?.count || 0,
    },
  ];

  const shipmentTracks = [
    {
      number: "#001234ABCD",
      startLocation: "40 Broomfield Places",
      endLocation: "Helland Bridge",
      image: "/images/truck.png",
    },
    {
      number: "#001234ABCE",
      startLocation: "40 Broomfield Places",
      endLocation: "Helland Bridge",
      image: "/images/truck.png",
    },
  ];

  function truncateString(str, charLimit) {
    if (str.length <= charLimit) return str;
    return str.slice(0, charLimit) + "...";
  }
  const formatDate = (isoString) => {
    if (!isoString) return "";
    return new Date(isoString)?.toISOString()?.split("T")[0];
  };

  return (
    <>
      {Loading ? (
        <Loader />
      ) : (
        <>
          {/* Header Section */}
          <br />
          <div className="flex md:items-center justify-between flex-col md:flex-row mb-4 space-y-4 md:space-y-0">
            <h1 className="text-[#151547] text-lg tracking-[-0.04em] font-medium m-0">
              Overview
            </h1>
            <div className="flex flex-wrap items-center justify-between space-x-2 lg:space-x-4">
              {/* <select className="border border-black rounded-md lg:rounded-xl bg-white border-opacity-10 w-[105px] h-11 lg:h-12 px-2.5 lg:px-3.5 text-[#151547] font-medium text-base tracking-[-0.04em]">
                <option>Week</option>
              </select> */}
              <Link
                href="/drivers/add"
                className="bg-[#1C5FE8] hover:bg-[#0a3fab] inline-block font-medium text-base text-white tracking-[-0.04em] rounded-lg lg:rounded-xl px-5 py-3"
              >
                <span className="mr-1">+</span> Add Driver
              </Link>
            </div>
          </div>

          {/* Data Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
            {metrics &&
              metrics?.map((metric, index) => {
                return (
                  <div
                    key={index}
                    className="bg-white p-4 lg:p-5 border border-black border-opacity-10 rounded-md lg:rounded-xl"
                  >
                    <div className="flex justify-between">
                      <h2 className="text-sm font-normal text-[#7A7A7A] tracking-[-0.04em]">
                        {metric?.title}
                      </h2>
                      <div className="border border-black border-opacity-10 py-2 px-3 rounded-md lg:rounded-xl">
                        <RiTruckLine size={24} color={"#1C5FE8"} />
                      </div>
                    </div>
                    <p className="text-[30px] font-medium text-[#262626] tracking-[-0.06em]">
                      {metric?.value}
                    </p>
                    {/* <p className="text-[#7A7A7A] text-sm font-normal tracking-[-0.06em]">
                In last Week {" "}
                <span className={`ml-2 text-[13px] font-normal py-[3px] px-1.5 rounded-full ${bgClass}`}>{metric?.change}</span>
              </p> */}
                  </div>
                );
              })}
          </div>
          <div className="bg-white mt-6 lg:mt-[30px] px-6 py-[30px] rounded-md lg:rounded-xl border border-black border-opacity-10">
            <div className="flex flex-wrap -mx-[2.5] ">
              {/* Ongoing Delivery */}
              <div className="w-full lg:w-6/12 px-2.5">
                <div className="flex flex-wrap items-center -mx-2 mb-[12px]">
                  <div className="w-full md:w-8/12 px-2 flex flex-wrap items-center">
                    <div className="border border-black border-opacity-10 py-2 px-3 rounded-md lg:rounded-xl mr-2">
                      <RiTruckLine size={24} color={"#1C5FE8"} />
                    </div>
                    <h3 className="text-[#151547] text-base tracking-[-0.04em] font-medium mb-0">
                      Ongoing Delivery
                    </h3>
                  </div>
                  <div className="w-full md:w-4/12 px-2 flex flex-wrap justify-end">
                    {/* <button className="border border-black border-opacity-10 py-1 px-2.5 rounded lg:rounded-lg">
                      <svg
                        className="inline align-middle mr-1.5 -mt-[2px]"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.9125 7.93982H5.39913M2.04116 7.93982H0.66748M2.04116 7.93982C2.04116 7.49463 2.21801 7.06767 2.53281 6.75287C2.84761 6.43807 3.27457 6.26122 3.71976 6.26122C4.16495 6.26122 4.59191 6.43807 4.90671 6.75287C5.22151 7.06767 5.39836 7.49463 5.39836 7.93982C5.39836 8.38501 5.22151 8.81197 4.90671 9.12677C4.59191 9.44157 4.16495 9.61842 3.71976 9.61842C3.27457 9.61842 2.84761 9.44157 2.53281 9.12677C2.21801 8.81197 2.04116 8.38501 2.04116 7.93982ZM14.9125 13.0272H10.4865M10.4865 13.0272C10.4865 13.4725 10.3092 13.8999 9.99437 14.2148C9.6795 14.5297 9.25244 14.7066 8.80715 14.7066C8.36196 14.7066 7.935 14.529 7.6202 14.2142C7.3054 13.8994 7.12855 13.4724 7.12855 13.0272M10.4865 13.0272C10.4865 12.5819 10.3092 12.1552 9.99437 11.8404C9.6795 11.5255 9.25244 11.3486 8.80715 11.3486C8.36196 11.3486 7.935 11.5255 7.6202 11.8403C7.3054 12.1551 7.12855 12.582 7.12855 13.0272M7.12855 13.0272H0.66748M14.9125 2.85243H12.5216M9.16366 2.85243H0.66748M9.16366 2.85243C9.16366 2.40724 9.34051 1.98028 9.65531 1.66548C9.97011 1.35068 10.3971 1.17383 10.8423 1.17383C11.0627 1.17383 11.281 1.21725 11.4846 1.3016C11.6883 1.38596 11.8733 1.50961 12.0292 1.66548C12.1851 1.82135 12.3087 2.0064 12.3931 2.21006C12.4774 2.41371 12.5209 2.63199 12.5209 2.85243C12.5209 3.07287 12.4774 3.29114 12.3931 3.4948C12.3087 3.69846 12.1851 3.8835 12.0292 4.03938C11.8733 4.19525 11.6883 4.31889 11.4846 4.40325C11.281 4.48761 11.0627 4.53103 10.8423 4.53103C10.3971 4.53103 9.97011 4.35418 9.65531 4.03938C9.34051 3.72458 9.16366 3.29762 9.16366 2.85243Z"
                          stroke="#151547"
                          stroke-width="1.155"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                        />
                      </svg>
                      Filter
                    </button> */}
                  </div>
                </div>
                <div className="space-y-3 lg:space-y-4">
                  {listing &&
                  listing?.ShipmentData &&
                  listing?.ShipmentData?.length === 0 ? (
                    <NoData
                      Heading={"No Shipment available"}
                      content={
                        "You don't have any data to view at the moment. Please come later"
                      }
                    />
                  ) : (
                    listing?.ShipmentData &&
                    listing?.ShipmentData?.slice(0, 2)?.map(
                      (shipmentTrack, index) => (
                        <div
                          key={index}
                          className="border border-black border-opacity-10 p-4 lg:p-5 rounded-md lg:rounded-xl flex flex-wrap"
                        >
                          <div className="w-full md:w-7/12 pr-3">
                            <div className="text-[#7A7A7A] uppercase text-sm tracking-[-0.04em] mb-2">
                              shipment name
                            </div>
                            <h3 className="text-[#262626] font-medium text-xl lg:text-2xl tracking-[-0.06em] mb-2 capitalize">
                              {truncateString(shipmentTrack?.name, 15) || ""}
                            </h3>
                            <div className="flex flex-wrap items-center lg:space-x-2">
                              <svg
                                className="inline "
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M8.00003 1.33301C11.6819 1.33301 14.6667 4.31779 14.6667 7.99966C14.6667 11.6816 11.6819 14.6664 8.00003 14.6664C4.31816 14.6664 1.33337 11.6816 1.33337 7.99966C1.33337 4.31779 4.31816 1.33301 8.00003 1.33301ZM8.00003 2.66635C5.05453 2.66635 2.66672 5.05416 2.66672 7.99966C2.66672 10.9452 5.05453 13.333 8.00003 13.333C10.9456 13.333 13.3334 10.9452 13.3334 7.99966C13.3334 5.05416 10.9456 2.66635 8.00003 2.66635ZM8.00003 4.66635C9.84097 4.66635 11.3334 6.15873 11.3334 7.99966C11.3334 9.8406 9.841 11.333 8.00003 11.333C6.15909 11.333 4.66672 9.84063 4.66672 7.99966C4.66672 6.15873 6.15909 4.66635 8.00003 4.66635Z"
                                  fill="#3D9D82"
                                />
                              </svg>
                              <span className="text-[#666666] text-[13px] tracking-[-0.06em]">
                                {truncateString(
                                  shipmentTrack?.pickup_location,
                                  10
                                )}
                              </span>
                              <svg
                                className="inline "
                                width="21"
                                height="22"
                                viewBox="0 0 21 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M3.52826 11.1308L16.859 10.8701M16.859 10.8701L11.9577 15.9669M16.859 10.8701L11.7622 5.96884"
                                  stroke="#666666"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                              <svg
                                className="inline "
                                width="17"
                                height="16"
                                viewBox="0 0 17 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M8.38719 7.66634C7.94516 7.66634 7.52124 7.49075 7.20868 7.17819C6.89612 6.86562 6.72052 6.4417 6.72052 5.99967C6.72052 5.55765 6.89612 5.13372 7.20868 4.82116C7.52124 4.5086 7.94516 4.33301 8.38719 4.33301C8.82922 4.33301 9.25314 4.5086 9.5657 4.82116C9.87826 5.13372 10.0539 5.55765 10.0539 5.99967C10.0539 6.21854 10.0107 6.43527 9.92699 6.63748C9.84323 6.83969 9.72046 7.02342 9.5657 7.17819C9.41094 7.33295 9.2272 7.45572 9.02499 7.53947C8.82278 7.62323 8.60606 7.66634 8.38719 7.66634ZM8.38719 1.33301C7.14951 1.33301 5.96253 1.82467 5.08736 2.69984C4.21219 3.57501 3.72052 4.762 3.72052 5.99967C3.72052 9.49967 8.38719 14.6663 8.38719 14.6663C8.38719 14.6663 13.0539 9.49967 13.0539 5.99967C13.0539 4.762 12.5622 3.57501 11.687 2.69984C10.8119 1.82467 9.62487 1.33301 8.38719 1.33301Z"
                                  fill="#1C5FE8"
                                />
                              </svg>
                              <span className="text-[#666666] text-[13px] tracking-[-0.06em]">
                                {truncateString(
                                  shipmentTrack?.drop_location,
                                  10
                                )}
                              </span>
                            </div>
                          </div>
                          <div className="w-full md:w-5/12 text-right">
                            <img
                              src="/images/truck.png"
                              className="max-w-full inline"
                              alt="img"
                            />
                          </div>
                        </div>
                      )
                    )
                  )}
                </div>
              </div>
              {/* On the way */}
              <div className="w-full lg:w-6/12 px-2.5">
                {listing &&
                listing?.ShipmentData &&
                listing?.ShipmentData?.length === 0 ? (
                  <NoData
                    Heading={"No Shipment available"}
                    content={
                      "You don't have any data to view at the moment. Please come later"
                    }
                  />
                ) : (
                  <>
                    <div className="flex flex-wrap items-center -mx-2 mb-4 lg:mb-5">
                      <div className="w-full md:w-8/12 px-2 flex flex-wrap items-center">
                        <h3 className="text-[#151547] text-base tracking-[-0.05em] font-medium mb-0">
                          On the way
                        </h3>
                      </div>
                      <div className="w-full md:w-4/12 px-2 flex flex-wrap justify-end">
                        <span className="text-[#7A7A7A] text-sm tracking-[-0.04em] font-medium mb-0">
                          {formatDate(
                            listing &&
                              listing?.ShipmentData &&
                              listing?.ShipmentData[0]?.created_at
                          ) || ""}
                        </span>
                      </div>
                    </div>
                    <div className="mb-4 lg:mb-6">
                      <iframe
                        className="rounded-md md:rounded-xl w-full border-0"
                        src={`https://www.google.com/maps/embed/v1/directions?key=${
                          process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
                        }&origin=${
                          (listing &&
                            listing?.ShipmentData &&
                            listing?.ShipmentData[0]?.pickup_location) ||
                          ""
                        }&destination=${
                          (listing &&
                            listing?.ShipmentData &&
                            listing?.ShipmentData[0]?.drop_location) ||
                          ""
                        }&mode=driving`}
                        width="100%"
                        height="224"
                        allowfullscreen=""
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"
                      ></iframe>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-1.5 lg:gap-2 xl:gap-3">
                      <div className="md:[&:not(:last-child)]:border-r border-black border-opacity-10">
                        <h3 className="text-sm xl:text-base text-[#7A7A7A] tracking-[-0.04em] font-medium mb-0">
                          Category
                        </h3>
                        <p className="text-base text-[#262626] tracking-[-0.04em] font-medium mb-0 capitalize">
                          {(listing &&
                            listing?.ShipmentData &&
                            listing?.ShipmentData[0]?.typeOfGoods) ||
                            ""}
                        </p>
                      </div>
                      <div className="md:[&:not(:last-child)]:border-r border-black border-opacity-10">
                        <h3 className="text-sm xl:text-base text-[#7A7A7A] tracking-[-0.04em] font-medium mb-0">
                          Distance
                        </h3>
                        <p className="text-base text-[#262626] tracking-[-0.04em] font-medium mb-0 capitalize">
                          N/A
                        </p>
                      </div>
                      <div className="md:[&:not(:last-child)]:border-r border-black border-opacity-10">
                        <h3 className="text-sm xl:text-base text-[#7A7A7A] tracking-[-0.04em] font-medium mb-0">
                          Estimation
                        </h3>
                        <p className="text-base text-[#262626] tracking-[-0.04em] font-medium mb-0 capitalize">
                          N/A
                        </p>
                      </div>
                      <div className="md:[&:not(:last-child)]:border-r border-black border-opacity-10">
                        <h3 className="text-sm xl:text-base text-[#7A7A7A] tracking-[-0.04em] font-medium mb-0">
                          Weight
                        </h3>
                        <p className="text-base text-[#262626] tracking-[-0.04em] font-medium mb-0 capitalize">
                          {(listing &&
                            listing?.ShipmentData &&
                            listing?.ShipmentData[0]?.weight) ||
                            ""}
                        </p>
                      </div>
                      <div className="md:[&:not(:last-child)]:border-r border-black border-opacity-10">
                        <h3 className="text-sm xl:text-base text-[#7A7A7A] tracking-[-0.04em] font-medium mb-0">
                          Fee
                        </h3>
                        <p className="text-base text-[#262626] tracking-[-0.04em] font-medium mb-0 capitalize">
                          ${" "}
                          {(listing &&
                            listing?.ShipmentData &&
                            listing?.ShipmentData[0]?.cost) ||
                            ""}
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          {/* Recent Shipment */}
          <div className="bg-white mt-6 lg:mt-[30px] px-6 py-[30px] rounded-md lg:rounded-xl border border-black border-opacity-10">
            <div className="flex flex-wrap items-center -mx-2 mb-[12px]">
              <div className="w-full md:w-4/12 px-2 flex flex-wrap items-center">
                <div className="border border-black border-opacity-10 py-2 px-3 rounded-md lg:rounded-xl mr-2">
                  <RiTruckLine size={24} color={"#1C5FE8"} />
                </div>
                <h3 className="text-[#151547] text-base tracking-[-0.04em] font-medium mb-0">
                  Recent Shipment
                </h3>
              </div>
            </div>

            {/* <RecentShipment /> */}
            <ShipmentTable
              shipments={listing?.ShipmentData}
              getShipments={getData}
              role={"carrier"}
            />
          </div>
        </>
      )}
    </>
  );
}

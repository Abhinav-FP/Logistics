import React, { useEffect, useState } from "react";
import { RiTruckLine } from "react-icons/ri";
import Link from "next/link";
import Details from "../api/Listing/Details";
import ShipmentTable from "./ShipmentTable";
import Loader from "@/components/Loader";

export default function ShipperDashboard() {
  const [listing, setLisitng] = useState("");
  const [Loading, setLoading] = useState(false);

  const getData = () => {
    setLoading(true);
    const main = new Details();
    main
      .ShipperDashboard()
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
      title: "Pending",
      value:
        listing?.statusCounts?.find((user) => user._id === "pending")?.count ||
        0,
    },
    {
      title: "IN TRANSIT",
      value:
        listing?.statusCounts?.find((user) => user._id === "transit")?.count ||
        0,
    },
    {
      title: "DELIVERED",
      value:
        listing?.statusCounts?.find((user) => user._id === "delivered")
          ?.count || 0,
    },
    {
      title: "TOTAL SHIPMENT",
      value: listing?.Shipment || 0,
    },
    {
      title: "Total Brokers",
      value: listing?.Users?.find((user) => user._id === "broker")?.count || 0,
    },
    {
      title: "Total Customers",
      value:
        listing?.Users?.find((user) => user._id === "customer")?.count || 0,
    },
  ];

  return (
    <>
      {Loading ? (
        <Loader />
      ) : (
        <>
          <div>
            {/* Header Section */}
            <div className="flex md:items-center justify-between flex-col md:flex-row  mb-4 space-y-4 md:space-y-0">
              <h1 className="text-[#151547] text-lg tracking-[-0.04em] font-medium m-0">
                Overview
              </h1>
              <div className="flex flex-wrap items-center justify-between space-x-2 lg:space-x-4">
                <select className="border border-black rounded-md lg:rounded-xl bg-white border-opacity-10 w-[105px] h-11 lg:h-12 px-2.5 lg:px-3.5 text-[#151547] font-medium text-base tracking-[-0.04em]">
                  <option>Week</option>
                </select>
                <Link
                  href="/shipment/add"
                  className="bg-[#1C5FE8] hover:bg-[#0a3fab] inline-block font-medium text-base text-white tracking-[-0.04em] rounded-lg lg:rounded-xl px-5 py-3  "
                >
                  <span className="mr-1">+</span> New Shipments
                </Link>
              </div>
            </div>

            {/* Metrics Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
              {metrics.map((metric, index) => (
                <div
                  key={index}
                  className="bg-white p-4 lg:p-5 border border-black border-opacity-10 rounded-md lg:rounded-xl"
                >
                  <div className="flex justify-between">
                    <h2 className="text-sm font-normal text-[#7A7A7A] tracking-[-0.04em] uppercase">
                      {metric?.title}
                    </h2>
                    <div className="border border-black border-opacity-10 py-2 px-3 rounded-md lg:rounded-xl">
                      <RiTruckLine size={24} color={"#1C5FE8"} />
                    </div>
                  </div>
                  <p className="text-[30px] font-medium text-[#262626] tracking-[-0.06em]">
                    {metric.value}
                  </p>
                  <p className="text-[#7A7A7A] text-sm font-normal tracking-[-0.06em]">
                    In last Week
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white mt-6 lg:mt-[30px] px-5 lg:px-6 py-5 lg:py-[30px] rounded-md lg:rounded-xl border border-black border-opacity-10">
            <h2 className="text-[#151547] text-lg tracking-[-0.04em] font-medium mb-4 lg:mb-5">
              Shipment Listing
            </h2>
            <ShipmentTable
              shipments={listing?.ShipmentData}
              getShipments={getData}
              DeleteOption={true}
              role={"shipper"}
            />
          </div>
        </>
      )}
    </>
  );
}

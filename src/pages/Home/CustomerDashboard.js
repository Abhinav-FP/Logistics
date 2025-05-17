import React, { useEffect, useState } from "react";
import { RiTruckLine } from "react-icons/ri";
import ShipmentTable from "./ShipmentTable";
import Details from "../api/Listing/Details";
import Loader from "@/components/Loader";
import NoData from "@/components/NoData";

export default function CustomerDashboard() {
  const [listing, setLisitng] = useState("");
  const [loading, setLoading] = useState(false);

  const getData = () => {
    setLoading(true);
    const main = new Details();
    main
      .UserDashboard()
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

  function truncateString(str, charLimit) {
    if (str.length <= charLimit) return str;
    return str.slice(0, charLimit) + "...";
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          {/* Header Section */}
          <div className="flex md:items-center justify-between flex-col md:flex-row  mb-4 space-y-4 md:space-y-0">
            <h1 className="text-[#151547] text-lg tracking-[-0.04em] font-medium m-0">
              Overview
            </h1>
          </div>

          {/* Recent Shipment */}
          <div className="bg-white mt-6 lg:mt-[30px] px-6 py-[30px] rounded-md lg:rounded-xl border border-black border-opacity-10">
            <ShipmentTable
              shipments={listing?.ShipmentData}
              role={"customer"}
              getShipments ={getData}
            />
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
                  <div className="w-full md:w-4/12 px-2 flex flex-wrap justify-end"></div>
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
                    // listing?.ShipmentData &&
                    // listing?.ShipmentData?.slice(0, 2)?.map(
                    //   (shipmentTrack, index) => (
                        <div
                          // key={index}
                          className="border border-black border-opacity-10 p-4 lg:p-5 rounded-md lg:rounded-xl flex flex-wrap"
                        >
                          <div className="w-full md:w-7/12 pr-3">
                            <div className="text-[#7A7A7A] uppercase text-sm tracking-[-0.04em] mb-2">
                              shipment name
                            </div>
                            <h3 className="text-[#262626] font-medium text-xl lg:text-2xl tracking-[-0.06em] mb-2 capitalize">
                              {truncateString(listing &&
                            listing?.ShipmentData && listing?.ShipmentData[0]?.name, 15) || ""}
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
                                {truncateString(listing &&
                                  listing?.ShipmentData && 
                                  listing?.ShipmentData[0]?.pickup_location,
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
                                {truncateString(listing &&
                                  listing?.ShipmentData && 
                                  listing?.ShipmentData[0]?.drop_location,
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
                    //   )
                    // )
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
                      4/12/2024
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
                          Dimensions
                        </h3>
                        <p className="text-base text-[#262626] tracking-[-0.04em] font-medium mb-0 capitalize">
                          {(listing &&
                            listing?.ShipmentData &&
                            listing?.ShipmentData[0]?.dimensions) ||
                            ""}
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
                          Payment
                        </h3>
                        <p className="text-base text-[#262626] tracking-[-0.04em] font-medium mb-0 capitalize">
                          {(listing &&
                            listing?.ShipmentData &&
                            listing?.ShipmentData[0]?.paymentStatus) ||
                            ""}
                        </p>
                      </div>
                  <div className="md:[&:not(:last-child)]:border-r border-black border-opacity-10">
                    <h3 className="text-sm xl:text-base text-[#7A7A7A] tracking-[-0.04em] font-medium mb-0">
                      Cost
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
        </div>
      )}
    </>
  );
}

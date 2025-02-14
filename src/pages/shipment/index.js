import Layout from "@/layout/Layout";
import React, { useEffect, useState } from "react";
import ShipmentTable from "../Home/ShipmentTable";
import Link from "next/link";
import Details from "../api/Listing/Details";
import Loader from "@/components/Loader";
import { useRole } from "@/context/RoleContext";
import { useRouter } from "next/router";

export default function Index() {
  const { user } = useRole();
  const [listing, setListing] = useState("");
  const [Loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("");
  const router = useRouter();

  const getShipments = async (name="") => {
    setLoading(true);
    try {
      const main = new Details();
      let response;
      if (user?.role === "broker") {
        response = await main.getBrokerShipment(name);
      } else if (user?.role === "carrier") {
        response = await main.getcarrierShipment(name);
      } else if (user?.role === "customer") {
        response = await main.getcustomerShipment(name);
      } else if (user?.role === "shipper") {
        response = await main.getShipperShipment(name);
      } else {
        response = await main.getShipment(name);
      }
      setListing(response?.data?.data);
    } catch (err) {
      setListing([]);
      console.log("Error fetching shipments:", err);

      if (err.response) {
        if (err.response.status === 401) {
          router.push("/login");
        } else if (err.response.status === 403) {
          router.push("/forbidden");
        }
      } else {
        console.log("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role) {
      getShipments();
    }
  }, [user?.role]);

  const handleFilterChange = (name) => {
    setFilter(name);
    getShipments(name);
  };

  return (
    <Layout page={"Shipment"}>
      <div>
        <div className="flex items-center justify-between items-center space-y-4 md:space-y-0">
          <h2 className="text-[#151547] text-lg tracking-[-0.04em] font-medium m-0">
            Shipment Listing{" "}
          </h2>
          {/* <div className="flex overflow-x-auto mb-[20px] md:mb-0 align-items-center py-2 sm:space-x-4 space-x-1 upcomming-box">
            <button className={`font-inter font-medium lg:text-[16px] text-[14px] leading-tight text-center xxl:w-52 px-4 border-2 p-3 mb-2 rounded-full ${filter === "pending"
                ? "bg-[#1C5FE8]  text-white"
                : "bg-white text-[#1C5FE8]"
                }`}
              onClick={() => handleFilterChange("pending")}>
                Pending
            </button>
            <button className={`font-inter font-medium lg:text-[16px] text-[14px] leading-tight text-center xxl:w-52 px-4 border-2 p-3 mb-2 rounded-full ${filter === "transit"
                ? "bg-[#1C5FE8]  text-white"
                : "bg-white text-[#1C5FE8]"
                }`}
              onClick={() => handleFilterChange("transit")}>
                Transit
            </button>
            <button className={`font-inter font-medium lg:text-[16px] text-[14px] leading-tight text-center xxl:w-52 px-4 border-2 p-3 mb-2 rounded-full ${filter === "delivered"
                ? "bg-[#1C5FE8] text-white"
                : "bg-white text-[#1C5FE8]"
                }`}
              onClick={() => handleFilterChange("delivered")}>
                Delivered
            </button>
          </div> */}
          <div className="">
            {user?.role !== "admin" && (
            <div className="flex justify-between flex-wrap gap-4 items-baseline">
              <div className="flex overflow-x-auto align-items-center py-2 sm:space-x-4 space-x-1">
                <select
                  className="font-inter font-medium lg:text-[16px] text-[14px] leading-tight text-center xxl:w-52 px-4 border-2 p-3 mb-2 rounded-full focus:outline-none "
                  value={filter}
                  onChange={(e) => handleFilterChange(e.target.value)}
                >
                   <option value="" className="text-left">
                    All
                  </option>
                  <option value="pending" className="text-left">
                    Pending
                  </option>
                  <option value="transit" className="text-left">
                    Transit
                  </option>
                  <option value="delivered" className="text-left">
                    Delivered
                  </option>
                </select>
              </div>

              {user?.role === "shipper" && (
                <Link
                  href="/shipment/add"
                  className="bg-[#1C5FE8] hover:bg-[#0a3fab] inline-block font-medium text-base text-white tracking-[-0.04em] rounded-lg lg:rounded-xl px-5 py-3"
                >
                  <span className="mr-1">+</span> New Shipments
                </Link>
              )}
            </div>)}
          </div>
        </div>
        <div className="bg-white mt-6 lg:mt-[30px] px-6 py-[30px] rounded-md lg:rounded-xl border border-black border-opacity-10">
          {Loading ? (
            <Loader />
          ) : (
            <ShipmentTable
              shipments={listing}
              getShipments={getShipments}
              DeleteOption={true}
              role={user?.role}
            />
          )}
        </div>
      </div>
    </Layout>
  );
}

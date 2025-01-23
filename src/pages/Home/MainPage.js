import Layout from "@/layout/Layout";
import React from "react";
import Dashboard from "./Dashboard";
import ShipmentTable from "./ShipmentTable";
import BrokerDashboard from "./BrokerDashboard";
import { useRole } from "@/context/RoleContext";

export default function MainPage() {
  const { user } = useRole();

  const data = [
    {
      id: "SHP-001",
      name: "Electronics Delivery",
      pickup_location: "New York, NY",
      drop_location: "Los Angeles, CA",
      status: "In Transit",
      shippingDate: "2024-12-01",
      deliveryDateExpect: "2024-12-08",
    },
    {
      id: "SHP-002",
      name: "Furniture Delivery",
      pickup_location: "Chicago, IL",
      drop_location: "Houston, TX",
      status: "Delivered",
      shippingDate: "2024-11-15",
      deliveryDateExpect: "2024-11-20",
    },
    {
      id: "SHP-003",
      name: "Clothing Shipment",
      pickup_location: "Miami, FL",
      drop_location: "Boston, MA",
      status: "Pending",
      shippingDate: "2024-12-03",
      deliveryDateExpect: "2024-12-09",
    },
    {
      id: "SHP-004",
      name: "Food Delivery",
      pickup_location: "Las Vegas, NV",
      drop_location: "San Diego, CA",
      status: "Cancelled",
      shippingDate: "2024-11-25",
      deliveryDateExpect: "2024-11-28",
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto">
        {user.role === "shipper" ? (
          <>
            <Dashboard />
            <div className="bg-white mt-6 lg:mt-[30px] px-6 py-[30px] rounded-md lg:rounded-xl border border-black border-opacity-10">
              <h2 className="text-[#151547] text-lg tracking-[-0.04em] font-medium mb-4 lg:mb-5">
                Shipment Listing
              </h2>
              <ShipmentTable shipments={data} />
            </div>
          </>
        ) : user.role === "broker" ? (
          <BrokerDashboard />
        ) : null}
      </div>
    </Layout>
  );
}

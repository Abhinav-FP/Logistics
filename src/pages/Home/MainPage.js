import Layout from "@/layout/Layout";
import React from "react";
import BrokerDashboard from "./BrokerDashboard";
import { useRole } from "@/context/RoleContext";
import CarrierDashboard from "./CarrierDashboard";
import CustomerDashboard from "./CustomerDashboard";
import ShipperDashboard from "./ShipperDashboard";

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
      <div className="">
        {user && user?.role === "shipper" ? (
            <ShipperDashboard/>
        ) : user && user?.role === "broker" ? (
          <BrokerDashboard />
        ) : user && user?.role === "carrier" ? (
          <CarrierDashboard />
        ) : <CustomerDashboard/>}
      </div>
    </Layout>
  );
}
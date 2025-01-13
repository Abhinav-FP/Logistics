import Layout from "@/layout/Layout";
import React from "react";
import Dashboard from "./Dashboard";
import ShipmentTable from "./ShipmentTable";

export default function MainPage() {

  const data = [
    { id: 'SHP-001', title: 'Electronics Delivery', pickup: 'New York, NY', delivery: 'Los Angeles, CA', status: 'In Transit', shipmentDate: '2024-12-01', expectedDelivery: '2024-12-08' },
    { id: 'SHP-002', title: 'Furniture Delivery', pickup: 'Chicago, IL', delivery: 'Houston, TX', status: 'Delivered', shipmentDate: '2024-11-15', expectedDelivery: '2024-11-20' },
    { id: 'SHP-003', title: 'Clothing Shipment', pickup: 'Miami, FL', delivery: 'Boston, MA', status: 'Pending', shipmentDate: '2024-12-03', expectedDelivery: '2024-12-09' },
    { id: 'SHP-004', title: 'Food Delivery', pickup: 'Las Vegas, NV', delivery: 'San Diego, CA', status: 'Cancelled', shipmentDate: '2024-11-25', expectedDelivery: '2024-11-28' },
  ];

  return (
      <Layout>
        <div className="container mx-auto">
        <Dashboard/>
        <h2 className="text-lg font-medium mb-3">Shipment Listing </h2>
        <ShipmentTable shipments={data}/>
        </div>
      </Layout>
  );
}

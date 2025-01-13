import Layout from "@/layout/Layout";
import React from "react";
import Dashboard from "./Dashboard";
import ShipmentTable from "./ShipmentTable";

export default function MainPage() {

  return (
      <Layout>
        <Dashboard/>
        <ShipmentTable/>
      </Layout>
  );
}

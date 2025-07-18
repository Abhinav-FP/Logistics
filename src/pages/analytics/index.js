import Layout from "@/layout/Layout";
import React from "react";

export default function index() {
  return (
    <Layout page={"Analytics"}>
      <div class="flex flex-col items-center justify-center h-[80vh] px-4">
        <h1 class="text-4xl font-bold text-gray-800 mb-4">Coming Soon</h1>
        <p class="text-gray-600 text-lg mb-8">
          We do not have any analytics to show at the moment. Please come later!
        </p>
      </div>
    </Layout>
  );
}

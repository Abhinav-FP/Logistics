import Link from "next/link";
import React from "react";

export default function forbidden() {
  return (
    <div class="flex flex-col items-center justify-center h-[80vh] px-4">
      <h1 class="text-4xl font-bold text-gray-800 mb-4">Unauthorised route access detected</h1>
      <p class="text-gray-600 text-lg mb-8">
        You tried to access a route you do not have access to. Click the below button to go back to your dashboard.
      </p>
      
      <Link
            href="/"
            className="py-3.5 px-4 bg-[#1C5FE8] capitalize text-white font-medium rounded-md lg:rounded-xl"
          >
            Go to Dashboard
          </Link>
    </div>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import toast from "react-hot-toast";

export default function QRScanner() {
  const [data, setData] = useState("");
  const router = useRouter();

  const handleScan = (result) => {
    // console.log("result", result)
    if (result) {
      try {
        // console.log("result", result)
        // console.log("result[0]?.rawValue", result[0]?.rawValue)
        setData(result[0]?.rawValue);
        router.push(result[0]?.rawValue);
      } catch (e) {
        toast.error("Scanned data is not a valid URL");
      }
    }
  };

  return (
    <div>
      <p>Scanned Data: {data}</p>
      <h1>QR Code Scanner</h1>
      <Scanner onScan={handleScan} />
    </div>
  );
}

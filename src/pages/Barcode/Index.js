"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";

export default function QRScanner() {
  const [data, setData] = useState("");
  const router = useRouter();

  const handleScan = (result) => {
    if (result) {
      console.log("result" , result)
      setData(result);
router.push(result);
      try {
        const url = new URL(result); // Throws an error if not a valid URL
        router.push(url.href); // Redirect to the scanned URL
      } catch (e) {
        alert("Scanned data is not a valid URL");
      }
    }
  };

  return (
    <div>
      <h1>QR Code Scanner</h1>
      <Scanner onScan={handleScan} />
      <p>Scanned Data: {data}</p>
    </div>
  );
}

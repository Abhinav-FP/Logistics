"use client";

import { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";

export default function QRScanner() {
  const [data, setData] = useState("");

  const handleScan = (result) => {
    if (result) {
      setData(result);
      alert(`Scanned Data: ${result}`);
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

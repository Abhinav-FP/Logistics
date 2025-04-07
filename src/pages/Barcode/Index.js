"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import toast from "react-hot-toast";
import Popup from "@/components/Popup";
import { BsQrCodeScan } from "react-icons/bs";

export default function QRScanner() {
  const router = useRouter();
  const [data, setData] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

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
      <button
        onClick={toggleModal}
        className='font-inter font-medium lg:text-[16px] text-[14px] gap-2 leading-tight items-center  text-center xxl:w-52 px-4 border-2 py-3  mb-2 rounded-lg lg:rounded-xl focus:outline-none  flex  '
      >
        <BsQrCodeScan size={20} className='text-black-600 hover:text-black-700' /> Scan
      </button>

      {isOpen && (
        <Popup isOpen={isOpen} onClose={toggleModal} size={"max-w-[400px]"} >
          <div className="p-4 space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Scan Qr Code
            </h2>
            <div className="scanner-wrapper">
              <Scanner onScan={handleScan} />
            </div>
          </div>
        </Popup>
      )}

    </div>
  );
}

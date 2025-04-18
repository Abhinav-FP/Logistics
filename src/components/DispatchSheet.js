import Popup from "@/components/Popup";
import React, { useEffect, useState } from "react";
import Details from "../pages/api/Listing/Details";
import { MdFileDownload } from "react-icons/md";
import { FiUpload } from "react-icons/fi";
import toast from "react-hot-toast";

export default function DispatchSheet({
  isOpen,
  onClose,
  shipment,
  getShipments,
  role,
}) {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  const handleSubmit = async () => {
    try {
      if (loading) {
        return;
      }
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);

      const main = new Details();
      const response = await main.DispatchSheet(shipment?._id, formData);
      // console.log("response", response);

      if (response && response?.data && response?.data?.status) {
        toast.success(response.data.message);
        onClose();
        getShipments();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.error("error", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    try {
      if (loading) {
        return;
      }
      setLoading(true);
      const formData = new FormData();
      formData.append("broker_approve", true);

      const main = new Details();
      const response = await main.DispatchSheet(shipment?._id, formData);

      if (response && response?.data && response?.data?.status) {
        toast.success(response.data.message);
        onClose();
        getShipments();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.error("error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Popup isOpen={isOpen} onClose={onClose} size="max-w-[700px]">
      <div className="p-6 bg-white rounded-lg">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Dispatch Sheet Status
        </h1>
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-2 items-center">
            <h2 className="text-lg font-medium text-gray-700">
              Broker Uploaded Sheet
            </h2>
            {shipment?.broker_dispatch_sheet && (
              <a
                href={shipment?.broker_dispatch_sheet}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600"
              >
                <MdFileDownload size={22} />
              </a>
            )}
          </div>

          <div className="flex gap-2 items-center">
            <h2 className="text-lg font-medium text-gray-700">
              Carrier Uploaded Sheet
            </h2>
            {shipment?.carrier_dispatch_sheet ? (
              <a
                href={shipment?.carrier_dispatch_sheet}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600"
              >
                <MdFileDownload size={22} />
              </a>
            ) : (
              <span className="text-gray-500">Not uploaded yet</span>
            )}
          </div>
        </div>
        {role === "carrier" && !shipment?.carrier_dispatch_sheet && (
           <div className="flex justify-center mt-6">
           <label
             htmlFor="file-upload"
             className="flex flex-col items-center justify-center w-[300px] sm:w-[400px] h-40 p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:border-blue-400 transition-colors text-center"
           >
             <FiUpload className="w-8 h-8 mb-2 text-gray-400" />
             {file ? (
               <p className="text-sm text-gray-600 truncate w-full px-2">{file.name}</p>
             ) : (
               <p className="text-sm text-gray-500">Click here to upload</p>
             )}
             <input
               id="file-upload"
               type="file"
               className="hidden"
               onChange={handleFileUpload}
             />
           </label>
         </div>
        )}
        {shipment?.carrier_dispatch_sheet &&
          role === "broker" &&
          !shipment?.broker_approve && (
            <p className="flex justify-center text-[12px] text-gray-500 mt-2">
              Click the below button to approve the carrier uploaded dispatch
              sheet. Only after your approval, the carrier will be able to
              assign a driver.
            </p>
          )}
        {shipment?.broker_approve && (
          <p className="flex justify-center text-[12px] text-gray-500 mt-2">
            This disptach sheet has been approved by the broker. The carrier can
            now assign a driver.
          </p>
        )}

        {role === "carrier" && !shipment?.carrier_dispatch_sheet && (
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200 w-full mt-6"
            onClick={() => {
              handleSubmit();
            }}
          >
            {loading ? "Saving" : "Save"}
          </button>
        )}
        {role === "broker" &&
          !shipment?.broker_approve &&
          shipment?.carrier_dispatch_sheet && (
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200 w-full mt-6"
              onClick={() => {
                handleApprove();
              }}
            >
              {loading ? "Approving" : "Approve"}
            </button>
          )}
      </div>
    </Popup>
  );
}

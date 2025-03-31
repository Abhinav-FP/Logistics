import Popup from "@/components/Popup";
import React, { useEffect, useState } from "react";
import Details from "../pages/api/Listing/Details";
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
        if(loading){return;}
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);
  
      const main = new Details();
      const response = await main.DispatchSheet(shipment?._id, formData);
      console.log("response", response);
  
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
      if(loading){return;}
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
        <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Dispatch Sheet Status
        </h1>

        {shipment?.broker_dispatch_sheet && (
          <div className="mb-4">
            <h2 className="text-lg font-medium text-gray-700">
              Broker Uploaded Sheet
            </h2>
            <a
              href={shipment?.broker_dispatch_sheet}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Click here
            </a>
          </div>
        )}

        <div className="mb-4">
          <h2 className="text-lg font-medium text-gray-700">
            Carrier Uploaded Sheet
          </h2>
          {shipment?.carrier_dispatch_sheet ? (
            <>
              <a
                href={shipment?.carrier_dispatch_sheet}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Click here
              </a>
              {role === "broker" && (
                <p className="text-[12px] text-gray-500 mt-2">
                  Click the below button to approve the carrier uploaded
                  dispatch sheet. Only after your approval, the carrier will be
                  able to assign a driver.
                </p>
              )}
            </>
          ) : (
            <div className="mt-2 flex items-center gap-2">
              <span className="text-gray-500">Not uploaded yet</span>
              {role === "carrier" && !shipment?.carrier_dispatch_sheet && (
                <div className="flex flex-col items-center">
                  <input
                    type="file"
                    className="block w-full max-w-xs text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                    onChange={(e) => handleFileUpload(e)}
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {!shipment?.carrier_dispatch_sheet && (
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

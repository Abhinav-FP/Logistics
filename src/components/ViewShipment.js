import React from "react";
import Popup from "./Popup";
import Status from "./Status";

export default function ViewShipment({ isOpen, onClose, data }) {
  console.log("data" ,data)
  return (
    <Popup isOpen={isOpen} onClose={onClose} size={"max-w-[800px]"}>
      <div className="p-4 space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Shipment Details
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <p className="text-left text-[#70708D] border-0 py-.5  lg:py-.5  tracking-[-0.04em] text-[15px] font-medium">
              Shipment ID:
            </p>
            <p className="text-left text-[#70708D] border-0 py-.5  lg:py-.5  tracking-[-0.04em] text-[15px]font-normal">
              {data?._id}
            </p>
          </div>
          <div>
            <p className="text-left text-[#70708D] border-0 py-.5  lg:py-.5  tracking-[-0.04em] text-[15px] font-medium">
              Created At:
            </p>
            <p className="text-left text-[#70708D] border-0 py-.5  lg:py-.5  tracking-[-0.04em] text-[15px] font-normal">
              {new Date(data?.created_at).toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-left text-[#70708D] border-0 py-.5  lg:py-.5  tracking-[-0.04em] text-[15px] font-medium">
              Name:
            </p>
            <p className="capitalize text-left text-[#70708D] border-0 py-.5  lg:py-.5  tracking-[-0.04em] text-[15px] font-normal">
              {data?.name}
            </p>
          </div>

          <div>
            <p className="text-left text-[#70708D] border-0 py-.5  lg:py-.5  tracking-[-0.04em] text-[15px] font-medium">
              Type of Goods:
            </p>
            <p className="text-left text-[#70708D] border-0 py-.5  lg:py-.5  tracking-[-0.04em] text-[15px] font-normal capitalize">
              {data?.typeOfGoods}
            </p>
          </div>
          <div>
            <p className="text-left text-[#70708D] border-0 py-.5  lg:py-.5  tracking-[-0.04em] text-[15px] font-medium">
              Shipping Date:
            </p>
            <p className="text-left text-[#70708D] border-0 py-.5  lg:py-.5  tracking-[-0.04em] text-[15px] font-normal">
              {data?.shippingDate}
            </p>
          </div>
          <div>
            <p className="text-left text-[#70708D] border-0 py-.5  lg:py-.5  tracking-[-0.04em] text-[15px] font-medium">
              Expected Delivery:
            </p>
            <p className="text-left text-[#70708D] border-0 py-.5  lg:py-.5  tracking-[-0.04em] text-[15px] font-normal">
              {data?.deliveryDateExpect}
            </p>
          </div>
          <div>
            <p className="text-left text-[#70708D] border-0 py-.5  lg:py-.5  tracking-[-0.04em] text-[15px] font-medium">
              Cost:
            </p>
            <p className="text-left text-[#70708D] border-0 py-.5  lg:py-.5  tracking-[-0.04em] text-[15px] font-normal">
              ${data?.cost}
            </p>
          </div>

          <div>
            <p className="text-left text-[#70708D] border-0 py-.5  lg:py-.5  tracking-[-0.04em] text-[15px] font-medium">
              Quantity:
            </p>
            <p className="text-left text-[#70708D] border-0 py-.5  lg:py-.5  tracking-[-0.04em] text-[15px] font-normal">
              {data?.quantity} units
            </p>
          </div>
          <div>
            <p className="text-left text-[#70708D] border-0 py-.5  lg:py-.5  tracking-[-0.04em] text-[15px] font-medium">
              Weight:
            </p>
            <p className="text-left text-[#70708D] border-0 py-.5  lg:py-.5  tracking-[-0.04em] text-[15px] font-normal">
              {data?.weight} kg
            </p>
          </div>
          <div>
            <p className="text-left text-[#70708D] border-0 py-.5  lg:py-.5  tracking-[-0.04em] text-[15px] font-medium">
              Dimensions:
            </p>
            <p className="text-left text-[#70708D] border-0 py-.5  lg:py-.5  tracking-[-0.04em] text-[15px] font-normal">
              {data?.dimensions}
            </p>
          </div>

          <div>
            <p className="text-left text-[#70708D] border-0 py-.5  lg:py-.5  tracking-[-0.04em] text-[15px] font-medium">
              Payment Status:
            </p>
            <p
              className={`text-left text-[#70708D] border-0   tracking-[-0.04em] text-[15px] font-normal max-w-fit py-1`}
            >
              <Status status={data?.paymentStatus} />
            </p>
          </div>
          <div>
            <p className="text-left text-[#70708D] border-0 py-.5  lg:py-.5  tracking-[-0.04em] text-[15px] font-medium">
              Status:
            </p>
            <p className="text-left text-[#70708D] border-0   tracking-[-0.04em] text-[15px] font-normal max-w-fit py-1">
              <Status status={data?.status} />
            </p>
          </div>
          {data?.broker_id?.name && (
            <div>
              <p className="text-left text-[#70708D] border-0 py-.5  lg:py-.5  tracking-[-0.04em] text-[15px] font-medium">
                Broker Name :
              </p>
              <p className="text-left text-[#70708D] border-0 capitalize tracking-[-0.04em] text-[15px] font-normal max-w-fit py-1">
                {data?.broker_id?.name}
              </p>
            </div>
          )}

          {data?.carrier_id?.name && (
            <div>
              <p className="text-left text-[#70708D] border-0 py-.5  lg:py-.5  tracking-[-0.04em] text-[15px] font-medium">
                Carrier Name :
              </p>
              <p className="text-left text-[#70708D] border-0 capitalize tracking-[-0.04em] text-[15px] font-normal max-w-fit py-1">
                {data?.carrier_id?.name}
              </p>
            </div>
          )}

          {data?.customer_id?.name && (
            <div>
              <p className="text-left text-[#70708D] border-0 py-.5  lg:py-.5  tracking-[-0.04em] text-[15px] font-medium">
                Customer Name :
              </p>
              <p className="text-left text-[#70708D] border-0  capitalize tracking-[-0.04em] text-[15px] font-normal max-w-fit py-1">
                {data?.customer_id?.name}
              </p>
            </div>
          )}
          {data?.driver_id?.name && (
            <div>
              <p className="text-left text-[#70708D] border-0 py-.5  lg:py-.5  tracking-[-0.04em] text-[15px] font-medium">
                Driver Name :
              </p>
              <p className="text-left text-[#70708D] border-0  capitalize tracking-[-0.04em] text-[15px] font-normal max-w-fit py-1">
                {data?.driver_id?.name}
              </p>
            </div>
          )}
            {data?.review && (
            <div>
              <p className="text-left text-[#70708D] border-0 py-.5  lg:py-.5  tracking-[-0.04em] text-[15px] font-medium">
                Review Status:
              </p>
              <p className="text-left text-[#70708D] border-0  capitalize tracking-[-0.04em] text-[15px] font-normal max-w-fit py-1">
              <Status status={data?.review} />
              </p>
            </div>
          )}
            {data?.review && (
            <div>
              <p className="text-left text-[#70708D] border-0 py-.5  lg:py-.5  tracking-[-0.04em] text-[15px] font-medium">
              Review Reasons:
              </p>
              <p className="text-left text-[#70708D] border-0  capitalize tracking-[-0.04em] text-[15px] font-normal max-w-fit py-1">
                {data?.reviewText                }
              </p>
            </div>
          )}
          {data?.uploadedBol && (
            <div>
              <p className="text-left text-[#70708D] border-0 py-.5  lg:py-.5  tracking-[-0.04em] text-[15px] font-medium">
                Shipper Uploaded BOL:
              </p>
              <a
                href={data?.uploadedBol}
                target="blank"
                className="text-left text-blue-500 border-0 py-.5  lg:py-.5  tracking-[-0.04em] text-[15px] font-normal"
              >
                View
              </a>
            </div>
          )}
        </div>

        <div>
          <p className="text-left text-[#70708D] border-0 py-.5  lg:py-.5  tracking-[-0.04em] text-[15px] font-medium">
            Pickup Location:
          </p>
          <p className="text-left text-[#70708D] border-0 py-.5 lg:py-.5 tracking-[-0.04em] text-[15px] font-normal capitalize">
            {data?.pickup_location}
          </p>
        </div>
        <div>
          <p className="text-left text-[#70708D] border-0 py-.5  lg:py-.5  tracking-[-0.04em] text-[15px] font-medium">
            Drop Location:
          </p>
          <p className="text-left text-[#70708D] border-0 py-.5  lg:py-.5  tracking-[-0.04em] text-[15px] font-normal capitalize">
            {data?.drop_location}
          </p>
        </div>


        <div>
          <p className="text-left text-[#70708D] border-0 py-.5  lg:py-.5  tracking-[-0.04em] text-[15px] font-medium">
            Description:
          </p>
          <p className="text-left text-[#70708D] border-0 py-.5 lg:py-.5 tracking-[-0.04em] text-[15px] font-normal capitalize">
            {data?.description}
          </p>
        </div>

        {/* <div>
          <p className="text-left text-[#70708D] border-0 py-.5  lg:py-.5  tracking-[-0.04em] text-[15px] font-medium">
            Current Location:
          </p>
          <p className="text-left text-[#70708D] border-0 py-.5  lg:py-.5  tracking-[-0.04em] text-[15px] font-normal">
            {data?.current_location || "Not Available"}
          </p>
        </div> */}
      </div>
    </Popup>
  );
}

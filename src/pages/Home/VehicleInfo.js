import React from 'react'

export default function VehicleInfo({data}) {
  return (
    <div className="border border-black border-opacity-10 rounded-md lg:rounded-xl mb-3 lg:mb-4 p-4 ">
    <div className="flex flex-wrap items-center mb-4">
      <div class="border border-black border-opacity-10 py-2 px-3 rounded-md lg:rounded-xl mr-2">
        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" color="#1C5FE8" height="24" width="24" xmlns="http://www.w3.org/2000/svg"  ><path d="M8.96456 18C8.72194 19.6961 7.26324 21 5.5 21C3.73676 21 2.27806 19.6961 2.03544 18H1V6C1 5.44772 1.44772 5 2 5H16C16.5523 5 17 5.44772 17 6V8H20L23 12.0557V18H20.9646C20.7219 19.6961 19.2632 21 17.5 21C15.7368 21 14.2781 19.6961 14.0354 18H8.96456ZM15 7H3V15.0505C3.63526 14.4022 4.52066 14 5.5 14C6.8962 14 8.10145 14.8175 8.66318 16H14.3368C14.5045 15.647 14.7296 15.3264 15 15.0505V7ZM17 13H21V12.715L18.9917 10H17V13ZM17.5 19C18.1531 19 18.7087 18.5826 18.9146 18C18.9699 17.8436 19 17.6753 19 17.5C19 16.6716 18.3284 16 17.5 16C16.6716 16 16 16.6716 16 17.5C16 17.6753 16.0301 17.8436 16.0854 18C16.2913 18.5826 16.8469 19 17.5 19ZM7 17.5C7 16.6716 6.32843 16 5.5 16C4.67157 16 4 16.6716 4 17.5C4 17.6753 4.03008 17.8436 4.08535 18C4.29127 18.5826 4.84689 19 5.5 19C6.15311 19 6.70873 18.5826 6.91465 18C6.96992 17.8436 7 17.6753 7 17.5Z"></path></svg>
      </div>
      <div>
        <h3 className="text-[#151547] text-base font-medium tracking-[-0.05em] uppercase">{data?.driver_id?.name || "N/A"}</h3>
        <p className="text-[#666666] text-[13px] font-medium tracking-[-0.04em] mb-0">Driver</p>
      </div>
    </div>
    <div className="flex flex-wrap ">
      <div className="w-4/12 pr-1 flex">
        <div>
          <h3 className="text-black  tracking-[-0.04em] text-sm font-medium m-0 capitalize">company name</h3>
          <p className="text-[#666666] text-[12px] font-medium tracking-[-0.04em] mb-0 capitalize">{data?.driver_id?.company_name || "N/A"}</p>
        </div>
      </div>
      <div className="w-4/12 pr-1 pl-1 text-center border-r border-l border-black border-opacity-10 flex justify-center ">
        <div>
          <h3 className="text-black  tracking-[-0.04em] text-sm font-medium m-0">Email</h3>
          <p className="text-[#666666] text-[12px] font-medium tracking-[-0.04em] mb-0">{data?.driver_id?.email || "N/A"}</p>
        </div>
      </div>
      <div className="w-4/12 pr-1 flex justify-end">
        <div>
          <h3 className="text-black  tracking-[-0.04em] text-sm font-medium m-0 ">Contact</h3>
          <p className="text-[#666666] text-[12px] font-medium tracking-[-0.04em] mb-0">{data?.driver_id?.contact || "N/A"}</p>
        </div>
      </div>
    </div>
    <div className="flex flex-wrap mt-4 pt-4 border-t border-l border-black border-opacity-10">
      <div className="w-4/12 pr-1 flex">
        <div>
          <h3 className="text-black  tracking-[-0.04em] text-sm font-medium m-0 capitalize">MC number</h3>
          <p className="text-[#666666] text-[12px] font-medium tracking-[-0.04em] mb-0">{data?.driver_id?.mc_number}</p>
        </div>
      </div>
      <div className="w-4/12 pr-1 pl-1 text-center border-r border-l border-black border-opacity-10 flex justify-center ">
        <div>
          <h3 className="text-black  tracking-[-0.04em] text-sm font-medium m-0">Truck type</h3>
          <p className="text-[#666666] text-[12px] font-medium tracking-[-0.04em] mb-0">{data?.driver_id?.trucktype}</p>
        </div>
      </div>
      <div className="w-4/12 pr-1 flex justify-end">
        <div>
          <h3 className="text-black  tracking-[-0.04em] text-sm font-medium m-0 ">VIN Number</h3>
          <p className="text-[#666666] text-[12px] font-medium tracking-[-0.04em] mb-0">{data?.driver_id?.vin}</p>
        </div>
      </div>
    </div>
  </div>
  )
}

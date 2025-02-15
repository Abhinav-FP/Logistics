import React from 'react'
import NoData from './NoData'

export default function UsersTable({ listing }) {
  return (
    <div className="overflow-x-auto">
        {listing && listing?.length>0 ? 
      <table className="w-full border-none">
        <thead>
          <tr className="text-[#9090AD] bg-[#F4F6F8] border border-black border-opacity-10 uppercase ">
            <th width="5%" className="px-4 py-3  tracking-[-0.04em] text-sm font-medium text-left whitespace-nowrap">Sr No</th>
            <th width="15%" className="px-4 py-3  tracking-[-0.04em] text-sm font-medium text-left">Name</th>
            <th width="10%" className="px-4 py-3  tracking-[-0.04em] text-sm font-medium text-left">Role</th>
            <th width="15%" className="px-4 py-3  tracking-[-0.04em] text-sm font-medium text-left">Email</th>
            <th width="15%" className="px-4 py-3  tracking-[-0.04em] text-sm font-medium text-left">Contact</th>
            <th width="40%" className="px-4 py-3  tracking-[-0.04em] text-sm font-medium text-left">Address</th>
          </tr>
        </thead>
        <tbody>
          {listing && listing?.map((data, index) => (
            <tr key={index} className="border-b border-black border-opacity-10 font-medium">
              <td className="px-3 py-5 text-[#1D1D42] tracking-[-0.04em] text-sm font-medium text-left">{index + 1}</td>
              <td className="px-3 py-5 text-[#1D1D42] tracking-[-0.04em] text-sm font-medium text-left capitalize">{data?.user_id_ref?.name}</td>
              <td className="px-3 py-5 text-[#1D1D42] tracking-[-0.04em] text-sm font-medium text-left capitalize">{data?.user_id_ref?.role}</td>
              <td className="px-3 py-5 text-[#1D1D42] tracking-[-0.04em] text-sm font-medium text-left">{data?.user_id_ref?.email}</td>
              <td className="px-3 py-5 text-[#1D1D42] tracking-[-0.04em] text-sm font-medium text-left">{data?.user_id_ref?.contact}</td>
              <td className="px-3 py-5 text-[#1D1D42] tracking-[-0.04em] text-sm font-medium text-left">{data?.address}</td>
            </tr>
          ))}
        </tbody>
      </table> 
      :
      <NoData Heading={"No Data available"} content={"You don't have any user listing to view at the moment"}/>}
    </div>
  )
}

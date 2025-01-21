import Layout from '@/layout/Layout'
import React from 'react';
import Link from 'next/link';

export default function index() {
    const carriersData = [
        {
            id: "SHP-001",
            CarrierName: "John Carter",
            companyName: "John Carter",
            information: "2024-12-01 | 04:30 PM",
            size: "40",
            vehicleTypes: ['Truck', 'Van']
        },
        {
            id: "SHP-001",
            CarrierName: "John Carter",
            companyName: "John Carter",
            information: "2024-12-01 | 04:30 PM",
            size: "40",
            vehicleTypes: ['Truck', 'Van']
        },
        {
            id: "SHP-001",
            CarrierName: "John Carter",
            companyName: "John Carter",
            information: "2024-12-01 | 04:30 PM",
            size: "40",
            vehicleTypes: ['Truck', 'Van']
        }
    ];
    return (
        <>
            <Layout page={"carriersData"}>
                <div>
                    <div className="flex items-center justify-between items-center space-y-4 md:space-y-0">
                        <h2 className="text-[#151547] text-lg tracking-[-0.04em] font-medium m-0">Carrier  Listing </h2>
                        <Link href="/carriers/add" className="bg-[#1C5FE8] hover:bg-[#0a3fab] inline-block font-medium text-base text-white tracking-[-0.04em] rounded-lg lg:rounded-xl px-5 py-3  ">
                            <span className="mr-1">+</span> Add New Carrier
                        </Link>
                    </div>
                    <div className="bg-white mt-6 lg:mt-[30px] px-6 py-[30px] rounded-md lg:rounded-xl border border-black border-opacity-10">
                        <div className="overflow-x-auto">
                            <table className="w-full border-none">
                                <thead>
                                    <tr className="text-[#9090AD] bg-[#F4F6F8] border border-black border-opacity-10 uppercase ">
                                        <th className="px-4 py-3  tracking-[-0.04em] text-sm font-medium text-left">Carrier ID </th>
                                        <th className="px-4 py-3  tracking-[-0.04em] text-sm font-medium text-left">Carrier Name</th>
                                        <th className="px-4 py-3  tracking-[-0.04em] text-sm font-medium text-left">Company Name</th>
                                        <th className="px-4 py-3  tracking-[-0.04em] text-sm font-medium text-left">Contact Information</th>
                                        <th className="px-4 py-3  tracking-[-0.04em] text-sm font-medium text-left">Fleet Size</th>
                                        <th className="px-4 py-3  tracking-[-0.04em] text-sm font-medium text-left">Vehicle Type</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {carriersData && carriersData?.map((carrier) => (
                                        <tr key={carrier.id} className="border-b  border-black border-opacity-10 font-medium">
                                            <td className="px-3 py-5 text-[#1D1D42] tracking-[-0.04em] text-sm font-medium text-left">{carrier?.id}</td>
                                            <td className="px-3 py-5 text-[#1D1D42] tracking-[-0.04em] text-sm font-medium text-left">{carrier?.carrierName}</td>
                                            <td className="px-3 py-5 text-[#1D1D42] tracking-[-0.04em] text-sm font-medium text-left">{carrier?.companyName}</td>
                                            <td className="px-3 py-5 text-[#1D1D42] tracking-[-0.04em] text-sm font-medium text-left">{carrier?.information}</td>
                                            <td className="px-3 py-5 text-[#1D1D42] tracking-[-0.04em] text-sm font-medium text-left">{carrier?.size}</td>
                                            <td className="px-3 py-5 text-[#1D1D42] tracking-[-0.04em] text-sm font-medium text-left">
                                                {carrier.vehicleTypes?.map((vehicleType, index) => (
                                                    <span key={index}>{vehicleType},</span>
                                                ))}
                                            </td>
                                        </tr>
                                    ))}



                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
};

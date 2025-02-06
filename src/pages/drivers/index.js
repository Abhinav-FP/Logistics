import Layout from "@/layout/Layout";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Details from "../api/Listing/Details";
import Loader from "@/components/Loader";

export default function Index() {

    const [listing, setLisitng] = useState("");
    const [Loading, setLoading] = useState(false);

    const getusers = () => {
        setLoading(true);
        const main = new Details();
        main
            .Driverget()
            .then((r) => {
                setLoading(false);
                setLisitng(r?.data?.data);
            })
            .catch((err) => {
                setLoading(false);
                setLisitng([]);
                console.log("error", err);
            });
    };

    useEffect(() => {
        getusers();
    }, []);

    const [isopen, sentIsopen] = useState(null);
    const toogleButton = (id) => {
        sentIsopen(isopen === id ? null : id);
    }
    return (
        <Layout page={"Driver"}>
            <div>
                <div className="flex items-center justify-between items-center space-y-4 md:space-y-0">
                    <h2 className="text-[#151547] text-lg tracking-[-0.04em] font-medium m-0">Driver Listing </h2>
                    <Link href="/drivers/add" className="bg-[#1C5FE8] hover:bg-[#0a3fab] inline-block font-medium text-base text-white tracking-[-0.04em] rounded-lg lg:rounded-xl px-5 py-3 ">
                        <span className="mr-1">+</span> Add New Driver
                    </Link>
                </div>

                <div className="bg-white mt-6 lg:mt-[30px] px-5 lg:px-6 py-5 lg:py-[30px] rounded-md lg:rounded-xl border border-black border-opacity-10">
                    <div className="overflow-x-auto">
                        {Loading ? (
                            <Loader />
                        ) : (<table className="w-full border-none">
                            <thead>
                                <tr className="text-[#9090AD] bg-[#F4F6F8] border border-black border-opacity-10 uppercase ">
                                    <th className="px-4 py-3  tracking-[-0.04em] text-sm font-medium text-left whitespace-nowrap">Sr No</th>
                                    <th className="px-4 py-3  tracking-[-0.04em] text-sm font-medium text-left whitespace-nowrap">name</th>
                                    <th className="px-4 py-3  tracking-[-0.04em] text-sm font-medium text-left whitespace-nowrap">Email</th>
                                    <th className="px-4 py-3  tracking-[-0.04em] text-sm font-medium text-left whitespace-nowrap">Contact</th>
                                    <th className="px-4 py-3  tracking-[-0.04em] text-sm font-medium text-left whitespace-nowrap">VIN Number</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listing && listing?.map((driver, index) => (
                                    <tr key={index} className="border-b border-black border-opacity-10 font-medium">
                                        <td className="px-3 py-5 text-[#1D1D42] tracking-[-0.04em] text-sm font-medium text-left">{index + 1}</td>
                                        <td className="px-3 py-5 text-[#1D1D42] tracking-[-0.04em] text-sm font-medium text-left">{driver?.driver_id_ref?.name}</td>
                                        <td className="px-3 py-5 text-[#1D1D42] tracking-[-0.04em] text-sm font-medium text-left">{driver?.driver_id_ref?.email}</td>
                                        <td className="px-3 py-5 text-[#1D1D42] tracking-[-0.04em] text-sm font-medium text-left">{driver?.driver_id_ref?.contact}</td>
                                        <td className="px-3 py-5 text-[#1D1D42] tracking-[-0.04em] text-sm font-medium text-left">{driver?.vin}</td>
                                    </tr>
                                )
                                )}
                            </tbody>
                        </table>)}
                    </div>
                </div>
            </div>
        </Layout>

    )
}
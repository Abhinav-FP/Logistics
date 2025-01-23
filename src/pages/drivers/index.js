import Layout from "@/layout/Layout";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { BsDownload } from "react-icons/bs";
import { MdDone } from "react-icons/md";
import { CiNoWaitingSign } from "react-icons/ci";
import { IoMdShare } from "react-icons/io";
import Details from "../api/Listing/Details";

export default function index() {

    const [listing, setLisitng] = useState("");
    const [Loading, setLoading] = useState(false);
  
    const getusers = () => {
      setLoading(true);
      const main = new Details();
      main
        .Usersget("driver")
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
    console.log("listing", listing);

    const drivers = [
        {
            id: "SHP-001",
            name: "John Carter",
            login: "2024-12-01 | 04:30 PM",
            status: "In Transit"
        },
        {
            id: "SHP-002",
            name: "John Carter",
            login: "2024-12-01 | 04:30 PM",
            status: "Available"
        },
        {
            id: "SHP-003",
            name: "John Carter",
            login: "2024-12-01 | 04:30 PM",
            status: "unavailable"
        }
    ];
    const [isopen, sentIsopen] = useState(null);
    const toogleButton = (id) => {
        sentIsopen(isopen === id ? null : id);
    }
    return (
        <Layout page={"Driver"}>
            <div>
                <div className="flex items-center justify-between items-center space-y-4 md:space-y-0">
                    <h2 className="text-[#151547] text-lg tracking-[-0.04em] font-medium m-0">Driver Listing </h2>
                    <Link href="/carriers/add" className="bg-[#1C5FE8] hover:bg-[#0a3fab] inline-block font-medium text-base text-white tracking-[-0.04em] rounded-lg lg:rounded-xl px-5 py-3 ">
                        <span className="mr-1">+</span> Add New Driver
                    </Link>
                </div>
                <div className="bg-white mt-6 lg:mt-[30px] px-6 py-[30px] rounded-md lg:rounded-xl border border-black border-opacity-10">
                    <div className="overflow-x-auto">
                        <table className="w-full border-none">
                            <thead>
                                <tr className="text-[#9090AD] bg-[#F4F6F8] border border-black border-opacity-10 uppercase ">
                                    <th className="px-4 py-3  tracking-[-0.04em] text-sm font-medium text-left">Driver id</th>
                                    <th className="px-4 py-3  tracking-[-0.04em] text-sm font-medium text-left">name</th>
                                    <th className="px-4 py-3  tracking-[-0.04em] text-sm font-medium text-left">Last Login</th>
                                    <th className="px-4 py-3  tracking-[-0.04em] text-sm font-medium text-left">Status</th>
                                    <th className="px-4 py-3  tracking-[-0.04em] text-sm font-medium text-left">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {drivers && drivers?.map((driver) => (
                                    <tr key={driver.id} className="border-b border-black border-opacity-10 font-medium">
                                        <td className="px-3 py-5 text-[#1D1D42] tracking-[-0.04em] text-sm font-medium text-left">{driver?.id}</td>
                                        <td className="px-3 py-5 text-[#1D1D42] tracking-[-0.04em] text-sm font-medium text-left">{driver?.name}</td>
                                        <td className="px-3 py-5 text-[#1D1D42] tracking-[-0.04em] text-sm font-medium text-left">{driver?.login}</td>
                                        <td className="px-3 py-5 text-[#1D1D42] tracking-[-0.04em] text-sm font-medium text-left">

                                            <div className={`px-6 py-1 uppercase ${driver?.status === 'In Transit' ? 'bg-[#C2970A1A] text-[#C2970A]' :
                                                driver?.status === 'Available' ? 'bg-[#0BB6351A] text-[#0BB635]' :
                                                    driver?.status === 'unavailable' ? 'bg-[#CF000033] text-[#CF0000]' : ""} inline-flex justify-center items-center rounded-md`}>
                                                {driver?.status}
                                            </div>
                                        </td>
                                        <td className="px-3 py-5 text-[#1D1D42] tracking-[-0.04em] text-sm font-medium text-left">
                                            <div className="relative">
                                                <button onClick={() => toogleButton(driver.id)}>
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <rect x="0.5" y="0.5" width="23" height="23" rx="11.5" stroke="#999999" />
                                                        <path d="M6 12C6 12.1989 6.07902 12.3897 6.21967 12.5303C6.36032 12.671 6.55109 12.75 6.75 12.75C6.94891 12.75 7.13968 12.671 7.28033 12.5303C7.42098 12.3897 7.5 12.1989 7.5 12C7.5 11.8011 7.42098 11.6103 7.28033 11.4697C7.13968 11.329 6.94891 11.25 6.75 11.25C6.55109 11.25 6.36032 11.329 6.21967 11.4697C6.07902 11.6103 6 11.8011 6 12ZM11.25 12C11.25 12.1989 11.329 12.3897 11.4697 12.5303C11.6103 12.671 11.8011 12.75 12 12.75C12.1989 12.75 12.3897 12.671 12.5303 12.5303C12.671 12.3897 12.75 12.1989 12.75 12C12.75 11.8011 12.671 11.6103 12.5303 11.4697C12.3897 11.329 12.1989 11.25 12 11.25C11.8011 11.25 11.6103 11.329 11.4697 11.4697C11.329 11.6103 11.25 11.8011 11.25 12ZM16.5 12C16.5 12.1989 16.579 12.3897 16.7197 12.5303C16.8603 12.671 17.0511 12.75 17.25 12.75C17.4489 12.75 17.6397 12.671 17.7803 12.5303C17.921 12.3897 18 12.1989 18 12C18 11.8011 17.921 11.6103 17.7803 11.4697C17.6397 11.329 17.4489 11.25 17.25 11.25C17.0511 11.25 16.8603 11.329 16.7197 11.4697C16.579 11.6103 16.5 11.8011 16.5 12Z" stroke="#999999" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                    </svg>
                                                </button>
                                                <div className={`absolute min-w-[198px] right-0 top-7 border border-black border-opacity-10 rounded-xl z-10 bg-white ${isopen === driver.id ? "block" : "hidden"}`}>
                                                    <ul>
                                                        <li className="py-2 tracking-[-0.04em] [&:not(:last-child)]:border-b border-black border-opacity-10 px-4 lg:px-6 ">
                                                            <button className="flex gap-2 text-[#1B1B1B] bg-transparent border-none text-sm font-medium ">Download PDF <BsDownload size={18} color={"#1C5FE8"} /> </button>
                                                        </li>
                                                        <li className="py-2 tracking-[-0.04em] [&:not(:last-child)]:border-b border-black border-opacity-10 px-4 lg:px-6 ">
                                                            <button className="flex gap-2 text-[#1B1B1B] bg-transparent border-none text-sm font-medium ">Mark as Completed <MdDone size={18} color={"#0BB635"} /></button>
                                                        </li>
                                                        <li className="py-2 tracking-[-0.04em] [&:not(:last-child)]:border-b border-black border-opacity-10 px-4 lg:px-6 ">
                                                            <button className="flex gap-2 text-[#1B1B1B] bg-transparent border-none text-sm font-medium ">Disable <CiNoWaitingSign size={18} color={"#CF0000"} /></button>
                                                        </li>
                                                        <li className="py-2 tracking-[-0.04em] [&:not(:last-child)]:border-b border-black border-opacity-10 px-4 lg:px-6 ">
                                                            <button className="flex gap-2 text-[#1B1B1B] bg-transparent border-none text-sm font-medium ">Share <IoMdShare size={18} color={"#000000"} /></button>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>

                                        </td>
                                    </tr>
                                )
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>

    )
}
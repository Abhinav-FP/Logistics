import UsersTable from '@/components/UsersTable'
import Layout from '@/layout/Layout'
import React, { useEffect, useState } from 'react'
import Details from '../api/Listing/Details';
import Loader from '@/components/Loader';
import NoData from '@/components/NoData';
import { useRole } from '@/context/RoleContext';
import Link from 'next/link';

export default function Index() {

    const [listing, setLisitng] = useState("");
    const [Loading, setLoading] = useState(false);
     const { user } = useRole();
  
    const getusers = () => {
      setLoading(true);
      const main = new Details();
      main
        .Usersget("shipper")
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


  return (
     <Layout page={"Shippers"}>
        {Loading ? <Loader/> : 
      <>
      <div className="flex items-center justify-between items-center space-y-4 md:space-y-0">
        <h2 className="text-[#151547] text-lg tracking-[-0.04em] font-medium m-0">Shippers Listing </h2>
        {user?.role === "admin" && 
          <Link
            href="/shippers/add"
            className="bg-[#1C5FE8] hover:bg-[#0a3fab] inline-block font-medium text-base text-white tracking-[-0.04em] rounded-lg lg:rounded-xl px-5 py-3 "
          >
            <span className="mr-1">+</span> Add New Shipper
          </Link>}
      </div>
      <div className="bg-white mt-6 lg:mt-[30px] px-6 py-[30px] rounded-md lg:rounded-xl border border-black border-opacity-10">
      <div className="overflow-x-auto">
        {listing && listing?.length>0 ? 
      <table className="w-full border-none">
        <thead>
          <tr className="text-[#9090AD] bg-[#F4F6F8] border border-black border-opacity-10 uppercase ">
            <th className="px-4 py-3  tracking-[-0.04em] text-sm font-medium text-left">Sr No</th>
            <th className="px-4 py-3  tracking-[-0.04em] text-sm font-medium text-left">Name</th>
            <th className="px-4 py-3  tracking-[-0.04em] text-sm font-medium text-left">Email</th>
            <th className="px-4 py-3  tracking-[-0.04em] text-sm font-medium text-left">Contact</th>
          </tr>
        </thead>
        <tbody>
          {listing && listing?.map((data, index) => (
            <tr key={index} className="border-b border-black border-opacity-10 font-medium">
              <td className="px-3 py-5 text-[#1D1D42] tracking-[-0.04em] text-sm font-medium text-left">{index + 1}</td>
              <td className="px-3 py-5 text-[#1D1D42] tracking-[-0.04em] text-sm font-medium text-left capitalize">{data.name}</td>
              <td className="px-3 py-5 text-[#1D1D42] tracking-[-0.04em] text-sm font-medium text-left">{data.email}</td>
              <td className="px-3 py-5 text-[#1D1D42] tracking-[-0.04em] text-sm font-medium text-left">{data.contact}</td>
            </tr>
          ))}
        </tbody>
      </table>
      :
      <NoData Heading={"No Data available"} content={"You don't have any brokers listing to view at the moment"}/>}
    </div>
      </div>
      </>
      }
     </Layout>
  )
}

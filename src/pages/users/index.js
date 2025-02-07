import Layout from '@/layout/Layout';
import React, { useEffect, useState } from 'react'
import Details from '../api/Listing/Details';
import Link from 'next/link';
import UsersTable from '@/components/UsersTable';
import Loader from '@/components/Loader';
import { useRouter } from 'next/router';
import { useRole } from '@/context/RoleContext';

export default function Index() {
  const { user } = useRole();
  const [listing, setLisitng] = useState("");
  const [Loading, setLoading] = useState(false);
  const router = useRouter(); 
  const getusers = () => {
    setLoading(true);
    const main = new Details();
    main
      .Coustmerget()
      .then((r) => {
        setLoading(false);
        setLisitng(r?.data?.data);
      })
      .catch((err) => {
        setLoading(false);
        setLisitng([]);
        if (err.response?.status === 401) {
          router.push('/login'); 
        } else {
        console.log("error", err);}
      });
  };

  useEffect(() => {
    getusers();
  }, []);
 
  return (
    <Layout page={"Customers"}>
      {Loading ? <Loader/> : 
      <>
      <div className="flex items-center justify-between items-center space-y-4 md:space-y-0">
        <h2 className="text-[#151547] text-lg tracking-[-0.04em] font-medium m-0">Customers  Listing </h2>
        {user?.role==="shipper" && <Link href="/users/add" className="bg-[#1C5FE8] hover:bg-[#0a3fab] inline-block font-medium text-base text-white tracking-[-0.04em] rounded-lg lg:rounded-xl px-5 py-3">
          <span className="mr-1">+</span> Add New Customer
        </Link>}
      </div>
      <div className="bg-white mt-6 lg:mt-[30px] px-6 py-[30px] rounded-md lg:rounded-xl border border-black border-opacity-10">
        <UsersTable listing={listing} />
      </div>
      </>
      }
    </Layout>
  )
}

import UsersTable from '@/components/UsersTable'
import Layout from '@/layout/Layout'
import React, { useEffect, useState } from 'react'
import Details from '../api/Listing/Details';
import Loader from '@/components/Loader';

export default function index() {

    const [listing, setLisitng] = useState("");
    const [Loading, setLoading] = useState(false);
  
    const getusers = () => {
      setLoading(true);
      const main = new Details();
      main
        .Usersget("broker")
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


  return (
     <Layout page={"Brokers"}>
        {Loading ? <Loader/> : 
      <>
      <div className="flex items-center justify-between items-center space-y-4 md:space-y-0">
        <h2 className="text-[#151547] text-lg tracking-[-0.04em] font-medium m-0">Brokers  Listing </h2>
      </div>
      <div className="bg-white mt-6 lg:mt-[30px] px-6 py-[30px] rounded-md lg:rounded-xl border border-black border-opacity-10">
        <UsersTable listing={listing} />
      </div>
      </>
      }
     </Layout>
  )
}

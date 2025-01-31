import Layout from '@/layout/Layout'
import React, { useEffect, useState } from 'react'
import ShipmentTable from '../Home/ShipmentTable';
import Link from 'next/link';
import Details from '../api/Listing/Details';
import Loader from '@/components/Loader';
import { useRole } from '@/context/RoleContext';
import { useRouter } from 'next/router';

export default function Index() {
  const { user } = useRole();
  const [listing, setListing] = useState("");
  const [Loading, setLoading] = useState(false);
  const router = useRouter(); 

  const getShipments = async () => {
    setLoading(true);
    const main = new Details();
    try {
      let response;
      if (user?.role === "broker") {
        response = await main.getBrokerShipment();
      } else if (user?.role === "carrier") {
        response = await main.getcarrierShipment();
      } else {
        response = await main.getShipment("");
      }
      setListing(response?.data?.data);
    } catch (err) {
      setListing([]);
      if (err.response?.status === 401) {
        router.push("/login");
      } else {
        console.error("Error fetching shipments", err);
      }
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    if (user?.role) {
      getShipments();
    }
  }, [user?.role]);
  

  return (
    <Layout page={"Shipment"}>
      <div>
        <div className="flex items-center justify-between items-center space-y-4 md:space-y-0">
          <h2 className="text-[#151547] text-lg tracking-[-0.04em] font-medium m-0">Shipment Listing </h2>
          {user?.role === "shipper" &&
          <Link href="/shipment/add" className="bg-[#1C5FE8] hover:bg-[#0a3fab] inline-block font-medium text-base text-white tracking-[-0.04em] rounded-lg lg:rounded-xl px-5 py-3  ">
            <span className="mr-1">+</span> New Shipments
          </Link>}
        </div>
        <div className="bg-white mt-6 lg:mt-[30px] px-6 py-[30px] rounded-md lg:rounded-xl border border-black border-opacity-10">
          {Loading ? <Loader /> :
            <ShipmentTable shipments={listing} getShipments={getShipments} DeleteOption={true} role={user?.role} />}
        </div>
      </div>
    </Layout>
  )
}

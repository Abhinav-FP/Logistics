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
  const [listing, setLisitng] = useState("");
  const [Loading, setLoading] = useState(false);
  const router = useRouter(); // Corrected variable name


  const getShipments = async (isBroker) => {
    setLoading(true);
    const main = new Details();
    try {
      const response = isBroker ? await main.getBrokerShipment() : await main.getShipment("");
      setLisitng(response?.data?.data);
    } catch (err) {
      setLisitng([]);
      if (err.response?.status === 401) {
        router.push('/login');
      } else {
        console.error("Error fetching shipments", err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getShipments(user?.role === "broker");
  }, [user?.role]);
  console.log("listing", listing);

  return (
    <Layout page={"Shipment"}>
      <div>
        <div className="flex items-center justify-between items-center space-y-4 md:space-y-0">
          <h2 className="text-[#151547] text-lg tracking-[-0.04em] font-medium m-0">Shipment Listing </h2>
          <Link href="/shipment/add" className="bg-[#1C5FE8] hover:bg-[#0a3fab] inline-block font-medium text-base text-white tracking-[-0.04em] rounded-lg lg:rounded-xl px-5 py-3  ">
            <span className="mr-1">+</span> New Shipments
          </Link>
        </div>
        <div className="bg-white mt-6 lg:mt-[30px] px-6 py-[30px] rounded-md lg:rounded-xl border border-black border-opacity-10">
          {Loading ? <Loader /> :
            <ShipmentTable shipments={listing} getshipments={getShipments} DeleteOption={true} role={user?.role} />}
        </div>
      </div>
    </Layout>
  )
}

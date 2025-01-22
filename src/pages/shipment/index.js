import Layout from '@/layout/Layout'
import React, { useEffect, useState } from 'react'
import ShipmentTable from '../Home/ShipmentTable';
import Link from 'next/link';
import Details from '../api/Listing/Details';

export default function index() {

  const [listing, setLisitng] = useState("");
  const [Loading, setLoading] = useState(false);
  const getshipment = () => {
    setLoading(true);
    const main = new Details();
    main
      .getShipment("")
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
    getshipment();
  }, []);
  console.log("listing", listing);

  const data = [
    { id: 'SHP-001', title: 'Electronics Delivery', pickup: 'New York, NY', delivery: 'Los Angeles, CA', status: 'In Transit', shipmentDate: '2024-12-01', expectedDelivery: '2024-12-08' },
    { id: 'SHP-002', title: 'Furniture Delivery', pickup: 'Chicago, IL', delivery: 'Houston, TX', status: 'Delivered', shipmentDate: '2024-11-15', expectedDelivery: '2024-11-20' },
    { id: 'SHP-003', title: 'Books Shipment', pickup: 'San Francisco, CA', delivery: 'Seattle, WA', status: 'In Transit', shipmentDate: '2024-12-05', expectedDelivery: '2024-12-10' },
    { id: 'SHP-004', title: 'Clothing Shipment', pickup: 'Miami, FL', delivery: 'Boston, MA', status: 'Pending', shipmentDate: '2024-12-03', expectedDelivery: '2024-12-09' },
    { id: 'SHP-005', title: 'Medical Supplies', pickup: 'Denver, CO', delivery: 'Phoenix, AZ', status: 'In Transit', shipmentDate: '2024-12-06', expectedDelivery: '2024-12-11' },
    { id: 'SHP-006', title: 'Food Delivery', pickup: 'Las Vegas, NV', delivery: 'San Diego, CA', status: 'Cancelled', shipmentDate: '2024-11-25', expectedDelivery: '2024-11-28' },
    { id: 'SHP-007', title: 'Automobile Parts', pickup: 'Detroit, MI', delivery: 'Dallas, TX', status: 'In Transit', shipmentDate: '2024-12-07', expectedDelivery: '2024-12-12' },
    { id: 'SHP-008', title: 'Toy Shipment', pickup: 'Atlanta, GA', delivery: 'Orlando, FL', status: 'Delivered', shipmentDate: '2024-11-20', expectedDelivery: '2024-11-24' },
    { id: 'SHP-009', title: 'Sporting Goods', pickup: 'Philadelphia, PA', delivery: 'Washington, DC', status: 'In Transit', shipmentDate: '2024-12-08', expectedDelivery: '2024-12-14' },
    { id: 'SHP-010', title: 'Office Supplies', pickup: 'Boston, MA', delivery: 'Newark, NJ', status: 'Pending', shipmentDate: '2024-12-02', expectedDelivery: '2024-12-05' }
  ];

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
          <ShipmentTable shipments={listing} getshipment={getshipment}/>
        </div>
      </div>
    </Layout>
  )
}

import Layout from '@/layout/Layout';
import React, { useEffect, useState } from 'react'
import Details from '../api/Listing/Details';

export default function index() {

    const [listing, setLisitng] = useState("");
    const [Loading, setLoading] = useState(false);
    const getusers = () => {
      setLoading(true);
      const main = new Details();
      main
        .Usersget("customer")
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

    const shipments = [
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
    <Layout page={"Users"}>
    <div className="overflow-x-auto mt-6">
    <table className="table-auto border-gray-200">
      <thead>
        <tr className="text-[#9090AD] bg-[#F4F6F8] border border-gray-200 uppercase">
          <th className="px-4 py-2 ">Name</th>
          <th className="px-4 py-2 ">Role</th>
          <th className="px-4 py-2 ">Tasks assigned</th>
        </tr>
      </thead>
      <tbody>
        {listing && listing?.map((data) => (
          <tr key={data?._id} className="border border-gray-200 font-medium">
            <td className="px-4 py-2">{data?.email}</td>
            <td className="px-4 py-2">{data?.role}</td>
            <td className="px-4 py-2">{data?.tasks || "0"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  </Layout>
  )
}

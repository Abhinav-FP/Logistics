import Layout from '@/layout/Layout'
import React from 'react'
import ShipmentTable from '../Home/ShipmentTable';

export default function index() {
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
        <div className='mt-20'>
          <div className='flex justify-between items-center mb-5'>
            <h2 className="text-lg font-medium mb-3">Shipment Listing </h2>
            <button className="bg-[#1C5FE8] text-white p-2 rounded-md">
            + New Shipments
          </button>
          </div>
        <ShipmentTable shipments={data}/>
        </div>
    </Layout>
  )
}

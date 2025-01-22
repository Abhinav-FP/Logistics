import Layout from '@/layout/Layout';
import React, { useEffect, useState } from 'react'
import Details from '../api/Listing/Details';
import Link from 'next/link';
import UsersTable from '@/components/UsersTable';
import Popup from '@/components/Popup';

export default function index() {

  const [listing, setLisitng] = useState("");
  const [Loading, setLoading] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);
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
 
  return (
    <Layout page={"Users"}>
      <div className="flex items-center justify-between items-center space-y-4 md:space-y-0">
        <h2 className="text-[#151547] text-lg tracking-[-0.04em] font-medium m-0">Carrier  Listing </h2>
        <button href="/carriers/add" className="bg-[#1C5FE8] hover:bg-[#0a3fab] inline-block font-medium text-base text-white tracking-[-0.04em] rounded-lg lg:rounded-xl px-5 py-3"
        onClick={() => {
          openPopup();
        }}>
          <span className="mr-1">+</span> Add New User
        </button>
      </div>
      <div className="bg-white mt-6 lg:mt-[30px] px-6 py-[30px] rounded-md lg:rounded-xl border border-black border-opacity-10">
        <UsersTable listing={listing} />
        {/* <div className="overflow-x-auto">
          <table className="w-full border-none">
            <thead>
              <tr className="text-[#9090AD] bg-[#F4F6F8] border border-black border-opacity-10 uppercase ">
                <th className="px-4 py-3  tracking-[-0.04em] text-sm font-medium text-left">Sr No</th>
                <th className="px-4 py-3  tracking-[-0.04em] text-sm font-medium text-left">Name</th>
                <th className="px-4 py-3  tracking-[-0.04em] text-sm font-medium text-left">Role</th>
                <th className="px-4 py-3  tracking-[-0.04em] text-sm font-medium text-left">Email</th>
                <th className="px-4 py-3  tracking-[-0.04em] text-sm font-medium text-left">Contact</th>
              </tr>
            </thead>
            <tbody>
              {listing && listing?.map((data, index) => (
                <tr key={index} className="border-b border-black border-opacity-10 font-medium">
                  <td className="px-3 py-5 text-[#1D1D42] tracking-[-0.04em] text-sm font-medium text-left">{data?.id}</td>
                  <td className="px-3 py-5 text-[#1D1D42] tracking-[-0.04em] text-sm font-medium text-left">{data?.name}</td>
                  <td className="px-3 py-5 text-[#1D1D42] tracking-[-0.04em] text-sm font-medium text-left">{data?.role}</td>
                  <td className="px-3 py-5 text-[#1D1D42] tracking-[-0.04em] text-sm font-medium text-left">{data?.email}</td>
                  <td className="px-3 py-5 text-[#1D1D42] tracking-[-0.04em] text-sm font-medium text-left">{data?.contact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div> */}
      </div>
      <Popup isOpen={isPopupOpen} onClose={closePopup}>
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="text-[#70708D] text-sm tracking-[-0.04em] uppercase mb-2 block"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full h-11 appearance-none block bg-white text-[#000] text-base border border-black border-opacity-10 rounded-md py-2 px-4 leading-tight focus:outline-none"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="text-[#70708D] text-sm tracking-[-0.04em] uppercase mb-2 block"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full h-11 appearance-none block bg-white text-[#000] text-base border border-black border-opacity-10 rounded-md py-2 px-4 leading-tight focus:outline-none"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="contact"
                  className="text-[#70708D] text-sm tracking-[-0.04em] uppercase mb-2 block"
                >
                  Contact
                </label>
                <input
                  type="text"
                  id="contact"
                  className="w-full h-11 appearance-none block bg-white text-[#000] text-base border border-black border-opacity-10 rounded-md py-2 px-4 leading-tight focus:outline-none"
                  placeholder="Enter your contact number"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#1C5FE8] hover:bg-[#0a3fab] font-medium text-base text-white tracking-[-0.04em] rounded-lg py-3"
              >
                Submit
              </button>
            </form>
          </Popup>
    </Layout>
  )
}

import AccountPopup from "@/components/AccountPopup";
import Popup from "@/components/Popup";
import Layout from "@/layout/Layout";
import Details from "@/pages/api/Listing/Details";
import { useRouter } from "next/router";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { IoBookmark } from "react-icons/io5";

export default function Index() {
   const router = useRouter(); 
  const[loading,setLoading]=useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);
  const[data,setData]=useState({});
  const [formData, setFormData] = useState({
    name: "",
    id: "",
    type: "",
    companyname: "",
    license: "",
    size: "",
    contact: "",
    email: "",
    fax: "",
    address: "",
    country: "",
    state: "",
    city: "",
    postal: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  // Handle form submission
  const handleSubmit=(e) => {
    e.preventDefault();
    setLoading(true);
    const main = new Details();
    const updatedFormData = { ...formData, role: "carrier" };
    const response = main.createCarrier(updatedFormData);
    response
      .then((res) => {
        if (res && res?.data && res?.data?.status) {
          toast.success(res.data.message);
          setData(res.data.data?.user);
          setIsPopupOpen(true);
          setLoading(false);
        } else {
          toast.error(res.data.message);
          setLoading(false);
        }
        setFormData({
          name: "",
          id: "",
          type: "",
          companyname: "",
          license: "",
          size: "",
          contact: "",
          email: "",
          fax: "",
          address: "",
          country: "",
          state: "",
          city: "",
          postal: "",
        });
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
        console.log("error", error);
        setLoading(false);
      });
  }

  return (
    <Layout page={"Carriers"}>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap items-center justify-between mb-3 lg:mb-4">
            <h3 className="text-[#151547] text-lg tracking-[-0.04em] font-medium m-0">
              Create New Carrier
            </h3>
            <button
              type="submit"
              className="flex gap-2 items-center bg-[#1C5FE8] hover:bg-[#0a3fab] font-medium text-base text-white tracking-[-0.04em] rounded-lg lg:rounded-xl px-5 py-3"
            >
              <IoBookmark size={18} color={"#ffff"} /> Save
            </button>
          </div>
          <div className="space-y-4 lg:space-y-5">
            {/* Carrier Information */}
            <div className="bg-white rounded-xl border border-black border-opacity-10 ">
              <div className="py-6 px-[30px] border-b border-black border-opacity-10">
                <h4 className="text-[#151547] text-lg tracking-[-0.04em] font-medium m-0">
                  Carrier Information
                </h4>
              </div>
              <div className="py-6 px-[30px]">
                <div className="flex flex-wrap -mx-2 lg:-mx-3">
                  <div className="w-full md:w-6/12 px-2 lg:px-3 mb-4 lg:mb-6">
                    <label className="text-[#70708D] text-sm tracking-[-0.04em] uppercase mb-2 block">
                      Carrier Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full h-11 lg:h-[48px] appearance-none block bg-white text-[#000] text-base border border-black border-opacity-10 rounded-md lg:rounded-xl py-2 px-4 leading-tight focus:outline-none"
                      placeholder=""
                      required
                    />
                  </div>
                  <div className="w-full md:w-6/12 px-2 lg:px-3 mb-4 lg:mb-6">
                    <label className="text-[#70708D] text-sm tracking-[-0.04em] uppercase mb-2 block">
                      Carrier ID
                    </label>
                    <input
                      type="text"
                      name="id"
                      value={formData.id}
                      onChange={handleChange}
                      className="w-full h-11 lg:h-[48px] appearance-none block bg-white text-[#000] text-base border border-black border-opacity-10 rounded-md lg:rounded-xl py-2 px-4 leading-tight focus:outline-none"
                      placeholder=""
                      required
                    />
                  </div>
                  <div className="w-full md:w-6/12 px-2 lg:px-3 mb-4 lg:mb-6">
                    <label className="text-[#70708D] text-sm tracking-[-0.04em] uppercase mb-2 block">
                      Carrier Type
                    </label>
                    <input
                      type="text"
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="w-full h-11 lg:h-[48px] appearance-none block bg-white text-[#000] text-base border border-black border-opacity-10 rounded-md lg:rounded-xl py-2 px-4 leading-tight focus:outline-none"
                      placeholder=""
                      required
                    />
                  </div>
                  <div className="w-full md:w-6/12 px-2 lg:px-3 mb-4 lg:mb-6">
                    <label className="text-[#70708D] text-sm tracking-[-0.04em] uppercase mb-2 block">
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="companyname"
                      value={formData.companyname}
                      onChange={handleChange}
                      className="w-full h-11 lg:h-[48px] appearance-none block bg-white text-[#000] text-base border border-black border-opacity-10 rounded-md lg:rounded-xl py-2 px-4 leading-tight focus:outline-none"
                      placeholder=""
                      required
                    />
                  </div>
                  <div className="w-full md:w-6/12 px-2 lg:px-3 mb-4 lg:mb-6">
                    <label className="text-[#70708D] text-sm tracking-[-0.04em] uppercase mb-2 block">
                      License Number
                    </label>
                    <input
                      type="number"
                      name="license"
                      value={formData.licenseno}
                      onChange={handleChange}
                      className="w-full h-11 lg:h-[48px] appearance-none block bg-white text-[#000] text-base border border-black border-opacity-10 rounded-md lg:rounded-xl py-2 px-4 leading-tight focus:outline-none"
                      placeholder=""
                      required
                    />
                  </div>
                  <div className="w-full md:w-6/12 px-2 lg:px-3 mb-4 lg:mb-6">
                    <label className="text-[#70708D] text-sm tracking-[-0.04em] uppercase mb-2 block">
                      fleet size
                    </label>
                    <input
                      type="number"
                      name="size"
                      value={formData.size}
                      onChange={handleChange}
                      className="w-full h-11 lg:h-[48px] appearance-none block bg-white text-[#000] text-base border border-black border-opacity-10 rounded-md lg:rounded-xl py-2 px-4 leading-tight focus:outline-none"
                      placeholder=""
                      required
                    />
                  </div>
                  <div className="w-full md:w-6/12 px-2 lg:px-3 mb-4 lg:mb-6">
                    <label className="text-[#70708D] text-sm tracking-[-0.04em] uppercase mb-2 block">
                      Contact information
                    </label>
                    <input
                      type="text"
                      name="contact"
                      value={formData.contact}
                      onChange={(e) => {
                        if (
                          e.target.value.length <= 10 &&
                          /^[0-9]*$/.test(e.target.value)
                           ) {
                            handleChange(e);
                             }
                        }}
                       maxLength="10"
                      className="w-full h-11 lg:h-[48px] appearance-none block bg-white text-[#000] text-base border border-black border-opacity-10 rounded-md lg:rounded-xl py-2 px-4 leading-tight focus:outline-none"
                      placeholder=""
                      required
                    />
                  </div>
                  <div className="w-full md:w-6/12 px-2 lg:px-3 mb-4 lg:mb-6">
                    <label className="text-[#70708D] text-sm tracking-[-0.04em] uppercase mb-2 block">
                      email address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full h-11 lg:h-[48px] appearance-none block bg-white text-[#000] text-base border border-black border-opacity-10 rounded-md lg:rounded-xl py-2 px-4 leading-tight focus:outline-none"
                      placeholder=""
                    />
                  </div>
                  <div className="w-full md:w-6/12 px-2 lg:px-3 mb-4 lg:mb-6">
                    <label className="text-[#70708D] text-sm tracking-[-0.04em] uppercase mb-2 block">
                      fax (optional)
                    </label>
                    <input
                      type="text"
                      name="fax"
                      value={formData.fax}
                      onChange={handleChange}
                      className="w-full h-11 lg:h-[48px] appearance-none block bg-white text-[#000] text-base border border-black border-opacity-10 rounded-md lg:rounded-xl py-2 px-4 leading-tight focus:outline-none"
                      placeholder=""
                    />
                  </div>
                  <div className="w-full md:w-6/12 px-2 lg:px-3 mb-4 lg:mb-6">
                    <label className="text-[#70708D] text-sm tracking-[-0.04em] uppercase mb-2 block">
                      Street Address{" "}
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full h-11 lg:h-[48px] appearance-none block bg-white text-[#000] text-base border border-black border-opacity-10 rounded-md lg:rounded-xl py-2 px-4 leading-tight focus:outline-none"
                      placeholder=""
                    />
                  </div>
                  <div className="w-full md:w-6/12 px-2 lg:px-3 mb-4 lg:mb-6">
                    <label className="text-[#70708D] text-sm tracking-[-0.04em] uppercase mb-2 block">
                      country
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full h-11 lg:h-[48px] appearance-none block bg-white text-[#000] text-base border border-black border-opacity-10 rounded-md lg:rounded-xl py-2 px-4 leading-tight focus:outline-none"
                      placeholder=""
                    />
                  </div>
                  <div className="w-full md:w-6/12 px-2 lg:px-3 mb-4 lg:mb-6">
                    <label className="text-[#70708D] text-sm tracking-[-0.04em] uppercase mb-2 block">
                      state/province
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full h-11 lg:h-[48px] appearance-none block bg-white text-[#000] text-base border border-black border-opacity-10 rounded-md lg:rounded-xl py-2 px-4 leading-tight focus:outline-none"
                      placeholder=""
                    />
                  </div>
                  <div className="w-full md:w-6/12 px-2 lg:px-3 mb-4 lg:mb-6">
                    <label className="text-[#70708D] text-sm tracking-[-0.04em] uppercase mb-2 block">
                      city
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full h-11 lg:h-[48px] appearance-none block bg-white text-[#000] text-base border border-black border-opacity-10 rounded-md lg:rounded-xl py-2 px-4 leading-tight focus:outline-none"
                      placeholder=""
                    />
                  </div>
                  <div className="w-full md:w-6/12 px-2 lg:px-3 mb-4 lg:mb-6">
                    <label className="text-[#70708D] text-sm tracking-[-0.04em] uppercase mb-2 block">
                      postal code
                    </label>
                    <input
                      type="number"
                      name="postal"
                      value={formData.postal}
                      onChange={handleChange}
                      className="w-full h-11 lg:h-[48px] appearance-none block bg-white text-[#000] text-base border border-black border-opacity-10 rounded-md lg:rounded-xl py-2 px-4 leading-tight focus:outline-none"
                      placeholder=""
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* <div className='bg-white rounded-xl border border-black border-opacity-10 '>
                            <div className='py-6 px-[30px] border-b border-black border-opacity-10'>
                                <h4 className='text-[#151547] text-lg tracking-[-0.04em] font-medium m-0'>Fleet and Equipment Details</h4>
                            </div>
                            <div className='py-6 px-[30px]'>
                                <div className='flex flex-wrap -mx-2 lg:-mx-3'>
                                    <div className='w-full md:w-6/12 px-2 lg:px-3 mb-4 lg:mb-6'>
                                        <label className='text-[#70708D] text-sm tracking-[-0.04em] uppercase mb-2 block'>Vehicle Type</label>
                                        <input type='text'
                                            value={formData.title}
                                            onChange={handleChange}
                                            className='w-full h-11 lg:h-[48px] appearance-none block bg-white text-[#000] text-base border border-black border-opacity-10 rounded-md lg:rounded-xl py-2 px-4 leading-tight focus:outline-none' placeholder='' />
                                    </div>
                                    <div className='w-full md:w-6/12 px-2 lg:px-3 mb-4 lg:mb-6'>
                                        <label className='text-[#70708D] text-sm tracking-[-0.04em] uppercase mb-2 block'>Vehicle Capacity (kg/ton)</label>
                                        <input type='text'
                                            value={formData.title}
                                            onChange={handleChange}
                                            className='w-full h-11 lg:h-[48px] appearance-none block bg-white text-[#000] text-base border border-black border-opacity-10 rounded-md lg:rounded-xl py-2 px-4 leading-tight focus:outline-none' placeholder='' />
                                    </div> 
                                    <div className='w-full md:w-6/12 px-2 lg:px-3 mb-4 lg:mb-6'>
                                        <label className='text-[#70708D] text-sm tracking-[-0.04em] uppercase mb-2 block'>Vehicle Registration Numbers</label>
                                        <input type='text'
                                            value={formData.title}
                                            onChange={handleChange}
                                            className='w-full h-11 lg:h-[48px] appearance-none block bg-white text-[#000] text-base border border-black border-opacity-10 rounded-md lg:rounded-xl py-2 px-4 leading-tight focus:outline-none' placeholder='' />
                                    </div>
                                    <div className='w-full md:w-6/12 px-2 lg:px-3 mb-4 lg:mb-6'>
                                        <label className='text-[#70708D] text-sm tracking-[-0.04em] uppercase mb-2 block'>Insurance Information</label>
                                        <input type='text'
                                            value={formData.title}
                                            onChange={handleChange}
                                            className='w-full h-11 lg:h-[48px] appearance-none block bg-white text-[#000] text-base border border-black border-opacity-10 rounded-md lg:rounded-xl py-2 px-4 leading-tight focus:outline-none' placeholder='' />
                                    </div>
                                    <div className='w-full md:w-6/12 px-2 lg:px-3 mb-4 lg:mb-6'>
                                        <label className='text-[#70708D] text-sm tracking-[-0.04em] uppercase mb-2 block'>Insurance Provider Name</label>
                                        <input type='text'
                                            value={formData.title}
                                            onChange={handleChange}
                                            className='w-full h-11 lg:h-[48px] appearance-none block bg-white text-[#000] text-base border border-black border-opacity-10 rounded-md lg:rounded-xl py-2 px-4 leading-tight focus:outline-none' placeholder='' />
                                    </div>
                                    <div className='w-full md:w-6/12 px-2 lg:px-3 mb-4 lg:mb-6'>
                                        <label className='text-[#70708D] text-sm tracking-[-0.04em] uppercase mb-2 block'>Policy Number</label>
                                        <input type='text'
                                            value={formData.title}
                                            onChange={handleChange}
                                            className='w-full h-11 lg:h-[48px] appearance-none block bg-white text-[#000] text-base border border-black border-opacity-10 rounded-md lg:rounded-xl py-2 px-4 leading-tight focus:outline-none' placeholder='' />
                                    </div>
                                    <div className='w-full md:w-6/12 px-2 lg:px-3 mb-4 lg:mb-6'>
                                        <label className='text-[#70708D] text-sm tracking-[-0.04em] uppercase mb-2 block'>Expiry Date</label>
                                        <input type='text'
                                            value={formData.title}
                                            onChange={handleChange}
                                            className='w-full h-11 lg:h-[48px] appearance-none block bg-white text-[#000] text-base border border-black border-opacity-10 rounded-md lg:rounded-xl py-2 px-4 leading-tight focus:outline-none' placeholder='' />
                                    </div> 
                                </div>
                            </div>
                        </div>
                        <div className='bg-white rounded-xl border border-black border-opacity-10 '>
                            <div className='py-6 px-[30px] border-b border-black border-opacity-10'>
                                <h4 className='text-[#151547] text-lg tracking-[-0.04em] font-medium m-0'>Bank and Payment Details</h4>
                            </div>
                            <div className='py-6 px-[30px]'>
                                <div className='flex flex-wrap -mx-2 lg:-mx-3'>
                                    <div className='w-full md:w-6/12 px-2 lg:px-3 mb-4 lg:mb-6'>
                                        <label className='text-[#70708D] text-sm tracking-[-0.04em] uppercase mb-2 block'>Bank Name</label>
                                        <input type='text'
                                            value={formData.title}
                                            onChange={handleChange}
                                            className='w-full h-11 lg:h-[48px] appearance-none block bg-white text-[#000] text-base border border-black border-opacity-10 rounded-md lg:rounded-xl py-2 px-4 leading-tight focus:outline-none' placeholder='' />
                                    </div>
                                    <div className='w-full md:w-6/12 px-2 lg:px-3 mb-4 lg:mb-6'>
                                        <label className='text-[#70708D] text-sm tracking-[-0.04em] uppercase mb-2 block'>Account Number</label>
                                        <input type='text'
                                            value={formData.title}
                                            onChange={handleChange}
                                            className='w-full h-11 lg:h-[48px] appearance-none block bg-white text-[#000] text-base border border-black border-opacity-10 rounded-md lg:rounded-xl py-2 px-4 leading-tight focus:outline-none' placeholder='' />
                                    </div> 
                                    <div className='w-full md:w-6/12 px-2 lg:px-3 mb-4 lg:mb-6'>
                                        <label className='text-[#70708D] text-sm tracking-[-0.04em] uppercase mb-2 block'>IBAN (optional)</label>
                                        <input type='text'
                                            value={formData.title}
                                            onChange={handleChange}
                                            className='w-full h-11 lg:h-[48px] appearance-none block bg-white text-[#000] text-base border border-black border-opacity-10 rounded-md lg:rounded-xl py-2 px-4 leading-tight focus:outline-none' placeholder='' />
                                    </div>
                                    <div className='w-full md:w-6/12 px-2 lg:px-3 mb-4 lg:mb-6'>
                                        <label className='text-[#70708D] text-sm tracking-[-0.04em] uppercase mb-2 block'>Payment Terms</label>
                                        <input type='text'
                                            value={formData.title}
                                            onChange={handleChange}
                                            className='w-full h-11 lg:h-[48px] appearance-none block bg-white text-[#000] text-base border border-black border-opacity-10 rounded-md lg:rounded-xl py-2 px-4 leading-tight focus:outline-none' placeholder='' />
                                    </div>
                                    <div className='w-full md:w-6/12 px-2 lg:px-3 mb-4 lg:mb-6'>
                                        <label className='text-[#70708D] text-sm tracking-[-0.04em] uppercase mb-2 block'>Preferred Payment Method</label>
                                        <input type='text'
                                            value={formData.title}
                                            onChange={handleChange}
                                            className='w-full h-11 lg:h-[48px] appearance-none block bg-white text-[#000] text-base border border-black border-opacity-10 rounded-md lg:rounded-xl py-2 px-4 leading-tight focus:outline-none' placeholder='' />
                                    </div>
                                    <div className='w-full md:w-6/12 px-2 lg:px-3 mb-4 lg:mb-6'>
                                        <label className='text-[#70708D] text-sm tracking-[-0.04em] uppercase mb-2 block'>Policy Number</label>
                                        <input type='text'
                                            value={formData.title}
                                            onChange={handleChange}
                                            className='w-full h-11 lg:h-[48px] appearance-none block bg-white text-[#000] text-base border border-black border-opacity-10 rounded-md lg:rounded-xl py-2 px-4 leading-tight focus:outline-none' placeholder='' />
                                    </div> 
                                </div>
                            </div>
                        </div> */}
          </div>
        </form>
        {/* <Popup isOpen={isPopupOpen} onClose={closePopup}>
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm mx-auto">
            <h2 className="text-2xl font-bold text-center text-green-600 mb-4">Success</h2>
            <p className="text-gray-600 text-center mb-6">Carrier created successfully!</p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name:</label>
                <p className="text-gray-900 font-semibold">{data?.name || ""}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email:</label>
                <p className="text-gray-900 font-semibold">{data?.email || ""}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Role:</label>
                <p className="text-gray-900 font-semibold">{data?.role || ""}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Password:</label>
                <p className="text-gray-900 font-semibold">{data?.password || ""}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Contact:</label>
                <p className="text-gray-900 font-semibold">{data?.contact || ""}</p>
              </div>
            </div>
            <button
              className="mt-6 w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              onClick={()=>{
                closePopup();
                router.push('/carriers')
              }}
            >
              Close
            </button>
          </div>
        </Popup> */}
        <AccountPopup isOpen={isPopupOpen} onClose={closePopup} data={data}/>
      </div>
    </Layout>
  );
}
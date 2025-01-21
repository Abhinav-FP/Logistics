import Layout from '@/layout/Layout';
import React, { useState } from 'react';
import { IoBookmark } from "react-icons/io5";

export default function index() {
    const [formData, setFormData] = useState({
        title: ""
    });
    function handleChange(e) {
        setFormData(e.target.value);
    }

    return (
        <Layout page={"Carriers"}>
            <div>
                <form>
                    <div className='flex flex-wrap items-center justify-between mb-3 lg:mb-4'>
                        <h3 className='text-[#151547] text-lg tracking-[-0.04em] font-medium m-0'>Create New Carrier   </h3>
                        <button type='submit'
                            className="flex gap-2 items-center bg-[#1C5FE8] hover:bg-[#0a3fab] font-medium text-base text-white tracking-[-0.04em] rounded-lg lg:rounded-xl px-5 py-3">
                            <IoBookmark size={18} color={"#ffff"} /> Save
                        </button>
                    </div>
                    <div className='space-y-4 lg:space-y-5'>
                    {/* Carrier Information */}
                        <div className='bg-white rounded-xl border border-black border-opacity-10 '>
                            <div className='py-6 px-[30px] border-b border-black border-opacity-10'>
                                <h4 className='text-[#151547] text-lg tracking-[-0.04em] font-medium m-0'>Carrier Information</h4>
                            </div>
                            <div className='py-6 px-[30px]'>
                                <div className='flex flex-wrap -mx-2 lg:-mx-3'>
                                    <div className='w-full md:w-6/12 px-2 lg:px-3 mb-4 lg:mb-6'>
                                        <label className='text-[#70708D] text-sm tracking-[-0.04em] uppercase mb-2 block'>carrier name</label>
                                        <input type='text'
                                            value={formData.title}
                                            onChange={handleChange}
                                            className='w-full h-11 lg:h-[48px] appearance-none block bg-white text-[#000] text-base border border-black border-opacity-10 rounded-md lg:rounded-xl py-2 px-4 leading-tight focus:outline-none' placeholder='' />
                                    </div>
                                    <div className='w-full md:w-6/12 px-2 lg:px-3 mb-4 lg:mb-6'>
                                        <label className='text-[#70708D] text-sm tracking-[-0.04em] uppercase mb-2 block'>carrier id</label>
                                        <input type='text'
                                            value={formData.id}
                                            onChange={handleChange}
                                            className='w-full h-11 lg:h-[48px] appearance-none block bg-white text-[#000] text-base border border-black border-opacity-10 rounded-md lg:rounded-xl py-2 px-4 leading-tight focus:outline-none' placeholder='' />
                                    </div> 
                                    <div className='w-full md:w-6/12 px-2 lg:px-3 mb-4 lg:mb-6'>
                                        <label className='text-[#70708D] text-sm tracking-[-0.04em] uppercase mb-2 block'>carrier type</label>
                                        <input type='text'
                                            value={formData.type}
                                            onChange={handleChange}
                                            className='w-full h-11 lg:h-[48px] appearance-none block bg-white text-[#000] text-base border border-black border-opacity-10 rounded-md lg:rounded-xl py-2 px-4 leading-tight focus:outline-none' placeholder='' />
                                    </div>
                                    <div className='w-full md:w-6/12 px-2 lg:px-3 mb-4 lg:mb-6'>
                                        <label className='text-[#70708D] text-sm tracking-[-0.04em] uppercase mb-2 block'>company name</label>
                                        <input type='text'
                                            value={formData.companyname}
                                            onChange={handleChange}
                                            className='w-full h-11 lg:h-[48px] appearance-none block bg-white text-[#000] text-base border border-black border-opacity-10 rounded-md lg:rounded-xl py-2 px-4 leading-tight focus:outline-none' placeholder='' />
                                    </div>
                                    <div className='w-full md:w-6/12 px-2 lg:px-3 mb-4 lg:mb-6'>
                                        <label className='text-[#70708D] text-sm tracking-[-0.04em] uppercase mb-2 block'>license number</label>
                                        <input type='text'
                                            value={formData.licenseno}
                                            onChange={handleChange}
                                            className='w-full h-11 lg:h-[48px] appearance-none block bg-white text-[#000] text-base border border-black border-opacity-10 rounded-md lg:rounded-xl py-2 px-4 leading-tight focus:outline-none' placeholder='' />
                                    </div>
                                    <div className='w-full md:w-6/12 px-2 lg:px-3 mb-4 lg:mb-6'>
                                        <label className='text-[#70708D] text-sm tracking-[-0.04em] uppercase mb-2 block'>fleet size</label>
                                        <input type='text'
                                            value={formData.size}
                                            onChange={handleChange}
                                            className='w-full h-11 lg:h-[48px] appearance-none block bg-white text-[#000] text-base border border-black border-opacity-10 rounded-md lg:rounded-xl py-2 px-4 leading-tight focus:outline-none' placeholder='' />
                                    </div>
                                    <div className='w-full md:w-6/12 px-2 lg:px-3 mb-4 lg:mb-6'>
                                        <label className='text-[#70708D] text-sm tracking-[-0.04em] uppercase mb-2 block'>contact information</label>
                                        <input type='text'
                                            value={formData.information}
                                            onChange={handleChange}
                                            className='w-full h-11 lg:h-[48px] appearance-none block bg-white text-[#000] text-base border border-black border-opacity-10 rounded-md lg:rounded-xl py-2 px-4 leading-tight focus:outline-none' placeholder='' />
                                    </div>
                                    <div className='w-full md:w-6/12 px-2 lg:px-3 mb-4 lg:mb-6'>
                                        <label className='text-[#70708D] text-sm tracking-[-0.04em] uppercase mb-2 block'>phone number</label>
                                        <input type='text'
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className='w-full h-11 lg:h-[48px] appearance-none block bg-white text-[#000] text-base border border-black border-opacity-10 rounded-md lg:rounded-xl py-2 px-4 leading-tight focus:outline-none' placeholder='' />
                                    </div>
                                    <div className='w-full md:w-6/12 px-2 lg:px-3 mb-4 lg:mb-6'>
                                        <label className='text-[#70708D] text-sm tracking-[-0.04em] uppercase mb-2 block'>email address</label>
                                        <input type='text'
                                            value={formData.email}
                                            onChange={handleChange}
                                            className='w-full h-11 lg:h-[48px] appearance-none block bg-white text-[#000] text-base border border-black border-opacity-10 rounded-md lg:rounded-xl py-2 px-4 leading-tight focus:outline-none' placeholder='' />
                                    </div>
                                    <div className='w-full md:w-6/12 px-2 lg:px-3 mb-4 lg:mb-6'>
                                        <label className='text-[#70708D] text-sm tracking-[-0.04em] uppercase mb-2 block'>fax (optional)</label>
                                        <input type='text'
                                            value={formData.fax}
                                            onChange={handleChange}
                                            className='w-full h-11 lg:h-[48px] appearance-none block bg-white text-[#000] text-base border border-black border-opacity-10 rounded-md lg:rounded-xl py-2 px-4 leading-tight focus:outline-none' placeholder='' />
                                    </div>
                                    <div className='w-full md:w-12/12 px-2 lg:px-3 mb-4 lg:mb-6'>
                                        <label className='text-[#70708D] text-sm tracking-[-0.04em] uppercase mb-2 block'>Street Address </label>
                                        <input type='text'
                                            value={formData.address}
                                            onChange={handleChange}
                                            className='w-full h-11 lg:h-[48px] appearance-none block bg-white text-[#000] text-base border border-black border-opacity-10 rounded-md lg:rounded-xl py-2 px-4 leading-tight focus:outline-none' placeholder='' />
                                    </div>
                                    <div className='w-full md:w-6/12 px-2 lg:px-3 mb-4 lg:mb-6'>
                                        <label className='text-[#70708D] text-sm tracking-[-0.04em] uppercase mb-2 block'>country</label>
                                        <input type='text'
                                            value={formData.country}
                                            onChange={handleChange}
                                            className='w-full h-11 lg:h-[48px] appearance-none block bg-white text-[#000] text-base border border-black border-opacity-10 rounded-md lg:rounded-xl py-2 px-4 leading-tight focus:outline-none' placeholder='' />
                                    </div>
                                    <div className='w-full md:w-6/12 px-2 lg:px-3 mb-4 lg:mb-6'>
                                        <label className='text-[#70708D] text-sm tracking-[-0.04em] uppercase mb-2 block'>state/province</label>
                                        <input type='text'
                                            value={formData.state}
                                            onChange={handleChange}
                                            className='w-full h-11 lg:h-[48px] appearance-none block bg-white text-[#000] text-base border border-black border-opacity-10 rounded-md lg:rounded-xl py-2 px-4 leading-tight focus:outline-none' placeholder='' />
                                    </div>
                                    <div className='w-full md:w-6/12 px-2 lg:px-3 mb-4 lg:mb-6'>
                                        <label className='text-[#70708D] text-sm tracking-[-0.04em] uppercase mb-2 block'>city</label>
                                        <input type='text'
                                            value={formData.city}
                                            onChange={handleChange}
                                            className='w-full h-11 lg:h-[48px] appearance-none block bg-white text-[#000] text-base border border-black border-opacity-10 rounded-md lg:rounded-xl py-2 px-4 leading-tight focus:outline-none' placeholder='' />
                                    </div>
                                    <div className='w-full md:w-6/12 px-2 lg:px-3 mb-4 lg:mb-6'>
                                        <label className='text-[#70708D] text-sm tracking-[-0.04em] uppercase mb-2 block'>postal code</label>
                                        <input type='text'
                                            value={formData.postal}
                                            onChange={handleChange}
                                            className='w-full h-11 lg:h-[48px] appearance-none block bg-white text-[#000] text-base border border-black border-opacity-10 rounded-md lg:rounded-xl py-2 px-4 leading-tight focus:outline-none' placeholder='' />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='bg-white rounded-xl border border-black border-opacity-10 '>
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
                        </div>
                    </div>
                </form>
            </div>
        </Layout>
    )
};
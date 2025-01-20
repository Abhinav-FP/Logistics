import Layout from '@/layout/Layout';
import React, { useState } from 'react';

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
                            className="bg-[#1C5FE8] hover:bg-[#0a3fab] font-medium text-base text-white tracking-[-0.04em] rounded-lg lg:rounded-xl px-5 py-3  ">
                            <svg className='inline mr-2 lg:mr-2.5' width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 3.13333C1 2.38667 1 2.01333 1.14533 1.728C1.27316 1.47713 1.47713 1.27316 1.728 1.14533C2.01333 1 2.38667 1 3.13333 1H6.86667C7.61333 1 7.98667 1 8.272 1.14533C8.52287 1.27316 8.72684 1.47713 8.85467 1.728C9 2.01333 9 2.38667 9 3.13333V12.0033C9 12.3273 9 12.4893 8.93267 12.578C8.90357 12.6166 8.86644 12.6483 8.82385 12.6711C8.78126 12.6939 8.73422 12.7072 8.686 12.71C8.57467 12.7167 8.44 12.6267 8.17067 12.4473L5 10.3333L1.82933 12.4467C1.56 12.6267 1.42533 12.7167 1.31333 12.71C1.26522 12.7071 1.21832 12.6938 1.17585 12.671C1.13338 12.6482 1.09636 12.6165 1.06733 12.578C1 12.4893 1 12.3273 1 12.0033V3.13333Z" fill="white" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                            </svg> Save
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
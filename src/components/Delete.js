import React, { useState } from 'react';
import { IoCloseSharp } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import toast from 'react-hot-toast';
import Details from '@/pages/api/Listing/Details';

export default function Delete({ step, Id, getShipments, role }) {
    const [isOpen, setIsOpen] = useState(false);

    const [loading, setLoading] = useState(false);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };
    const deleteshipment = (Id) => {
        setLoading(true);
        const main = new Details();
        main
            .deleteShipment(Id)
            .then((r) => {
                toast.success(r?.data?.message);
                getShipments(role === "broker");
                setLoading(false);
            })
            .catch((err) => {
                toast.error(err?.response?.data?.message);
                console.log("error", err);
                setLoading(false);
            });
    };

    const handleClick = (e) => {
        e.preventDefault();
        if (step === 1) {
            deleteshipment(Id);
        } else {
            console.warn('Invalid step');
        }
    };

    return (
        <div className="flex flex-col">
            <button
                onClick={toggleModal}
                className='m-auto font-[manrope] font-[600] text-black text-[18px]'
            >
                <RiDeleteBin6Line size={18} className='text-red-600 hover:text-red-700' />
            </button>
            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9]">
                    <div className="relative bg-[#FFFFFF] rounded-lg p-[15px] lg:p-[20px] w-[96%] max-w-[500px]">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-[30px] font-semibold text-black">Delete</h3>
                            <IoCloseSharp
                                size={30}
                                className="cursor-pointer text-black"
                                onClick={toggleModal}
                            />
                        </div>

                        {/* Responsive Paragraph */}
                        <p className="text-black mb-[6px] text-[12px] sm:text-[14px] md:text-[17px] font-[400] text-left">
                            Are you sure you want to delete this {step === 1 ? "shipment" : "user"} ?
                        </p>
                        <p className="mb-[40px] text-[12px] sm:text-[12px] md:text-[15px] font-[400] text-left text-[#f00000]">
                            (This action cannot be undone.)
                        </p>

                        <div className="flex justify-end gap-[8px]">
                            <button
                                type="button"
                                onClick={toggleModal}
                                className="text-black mr-2 px-4 py-2 border border-gray-300 rounded-md"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleClick}
                                className="bg-red-600 hover:bg-red-500 font-manrope font-[700] text-[14px] px-[20px] py-[10px] text-white rounded-[5px] text-center"
                            >
                                {loading ? "Loading..." : "Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
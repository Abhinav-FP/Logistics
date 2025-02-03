import Popup from '@/components/Popup';
import React, { useEffect, useState } from 'react'
import Details from '../pages/api/Listing/Details';
import toast from 'react-hot-toast';
import { MdAssignment } from "react-icons/md";

export default function DriverAssign({ Id, getShipments, role }) {
    const [isdriverPopupOpen, setIsDriverPopupOpen] = useState(false);
    const [Selecteddriver, setSelecteddriver] = useState();
    const opendriverPopup = () => setIsDriverPopupOpen(true);
    const closeDrivePopup = () => setIsDriverPopupOpen(false);
    const [listing, setLisitng] = useState("");
    const getDrivers = () => {
        const main = new Details();
        main
            .Driverget()
            .then((r) => {
                setLisitng(r?.data?.data);
            })
            .catch((err) => {
                setLisitng([]);
                console.log("error", err);
            });
    };

    useEffect(() => {
        getDrivers();
    }, []);

    const assigndriver = () => {
        const main = new Details();
        const response = main.UpdateShipment(Id, {
            driver_id: Selecteddriver,
        });
        response
            .then((res) => {
                if (res && res?.data && res?.data?.status) {
                    toast.success(res.data.message);
                    closeDrivePopup();
                    getShipments(role === "driver");
                } else {
                    toast.error(res.data.message);
                }
            })
            .catch((error) => {
                toast.error(error?.response?.data?.message);
                console.log("error", error);
            });
    }
    return (
        <>
            <button
                className="flex gap-2 text-[#1B1B1B] bg-transparent border-none text-sm font-medium"
                onClick={() => {
                    opendriverPopup();
                }}
            >
                Assign Driver <MdAssignment size={24} />
            </button>
            <Popup
                isOpen={isdriverPopupOpen}
                onClose={closeDrivePopup}
                size={"max-w-[700px]"}
            >
                <div className="lg:px-2.5 lg:pb-2.5">
                    <div className="overflow-x-auto mt-8">
                        <table className="w-full border-none">
                            <thead>
                                <tr className="text-[#9090AD] bg-[#F4F6F8] border border-black border-opacity-10 uppercase ">
                                    <th className="px-4 py-3  tracking-[-0.04em] text-sm font-medium text-left">
                                        Driver Name
                                    </th>
                                    <th className="px-4 py-3  tracking-[-0.04em] text-sm font-medium text-left">
                                        Driver Email
                                    </th>
                                    <th className="px-4 py-3  tracking-[-0.04em] text-sm font-medium text-left">
                                        Address                                    </th>
                                    <th className="px-4 py-3  tracking-[-0.04em] text-sm font-medium text-left">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {listing &&
                                    listing?.map((driver, index) => (
                                        <tr
                                            key={index}
                                            className="border-b  border-black border-opacity-10 font-medium"
                                        >
                                            <td className="px-4 py-5 text-[#1D1D42] tracking-[-0.04em] text-sm font-medium text-left">
                                                {driver?.driver_id_ref?.name}
                                            </td>
                                            <td className="px-4 py-5 text-[#1D1D42] tracking-[-0.04em] text-sm font-medium text-left">
                                                {driver?.driver_id_ref?.email}
                                            </td>
                                            <td width="18%" className="px-4 py-5 text-[#1D1D42] tracking-[-0.04em] text-sm font-medium text-left truncate max-w-[200px]" title={driver?.address}>
                                                {driver?.address}
                                            </td>


                                            <td className="px-4 py-5 text-[#1D1D42] tracking-[-0.04em] text-sm font-medium text-center">
                                                <button onClick={() => {
                                                    setSelecteddriver(driver?.driver_id_ref?._id);
                                                }}>
                                                    {Selecteddriver && Selecteddriver === driver?.driver_id_ref?._id ?
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <rect width="24" height="24" rx="12" fill="#0BB635" />
                                                            <path d="M4 12C4 9.87827 4.84285 7.84344 6.34315 6.34315C7.84344 4.84285 9.87827 4 12 4C14.1217 4 16.1566 4.84285 17.6569 6.34315C19.1571 7.84344 20 9.87827 20 12C20 14.1217 19.1571 16.1566 17.6569 17.6569C16.1566 19.1571 14.1217 20 12 20C9.87827 20 7.84344 19.1571 6.34315 17.6569C4.84285 16.1566 4 14.1217 4 12ZM12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2ZM17.457 9.457L16.043 8.043L11 13.086L8.207 10.293L6.793 11.707L11 15.914L17.457 9.457Z" fill="white" />
                                                        </svg>
                                                        :
                                                        <svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M2 10C2 7.87827 2.84285 5.84344 4.34315 4.34315C5.84344 2.84285 7.87827 2 10 2C12.1217 2 14.1566 2.84285 15.6569 4.34315C17.1571 5.84344 18 7.87827 18 10C18 12.1217 17.1571 14.1566 15.6569 15.6569C14.1566 17.1571 12.1217 18 10 18C7.87827 18 5.84344 17.1571 4.34315 15.6569C2.84285 14.1566 2 12.1217 2 10ZM10 0C4.477 0 0 4.477 0 10C0 15.523 4.477 20 10 20C15.523 20 20 15.523 20 10C20 4.477 15.523 0 10 0ZM15.457 7.457L14.043 6.043L9 11.086L6.207 8.293L4.793 9.707L9 13.914L15.457 7.457Z" fill="#999999" />
                                                        </svg>
                                                    }
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                    <button className="bg-[#1C5FE8] hover:bg-[#0a3fab] px-10 py-2.5 text-white flex mx-auto mt-6 rounded-lg"
                        onClick={() => {
                            assigndriver();
                        }}>
                        Save
                    </button>
                </div>
            </Popup>
        </>
    )
}

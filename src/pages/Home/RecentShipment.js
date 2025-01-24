import React from "react";


export default function RecentShipment() {
    const RecentItems = [
        {
            id: "#01456CAD",
            category: "Electronics",
            arrivalTime: "7/1/2023",
            weight: "25KG",
            startLocation: "87 Wern Ddu Lane",
            endLocation: "15 Vicar Lane",
            fee: "$450.00"
        },
        {
            id: "#01456CAD",
            category: "Electronics",
            arrivalTime: "7/1/2023",
            weight: "25KG",
            startLocation: "87 Wern Ddu Lane",
            endLocation: "15 Vicar Lane",
            fee: "$450.00"
        },
        {
            id: "#01456CAD",
            category: "Electronics",
            arrivalTime: "7/1/2023",
            weight: "25KG",
            startLocation: "87 Wern Ddu Lane",
            endLocation: "15 Vicar Lane",
            fee: "$450.00"
        },
        {
            id: "#01456CAD",
            category: "Electronics",
            arrivalTime: "7/1/2023",
            weight: "25KG",
            startLocation: "87 Wern Ddu Lane",
            endLocation: "15 Vicar Lane",
            fee: "$450.00"
        },
    ]

    return (
        <div className="overflow-x-auto">
            <table className="w-full border-none">
                <thead>
                    <tr className="text-[#9090AD] bg-[#F4F6F8] border border-black border-opacity-10 uppercase ">
                        <th className="px-4 py-3 tracking-[-0.04em] text-sm font-medium text-left">ORDER ID</th>
                        <th className="px-4 py-3 tracking-[-0.04em] text-sm font-medium text-left">CATEGORY</th>
                        <th className="px-4 py-3 tracking-[-0.04em] text-sm font-medium text-left">ARRIVAL TIME</th>
                        <th className="px-4 py-3 tracking-[-0.04em] text-sm font-medium text-left">WEIGHT</th>
                        <th className="px-4 py-3 tracking-[-0.04em] text-sm font-medium text-left">ROUTE</th>
                        <th className="px-4 py-3 tracking-[-0.04em] text-sm font-medium text-left">FEE</th>
                        <th className="px-4 py-3 tracking-[-0.04em] text-sm font-medium text-left">STATUS</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        RecentItems.map((RecentItem, index) => (

                            <tr key={index} className="border-b border-black border-opacity-10 font-medium">
                                <td className="px-3 py-5 text-[#1D1D42] tracking-[-0.04em] text-sm font-medium text-left">
                                    {RecentItem?.id}
                                </td>
                                <td className="px-3 py-5 text-[#1D1D42] tracking-[-0.04em] text-sm font-medium text-left">
                                    {RecentItem?.category}
                                </td>
                                <td className="px-3 py-5 text-[#1D1D42] tracking-[-0.04em] text-sm font-medium text-left">
                                    {RecentItem?.arrivalTime}
                                </td>
                                <td className="px-3 py-5 text-[#1D1D42] tracking-[-0.04em] text-sm font-medium text-left">
                                    {RecentItem?.weight}
                                </td>
                                <td className="px-3 py-5 text-[#1D1D42] tracking-[-0.04em] text-sm font-medium text-left">
                                    <div className="flex items-center">
                                        {RecentItem?.startLocation} <svg className="inline mx-1" width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0.624986 5.58337H7.38349L4.75849 8.20837L5.58332 9.0332L9.61649 5.00004L5.58332 0.96687L4.75849 1.7917L7.38349 4.4167L0.624986 4.4167V5.58337Z" fill="#151547" />
                                        </svg>
                                        {RecentItem?.endLocation}
                                    </div>

                                </td>
                                <td className="px-3 py-5 text-[#1D1D42] tracking-[-0.04em] text-sm font-medium text-left">
                                    {RecentItem?.fee}
                                </td>
                                <td className="px-3 py-5 text-[#1D1D42] tracking-[-0.04em] text-sm font-medium text-left">
                                    <div className="flex items-center">
                                        <button className="border border-[#3D9D82] border-opacity-5 bg-[#3D9D82] bg-opacity-10 py-2.5 px-5 rounded-md lg:rounded-xl mr-2">
                                            <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M1.16666 6L2.625 4.54167L5.54166 7.45833L11.375 1.625L12.8333 3.08333L5.54166 10.375L1.16666 6Z" fill="#0BB635" stroke="#0BB635" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </button>
                                        <button className="border border-[#3D9D82] border-opacity-5 bg-[#3D9D82] bg-opacity-10 py-2.5 px-5 rounded-md lg:rounded-xl mr-2">
                                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M2.39733 1.11821L6 4.72088L9.584 1.13688C9.66317 1.05261 9.75854 0.985206 9.86439 0.938696C9.97024 0.892185 10.0844 0.867531 10.2 0.866211C10.4475 0.866211 10.6849 0.964544 10.86 1.13958C11.035 1.31461 11.1333 1.55201 11.1333 1.79954C11.1355 1.91397 11.1143 2.02764 11.0709 2.13357C11.0276 2.2395 10.9631 2.33545 10.8813 2.41554L7.25067 5.99954L10.8813 9.63021C11.0352 9.7807 11.1254 9.98449 11.1333 10.1995C11.1333 10.4471 11.035 10.6845 10.86 10.8595C10.6849 11.0345 10.4475 11.1329 10.2 11.1329C10.0811 11.1378 9.96238 11.118 9.85151 11.0746C9.74065 11.0312 9.64001 10.9652 9.556 10.8809L6 7.27821L2.40667 10.8715C2.32781 10.953 2.2336 11.018 2.12947 11.0629C2.02534 11.1077 1.91337 11.1315 1.8 11.1329C1.55247 11.1329 1.31507 11.0345 1.14003 10.8595C0.965001 10.6845 0.866668 10.4471 0.866668 10.1995C0.864492 10.0851 0.885722 9.97145 0.929057 9.86552C0.972391 9.75959 1.03691 9.66364 1.11867 9.58354L4.74933 5.99954L1.11867 2.36888C0.964841 2.21839 0.874638 2.0146 0.866668 1.79954C0.866668 1.55201 0.965001 1.31461 1.14003 1.13958C1.31507 0.964544 1.55247 0.866211 1.8 0.866211C2.024 0.869011 2.23867 0.959544 2.39733 1.11821Z" fill="#CF0000" />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>

                        )

                        )
                    }

                </tbody>
            </table>

        </div>
    );
};
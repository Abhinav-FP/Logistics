import Popup from "@/components/Popup";
import Layout from "@/layout/Layout";
import Details from "@/pages/api/Listing/Details";
import { useRouter } from "next/router";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { IoBookmark } from "react-icons/io5";

export default function index() {
    const router = useRouter(); 
   const[loading,setLoading]=useState(false);
   const [isPopupOpen, setIsPopupOpen] = useState(false);
   const openPopup = () => setIsPopupOpen(true);
   const closePopup = () => setIsPopupOpen(false);
   const[data,setData]=useState({});
   const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    address: "",
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
     console.log("formData",formData);
     setLoading(true);
     const main = new Details();
     const updatedFormData = { ...formData, role: "customer" };
     const response = main.createCustomer(updatedFormData);
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
           contact: "",
           email: "",
           address: "",
         });
         setLoading(false);
       })
       .catch((error) => {
         toast.error(error?.response?.data?.message);
         console.log("error", error);
         setLoading(false);
       });
   }
   console.log("data",data);
 
   return (
     <Layout page={"Customer Management"}>
       <div>
         <form onSubmit={handleSubmit}>
           <div className="flex flex-wrap items-center justify-between mb-3 lg:mb-4">
             <h3 className="text-[#151547] text-lg tracking-[-0.04em] font-medium m-0">
               Create New Customer
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
                   Customer Details
                 </h4>
               </div>
               <div className="py-6 px-[30px]">
                 <div className="flex flex-wrap -mx-2 lg:-mx-3">
                   <div className="w-full md:w-6/12 px-2 lg:px-3 mb-4 lg:mb-6">
                     <label className="text-[#70708D] text-sm tracking-[-0.04em] uppercase mb-2 block">
                       Customer Name
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
                       Email
                     </label>
                     <input
                       type="email"
                       name="email"
                       value={formData.email}
                       onChange={handleChange}
                       className="w-full h-11 lg:h-[48px] appearance-none block bg-white text-[#000] text-base border border-black border-opacity-10 rounded-md lg:rounded-xl py-2 px-4 leading-tight focus:outline-none"
                       placeholder=""
                       required
                     />
                   </div>
                   <div className="w-full md:w-6/12 px-2 lg:px-3 mb-4 lg:mb-6">
                     <label className="text-[#70708D] text-sm tracking-[-0.04em] uppercase mb-2 block">
                       Phone Number
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
                      //  onChange={handleChange}
                       className="w-full h-11 lg:h-[48px] appearance-none block bg-white text-[#000] text-base border border-black border-opacity-10 rounded-md lg:rounded-xl py-2 px-4 leading-tight focus:outline-none"
                       placeholder=""
                       required
                     />
                   </div>
                   <div className="w-full md:w-6/12 px-2 lg:px-3 mb-4 lg:mb-6">
                     <label className="text-[#70708D] text-sm tracking-[-0.04em] uppercase mb-2 block">
                       Address
                     </label>
                     <input
                       type="text"
                       name="address"
                       value={formData.address}
                       onChange={handleChange}
                       className="w-full h-11 lg:h-[48px] appearance-none block bg-white text-[#000] text-base border border-black border-opacity-10 rounded-md lg:rounded-xl py-2 px-4 leading-tight focus:outline-none"
                       placeholder=""
                       required
                     />
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </form>
         <Popup isOpen={isPopupOpen} onClose={closePopup}>
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
                 router.push('/users')
               }}
             >
               Close
             </button>
           </div>
         </Popup>
       </div>
     </Layout>
   );
 }

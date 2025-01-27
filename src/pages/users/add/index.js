import Popup from "@/components/Popup";
import Layout from "@/layout/Layout";
import Details from "@/pages/api/Listing/Details";
import { useRouter } from "next/router";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { IoBookmark } from "react-icons/io5";

export default function index() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);
  const [data, setData] = useState({});
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
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("formData", formData);
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
  console.log("data", data);

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
        <Popup isOpen={isPopupOpen} onClose={closePopup} size={'max-w-[510px]'}>

          <div className="relative z-[1]">
            <iframe className="absolute w-full z-[1] left-0 -top-6" width="100%" src="https://lottie.host/embed/1033fffa-3d5e-4fea-86a0-31a7203dccb3/ZFfNouJGHe.lottie"></iframe>
            <div className="relative z-[2]">
            <div className="mx-auto mb-10 h-[92px] w-[92px] rounded-full border border-solid border-[10px] border-opacity-30 border-[#15C082]  ">
              <div className="bg-[#15C082] mx-auto flex items-center h-[72px] w-[72px] rounded-full justify-center">
                <svg width="30" height="22" viewBox="0 0 30 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.5037 16.781L26.0579 1.22686C26.4249 0.859799 26.8531 0.67627 27.3426 0.67627C27.832 0.67627 28.2602 0.859799 28.6273 1.22686C28.9943 1.59392 29.1779 2.0301 29.1779 2.53542C29.1779 3.04074 28.9943 3.47632 28.6273 3.84215L11.7884 20.7269C11.4214 21.0939 10.9931 21.2774 10.5037 21.2774C10.0143 21.2774 9.58609 21.0939 9.21903 20.7269L1.32726 12.8351C0.960205 12.468 0.784016 12.0325 0.798699 11.5284C0.813381 11.0243 1.00486 10.5881 1.37315 10.2198C1.74143 9.85152 2.17762 9.66799 2.68171 9.66921C3.1858 9.67043 3.62138 9.85396 3.98844 10.2198L10.5037 16.781Z" fill="white" />
                </svg>
              </div>
              </div>
              <h3 className="text-[#151547] text-center font-medium tracking-[-0.04em] text-lg md:text-xl lg:text-2xl mb-5 md:mb-6 lg:mb-8">Account Created successfully</h3>
              <div className="border border-black border-opacity-10 rounded-md lg:rounded-xl p-3 lg:p-5 mb-5 md:mb-4">
                <table className="w-full border-0">
                  <tbody>
                    <tr>
                      <th className="text-left text-[#70708D] border-0 py-2 lg:py-2.5 tracking-[-0.04em] text-[15px] font-medium">Customer Name :</th>
                      <td className="border-0 py-2 pl-4 lg:py-2.5 text-[#70708D] tracking-[-0.04em] text-[15px] font-bold">Jack</td>
                    </tr>
                    <tr>
                      <th className="text-left text-[#70708D] border-0 py-2 lg:py-2.5 tracking-[-0.04em] text-[15px] font-medium">Email :</th>
                      <td className="border-0 py-2 pl-4 lg:py-2.5 text-[#70708D] tracking-[-0.04em] text-[15px] font-bold">Jack7575@gmail.com</td>
                    </tr>
                    <tr>
                      <th className="text-left text-[#70708D] border-0 py-2 lg:py-2.5 tracking-[-0.04em] text-[15px] font-medium">Phone number :</th>
                      <td className="border-0 py-2 pl-4 lg:py-2.5 text-[#70708D] tracking-[-0.04em] text-[15px] font-bold">995656xxxx</td>
                    </tr>
                    <tr>
                      <th className="text-left text-[#70708D] border-0 py-2 lg:py-2.5 tracking-[-0.04em] text-[15px] font-medium">Address :</th>
                      <td className="border-0 py-2 pl-4 lg:py-2.5 text-[#70708D] tracking-[-0.04em] text-[15px] font-bold">123 Main St, Springfield, IL</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-[#70708D] text-medium text-sm tracking-[-0.04em] text-center mb-3 lg:mb-4">Please copy the password as you will not be able to view it again</p>
              <div className="border border-black border-opacity-10 rounded-md lg:rounded-xl pl-3 lg:pl-5 pr-2 py-2 mb-5 md:mb-4 flex flex-wrap items-center">
                <div className="w-full md:w-7/12 pr-2">
                  <label className="text-[#70708D] tracking-[-0.04em] text-[15px] font-medium pr-2">Password :</label>
                  <span className="text-[#70708D] tracking-[-0.04em] text-[15px] font-bold">62h4wqrr</span>
                </div>
                <div className="w-full md:w-5/12 text-right">
                  <button className="bg-[#1C5FE8] text-white rounded-md lg:rounded-xl py-2 px-4 text-base font-medium  tracking-[-0.04em]">
                    <svg className="mr-2 inline" width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14.9917 3.5H11.4948C9.91071 3.5 8.65529 3.5 7.67377 3.63486C6.6626 3.77336 5.84452 4.06495 5.19974 4.72194C4.55407 5.37892 4.26761 6.21268 4.13201 7.24235C4 8.24287 4 9.5213 4 11.1351V16.4547C4 17.8288 4.82617 19.0061 5.99987 19.5C5.93971 18.6708 5.9397 17.509 5.9397 16.5413V11.9761C5.9397 10.8088 5.9397 9.80195 6.04567 8.99644C6.15972 8.13261 6.41655 7.30523 7.07569 6.63366C7.73483 5.9621 8.54753 5.70058 9.39525 5.58395C10.1855 5.47642 11.1733 5.47642 12.3201 5.47642H15.077C16.2228 5.47642 17.2089 5.47642 18 5.58395C17.763 4.97005 17.3492 4.44287 16.8126 4.07113C16.276 3.6994 15.6414 3.50037 14.9917 3.5Z" fill="white" />
                      <path d="M7 11.7938C7 9.29843 7 8.05071 7.76194 7.27536C8.52299 6.5 9.74806 6.5 12.2 6.5H14.8C17.251 6.5 18.477 6.5 19.239 7.27536C20.0009 8.05071 20 9.29843 20 11.7938V16.2062C20 18.7016 20 19.9493 19.239 20.7246C18.477 21.5 17.251 21.5 14.8 21.5H12.2C9.74896 21.5 8.52299 21.5 7.76194 20.7246C7 19.9493 7 18.7016 7 16.2062V11.7938Z" fill="white" />
                    </svg>  Copy

                  </button>
                </div>
              </div>
            </div>
          </div>
        </Popup>
      </div>
    </Layout>
  );
}

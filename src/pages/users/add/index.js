import AccountPopup from "@/components/AccountPopup";
import Layout from "@/layout/Layout";
import Details from "@/pages/api/Listing/Details";
import { useRouter } from "next/router";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { IoBookmark } from "react-icons/io5";

export default function Index() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => {
    setIsPopupOpen(false);
    router.push("/users");
  };
  const [data, setData] = useState({});
  // const [data, setData] = useState({
  //   name: "Abhinav",
  //   contact: "7568312283",
  //   email: "fp@gmail.com",
  //   address: "fgdfg 345 fdg",
  //   password:"hjgh8uty68yj",
  // });
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
        {/* <Popup isOpen={isPopupOpen} onClose={closePopup} size={'max-w-[510px]'}>
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
                      <th className="text-left text-[#70708D] border-0 py-2 lg:py-2.5 tracking-[-0.04em] text-[15px] font-medium">Name :</th>
                      <td className="border-0 py-2 pl-4 lg:py-2.5 text-[#70708D] tracking-[-0.04em] text-[15px] font-bold capitalize">{data?.name || ""}</td>
                    </tr>
                    <tr>
                      <th className="text-left text-[#70708D] border-0 py-2 lg:py-2.5 tracking-[-0.04em] text-[15px] font-medium">Email :</th>
                      <td className="border-0 py-2 pl-4 lg:py-2.5 text-[#70708D] tracking-[-0.04em] text-[15px] font-bold">{data?.email || ""}</td>
                    </tr>
                    <tr>
                      <th className="text-left text-[#70708D] border-0 py-2 lg:py-2.5 tracking-[-0.04em] text-[15px] font-medium">Phone number :</th>
                      <td className="border-0 py-2 pl-4 lg:py-2.5 text-[#70708D] tracking-[-0.04em] text-[15px] font-bold">{data?.contact || ""}</td>
                    </tr>
                    <tr>
                      <th className="text-left text-[#70708D] border-0 py-2 lg:py-2.5 tracking-[-0.04em] text-[15px] font-medium">Address :</th>
                      <td className="border-0 py-2 pl-4 lg:py-2.5 text-[#70708D] tracking-[-0.04em] text-[15px] font-bold">{data?.address || ""}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-[#70708D] text-medium text-sm tracking-[-0.04em] text-center mb-3 lg:mb-4">Please copy the password as you will not be able to view it again.</p>
              <div className="border border-black border-opacity-10 rounded-md lg:rounded-xl pl-3 lg:pl-5 pr-2 py-2 mb-5 md:mb-4 flex flex-wrap items-center">
                <div className="w-full md:w-7/12 pr-2">
                  <label className="text-[#70708D] tracking-[-0.04em] text-[15px] font-medium pr-2">Password :</label>
                  <span className="text-[#70708D] tracking-[-0.04em] text-[15px] font-bold">{data?.password || ""}</span>
                </div>
                <div className="w-full md:w-5/12 text-right">
                  <button
                    className="bg-[#1C5FE8] text-white rounded-md lg:rounded-xl py-2 px-4 text-base font-medium tracking-[-0.04em] flex items-center"
                    onClick={() => {
                      if (data?.password) {
                        navigator.clipboard.writeText(data.password)
                          .then(() => {
                            toast.success("Password copied to clipboard!");
                          })
                          .catch((err) => {
                            toast.error("Failed to copy text to clipboard!");
                          });
                      } else {
                        alert("No password to copy!");
                      }
                    }}
                  >
                    <MdContentCopy size={24} fill={"#ffff"} className="mr-2 inline text-white" />
                    Copy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Popup> */}
        <AccountPopup isOpen={isPopupOpen} onClose={closePopup} data={data}/>
      </div>
    </Layout>
  );
}

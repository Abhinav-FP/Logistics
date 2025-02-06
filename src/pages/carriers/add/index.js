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
  const[carrier ,setCarrier] = useState([])

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
          setCarrier(res.data.data.carrierResult)
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
              className="flex gap-2 items-center bg-[#1C5FE8] hover:bg-[#0a3fab] font-medium text-base text-white tracking-[-0.04em] rounded-lg lg:rounded-xl px-4 md:px-5 py-2.5 md:py-3"
            >
              <IoBookmark size={18} color={"#ffff"} /> Save
            </button>
          </div>
          <div className="space-y-4 lg:space-y-5">
            {/* Carrier Information */}
            <div className="bg-white rounded-xl border border-black border-opacity-10 ">
              <div className="py-5 lg:py-6 px-5 lg:px-[30px] border-b border-black border-opacity-10">
                <h4 className="text-[#151547] text-lg tracking-[-0.04em] font-medium m-0">
                  Carrier Information
                </h4>
              </div>
              <div className="py-5 lg:py-6 px-5 lg:px-[30px]">
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
                      placeholder="Enter Carrier Name"
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
                       placeholder="Enter Carrier ID"
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
                      value={formData.license}
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
                      min={0}
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
          </div>
        </form>
        <AccountPopup isOpen={isPopupOpen} onClose={closePopup} data={data} carrier={carrier}/>
      </div>
    </Layout>
  );
}
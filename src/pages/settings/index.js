import Layout from "@/layout/Layout";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Details from "../api/Listing/Details";

export default function Index() {
    const[loading,setLoading]=useState(false);
  const [formData, setFormData] = useState({
    password: "",
    newpassword: "",
    confirmNewpassword: "",
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
    if (formData?.newpassword !== formData?.confirmNewpassword) {
      toast.error("Passwords do not match");
      return;
    }
    setLoading(true);
    const main = new Details();
    const response = main.resetPassword(formData);
    response
      .then((res) => {
        if (res && res?.data && res?.data?.status) {
          toast.success(res.data.message);
          setLoading(false);
        } else {
          toast.error(res.data.message);
          setLoading(false);
        }
        setFormData({
            password: "",
            newpassword: "",
            confirmNewpassword: "",
        });
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
        console.log("error", error);
        setLoading(false);
      });
  };

  return (
    <Layout page={"Settings"}>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap items-center justify-between mb-3 lg:mb-4">
            <h3 className="text-[#151547] text-lg tracking-[-0.04em] font-medium m-0">
              Reset Password
            </h3>
            <button
              type="submit"
              className="flex gap-2 items-center bg-[#1C5FE8] hover:bg-[#0a3fab] font-medium text-base text-white tracking-[-0.04em] rounded-lg lg:rounded-xl px-5 py-3"
            >
              Update
            </button>
          </div>
          <div className="space-y-4 lg:space-y-5">
            <div className="bg-white rounded-xl border border-black border-opacity-10 ">
              <div className="py-6 px-[30px]">
                <div className="flex flex-wrap -mx-2 lg:-mx-3">
                  <div className="w-full px-2 lg:px-3 mb-4 lg:mb-6">
                    <label className="text-[#70708D] text-sm tracking-[-0.04em] uppercase mb-2 block">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full h-11 lg:h-[48px] appearance-none block bg-white text-[#000] text-base border border-black border-opacity-10 rounded-md lg:rounded-xl py-2 px-4 leading-tight focus:outline-none"
                      placeholder=""
                      required
                    />
                  </div>
                  <div className="w-full px-2 lg:px-3 mb-4 lg:mb-6">
                    <label className="text-[#70708D] text-sm tracking-[-0.04em] uppercase mb-2 block">
                      New Password
                    </label>
                    <input
                      type="password"
                      name="newpassword"
                      value={formData.newpassword}
                      onChange={handleChange}
                      className="w-full h-11 lg:h-[48px] appearance-none block bg-white text-[#000] text-base border border-black border-opacity-10 rounded-md lg:rounded-xl py-2 px-4 leading-tight focus:outline-none"
                      placeholder=""
                      required
                    />
                  </div>
                  <div className="w-full px-2 lg:px-3 mb-4 lg:mb-6">
                    <label className="text-[#70708D] text-sm tracking-[-0.04em] uppercase mb-2 block">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirmNewpassword"
                      value={formData.confirmNewpassword}
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
      </div>
    </Layout>
  );
}

import React, { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import toast from "react-hot-toast";
import Details from "../api/Listing/Details";
import { useRouter } from "next/router";

export default function FogetLinks() {
  const [isOpen, setIsOpen] = useState(false);
  const Router = useRouter();
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  const [Regs, setRegs] = useState({
    email: "",
  });
  console.log("Regs", Regs)
  console.log("Regs",)
  const handleInputs = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setRegs((prevState) => ({ ...prevState, [name]: value }));
  };

  const [loading, setLoading] = useState(false);

  async function handleForms(e) {
    e.preventDefault();
    if (loading) {
      return false;
    }
    setLoading(true);
    const main = new Details();
    try {
      const response = await main.ForgotEmail({ email: Regs.email });
      console.log("response", response)
      if (response?.data?.status === true) {
        toast.success(response.data.message);
        toggleModal();
        Router.push("/forget/password")
      } else {
        toast.error(response.data.message);
      }
      setLoading(false);
    } catch (error) {
      console.log("error", error);
      toast.error(error?.response?.data?.message);
      setLoading(false);
    }
  }
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-end ">
        <div
          onClick={toggleModal}
          className="text-sm sm:text-lg text-[#1C5FE8] font-medium cursor-pointer"
        >
          Forgot Password ?
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50">
          <div className="relative w-[96%] max-w-[470px] bg-[#ffffff] rounded-[10px] p-6">
            <div className="absolute top-[10px] right-[10px]">
              <IoCloseSharp
                size={24}
                className="cursor-pointer text-black"
                onClick={toggleModal}
              />
            </div>

            <div className="flex  flex-wrap justify-center">
              <h3 className="text-[24px] font-[700] mb-4 pt-[5px] text-black text-center">
                Forgot Password
              </h3>
              <p className="text-[14px] font-[400] mb-4 text-black text-center">
                Enter your email to receive a link to Forgot Password
              </p>
            </div>
            <form>
              <div className="mb-4">
                <input
                  type="email"
                  name="email"
                  autocomplete="off"
                  onChange={handleInputs}
                  value={Regs.email}
                  className="block w-full h-12 lg:h-[65px] px-3 py-3 bg-gray-100 text-[#727272] border border-transparent rounded-lg lg:rounded-[15px] sm:text-sm"
                  placeholder="Enter the Email.."
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleForms}
                  className="w-full py-3.5 px-4 bg-[#1C5FE8] text-white font-medium rounded-md lg:rounded-xl"
                >
                  {loading ? "Loading..." : "Send Link"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
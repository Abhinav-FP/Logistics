import Link from "next/link";
import React, { useState } from "react";
import Details from "../api/Listing/Details";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

export default function Index() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const[loading,setLoading]=useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const main = new Details();
    const response = main.login({
      email:formData?.email,
      password:formData.password,
    });
    response
      .then((res) => {
        if (res && res?.data && res?.data?.status) {
          toast.success(res.data.message);
          localStorage && localStorage.setItem("token", res?.data?.token);
          router.push("/");
          setLoading(false);
        } else {
          toast.error(res.data.message);
          setLoading(false);
        }
        setFormData({
          email: "",
          password: "",
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
    <div className="flex h-screen">
      <div className="hidden md:flex md:w-1/2 items-center justify-center bg-gray-100">
        <img
          src="/Login-img.png"
          alt="Logistics Illustration"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col justify-center w-full md:w-1/2 py-8 px-6 md:px-12 lg:px-[76px] bg-white">
        <h2 className="text-xl lg:text-[22px] tracking-[-0.03em] font-semibold text-[#262626] mb-1">SIGN IN</h2>
        <p className="text-[#727272] mb-8 md:mb-12 lg:mb-20 font-normal max-w-[380px]">
          Welcome to logistics supply chain platform Register as a member to
          experience
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm lg:text-base font-medium text-[#727272] tracking-[-0.06em] mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="block w-full h-12 lg:h-[65px] px-3 py-3 bg-gray-100 text-[#727272] border border-transparent rounded-lg lg:rounded-[15px] sm:text-sm"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block text-sm lg:text-base font-medium text-[#727272] tracking-[-0.06em] mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="block w-full h-12 lg:h-[65px] px-3 py-3 bg-gray-100 text-[#727272] border border-transparent rounded-lg lg:rounded-[15px] sm:text-sm"
              required
            />
          </div>
          <div className="mb-4 text-right">
            <Link
              href=""
              className="text-sm sm:text-lg text-[#1C5FE8] font-medium"
            >
              Forget Password?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full py-3.5 px-4 bg-[#1C5FE8] text-white font-medium rounded-md lg:rounded-xl"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

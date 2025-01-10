import Link from "next/link";
import React from "react";

export default function index() {
  return (
    <div className="flex h-screen">
      <div className="hidden md:flex md:w-1/2 items-center justify-center bg-gray-100">
        <img
          src="/Login-img.png"
          alt="Logistics Illustration"
          className="max-w-full h-full"
        />
      </div>
      <div className="flex flex-col justify-center md:w-1/2 py-8 px-24 bg-white">
        <h2 className="text-2xl font-bold text-[#262626] mb-2">SIGN IN</h2>
        <p className="text-[#727272] mb-6 font-normal">
          Welcome to logistics supply chain platform Register as a member to
          experience
        </p>
        <form>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#727272]"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full px-3 py-3 bg-gray-100 text-[#727272] border border-transparent rounded-md shadow-sm sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[#727272]"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 block w-full px-3 py-3 bg-gray-100 text-[#727272] border border-transparent rounded-md shadow-sm sm:text-sm"
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
            className="w-full py-4 px-4 bg-[#1C5FE8] text-white font-medium rounded-lg"
          >
            SIGN IN
          </button>
        </form>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import toast from "react-hot-toast";
import Details from "../api/Listing/Details";
import Layout from "@/layout/Layout";
import { useRouter } from "next/router";

export default function ForgetPassword() {
      const router = useRouter();
      const { slug } = router.query;

  const [Regs, setRegs] = useState({
    // token: token,
    newPassword: "",
    confirmPassword: "",
  });

  const [newPasswordStrength, setNewPasswordStrength] = useState(""); // Separate state for new password strength
  const [confirmPasswordStrength, setConfirmPasswordStrength] = useState(""); // Separate state for confirm password strength
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setRegs((prevState) => ({ ...prevState, [name]: value }));

    if (name === "newPassword") {
      const strength = checkPasswordStrength(value);
      setNewPasswordStrength(strength);
    }

    if (name === "confirmPassword") {
      const strength = checkPasswordStrength(value);
      setConfirmPasswordStrength(strength);
    }
  };

  const checkPasswordStrength = (password) => {
    if (password.length < 6) return "Weak";
    if (
      /[A-Z]/.test(password) &&
      /\d/.test(password) &&
      /[@$!%*?&#]/.test(password)
    ) {
      return "Strong";
    }
    return "Medium";
  };

  const [loading, setLoading] = useState(false);

//   async function handleForms(e) {
//     e.preventDefault();
//     if (loading) {
//       return false;
//     }

//     // Check for password strength and match
//     if (newPasswordStrength !== "Strong") {
//       toast.error(
//         "Weak password. Use at least 6 characters, with letters, numbers, and special characters."
//       );
//       return;
//     }

//     if (Regs.newPassword !== Regs.confirmPassword) {
//       toast.error("Passwords do not match!");
//       return;
//     }

//     setLoading(true);
//     const main = new Details();
//     try {
//       const response = await main.ForgetPassword(Regs);
//       if (response?.data) {
//         toast.success(response.data.message);
//         router.push("/login"); // navigate to the success page after resetting
//       }
//     } catch (error) {
//       console.log("error", error?.response);
//       toast.error(error?.response?.data?.message);
//     } finally {
//       setLoading(false);
//     }
//   }

  const newPasswordStrengthColor =
    newPasswordStrength === "Strong"
      ? "text-green-500"
      : newPasswordStrength === "Medium"
        ? "text-yellow-500"
        : "text-red-500";

  const confirmPasswordStrengthColor =
    confirmPasswordStrength === "Strong"
      ? "text-green-500"
      : confirmPasswordStrength === "Medium"
        ? "text-yellow-500"
        : "text-red-500";

  return (
   <div className="flex h-screen">
         <div className="hidden md:flex md:w-1/2 items-center justify-center bg-gray-100">
           <img src="/Login-img.png" alt="Logistics Illustration" className="w-full h-full object-cover" />
         </div>
         <div className="flex flex-col justify-center w-full md:w-1/2 py-8 px-6 md:px-12 lg:px-[76px] bg-white">
           <h2 className="text-xl lg:text-[22px] tracking-[-0.03em] font-semibold text-[#262626] mb-1">Forget Password</h2>
           <p className="text-[#727272] mb-8 md:mb-12 lg:mb-20 font-normal max-w-[380px]">
             Welcome to logistics supply chain platform Register as a member to
             experience
           </p>
           <form
            // onSubmit={handleForms} 
            className="login-form p-[15px] md:p-[30px] pb-[0]">
            <div className=" relative">
            <label className="block text-sm font-[18px] text-black text-left color-[#2D3344] mb-[10px]">
                  Password
                </label>
              <input
                type={showNewPassword ? "text" : "password"}
                autocomplete="new-password"
                name="newPassword" // Corrected name
                onChange={handleInputs}
                value={Regs.newPassword}
                placeholder="Enter new password.."
                  className="block w-full h-12 lg:h-[65px] px-3 py-3 bg-gray-100 text-[#727272] border border-transparent rounded-lg lg:rounded-[15px] sm:text-sm"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute top-[20px] right-5"
              >
                {showNewPassword ? (
                  <IoEyeOff size={24} className="text-white" />
                ) : (
                  <IoEye size={24} className="text-white" />
                )}
              </button>
              <p
                className={`mt-2 text-sm font-semibold ${newPasswordStrengthColor}`}
              >
                {newPasswordStrength && `${newPasswordStrength} Password`}
              </p>
            </div>

            <div className="mb-5 relative">
            <label className="block text-sm font-[18px] text-black text-left color-[#2D3344] mb-[10px]">
                  New Password
                </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                autocomplete="new-password"
                name="confirmPassword" // Corrected name
                onChange={handleInputs}
                value={Regs.confirmPassword}
                placeholder="Confirm new password.."
                className="block w-full h-12 lg:h-[65px] px-3 py-3 bg-gray-100 text-[#727272] border border-transparent rounded-lg lg:rounded-[15px] sm:text-sm"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute top-[20px] right-5"
              >
                {showConfirmPassword ? (
                  <IoEyeOff size={24} className="text-white" />
                ) : (
                  <IoEye size={24} className="text-white" />
                )}
              </button>
              <p
                className={`mt-2 text-sm font-semibold text-black ${confirmPasswordStrengthColor}`}
              >
                {confirmPasswordStrength &&
                  `${confirmPasswordStrength} Password`}
              </p>
            </div>
            <div className="mb-5 text-center">
              <button
                type="submit"
                 className="w-full py-3.5 px-4 bg-[#1C5FE8] text-white font-medium rounded-md lg:rounded-xl"
              >
                {loading ? "Loading..." : "Submit"}
              </button>
            </div>
          </form>
         </div>
       </div>
  );
}
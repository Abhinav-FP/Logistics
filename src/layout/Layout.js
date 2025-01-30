import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useRole } from "@/context/RoleContext";
import Details from "@/pages/api/Listing/Details";
import Sidebar from "@/components/Sidebar";
import NotifcationPopup from "./NotifcationPopup";
import toast from "react-hot-toast";
import Link from "next/link";
import { MdLogout } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";

export default function Layout({ children, page }) {
  const { user, setUser } = useRole();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const roles = [
    {
      name: "shipper",
      route_permissions: ["/", "/shipment", "/shipment/add", "/shipment/add/:anything", "/brokers", "/users", "/users/add", "/carriers", "/settings"],
    },
    {
      name: "broker",
      route_permissions: ["/", "/shipment", "/users", "/carriers", "/carriers/add", "/settings"],
    },
    {
      name: "carrier",
      route_permissions: ["/", "/shipment", "/users", "/carriers", "/drivers", "/drivers/add", "/settings"],
    },
  ];

  const fetchData = async (signal) => {
    try {
      const main = new Details();
      const response = await main.profileVerify(signal);
      if (response.data) {
        setUser(response.data.data);
      }
    } catch (error) {
      console.log("error", error);
      localStorage?.removeItem("token");
      router.push("/login");
      toast.error("Please log in first.");
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    fetchData(signal);

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (user && user.role) {
      const userRole = roles.find((r) => r.name === user.role);
      if (!userRole) {
        router.push("/forbidden");
        return;
      }

      const currentPath = router.pathname;
      const hasAccess = userRole.route_permissions.some((route) => {
        if (route.includes(":anything")) {
          return currentPath.startsWith(route.replace(":anything", ""));
        }
        return route === currentPath;
      });

      if (!hasAccess) {
        router.push("/forbidden");
      }
    }
  }, [user, router.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
    toast.success("Logout Successfully");
  };

  return (
    <div className="md:flex flex-wrap bg-[#F5F6FB] items-start">
      <Sidebar role={user?.role || ""} />
      <div className="w-full lg:ml-[304px] lg:w-[calc(100%-304px)]">
        <div className="fixed z-10 px-4 md:px-5 lg:px-[30px] py-3 lg:py-4 top-0 bg-white flex items-center w-full lg:w-[calc(100%-304px)] flex-wrap">
          <div className="w-4/12 pl-4 lg:pl-0">
            <h1 className="text-[#151547] text-lg lg:text-2xl tracking-[-0.04em] font-medium">{page || "Dashboard"}</h1>
          </div>
          <div className="w-8/12 flex justify-end space-x-4">
            <NotifcationPopup />
            <div className="relative">
              <button className="border border-black border-opacity-10 rounded-xl w-[48px] h-[38px] flex items-center justify-center text-[#151547] hover:bg-[#1C5FE8] hover:text-white" onClick={() => setDropdownOpen(!dropdownOpen)}>
                <IoSettingsOutline size={20} />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-50">
                  <ul className="py-1">
                    <Link href="/settings" className="flex gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      <IoSettingsOutline size={20} /> Settings
                    </Link>
                    <li className="flex gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={handleLogout}>
                      <MdLogout size={20} /> Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="px-4 md:px-5 lg:px-[30px] pt-20 lg:pt-24 pb-8 bg-[#F6F7FA]">{children}</div>
      </div>
    </div>
  );
}

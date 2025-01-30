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
            <Link
              className="border border-black border-opacity-10 rounded-xl w-[48px] h-[38px] flex items-center justify-center text-[#151547] hover:bg-[#1C5FE8] hover:text-white"
              href=""
            >
              <svg
                width="21"
                height="21"
                viewBox="0 0 21 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.7099 19.2899L16.9999 15.6099C18.44 13.8143 19.1374 11.5352 18.9487 9.2412C18.76 6.94721 17.6996 4.81269 15.9854 3.27655C14.2713 1.74041 12.0337 0.919414 9.73283 0.982375C7.43194 1.04534 5.24263 1.98747 3.61505 3.61505C1.98747 5.24263 1.04534 7.43194 0.982375 9.73283C0.919414 12.0337 1.74041 14.2713 3.27655 15.9854C4.81269 17.6996 6.94721 18.76 9.2412 18.9487C11.5352 19.1374 13.8143 18.44 15.6099 16.9999L19.2899 20.6799C19.3829 20.7736 19.4935 20.848 19.6153 20.8988C19.7372 20.9496 19.8679 20.9757 19.9999 20.9757C20.1319 20.9757 20.2626 20.9496 20.3845 20.8988C20.5063 20.848 20.6169 20.7736 20.7099 20.6799C20.8901 20.4934 20.9909 20.2442 20.9909 19.9849C20.9909 19.7256 20.8901 19.4764 20.7099 19.2899ZM9.9999 16.9999C8.61544 16.9999 7.26206 16.5894 6.11091 15.8202C4.95977 15.051 4.06256 13.9578 3.53275 12.6787C3.00293 11.3996 2.86431 9.99214 3.13441 8.63427C3.4045 7.27641 4.07119 6.02912 5.05016 5.05016C6.02912 4.07119 7.27641 3.4045 8.63427 3.13441C9.99214 2.86431 11.3996 3.00293 12.6787 3.53275C13.9578 4.06256 15.051 4.95977 15.8202 6.11091C16.5894 7.26206 16.9999 8.61544 16.9999 9.9999C16.9999 11.8564 16.2624 13.6369 14.9497 14.9497C13.6369 16.2624 11.8564 16.9999 9.9999 16.9999Z"
                  fill="currentColor"
                />
              </svg>
              {/* <IoSearch size={21}/> */}
            </Link>
            <div className="relative">
              <button className="border border-black border-opacity-10 rounded-xl w-[48px] h-[38px] flex items-center justify-center text-[#151547] hover:bg-[#1C5FE8] hover:text-white" onClick={() => setDropdownOpen(!dropdownOpen)}>
              <svg
                  width="18"
                  height="22"
                  viewBox="0 0 18 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 9C11.2091 9 13 7.20914 13 5C13 2.79086 11.2091 1 9 1C6.79086 1 5 2.79086 5 5C5 7.20914 6.79086 9 9 9Z"
                    stroke="currentColor"
                    stroke-width="1.5"
                  />
                  <path
                    d="M17 16.5C17 18.985 17 21 9 21C1 21 1 18.985 1 16.5C1 14.015 4.582 12 9 12C13.418 12 17 14.015 17 16.5Z"
                    stroke="currentColor"
                    stroke-width="1.5"
                  />
                </svg>
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

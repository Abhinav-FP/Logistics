import { useEffect } from "react";
import { useRouter } from "next/router";
import { useRole } from "@/context/RoleContext";
import Details from "@/pages/api/Listing/Details";
import toast from "react-hot-toast";

export default function ReviewLayout({ children }) {
  const { user, setUser } = useRole();
  const router = useRouter();

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
    {
      name: "customer",
      route_permissions: ["/","/shipment","/settings","/users/review","/users/review/:anything"],
    },
    {
      name: "admin",
      route_permissions: ["/","/shipment","/shippers","/shippers/add","/drivers","/brokers","/brokers/add","/users","/carriers","/settings"],
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
      console.log("Hello");
      router.push(`/login?redirect=${router.asPath}`);
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

  return (
        <div className="">{children}</div> 
  );
}
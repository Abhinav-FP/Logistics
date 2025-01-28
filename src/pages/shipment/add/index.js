
import LocationSearch from "@/components/LocationSearch";
import Layout from "@/layout/Layout";
import Details from "@/pages/api/Listing/Details";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoBookmark } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";


export default function Index() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    pickup: "",
    delivery: "",
    shippingDate: "",
    deliveryDate: "",
    estimatedCost: "",
    paymentStatus: "",
    brokerName: "",
    typeOfGoods: "",
    quantity: "",
    weight: "",
    dimensions1: "",
    dimensions2: "",
    customerName: "",
  });
  const [brokers, setBrokers] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState([]);

  // Get Brokers and Customers list
  const getBrokerandCustomer = () => {
    const main = new Details();
    main
      .Usersget("")
      .then((response) => {
        const users = response?.data?.data || [];
        const brokers =
          users && users?.filter((user) => user?.role === "broker");
        const customers =
          users && users?.filter((user) => user?.role === "customer");
        setBrokers(brokers);
        setCustomers(customers);
      })
      .catch((err) => {
        console.log("Error fetching users:", err);
      });
  };
  useEffect(() => {
    getBrokerandCustomer();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const main = new Details();
    const response = main.createShipment({
      name: formData.title,
      description: formData.description,
      pickup_location: formData.pickup,
      drop_location: formData.delivery,
      customer_id: formData.customerName, 
      broker_id: formData.brokerName, 
      shippingDate: formData.shippingDate,
      deliveryDateExpect: formData.deliveryDate,
      cost: formData.estimatedCost,
      paymentStatus: formData.paymentStatus,
      quantity: formData.quantity,
      weight: formData.weight,
      dimensions: `${formData.dimensions1} x ${formData.dimensions2}`, 
      typeOfGoods: formData.typeOfGoods,
      });
    response
      .then((res) => {
        if (res && res?.data && res?.data?.status) {
          toast.success(res.data.message);
          setLoading(false);
          setFormData({
            title: "",
            description: "",
            pickup: "",
            delivery: "",
            shippingDate: "",
            deliveryDate: "",
            estimatedCost: "",
            paymentStatus: "",
            brokerName: "",
            typeOfGoods: "",
            quantity: "",
            weight: "",
            dimensions1: "",
            dimensions2: "",
            customerName: "",
          })
          router.push("/shipment")
        } else {
          toast.error(res.data.message);
          setLoading(false);
        }
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
        console.log("error", error);
        setLoading(false);
      });
  };

  return (
    <Layout page={"Shipment"}>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap items-center justify-between mb-3 lg:mb-4">
          <h3 className="text-[#151547] text-lg tracking-[-0.04em] font-medium m-0">
            Create New Shipment{" "}
          </h3>
          <button
            type="submit"
            className="bg-[#1C5FE8] flex gap-2 items-center hover:bg-[#0a3fab] font-medium text-base text-white tracking-[-0.04em] rounded-lg lg:rounded-xl px-5 py-3  "
          >
            <IoBookmark size={18} color={"#ffff"} />
            Save Shipment
          </button>
        </div>
        <div className="space-y-4 lg:space-y-5">
          {/* Shipment Details */}
          <div className="bg-white rounded-xl border border-black border-opacity-10 ">
            <div className="py-6 px-[30px] border-b border-black border-opacity-10">
              <h4 className="text-[#151547] text-lg tracking-[-0.04em] font-medium m-0">
                Shipment Details
              </h4>
            </div>
            <div className="py-6 px-[30px]">
              <div className="flex flex-wrap -mx-2 lg:-mx-3">
                <div className="w-full md:w-6/12 px-2 lg:px-3 mb-4 lg:mb-6">
                  <label className="text-[#70708D] text-sm tracking-[-0.04em] uppercase mb-2 block">
                    Shipment Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData?.title}
                    onChange={handleChange}
                    className="w-full h-11 lg:h-[48px] appearance-none block bg-white text-[#000] text-base border border-black border-opacity-10 rounded-md lg:rounded-xl py-2 px-4 leading-tight focus:outline-none"
                    placeholder=""
                    required
                  />
                </div>
                <div className="w-full md:w-6/12 px-2 lg:px-3 mb-4 lg:mb-6">
                  <label className="text-[#70708D] text-sm tracking-[-0.04em] uppercase mb-2 block">
                    Description
                  </label>
                  <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full h-11 lg:h-[48px] appearance-none block bg-white text-[#000] text-base border border-black border-opacity-10 rounded-md lg:rounded-xl py-2 px-4 leading-tight focus:outline-none"
                    placeholder=""
                    required
                  />
                </div>
                <div className="w-full md:w-6/12 px-2 lg:px-3 mb-4 lg:mb-6">
                  <label className="text-[#70708D] text-sm tracking-[-0.04em] uppercase mb-2 block">
                    Pickup Location
                  </label>
                  <div className="relative">
                    <LocationSearch
                      name="pickup"
                      formData={formData}
                      setFormData={setFormData}
                    />
                  </div>
                </div>
                <div className="w-full md:w-6/12 px-2 lg:px-3 mb-4 lg:mb-6">
                  <label className="text-[#70708D] text-sm tracking-[-0.04em] uppercase mb-2 block">
                    Delivery Location
                  </label>
                  <div className="relative">
                    <LocationSearch
                      name="delivery"
                      formData={formData}
                      setFormData={setFormData}
                    />
                  </div>
                </div>
                <div className="w-full md:w-6/12 px-2 lg:px-3 mb-4 lg:mb-6">
                  <label className="text-[#70708D] text-sm tracking-[-0.04em] uppercase mb-2 block">
                    Shipment Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      name="shippingDate"
                      value={formData.shippingDate}
                      onChange={handleChange}
                      className="w-full h-11 lg:h-[48px] appearance-none block bg-white text-[#000] text-base border border-black border-opacity-10 rounded-md lg:rounded-xl py-2 px-4 leading-tight focus:outline-none"
                      placeholder=""
                      required
                    />
                    {/* <div className="absolute top-[13px] right-4">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.5 14C8.83152 14 9.14946 13.8683 9.38388 13.6339C9.6183 13.3995 9.75 13.0815 9.75 12.75C9.75 12.4185 9.6183 12.1005 9.38388 11.8661C9.14946 11.6317 8.83152 11.5 8.5 11.5C8.16848 11.5 7.85054 11.6317 7.61612 11.8661C7.3817 12.1005 7.25 12.4185 7.25 12.75C7.25 13.0815 7.3817 13.3995 7.61612 13.6339C7.85054 13.8683 8.16848 14 8.5 14ZM8.5 17.5C8.83152 17.5 9.14946 17.3683 9.38388 17.1339C9.6183 16.8995 9.75 16.5815 9.75 16.25C9.75 15.9185 9.6183 15.6005 9.38388 15.3661C9.14946 15.1317 8.83152 15 8.5 15C8.16848 15 7.85054 15.1317 7.61612 15.3661C7.3817 15.6005 7.25 15.9185 7.25 16.25C7.25 16.5815 7.3817 16.8995 7.61612 17.1339C7.85054 17.3683 8.16848 17.5 8.5 17.5ZM13.25 12.75C13.25 13.0815 13.1183 13.3995 12.8839 13.6339C12.6495 13.8683 12.3315 14 12 14C11.6685 14 11.3505 13.8683 11.1161 13.6339C10.8817 13.3995 10.75 13.0815 10.75 12.75C10.75 12.4185 10.8817 12.1005 11.1161 11.8661C11.3505 11.6317 11.6685 11.5 12 11.5C12.3315 11.5 12.6495 11.6317 12.8839 11.8661C13.1183 12.1005 13.25 12.4185 13.25 12.75ZM12 17.5C12.3315 17.5 12.6495 17.3683 12.8839 17.1339C13.1183 16.8995 13.25 16.5815 13.25 16.25C13.25 15.9185 13.1183 15.6005 12.8839 15.3661C12.6495 15.1317 12.3315 15 12 15C11.6685 15 11.3505 15.1317 11.1161 15.3661C10.8817 15.6005 10.75 15.9185 10.75 16.25C10.75 16.5815 10.8817 16.8995 11.1161 17.1339C11.3505 17.3683 11.6685 17.5 12 17.5ZM16.75 12.75C16.75 13.0815 16.6183 13.3995 16.3839 13.6339C16.1495 13.8683 15.8315 14 15.5 14C15.1685 14 14.8505 13.8683 14.6161 13.6339C14.3817 13.3995 14.25 13.0815 14.25 12.75C14.25 12.4185 14.3817 12.1005 14.6161 11.8661C14.8505 11.6317 15.1685 11.5 15.5 11.5C15.8315 11.5 16.1495 11.6317 16.3839 11.8661C16.6183 12.1005 16.75 12.4185 16.75 12.75Z"
                          fill="#727272"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M8 3.25C8.19891 3.25 8.38968 3.32902 8.53033 3.46967C8.67098 3.61032 8.75 3.80109 8.75 4V4.75H15.25V4C15.25 3.80109 15.329 3.61032 15.4697 3.46967C15.6103 3.32902 15.8011 3.25 16 3.25C16.1989 3.25 16.3897 3.32902 16.5303 3.46967C16.671 3.61032 16.75 3.80109 16.75 4V4.758C16.902 4.762 17.0437 4.76933 17.175 4.78C17.555 4.81 17.911 4.878 18.248 5.05C18.7656 5.31367 19.1863 5.73445 19.45 6.252C19.622 6.589 19.69 6.945 19.72 7.325C19.75 7.69 19.75 8.135 19.75 8.67V16.33C19.75 16.865 19.75 17.31 19.72 17.675C19.69 18.055 19.622 18.411 19.45 18.748C19.1866 19.2654 18.7662 19.6862 18.249 19.95C17.911 20.122 17.555 20.19 17.175 20.22C16.81 20.25 16.365 20.25 15.831 20.25H8.17C7.635 20.25 7.19 20.25 6.825 20.22C6.445 20.19 6.089 20.122 5.752 19.95C5.23475 19.6869 4.81401 19.2668 4.55 18.75C4.378 18.412 4.31 18.056 4.28 17.676C4.25 17.311 4.25 16.866 4.25 16.332V8.67C4.25 8.135 4.25 7.69 4.28 7.325C4.31 6.945 4.378 6.589 4.55 6.252C4.81367 5.73445 5.23445 5.31367 5.752 5.05C6.089 4.878 6.445 4.81 6.825 4.78C6.95633 4.76933 7.098 4.762 7.25 4.758V4C7.25 3.90151 7.2694 3.80398 7.30709 3.71299C7.34478 3.62199 7.40003 3.53931 7.46967 3.46967C7.53931 3.40003 7.62199 3.34478 7.71299 3.30709C7.80398 3.2694 7.90151 3.25 8 3.25ZM18.25 10.25H5.75V16.3C5.75 16.872 5.75 17.257 5.775 17.552C5.798 17.84 5.84 17.977 5.886 18.067C6.006 18.303 6.197 18.494 6.433 18.614C6.523 18.66 6.66 18.702 6.947 18.725C7.243 18.749 7.627 18.75 8.2 18.75H15.8C16.372 18.75 16.757 18.75 17.052 18.725C17.34 18.702 17.477 18.66 17.567 18.614C17.8026 18.4941 17.9941 18.3026 18.114 18.067C18.16 17.977 18.202 17.84 18.225 17.552C18.249 17.257 18.25 16.872 18.25 16.3V10.25ZM10.5 7C10.3011 7 10.1103 7.07902 9.96967 7.21967C9.82902 7.36032 9.75 7.55109 9.75 7.75C9.75 7.94891 9.82902 8.13968 9.96967 8.28033C10.1103 8.42098 10.3011 8.5 10.5 8.5H13.5C13.6989 8.5 13.8897 8.42098 14.0303 8.28033C14.171 8.13968 14.25 7.94891 14.25 7.75C14.25 7.55109 14.171 7.36032 14.0303 7.21967C13.8897 7.07902 13.6989 7 13.5 7H10.5Z"
                          fill="#727272"
                        />
                      </svg>
                    </div> */}
                  </div>
                </div>
                <div className="w-full md:w-6/12 px-2 lg:px-3 mb-4 lg:mb-6">
                  <label className="text-[#70708D] text-sm tracking-[-0.04em] uppercase mb-2 block">
                    Expected Delivery Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      name="deliveryDate"
                      value={formData.deliveryDate}
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
          {/* Load Details */}
          <div className="bg-white rounded-xl border border-black border-opacity-10 ">
            <div className="py-6 px-[30px] border-b border-black border-opacity-10">
              <h4 className="text-[#151547] text-lg tracking-[-0.04em] font-medium m-0">
                Load Details
              </h4>
            </div>
            <div className="py-6 px-[30px]">
              <div className="flex flex-wrap -mx-2 lg:-mx-3">
                <div className="w-full md:w-6/12 px-2 lg:px-3 mb-4 lg:mb-6">
                  <label className="text-[#70708D] text-sm tracking-[-0.04em] uppercase mb-2 block">
                    Type of Goods
                  </label>
                  <select
                    value={formData.typeOfGoods}
                    name="typeOfGoods"
                    onChange={handleChange}
                    className="w-full h-11 lg:h-[48px]  block bg-white text-[#000] text-base border border-black border-opacity-10 rounded-md lg:rounded-xl py-2 px-4 leading-tight focus:outline-none"
                    placeholder=""
                  >
                    <option value="">Select Goods Type</option>
                    <option value="food">Food and Beverages</option>
                    <option value="raw">Raw Materials</option>
                    <option value="automotive">Automotive Parts</option>
                    <option value="pharmaceuticals">Pharmaceuticals</option>
                  </select>
                </div>
                <div className="w-full md:w-6/12 px-2 lg:px-3 mb-4 lg:mb-6">
                  <label className="text-[#70708D] text-sm tracking-[-0.04em] uppercase mb-2 block">
                    Quantity (No. of Items)
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    className="w-full h-11 lg:h-[48px] appearance-none block bg-white text-[#000] text-base border border-black border-opacity-10 rounded-md lg:rounded-xl py-2 px-4 leading-tight focus:outline-none"
                    placeholder=""
                    required
                  />
                </div>
                <div className="w-full md:w-6/12 px-2 lg:px-3 mb-4 lg:mb-6">
                  <label className="text-[#70708D] text-sm tracking-[-0.04em] uppercase mb-2 block">
                    Weight
                  </label>
                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    className="w-full h-11 lg:h-[48px] appearance-none block bg-white text-[#000] text-base border border-black border-opacity-10 rounded-md lg:rounded-xl py-2 px-4 leading-tight focus:outline-none"
                    placeholder=""
                    required
                  />
                </div>
                <div className="w-full md:w-6/12 px-2 lg:px-3 mb-4 lg:mb-6">
                  <label className="text-[#70708D] text-sm tracking-[-0.04em] uppercase mb-2 block">
                    Dimensions
                  </label>
                  <div className="flex gap-2 items-center">
                  <input
                    type="number"
                    name="dimensions1"
                    value={formData.dimensions1}
                    onChange={handleChange}
                    className="w-1/2 h-11 lg:h-[48px] appearance-none block bg-white text-[#000] text-base border border-black border-opacity-10 rounded-md lg:rounded-xl py-2 px-4 leading-tight focus:outline-none"
                    placeholder=""
                    required
                    />
                    <RxCross1 size={20} color={"#70708D"}/>
                  <input
                    type="number"
                    name="dimensions2"
                    value={formData.dimensions2}
                    onChange={handleChange}
                    className="w-1/2 h-11 lg:h-[48px] appearance-none block bg-white text-[#000] text-base border border-black border-opacity-10 rounded-md lg:rounded-xl py-2 px-4 leading-tight focus:outline-none"
                    placeholder=""
                    required
                    />
                    </div>
                </div>
              </div>
            </div>
          </div>
          {/* Cost and Payment */}
          <div className="bg-white rounded-xl border border-black border-opacity-10 ">
            <div className="py-6 px-[30px] border-b border-black border-opacity-10">
              <h4 className="text-[#151547] text-lg tracking-[-0.04em] font-medium m-0">
                Cost and Payment
              </h4>
            </div>
            <div className="py-6 px-[30px]">
              <div className="flex flex-wrap -mx-2 lg:-mx-3">
                <div className="w-full md:w-6/12 px-2 lg:px-3 mb-4 lg:mb-6">
                  <label className="text-[#70708D] text-sm tracking-[-0.04em] uppercase mb-2 block">
                    Estimated Cost
                  </label>
                  <input
                    type="number"
                    name="estimatedCost"
                    value={formData.estimatedCost}
                    onChange={handleChange}
                    className="w-full h-11 lg:h-[48px] appearance-none block bg-white text-[#000] text-base border border-black border-opacity-10 rounded-md lg:rounded-xl py-2 px-4 leading-tight focus:outline-none"
                    placeholder=""
                    required
                  />
                </div>
                <div className="w-full md:w-6/12 px-2 lg:px-3 mb-4 lg:mb-6">
                  <label className="text-[#70708D] text-sm tracking-[-0.04em] uppercase mb-2 block">
                    Payment Status
                  </label>
                  <select
                    value={formData.paymentStatus}
                    name="paymentStatus"
                    onChange={handleChange}
                    className="w-full h-11 lg:h-[48px] block bg-white text-[#000] text-base border border-black border-opacity-10 rounded-md lg:rounded-xl py-2 px-4 leading-tight focus:outline-none"
                  >
                    <option value="" disabled>
                      Select Payment Status
                    </option>
                    <option value="Pending">Pending</option>
                    <option value="Done">Done</option>
                    <option value="PayOnDelivery">Pay on Delivery</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          {/* Select Broker */}
          <div className="bg-white rounded-xl border border-black border-opacity-10 ">
            <div className="py-6 px-[30px] border-b border-black border-opacity-10">
              <h4 className="text-[#151547] text-lg tracking-[-0.04em] font-medium m-0">
                Select Broker
              </h4>
            </div>
            <div className="py-6 px-[30px]">
              <div className="flex flex-wrap -mx-2 lg:-mx-3">
                <div className="w-full md:w-12/12 px-2 lg:px-3 mb-4 lg:mb-6">
                  <label className="text-[#70708D] text-sm tracking-[-0.04em] uppercase mb-2 block">
                    Broker name
                  </label>
                  <select
                    value={formData.brokerName}
                    name="brokerName"
                    onChange={handleChange}
                    className="w-full h-11 lg:h-[48px]  block bg-white text-[#000] text-base border border-black border-opacity-10 rounded-md lg:rounded-xl py-2 px-4 leading-tight focus:outline-none"
                    placeholder=""
                  >
                    <option value="">Select Broker</option>
                    {brokers &&
                      brokers?.map((item) => (
                        <option value={item?._id}>{item?.email}</option>
                      ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
          {/* Customer Details */}
          <div className="bg-white rounded-xl border border-black border-opacity-10 ">
            <div className="py-6 px-[30px] border-b border-black border-opacity-10">
              <h4 className="text-[#151547] text-lg tracking-[-0.04em] font-medium m-0">
                Select Customer
              </h4>
            </div>
            <div className="py-6 px-[30px]">
              <div className="flex flex-wrap -mx-2 lg:-mx-3">
                <div className="w-full md:w-12/12 px-2 lg:px-3 mb-4 lg:mb-6">
                  <label className="text-[#70708D] text-sm tracking-[-0.04em] uppercase mb-2 block">
                    Customer name
                  </label>
                  <select
                    value={formData.customerName}
                    name="customerName"
                    onChange={handleChange}
                    className="w-full h-11 lg:h-[48px]  block bg-white text-[#000] text-base border border-black border-opacity-10 rounded-md lg:rounded-xl py-2 px-4 leading-tight focus:outline-none"
                    placeholder=""
                  >
                    <option value="">Select Customer</option>
                    {customers &&
                      customers?.map((item) => (
                        <option value={item?._id}>{item?.email}</option>
                      ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="bg-white rounded-xl border border-black border-opacity-10 ">
            <div className="py-6 px-[30px] border-b border-black border-opacity-10">
              <h4 className="text-[#151547] text-lg tracking-[-0.04em] font-medium m-0">
                Carrier Details
              </h4>
            </div>
            <div className="py-6 px-[30px]">
              <div className="flex flex-wrap -mx-2 lg:-mx-3">
                <div className="w-full md:w-6/12 px-2 lg:px-3 mb-4 lg:mb-6">
                  <label className="text-[#70708D] text-sm tracking-[-0.04em] uppercase mb-2 block">
                    Carrier Name
                  </label>
                  <input
                    type="text"
                    name="carrierName"
                    value={formData.carrierName}
                    onChange={handleChange}
                    className="w-full h-11 lg:h-[48px] appearance-none block bg-white text-[#000] text-base border border-black border-opacity-10 rounded-md lg:rounded-xl py-2 px-4 leading-tight focus:outline-none"
                    placeholder=""
                  />
                </div>
                <div className="w-full md:w-6/12 px-2 lg:px-3 mb-4 lg:mb-6">
                  <label className="text-[#70708D] text-sm tracking-[-0.04em] uppercase mb-2 block">
                    Carrier Type
                  </label>
                  <select
                    value={formData.carrierType}
                    name="carrierType"
                    onChange={handleChange}
                    className="w-full h-11 lg:h-[48px]  block bg-white text-[#000] text-base border border-black border-opacity-10 rounded-md lg:rounded-xl py-2 px-4 leading-tight focus:outline-none"
                    placeholder=""
                  >
                    <option></option>
                  </select>
                </div>
              </div>
            </div>
          </div> */}
          {/* Cost and Payment */}
          {/* <div className="bg-white rounded-xl border border-black border-opacity-10 ">
            <div className="py-6 px-[30px] border-b border-black border-opacity-10">
              <h4 className="text-[#151547] text-lg tracking-[-0.04em] font-medium m-0">
                Cost and Payment
              </h4>
            </div>
            <div className="py-6 px-[30px]">
              <div className="flex flex-wrap -mx-2 lg:-mx-3">
                <div className="w-full md:w-6/12 px-2 lg:px-3 mb-4 lg:mb-6">
                  <label className="text-[#70708D] text-sm tracking-[-0.04em] uppercase mb-2 block">
                    Estimated Cost
                  </label>
                  <input
                    type="text"
                    value={formData.estimatedcost2}
                    onChange={handleChange}
                    className="w-full h-11 lg:h-[48px] appearance-none block bg-white text-[#000] text-base border border-black border-opacity-10 rounded-md lg:rounded-xl py-2 px-4 leading-tight focus:outline-none"
                    placeholder=""
                  />
                </div>
                <div className="w-full md:w-6/12 px-2 lg:px-3 mb-4 lg:mb-6">
                  <label className="text-[#70708D] text-sm tracking-[-0.04em] uppercase mb-2 block">
                    Payment Status
                  </label>
                  <select
                    value={formData.paystatus2}
                    onChange={handleChange}
                    className="w-full h-11 lg:h-[48px]  block bg-white text-[#000] text-base border border-black border-opacity-10 rounded-md lg:rounded-xl py-2 px-4 leading-tight focus:outline-none"
                    placeholder=""
                  >
                    <option></option>
                  </select>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </form>
    </Layout>
  );
}

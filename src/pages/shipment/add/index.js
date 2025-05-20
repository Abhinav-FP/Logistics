
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
    file: null,
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


  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleDateString("en-GB"); // Formats as DD/MM/YYYY
  };


  const handleChange = (e) => {
    const { name, value } = e.target;

    // Convert selected date and shipment date to comparable format (YYYY-MM-DD)
    const selectedDate = new Date(value).setHours(0, 0, 0, 0);
    const shipmentDate = formData.shippingDate ? new Date(formData.shippingDate).setHours(0, 0, 0, 0) : null;

    // Validation for Delivery Date
    if (name === 'deliveryDate' && shipmentDate && selectedDate < shipmentDate) {
      toast.error('Delivery Date cannot be earlier than Shipment Date.');
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpload = (event) => {
    const file = event.target.files[0]; // Get the first uploaded file
    // console.log("")
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        file: file,
      }));
      window.scrollTo({ top: 0, behavior: 'smooth' }); 
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(formData?.pickup === formData?.delivery){
      toast.error("Pickup and Delivery location cannot be same");
      return;
    }
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
      current_location: formData.pickup,
      file: formData?.file
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
            file: "",
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
      <form onSubmit={handleSubmit} enctype="multipart/form-data">
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
                    placeholder="Enter Shipment Title"
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
                    placeholder="Enter description "
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
                      min={new Date().toISOString().split("T")[0]} // Prevent past dates
                      value={formData.shippingDate ? new Date(formData.shippingDate).toISOString().split("T")[0] : ""}
                      onChange={handleChange}
                      className="w-full h-11 lg:h-[48px] appearance-none block bg-white text-[#000] text-base border border-black border-opacity-10 rounded-md lg:rounded-xl py-2 px-4 leading-tight focus:outline-none"
                      placeholder=""
                      required
                    />
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
                      min={new Date().toISOString().split("T")[0]} // Prevent past dates
                      value={formData.deliveryDate ? new Date(formData.deliveryDate).toISOString().split("T")[0] : ""}
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
                    required
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
                    type="text"
                    name="quantity"
                    value={formData.quantity}
                    onChange={(e) => {
                  if (
                    /^[0-9]*$/.test(e.target.value)
                  ) {
                    handleChange(e);
                  }
                }}
                    className="w-full h-11 lg:h-[48px] appearance-none block bg-white text-[#000] text-base border border-black border-opacity-10 rounded-md lg:rounded-xl py-2 px-4 leading-tight focus:outline-none"
                    placeholder="Enter quantity"
                    required
                    min={0}
                  />
                </div>
                <div className="w-full md:w-6/12 px-2 lg:px-3 mb-4 lg:mb-6">
                  <label className="text-[#70708D] text-sm tracking-[-0.04em] uppercase mb-2 block">
                    Weight (In Tonne)
                  </label>
                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    className="w-full h-11 lg:h-[48px] appearance-none block bg-white text-[#000] text-base border border-black border-opacity-10 rounded-md lg:rounded-xl py-2 px-4 leading-tight focus:outline-none"
                    placeholder="Enter weight"
                    min={0}
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
                      placeholder="Enter dimensions"
                      min={0}
                      required
                    />
                    <RxCross1 size={20} color={"#70708D"} />
                    <input
                      type="number"
                      name="dimensions2"
                      value={formData.dimensions2}
                      onChange={handleChange}
                      className="w-1/2 h-11 lg:h-[48px] appearance-none block bg-white text-[#000] text-base border border-black border-opacity-10 rounded-md lg:rounded-xl py-2 px-4 leading-tight focus:outline-none"

                      placeholder="Enter dimensions"
                      min={0}
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
                    Estimated Cost (In USD)
                  </label>
                  <input
                    type="number"
                    name="estimatedCost"
                    value={formData.estimatedCost}
                    onChange={handleChange}
                    className="w-full h-11 lg:h-[48px] appearance-none block bg-white text-[#000] text-base border border-black border-opacity-10 rounded-md lg:rounded-xl py-2 px-4 leading-tight focus:outline-none"
                    placeholder="Enter estimated cost"
                    min={0}
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
                    required
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
                    required
                  >
                    <option value="">Select Broker</option>
                    {brokers &&
                      brokers.map((item) => (
                        <option key={item?._id} value={item?._id}>
                          {item?.name} ({item?.email})
                        </option>
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
                    required
                  >
                    <option value="">Select Customer</option>
                    {customers &&
                      customers.map((item) => (
                        <option key={item?._id} value={item?._id}>
                          {item?.name} ({item?.email})
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
          {/* Attach BOL */}
          <div className="bg-white rounded-xl border border-black border-opacity-10 ">
            <div className="py-6 px-[30px] border-b border-black border-opacity-10">
              <h4 className="text-[#151547] text-lg tracking-[-0.04em] font-medium m-0">
                Upload BOL (optional)
              </h4>
            </div>
            <div className="py-6 px-[30px]">
              <div className="flex flex-wrap -mx-2 lg:-mx-3">
                <div className="w-full md:w-12/12 px-2 lg:px-3 mb-4 lg:mb-6">
                  <label className="text-[#70708D] text-sm tracking-[-0.04em] uppercase mb-2 block">
                    Upload BOL
                  </label>
                  <input
                    name="file"
                    type="file"
                    onChange={handleUpload} // Correctly handles file input
                    className="w-full h-11 lg:h-[48px] block bg-white text-[#000] text-base border border-black border-opacity-10 rounded-md lg:rounded-xl py-2 px-4 leading-tight focus:outline-none"
                  />
                  {/* {formData.file && (
                    <p className="text-sm text-green-600 mt-2">
                      File Selected: {formData?.file?.name}
                    </p>
                  )} */}
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

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Loader from "@/components/Loader";
import Details from "@/pages/api/Listing/Details";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import SignatureCapture from "@/components/SignatureCapture";
import ReviewLayout from "@/layout/ReviewLayout";
import { FaCheckCircle } from "react-icons/fa";

export default function Index() {
  const [condition, setCondition] = useState("expected");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");
  const [pdfLoading, setPdfLoading] = useState(false);
  const [data, setData] = useState("");
  const [text, setText] = useState("");
  const [signatureFile, setSignatureFile] = useState(null);
  const [signaturePreview, setSignaturePreview] = useState(null);
  const router = useRouter();
  const { slug } = router.query;

  const handleSignatureSave = (base64Image) => {
    setSignatureFile(base64Image); // base64 string for backend
    setSignaturePreview(base64Image); // for previewing on screen
  };

  // console.log("signatureFile",signatureFile);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const BOLShow = () => {
    setPdfLoading(true);
    const main = new Details();
    main
      .getBOL(data?._id)
      .then((r) => {
        const blob = new Blob([r.data], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        setPdfLoading(false);
        setPdfUrl(url);
      })
      .catch((err) => {
        setPdfUrl("");
        setPdfLoading(false);
        console.log("error", err);
      });
  };

  const getShipmentDetail = async (slug) => {
    setPageLoading(true);
    try {
      const main = new Details();
      const response = await main.getShipmentById(slug);
      setData(response?.data?.data[0]);
    } catch (err) {
      setData([]);
      console.log("Error fetching shipments:", err);

      if (err.response) {
        if (err.response.status === 401) {
          router.push(`/login?redirect=${router.asPath}`);
        } else if (err.response.status === 403) {
          router.push("/forbidden");
        }
      } else {
        console.log("An unexpected error occurred.");
      }
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    if (slug) {
      getShipmentDetail(slug);
    }
  }, [slug]);

  useEffect(() => {
    BOLShow();
  }, [data]);

  const submitRating = () => {
    if (loading) {
      return;
    }
    if (condition !== "expected" && text === "") {
      toast.error("Please provide a reason for the rating.");
      return;
    }
    if (!signatureFile) {
      toast.error("Please provide signature.");
      return;
    }
    setLoading(true);
    const main = new Details();
    // Prepare the payload
    const payload = {
      review: condition,
      customer_sign: signatureFile,
      status:"delivered",
      driver_location :"delivered"
    };
    // Conditionally include reviewText
    if (text.trim() !== "") {
      payload.reviewText = text.trim();
    }
    const response = main.UpdateShipment(data?._id, payload);
    response
      .then((res) => {
        if (res?.data?.status) {
          toast.success("Rating submitted successfully");
          router.push("/");
        } else {
          toast.error(res.data.message);
        }
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || "Something went wrong");
        console.error("error", error);
        setLoading(false);
      });
  };

  return (
    <ReviewLayout>
      {pageLoading ? (
        <Loader />
      ) : false ? (
        <div className="min-h-screen bg-white flex items-center justify-center p-6">
          <div className="bg-white p-8 max-w-md w-full text-center">
            <FaCheckCircle
              className="text-green-500 w-16 h-16 mx-auto mb-4"
              size={64}
            />
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Review Already Submitted
            </h1>
            <p className="text-gray-600 mb-6">
              You have already given your feedback for this order.
            </p>
            <button
              onClick={() => router.push("/")}
              className="px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      ) : (
        <div className="py-6 p-6 md:px-8 lg:px-16">
          <div className="h-12 w-12 rounded-full bg-[#1C5FE8] bg-opacity-10 flex mx-auto mb-5 flex justify-center items-center ">
            <svg
              width="16"
              height="20"
              viewBox="0 0 16 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 17H9V12.825L10.6 14.425L12 13L8 9L4 13L5.425 14.4L7 12.825V17ZM2 20C1.45 20 0.979333 19.8043 0.588 19.413C0.196666 19.0217 0.000666667 18.5507 0 18V2C0 1.45 0.196 0.979333 0.588 0.588C0.98 0.196667 1.45067 0.000666667 2 0H10L16 6V18C16 18.55 15.8043 19.021 15.413 19.413C15.0217 19.805 14.5507 20.0007 14 20H2ZM9 7V2H2V18H14V7H9Z"
                fill="#1C5FE8"
              />
            </svg>
          </div>
          <h2 className="text-center text-[#151547] tracking-[-0.04em] font-medium text-2xl lg:text-[28px] mb-2">
            Consignment Condition Confirmation
          </h2>
          <p className="text-[#4E4E4E] tracking-[-0.04em] text-base mb-4 text-center max-w-[398px] mx-auto">
            Please select the condition of the consignment before proceeding.
          </p>
          <div className="flex flex-wrap -mx-2">
            <div className="w-full md:w-4/12 px-2 mb-3 lg:mb-5">
              <div
                className={`${
                  condition === "expected" ? "border border-[#0BB635]" : ""
                } h-full bg-[#0BB635] bg-opacity-10 rounded-xl lg:rounded-[15px] p-4 lg:p-5 cursor-pointer`}
                onClick={() => setCondition("expected")}
              >
                <h3 className="text-lg lg:text-xl uppercase text-[#1B1B1B] tracking-[-0.04em] text-medium text-center mb-2">
                  As Expected
                  <svg
                    className="inline ml-2"
                    width="22"
                    height="18"
                    viewBox="0 0 22 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M1 9L3.5 6.5L8.5 11.5L18.5 1.5L21 4L8.5 16.5L1 9Z"
                      fill="#0BB635"
                      stroke="#0BB635"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </h3>
                <p className="text-[#727272]  tracking-[-0.04em] text-[15px] text-center leading-4">
                  The consignment is in good condition and matches the order.
                </p>
              </div>
            </div>
            <div className="w-full md:w-4/12 px-2 mb-3 lg:mb-5">
              <div
                className={`${
                  condition === "damaged" ? "border border-[#bd9c2f]" : ""
                } h-full border-opacity-20 bg-[#C2970A] bg-opacity-10 rounded-xl lg:rounded-[15px] p-4 lg:p-5 cursor-pointer`}
                onClick={() => setCondition("damaged")}
              >
                <h3 className="text-lg lg:text-xl uppercase text-[#1B1B1B] tracking-[-0.04em] text-medium text-center mb-2">
                  Damaged
                  <svg
                    className="inline ml-2"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 14L7 16.5L10 13L13 17L15 14.5L18 15L15 12L13 14.5L10 9.5L6.5 13.25L3 10V2.992C3 2.455 3.447 2 3.998 2H14V8C14 8.26522 14.1054 8.51957 14.2929 8.70711C14.4804 8.89464 14.7348 9 15 9H21V20.993C21.0009 21.1243 20.976 21.2545 20.9266 21.3762C20.8772 21.4979 20.8043 21.6087 20.7121 21.7022C20.6199 21.7957 20.5101 21.8701 20.3892 21.9212C20.2682 21.9723 20.1383 21.9991 20.007 22H3.993C3.72981 22 3.47739 21.8955 3.2912 21.7095C3.105 21.5235 3.00027 21.2712 3 21.008V14ZM21 7H16V2.003L21 7Z"
                      fill="#C2970A"
                    />
                  </svg>
                </h3>
                <p className="text-[#727272]  tracking-[-0.04em] text-[15px] text-center leading-4">
                  The consignment includes items that are damaged.
                </p>
              </div>
            </div>
            <div className="w-full md:w-4/12 px-2 mb-3 lg:mb-5">
              <div
                className={`${
                  condition === "reject" ? "border border-[rgb(173,46,46)]" : ""
                } border-opacity-20 h-full bg-[#CF0000] bg-opacity-10 rounded-xl lg:rounded-[15px] p-4 lg:p-5 cursor-pointer`}
                onClick={() => setCondition("reject")}
              >
                <h3 className="text-lg lg:text-xl uppercase text-[#1B1B1B] tracking-[-0.04em] text-medium text-center mb-2">
                  Reject
                  <svg
                    className="inline ml-2"
                    width="21"
                    height="21"
                    viewBox="0 0 21 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.09603 3.1778L10.5 8.5818L15.876 3.2058C15.9948 3.07941 16.1378 2.9783 16.2966 2.90853C16.4554 2.83877 16.6266 2.80178 16.8 2.7998C17.1713 2.7998 17.5274 2.9473 17.79 3.20986C18.0525 3.47241 18.2 3.8285 18.2 4.1998C18.2033 4.37145 18.1715 4.54195 18.1065 4.70084C18.0414 4.85973 17.9447 5.00366 17.822 5.1238L12.376 10.4998L17.822 15.9458C18.0528 16.1715 18.1881 16.4772 18.2 16.7998C18.2 17.1711 18.0525 17.5272 17.79 17.7898C17.5274 18.0523 17.1713 18.1998 16.8 18.1998C16.6216 18.2072 16.4436 18.1774 16.2773 18.1124C16.111 18.0473 15.96 17.9483 15.834 17.8218L10.5 12.4178L5.11003 17.8078C4.99174 17.93 4.85042 18.0275 4.69424 18.0948C4.53805 18.1621 4.37008 18.1978 4.20003 18.1998C3.82873 18.1998 3.47263 18.0523 3.21008 17.7898C2.94753 17.5272 2.80003 17.1711 2.80003 16.7998C2.79677 16.6282 2.82861 16.4577 2.89362 16.2988C2.95862 16.1399 3.0554 15.9959 3.17803 15.8758L8.62403 10.4998L3.17803 5.0538C2.94729 4.82807 2.81199 4.52238 2.80003 4.1998C2.80003 3.8285 2.94753 3.47241 3.21008 3.20986C3.47263 2.9473 3.82873 2.7998 4.20003 2.7998C4.53603 2.804 4.85803 2.9398 5.09603 3.1778Z"
                      fill="#CF0000"
                    />
                  </svg>
                </h3>
                <p className="text-[#727272] tracking-[-0.04em] text-[15px] text-center leading-4">
                  The consignment does not meet the required specifications.
                </p>
              </div>
            </div>
          </div>
          {condition != "expected" && (
            <div className="my-4 border-2 rounded-xl">
              <textarea
                value={text}
                onChange={handleChange}
                placeholder="Please write the reason for the above rating here..."
                rows={5}
                cols={50}
                style={{ padding: "8px", fontSize: "16px", width: "100%" }}
              />
            </div>
          )}
          <div className="text-center">
            {/* <img className='max-w-full mx-auto block' src='images/PDF-modal.png' alt='img' /> */}
            {pdfLoading ? (
              <div className="h-[600px] items-center">
                <Loader />
              </div>
            ) : (
              <iframe
                src={pdfUrl}
                width="100%"
                height="600px"
                title="BOL PDF"
              ></iframe>
            )}
          </div>
          {/* Signature box */}
          <div className="">
            <SignatureCapture onSave={handleSignatureSave} />
            {signatureFile && (
              // <div className="mt-6 ">
              <p className="text-center pt-2 text-sm text-gray-600 mb-2">
                Signature saved. You can now submit the form.
              </p>
              /* <img
                  src={signaturePreview}
                  alt="Signature Preview"
                  className="mx-auto border rounded shadow max-w-sm"
                /> */
              /* </div> */
            )}
          </div>
          <div className="flex flex-wrap justify-center items-center gap-3 lg:gap-5 mt-6">
            <button
              className="bg-[#1C5FE8] hover:bg-[#0a3fab] border boder-[#1C5FE8] hover:boder-[#0a3fab]  inline-block font-medium text-base text-white tracking-[-0.04em] rounded-lg lg:rounded-xl px-16 py-3 uppercase"
              onClick={() => {
                submitRating();
              }}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      )}
    </ReviewLayout>
  );
}
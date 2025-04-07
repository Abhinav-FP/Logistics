import React, { useState, useEffect, useRef } from 'react';
import { BrowserMultiFormatReader } from '@zxing/browser';
import { MdClose } from 'react-icons/md';
import { BsQrCodeScan } from "react-icons/bs";
import { useRouter } from 'next/router';
import { QrReader } from "react-qr-reader";
import Popup from '@/components/Popup';

const Index = () => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    const [data, setData] = useState("No result");
    const [showModal, setShowModal] = useState(false);
    const qrRef = useRef(null);

    const handleScan = (result, error) => {
        if (!!result) {
            setData(result?.text);
            setShowModal(true);
            qrRef.current.stop();
        }

        if (!!error) {
            console.info(error);
        }
    };
    return (
        <>
            <button
                onClick={toggleModal}
                className='font-inter font-medium lg:text-[16px] text-[14px] gap-2 leading-tight items-center  text-center xxl:w-52 px-4 border-2 py-3  mb-2 rounded-lg lg:rounded-xl focus:outline-none  flex  '
            >
                <BsQrCodeScan size={20} className='text-black-600 hover:text-black-700' /> Scan
            </button>
            {/* Modal */}
            {isOpen && (
                <Popup isOpen={isOpen} onClose={toggleModal} size={"max-w-[400px]"} >
                    <div className="p-4 space-y-4">
                        <h2 className="text-xl font-semibold text-gray-800">
                            Scan Qrcode
                        </h2>
                        <main className="flex flex-col mt-[5rem] justify-center items-center">
                            <div className="flex flex-col justify-center items-center">
                                <h1 className="text-4xl font-bold mb-4">QR Scanner</h1>
                                <div>
                                    <QrReader
                                        className="lg:h-[400px] lg:w-[400px] h-[300px] w-[300px]"
                                        onResult={handleScan}
                                        constraints={{ facingMode: "environment" }}
                                        style={{ width: "40%", height: "40%" }}
                                        ref={qrRef}
                                    />
                                </div>
                            </div>
                        </main>
                    </div>
                </Popup>
            )}
        </>
        // <div className="scanner-container">
        //   <h1>Barcode Scanner</h1>
        //   

        //   <button onClick={handleRetry}>Scan Again</button>
        // </div>
    );
};

export default Index;
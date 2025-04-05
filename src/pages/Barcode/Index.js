import React, { useState, useEffect, useRef } from 'react';
import { BrowserMultiFormatReader } from '@zxing/browser';
import { MdClose } from 'react-icons/md';
import { BsQrCodeScan } from "react-icons/bs";
import { useRouter } from 'next/router';
import Popup from '@/components/Popup';

const Index = () => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const toggleModal = () => {
        setIsOpen(!isOpen);
    };
    const [scannedData, setScannedData] = useState(null);
    const [cameraError, setCameraError] = useState(null);
    const [scanning, setScanning] = useState(true);
    const videoRef = useRef(null);

    console.log("cameraError", cameraError)
    useEffect(() => {
        const codeReader = new BrowserMultiFormatReader();

        const startScanning = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: {
                        facingMode: 'environment',
                        width: { ideal: 1280 },
                        height: { ideal: 720 },
                    },
                });

                videoRef.current.srcObject = stream;
                videoRef.current.play();

                codeReader.decodeFromVideoDevice(
                    undefined,
                    videoRef.current,
                    (result, error) => {
                        if (result) {
                            window.location.href(result.text)
                            setScannedData(result.text);
                            console.log('Scanned Barcode Data:', result.text);
                            setScanning(false);
                            if (videoRef.current && videoRef.current.srcObject) {
                                const tracks = videoRef.current.srcObject.getTracks();
                                tracks.forEach((track) => track.stop());
                            }
                        } else if (error && !error.message.includes('No MultiFormatReader available')) {
                            console.error('Barcode scanning error:', error);
                        }
                    }
                );
            } catch (err) {
                console.error('Error accessing camera:', err);
                setCameraError('Unable to access the camera. Please check permissions.');
            }
        };

        if (scanning) {
            startScanning();
        }

        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                const tracks = videoRef.current.srcObject.getTracks();
                tracks.forEach((track) => track.stop());
            }
        };
    }, [scanning]);

    const handleRetry = () => {
        setScannedData(null);
        setCameraError(null);
        setScanning(true);
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
                        <div className="scanner-wrapper">
                            {!scannedData && (
                                <>
                                    <video ref={videoRef} autoPlay playsInline />
                                    <div className="green-line" />
                                </>
                            )}


                            {scannedData && <button className='bg-white hover:bg-[#0a3fab] border boder-black border-opacity-10 inline-block font-medium text-base text-[#1B1B1B] hover:text-white tracking-[-0.04em] rounded-lg lg:rounded-xl px-16 py-3 uppercase' onClick={handleRetry}>Scan Again</button>}

                            {cameraError && <p className="error-message">{cameraError}</p>}

                        </div>
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
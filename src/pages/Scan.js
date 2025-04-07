'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically load the QR Reader
const QrReader = dynamic(() => import('modern-react-qr-reader'), { ssr: false });

const QRScanner = () => {
  const [result, setResult] = useState('No result');
  const [error, setError] = useState(null);

  const handleScan = (data) => {
    if (data) {
      setResult(data);
    }
  };

  const handleError = (err) => {
    console.error(err);
    setError('Camera access denied or not available');
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Scan QR Code</h2>

      <div className="w-full border border-gray-300 rounded overflow-hidden">
        <QrReader
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: '100%' }}
        />
      </div>

      <div className="mt-4">
        <p className="text-gray-700">
          <strong>Scanned Result:</strong> {result}
        </p>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default QRScanner;

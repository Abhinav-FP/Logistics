// SignatureCapture.js
import React, { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";

const SignatureCapture = ({ onSave }) => {
  const sigCanvasRef = useRef(null);

  const clear = () => {
    sigCanvasRef.current.clear();
  };

  const save = () => {
    if (sigCanvasRef.current.isEmpty()) {
      alert("Please provide a signature first");
      return;
    }

    const dataURL = sigCanvasRef.current.toDataURL("image/png");
    onSave(dataURL);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg flex flex-col items-center">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Customer Signature
      </h2>

      <div className="w-[300px] sm:w-[500px]">
        <SignatureCanvas
          ref={sigCanvasRef}
          penColor="black"
          canvasProps={{
            width: 500, // keep this max; it will be scaled down via CSS
            height: 200,
            className: "w-full rounded border border-gray-300 shadow-sm", // responsive width
          }}
          backgroundColor="#fff"
        />
      </div>

      <div className="flex gap-4 mt-4">
        <button
          onClick={clear}
          className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded"
        >
          Clear
        </button>
        <button
          onClick={save}
          className="bg-green-500 hover:bg-green-600 text-white font-medium px-4 py-2 rounded"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default SignatureCapture;
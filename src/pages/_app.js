import { RoleProvider } from "@/context/RoleContext";
import "@/styles/globals.css";
import { Toaster } from "react-hot-toast"; // Assuming you're using 'react-hot-toast'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Toaster
        toastOptions={{
          position: "top-right",
          className: "",
          style: {
            fontSize: "14px", // Corrected "font-size" to camelCase as required in JSX styles
          },
        }}
      />
      <RoleProvider>
        <Component {...pageProps} />
      </RoleProvider>
    </>
  );
}

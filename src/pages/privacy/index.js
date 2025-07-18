import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className=" mx-auto p-8 bg-gray-50 text-gray-800 font-sans leading-relaxed ">
      <h1 className="text-4xl font-bold text-blue-900 mb-6">Privacy Policy</h1>

      <p className="mb-4 font-semibold">
        Last Updated: <span className="font-normal">July 2025</span>
      </p>

      <h2 className="text-2xl font-semibold text-blue-800 mb-3">1. Introduction</h2>
      <p className="mb-2">
        Tracebill is committed to protecting the privacy of its users. This Privacy Policy explains how we collect, use, and safeguard your information when you use the Tracebill Driver App.
      </p>
      <p className="mb-4">This policy applies when you:</p>
      <ul className="list-disc list-inside mb-6 space-y-1">
        <li>Use the Tracebill Driver mobile application.</li>
        <li>Accept assigned loads, update dispatch or delivery status, track location, or upload signatures and shipment photos.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-blue-800 mb-3">2. Information We Collect</h2>
      <p className="mb-2">To ensure proper functionality of the app, we may request access to:</p>
      <ul className="list-disc list-inside mb-6 space-y-1">
        <li><strong>Location:</strong> For real-time tracking of delivery and load routes.</li>
        <li><strong>Storage:</strong> To allow upload and download of delivery documents, PODs, or images.</li>
        <li><strong>Camera:</strong> To capture photos of packages or signatures.</li>
        <li><strong>Phone:</strong> For quick access to dispatch calls or emergency contacts.</li>
        <li><strong>Push Notifications:</strong> To inform about new load assignments or dispatch updates.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-blue-800 mb-3">3. How We Use Your Information</h2>
      <ul className="list-disc list-inside mb-6 space-y-1">
        <li>Track delivery status and driver location in real time.</li>
        <li>Enable smooth communication between dispatch, carriers, and drivers.</li>
        <li>Capture and store delivery-related signatures and documents.</li>
        <li>Enhance security, transparency, and operational efficiency.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-blue-800 mb-3">4. No Advertisements or Data Sales</h2>
      <ul className="list-disc list-inside mb-6 space-y-1">
        <li><strong>No Ads:</strong> This app does not show advertisements.</li>
        <li><strong>No Data Selling:</strong> We do not sell your personal data to third parties.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-blue-800 mb-3">5. Permission Summary</h2>
      <div className="overflow-x-auto mb-8">
        <table className="min-w-full border border-gray-400 border-collapse">
          <thead>
            <tr className="bg-blue-100 text-blue-900">
              <th className="border border-gray-400 px-6 py-3 text-left">Permission</th>
              <th className="border border-gray-400 px-6 py-3 text-left">Purpose</th>
            </tr>
          </thead>
          <tbody>
            {[
              { permission: "Location Access", purpose: "Live route tracking and load delivery monitoring" },
              { permission: "Storage Access", purpose: "Upload and view delivery documents or photos" },
              { permission: "Camera Access", purpose: "Capture proof of delivery, signature, or shipment condition" },
              { permission: "Phone Access", purpose: "Call dispatch or support directly from the app" },
              { permission: "Push Notifications", purpose: "Get real-time updates on load status and instructions" },
            ].map(({ permission, purpose }) => (
              <tr key={permission} className="odd:bg-white even:bg-gray-50">
                <td className="border border-gray-400 px-6 py-3">{permission}</td>
                <td className="border border-gray-400 px-6 py-3">{purpose}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-semibold text-blue-800 mb-3">6. Data Security</h2>
      <p className="mb-6">
        We use encryption, secure APIs, and role-based access control to protect your data. Data is stored only as long as necessary and removed when no longer required.
      </p>

      <h2 className="text-2xl font-semibold text-blue-800 mb-3">7. Permission Control</h2>
      <p className="mb-6">
        You can grant or revoke permissions anytime from your device settings. Some features (e.g., location tracking or document uploads) may not function if certain permissions are disabled.
      </p>

      <h2 className="text-2xl font-semibold text-blue-800 mb-3">8. Contact Us</h2>
      <p className="mb-6">
        If you have any questions or concerns about our privacy practices, please contact us at:<br />
        📧 <a href="mailto:tracebill60@gmail.com" className="text-blue-600 hover:underline">tracebill60@gmail.com</a>
      </p>

      <h2 className="text-2xl font-semibold text-blue-800 mb-3">9. Policy Updates</h2>
      <p className="mb-6">
        This Privacy Policy may be updated as needed. Changes will be reflected in this document, and major updates may be communicated via app notification.
      </p>

      <h2 className="text-2xl font-semibold text-blue-800 mb-3">10. Third-Party Integrations</h2>
      <p>
        The app may interact with third-party services (e.g., map services, file storage). We are not responsible for their privacy policies, and we encourage users to review them separately.
      </p>
    </div>
  );
}

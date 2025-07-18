import React from 'react';

export default function SupportPage() {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-10 text-gray-800">
      <h1 className="text-3xl font-bold mb-4 text-center">
        Welcome to the Official Support Page for <span className="text-primary">Tracebill</span>
      </h1>
      <p className="mb-6 text-center text-lg">
        If you need help related to the app, login, driver tracking, or delivery issues — we’re here to assist you.
      </p>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">📞 Contact Support</h2>
        <div className="space-y-2 text-base">
          <p>
            <strong>Email:</strong>{' '}
            <a href="mailto:tracebill60@gmail.com" className="text-blue-600 hover:underline">
              tracebill60@gmail.com
            </a>
          </p>
          <p>
            <strong>WhatsApp Chat:</strong>{' '}
            <a
              href="https://wa.me/9974102587"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:underline"
            >
              Click to Chat
            </a>
          </p>
          <p>
            <strong>Support Hours:</strong> 10:00 AM – 6:00 PM (Monday to Saturday)
          </p>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">💬 Common Issues We Help With</h2>
        <ul className="list-disc list-inside space-y-1 text-base">
          <li>App login and account access</li>
          <li>Driver account and access setup</li>
          <li>Marking a product as delivered to a customer</li>
          <li>Live tracking of driver location</li>
          <li>Viewing complete billing history</li>
          <li>Displaying all shipments and delivery status updates</li>
        </ul>
      </div>

      <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded">
        <p className="text-yellow-800 font-medium">
          For urgent delivery or driver issues, please reach out via WhatsApp or use the emergency support option in the app.
        </p>
      </div>
    </div>
  );
}

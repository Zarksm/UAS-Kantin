"use client";
import General from "@/app/components/dashboard/General";
import TabSettings from "@/app/components/TabSettings";
import React, { useState } from "react";

const SettingPage = () => {
  const [activeTab, setActiveTab] = useState("General");

  const renderContent = () => {
    switch (activeTab) {
      case "General":
        return <General />;
      case "Notification":
        return (
          <div className="bg-white rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Notification Settings
            </h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <input type="checkbox" id="emailNotif" className="mr-2" />
                <label htmlFor="emailNotif" className="text-gray-600">
                  Email Notifications
                </label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="smsNotif" className="mr-2" />
                <label htmlFor="smsNotif" className="text-gray-600">
                  SMS Notifications
                </label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="pushNotif" className="mr-2" />
                <label htmlFor="pushNotif" className="text-gray-600">
                  Push Notifications
                </label>
              </div>
              <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                Update Notifications
              </button>
            </div>
          </div>
        );
      case "Security":
        return (
          <div className="bg-white rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Security Settings
            </h2>
            <p className="text-gray-600">
              Update your password, manage two-factor authentication, and
              configure security options.
            </p>
          </div>
        );
      case "Billing":
        return (
          <div className="bg-white rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Billing Settings
            </h2>
            <p className="text-gray-600">
              Manage your billing information and view invoices.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-700">Settings</h1>
      <TabSettings onTabChange={(tab) => setActiveTab(tab)} />
      {renderContent()}
    </div>
  );
};

export default SettingPage;

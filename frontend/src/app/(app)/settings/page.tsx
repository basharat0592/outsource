"use client";

import { useState, useRef } from "react";

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("profile");

    // Profile states
    const [isEditing, setIsEditing] = useState(false);
    const [firstName, setFirstName] = useState("Peter");
    const [lastName, setLastName] = useState("Parker");

    const [tempFirstName, setTempFirstName] = useState(firstName);
    const [tempLastName, setTempLastName] = useState(lastName);

    // Image upload states
    const [profileImg, setProfileImg] = useState(null); // Preview image
    const fileInputRef = useRef(null);

    const handleEditClick = () => {
        setTempFirstName(firstName);
        setTempLastName(lastName);
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
    };

    const handleSaveClick = () => {
        setFirstName(tempFirstName);
        setLastName(tempLastName);
        setIsEditing(false);
    };

    // Avatar Click → Choose Image
    const handleAvatarClick = () => {
        fileInputRef.current.click();
    };

    // Handle File Selection
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const imgURL = URL.createObjectURL(file);
        setProfileImg(imgURL);
    };

    return (
        <div className="h-130 bg-[#F4F4F5]">
            {/* Header */}
            <div className="border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-8 py-6">
                    <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
                </div>
            </div>

            {/* Tabs */}
            <div className="max-w-7xl mx-auto px-8 py-4">
                <div className="flex space-x-8 border-b border-gray-200 mb-8">
                    <button
                        onClick={() => setActiveTab("profile")}
                        className={`pb-3 text-sm font-medium ${activeTab === "profile"
                                ? "text-gray-900 border-b-2 border-gray-900"
                                : "text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        Profile
                    </button>

                    <button
                        onClick={() => setActiveTab("security")}
                        className={`pb-3 text-sm font-medium ${activeTab === "security"
                                ? "text-gray-900 border-b-2 border-gray-900"
                                : "text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        Security
                    </button>
                </div>

                {/* Profile Tab */}
                {activeTab === "profile" && (
                    <div className="max-w-3xl space-y-8">
                        {/* Avatar + Name */}
                        <div className="flex items-center space-x-6">
                            {/* Hidden File Input */}
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                onChange={handleImageChange}
                                className="hidden"
                            />

                            {/* Avatar Clickable */}
                            <div
                                onClick={handleAvatarClick}
                                className="h-24 w-24 rounded-full bg-[#639900]  border border-gray-200 cursor-pointer overflow-hidden flex items-center justify-center hover:opacity-80 transition"
                            >
                                {profileImg ? (
                                    <img
                                        src={profileImg}
                                        alt="Profile"
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <span className="text-3xl font-bold text-white">
                                        {firstName.charAt(0).toUpperCase()}{lastName.charAt(0).toUpperCase()}
                                    </span>

                                )}
                            </div>

                            <div className="flex-1">
                                {isEditing ? (
                                    <div className="space-y-4">
                                        <div className="flex space-x-4">
                                            <input
                                                value={tempFirstName}
                                                onChange={(e) => setTempFirstName(e.target.value)}
                                                className="px-4 py-2.5 border border-gray-300 rounded-md w-48 focus:ring-2 focus:ring-gray-500"
                                            />

                                            <input
                                                value={tempLastName}
                                                onChange={(e) => setTempLastName(e.target.value)}
                                                className="px-4 py-2.5 border border-gray-300 rounded-md w-48 focus:ring-2 focus:ring-gray-500"
                                            />
                                        </div>

                                        <div className="flex space-x-3">
                                            <button
                                                onClick={handleCancelClick}
                                                className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                                            >
                                                Cancel
                                            </button>

                                            <button
                                                onClick={handleSaveClick}
                                                className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-md hover:bg-gray-800"
                                            >
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900">
                                            {firstName}
                                        </h3>
                                        <h5 className="text-gray-600">
                                            {lastName}

                                        </h5>
                                        <button
                                            onClick={handleEditClick}
                                            className="mt-4 px-4 py-2 bg-[#6027C4] text-sm cursor-pointer font-medium text-white border-gray-300 rounded-md"
                                        >
                                            Edit
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Security Tab */}
                {activeTab === "security" && (
                    <div className="max-w-lg space-y-6">
                        <h2 className="text-2xl font-semibold text-gray-900">
                            Change Password
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="text-sm text-gray-700">Current Password</label>
                                <input
                                    type="password"
                                    className="mt-1 w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900"
                                />
                            </div>

                            <div>
                                <label className="text-sm text-gray-700">New Password</label>
                                <input
                                    type="password"
                                    className="mt-1 w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900"
                                />
                            </div>

                            <div>
                                <label className="text-sm text-gray-700">
                                    Confirm New Password
                                </label>
                                <input
                                    type="password"
                                    className="mt-1 w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900"
                                />
                            </div>

                            <button className="mt-4 px-6 py-2.5 font-medium text-white bg-gray-900 rounded-md hover:bg-gray-800">
                                Update Password
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

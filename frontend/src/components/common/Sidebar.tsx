"use client";

import Link from "next/link";
import {
    FileText,
    PlusCircle,
    Users,
    Building,
    Bell
} from "lucide-react";

export default function Sidebar() {
    const notifications = [
        { user: "Duncan Robertshaw", action: "commented on", target: "Payroll", time: "2 months ago", initials: "DR" },
        { user: "Duncan Robertshaw", action: "commented on", target: "Manage", time: "2 months ago", initials: "DR" },
        { user: "Duncan Robertshaw", action: "needs your review on V,", target: "", time: "3 months ago", initials: "DR" },
        { user: "Duncan Robertshaw", action: "needs your review on V,", target: "", time: "3 months ago", initials: "DR" },
    ];

    return (
        <aside
            className="
        w-95                         /* ⬅ increased width */
        h-screen                     /* full height */
        bg-[#5321A9] 
        p-6 
        text-white 
        overflow-y-scroll            /* ⬅ separate scrollbar */
        scrollbar-thin 
        scrollbar-thumb-white/40 
        scrollbar-track-transparent
        flex-shrink-0      "
        >
            <div className="mb-10">
                <img
                    src="/logo.jpg"          // ⬅ Replace with your image path
                    alt="OUTSOURCE.COM Logo"
                    className="w-60 h-auto mt-3" // Adjust width & height as needed
                />
            </div>


            {/* Tasks Section */}
            <div className="mb-8">
                <h2 className="text-lg font-semibold mb-4">Tasks</h2>

                <ul className="space-y-2">
                    <li>
                        <Link
                            href="/tasks"
                            className="flex items-center gap-3 p-2 rounded transition hover:bg-[#6D3AD1] cursor-pointer"
                        >
                            <FileText className="h-5 w-5" />
                            <span>View All Tasks</span>
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="/tasks/new"
                            className="flex items-center gap-3 p-2 rounded transition hover:bg-[#6D3AD1] cursor-pointer"
                        >
                            <PlusCircle className="h-5 w-5" />
                            <span>Add New Task</span>
                        </Link>
                    </li>
                </ul>
            </div>

            {/* Contacts Section */}
            <div className="mb-8">
                <h2 className="text-lg font-semibold mb-4">Contacts</h2>

                <ul className="space-y-2">
                    <li>
                        <Link
                            href="/clients"
                            className="flex items-center gap-3 p-2 rounded transition hover:bg-[#6D3AD1] cursor-pointer"
                        >
                            <Users className="h-5 w-5" />
                            <span>Clients</span>
                        </Link>
                    </li>
                </ul>
            </div>

            {/* Organisation Section */}
            <div className="mb-8">
                <h2 className="text-lg font-semibold mb-4">Organisation</h2>

                <button className="flex items-center gap-3 p-2 rounded transition hover:bg-[#6D3AD1] w-full text-left cursor-pointer">
                    <Building className="h-5 w-5" />
                    <span className="font-medium">Demo Accounting Ltd</span>
                </button>
            </div>

            {/* Divider */}
            <div className="border-t border-white/30 pt-8 mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">Notifications</h2>
                    <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                        4
                    </span>
                </div>

                {/* Notifications */}
                <div className="space-y-3 mb-4">
                    {notifications.map((n, index) => (
                        <button
                            key={index}
                            className="w-full text-left flex items-start gap-3 p-2 rounded transition hover:bg-[#6D3AD1] cursor-pointer"
                        >
                            <div className="w-6 h-6 rounded-full bg-white/40 flex items-center justify-center text-xs font-semibold">
                                {n.initials}
                            </div>

                            <div className="flex-1">
                                <p className="text-sm">
                                    <span className="font-medium">{n.user}</span> {n.action}{" "}
                                    {n.target}
                                </p>
                                <p className="text-xs text-white/70">{n.time}</p>
                            </div>
                        </button>
                    ))}
                </div>

                {/* View all button */}
                <Link
                    href="/notifications"
                    className="flex items-center gap-2 px-3 py-2 rounded bg-white/10 hover:bg-white/20 transition font-semibold cursor-pointer"
                >
                    <Bell className="h-4 w-4" />
                    <span>View All Notifications</span>
                </Link>
            </div>
        </aside>
    );
}

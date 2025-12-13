<<<<<<< HEAD
"use client";

import { ReactNode, useState } from "react";
import NavBar from '@/components/common/NavBar';
import Sidebar from '@/components/common/Sidebar';
import { Menu, X } from "lucide-react";

export default function AppLayout({ children }: { children: ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="relative min-h-screen">
            {/* Mobile Sidebar Toggle Button */}
            <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-lg"
            >
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Sidebar - Absolute/Fixed */}
            <div className={`
                fixed md:absolute left-0 top-0 h-screen z-40
                transform transition-transform duration-300 ease-in-out
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                w-3/4 md:w-[30%] max-w-sm
            `}>
                <Sidebar />
            </div>

            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-30 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main Content - Relative */}
            <div className="relative md:ml-[30%] min-h-screen">
                {/* Navbar */}
                <div className="sticky top-0 z-30">
                    <NavBar />
                </div>
                
                {/* Content */}
                <main className="p-4 md:p-6">{children}</main>
=======
import { ReactNode } from "react";
import NavBar from '@/components/common/NavBar';
import Sidebar from '@/components/common/Sidebar';


export default function AppLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1">
                <NavBar />
                <main className="p-6">{children}</main>
>>>>>>> d05f14e5c1eee35bb5d7ecbe808dcdda1dcdfd21
            </div>
        </div>
    );
}
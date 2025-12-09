"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  Settings,
  Menu,
  X,
  ChevronDown,
  User,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  // 🔥 DEMO USER NAME
  const demoUserName = "Zulqarnain Ali";

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const dropdownRef = useRef(null);

  // 🔥 CLOSE DROPDOWN WHEN CLICK OUTSIDE
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const navItems = [
    { name: "Home", href: "/dashboard", icon: Home },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <nav className="sticky top-0 z-50 p-2 border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* LEFT NAV ITEMS */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all ${
                    pathname === item.href
                      ? "bg-[#5321A9] text-white"
                      : "text-gray-700 hover:text-[#5321A9] hover:bg-gray-50"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* RIGHT SECTION */}
          <div className="flex items-center gap-3">

            {/* PROFILE DROPDOWN */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsProfileMenuOpen(!isProfileMenuOpen);
                }}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100"
              >
                {/* USER ICON CIRCLE */}
                <div className="w-10 h-10 rounded-full bg-[#639900] flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>

                <ChevronDown
                  className={`h-4 w-4 text-gray-500 transition-transform ${
                    isProfileMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* DROPDOWN MENU */}
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-3  w-56 bg-white border rounded-lg shadow-lg  z-20">

                  {/* USERNAME */}
                  <li
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      router.push("/profile");
                    }}
                    className="flex bg-[#5321A9] text-white items-center gap-2 px-4 py-5"
                  >
                    <User className="h-4 w-4" />
                    <span>
                      {demoUserName}
                    </span>
                  </li>

                  {/* SETTINGS */}
                  <button
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      router.push("/settings");
                    }}
                    className="flex items-center gap-2 cursor-pointer px-4 py-2 text-sm text-gray-700"
                  >
                    <Settings className="h-4 w-4" />
                    Settings
                  </button>

                  <div className="border-t my-1"></div>

                  {/* LOGOUT */}
                  <button
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      router.push("/");
                    }}
                    className="flex items-center cursor-pointer  gap-2 px-4 py-2 w-full text-left text-red-600"
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>

          </div>
        </div>
      </div>
    </nav>
  );
}

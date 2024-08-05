"use client";

import Link from "next/link";
import Image from "next/image";
import { Bell, MenuIcon, Moon, Settings, Sun } from "lucide-react";

import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsDarkMode, setIsSidebarCollapsed } from "@/state";

export const Navbar = () => {
  const dispatch = useAppDispatch();

  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };

  const toggleDarkMode = () => {
    dispatch(setIsDarkMode(!isDarkMode));
  };

  return (
    <div className="w-full mb-7 flex justify-between items-center">
      {/* LEFT SIDE */}
      <div className="flex justify-between items-center gap-5">
        <button
          onClick={toggleSidebar}
          className="p-3 rounded-full bg-gray-100 hover:bg-blue-100"
        >
          <MenuIcon className="w-4 h-4" />
        </button>

        <div className="relative">
          <input
            type="search"
            placeholder="Start type to search groups & products"
            className="w-50 md:w-60 py-2 pl-10 pr-4 border-2 rounded-lg border-gray-300 focus:border-blue-500 focus:outline-none bg-white"
          />

          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Bell size={20} className="text-gray-500" />
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex justify-between items-center gap-5">
        <div className="hidden md:flex md:justify-between md:items-center md:gap-5">
          <div>
            <button onClick={toggleDarkMode} className="">
              {isDarkMode ? (
                <Sun size={24} className="text-gray-500 cursor-pointer" />
              ) : (
                <Moon size={24} className="text-gray-500 cursor-pointer" />
              )}
            </button>
          </div>

          <div className="relative">
            <Bell size={24} className="text-gray-500 cursor-pointer" />
            <span className="absolute -top-2 -right-2 px-[0.4rem] py-1 inline-flex items-center justify-center text-xs font-semibold text-red-100 leading-none rounded-full bg-red-400">
              3
            </span>
          </div>

          <hr className="w-0 h-7 mx-3 border border-solid border-l border-gray-300" />

          <div className="flex items-center gap-3 cursor-pointer">
            <div className="w-9 h-9">
              <Image
                src="https://s3-inventory-management-app.s3.us-west-1.amazonaws.com/profile.jpg"
                alt="profile"
                width={50}
                height={50}
                className="h-full object-cover rounded-full"
              />
            </div>
            <span className="font-semibold">LV</span>
          </div>
        </div>

        <Link href="/settings">
          <Settings size={24} className="text-gray-500 cursor-pointer" />
        </Link>
      </div>
    </div>
  );
};

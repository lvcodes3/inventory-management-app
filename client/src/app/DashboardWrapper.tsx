"use client";

import { useEffect } from "react";

import StoreProvider, { useAppSelector } from "@/app/redux";

import { Navbar } from "@/app/(components)/Navbar";
import { Sidebar } from "@/app/(components)/Sidebar";

// redux & next js connection //
const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </StoreProvider>
  );
};

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  useEffect(() => {
    // adding dark / light mode to html & body elements //
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.add("light");
    }
  });

  return (
    <div
      className={`${
        isDarkMode ? "dark" : "light"
      } w-full min-h-screen flex text-gray-900 bg-gray-50`}
    >
      <Sidebar />
      <main
        className={`w-full h-full px-9 py-7 ${
          isSidebarCollapsed ? "md:pl-24" : "md:pl-72"
        } flex flex-col bg-gray-50`}
      >
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default DashboardWrapper;

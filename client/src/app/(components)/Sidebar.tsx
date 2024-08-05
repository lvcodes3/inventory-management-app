"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Archive,
  CircleDollarSign,
  Clipboard,
  Layout,
  LucideIcon,
  Menu,
  SlidersHorizontal,
  User,
} from "lucide-react";

import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed } from "@/state";

// Sidebar //
export const Sidebar = () => {
  const dispatch = useAppDispatch();

  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };

  const sidebarClassNames = `${
    isSidebarCollapsed ? "w-0 md:w-16" : "w-72 md:w-64"
  } h-full z-40 fixed flex flex-col transition-all duration-300 overflow-hidden shadow-md bg-white`;

  return (
    <div className={sidebarClassNames}>
      {/* TOP LOGO */}
      <div
        className={`pt-8 ${
          isSidebarCollapsed ? "px-5" : "px-8"
        } flex justify-between md:justify-normal items-center gap-3`}
      >
        <div>
          <Image
            src="https://s3-inventory-management-app.s3.us-west-1.amazonaws.com/logo.png"
            alt="Logo"
            width={27}
            height={27}
            className="w-8 rounded"
          />
        </div>
        <h1
          className={`${
            isSidebarCollapsed ? "hidden" : "block"
          } text-2xl font-extrabold`}
        >
          INVENTORY
        </h1>
        <button
          onClick={toggleSidebar}
          className="block md:hidden p-3 rounded-full bg-gray-100 hover:bg-blue-100"
        >
          <Menu className="w-4 h-4" />
        </button>
      </div>

      {/* LINKS */}
      <div className="mt-8 flex-grow">
        <SidebarLink
          href="/dashboard"
          icon={Layout}
          label="Dashboard"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/inventory"
          icon={Archive}
          label="Inventory"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/products"
          icon={Clipboard}
          label="Products"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/users"
          icon={User}
          label="Users"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/settings"
          icon={SlidersHorizontal}
          label="Settings"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/expenses"
          icon={CircleDollarSign}
          label="Expenses"
          isCollapsed={isSidebarCollapsed}
        />
      </div>

      {/* FOOTER */}
      <div className={`${isSidebarCollapsed ? "hidden" : "block"} mb-10`}>
        <p className="text-xs text-center text-gray-500">&copy; 2024 LV</p>
      </div>
    </div>
  );
};

// SidebarLink //
interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  isCollapsed: boolean;
}

const SidebarLink = ({
  href,
  icon: Icon,
  label,
  isCollapsed,
}: SidebarLinkProps) => {
  const pathname = usePathname();

  const isActive =
    pathname === href || (pathname === "/" && href === "/dashboard");

  return (
    <Link href={href}>
      <div
        className={`flex ${
          isCollapsed ? "py-4 justify-center" : "px-8 py-4 justify-start"
        } items-center gap-3 cursor-pointer transition-colors hover:text-blue-500 hover:bg-blue-100 ${
          isActive ? "text-white bg-blue-200" : ""
        }`}
      >
        <Icon className="w-6 h-6 !text-gray-700" />
        <span
          className={`${
            isCollapsed ? "hidden" : "block"
          } font-medium text-gray-700`}
        >
          {label}
        </span>
      </div>
    </Link>
  );
};

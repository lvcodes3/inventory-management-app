"use client";

import {
  CheckCircle,
  Package,
  Tag,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

import { PopularProductsCard } from "@/app/dashboard/PopularProductsCard";
import { SalesSummaryCard } from "@/app/dashboard/SalesSummaryCard";
import { PurchaseSummaryCard } from "@/app/dashboard/PurchaseSummaryCard";
import { ExpenseSummaryCard } from "@/app/dashboard/ExpenseSummaryCard";
import { StatCard } from "@/app/dashboard/StatCard";

const Dashboard = () => {
  return (
    <div className="pb-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:overflow-auto gap-10 custom-grid-rows">
      {/* CARDS */}
      <PopularProductsCard />
      <SalesSummaryCard />
      <PurchaseSummaryCard />
      <ExpenseSummaryCard />
      <StatCard
        title="Customer & Expenses"
        primaryIcon={<Package className="w-6 h-6 text-blue-600" />}
        dateRange="22 - 29 October 2023"
        details={[
          {
            title: "Customer Growth",
            amount: "175.00",
            changePercentage: 131,
            iconComponent: TrendingUp,
          },
          {
            title: "Expenses",
            amount: "10.00",
            changePercentage: -56,
            iconComponent: TrendingDown,
          },
        ]}
      />
      <StatCard
        title="Dues & Pending Orders"
        primaryIcon={<CheckCircle className="w-6 h-6 text-blue-600" />}
        dateRange="22 - 29 October 2023"
        details={[
          {
            title: "Dues",
            amount: "250.00",
            changePercentage: 131,
            iconComponent: TrendingUp,
          },
          {
            title: "Pending Orders",
            amount: "147.00",
            changePercentage: -56,
            iconComponent: TrendingDown,
          },
        ]}
      />
      <StatCard
        title="Sales & Discounts"
        primaryIcon={<Tag className="w-6 h-6 text-blue-600" />}
        dateRange="22 - 29 October 2023"
        details={[
          {
            title: "Sales",
            amount: "1000.00",
            changePercentage: 20,
            iconComponent: TrendingUp,
          },
          {
            title: "Discounts",
            amount: "200.00",
            changePercentage: -10,
            iconComponent: TrendingDown,
          },
        ]}
      />
    </div>
  );
};

export default Dashboard;

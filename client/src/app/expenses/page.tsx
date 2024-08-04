"use client";

import { useMemo, useState } from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import {
  ExpenseByCategorySummary,
  useGetExpensesByCategoryQuery,
} from "@/state/api";

import { Header } from "@/app/(components)/Header";

const classNames = {
  label: "block text-sm font-medium text-gray-700",
  selectInput:
    "w-full mt-1 pl-3 pr-10 py-2 block text-base sm:text-sm rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500",
};

interface AggregatedDataItem {
  name: string;
  color?: string;
  amount: number;
}

interface AggregatedData {
  [category: string]: AggregatedDataItem;
}

const Expenses = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  // getting data from redux toolkit setup //
  const {
    data: expensesData,
    isLoading,
    isError,
  } = useGetExpensesByCategoryQuery();

  // memoize the expenses data to avoid unnecessary recalculations //
  const expenses = useMemo(() => expensesData ?? [], [expensesData]);

  const parseDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  // aggregated data //
  const aggregatedData: AggregatedDataItem[] = useMemo(() => {
    // filter expenses based on the selected category and date ranges //
    const filtered: AggregatedData = expenses
      .filter((data: ExpenseByCategorySummary) => {
        // check if expense matches the selected category //
        const matchesCategory =
          selectedCategory === "All" || data.category === selectedCategory;
        // parse the date of the expense //
        const dataDate = parseDate(data.date);
        // check if the expense date falls within the selected date range //
        const matchesDate =
          !startDate ||
          !endDate ||
          (dataDate >= startDate && dataDate <= endDate);
        return matchesCategory && matchesDate;
      })
      .reduce((acc: AggregatedData, data: ExpenseByCategorySummary) => {
        // aggregate expenses by category //
        const amount = parseInt(data.amount);
        if (!acc[data.category]) {
          // if the category doesn't exist in the accumulator, add it //
          acc[data.category] = {
            name: data.category,
            amount: 0,
          };
          // assign a random color to the category //
          acc[data.category].color = `#${Math.floor(
            Math.random() * 16777215
          ).toString(16)}`;
          // add the expense amount to the category total //
          acc[data.category].amount += amount;
        }
        return acc;
      }, {});

    // convert the aggregated data object to an array of values //
    return Object.values(filtered);
  }, [expenses, selectedCategory, startDate, endDate]);

  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }

  if (isError || !expensesData) {
    return (
      <div className="py-4 text-center text-red-500">
        Failed to fetch expenses by category
      </div>
    );
  }

  return (
    <div className="mb-5">
      {/* HEADER */}
      <Header name="Expenses" />
      <p className="text-sm text-gray-500">
        A visual representation of expenses over time.
      </p>

      {/* FILTERS */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="w-full md:w-1/3 p-6 rounded-lg shadow bg-white">
          <h3 className="mb-4 text-lg font-semibold">
            Filter by Category and Date
          </h3>
          <div className="space-y-4">
            {/* CATEGORY */}
            <div>
              <label htmlFor="category" className={classNames.label}>
                Category
              </label>
              <select
                id="category"
                name="category"
                defaultValue="All"
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={classNames.selectInput}
              >
                <option>All</option>
                <option>Office</option>
                <option>Professional</option>
                <option>Salaries</option>
              </select>
            </div>

            {/* START DATE */}
            <div>
              <label htmlFor="start-date" className={classNames.label}>
                Start Date
              </label>
              <input
                id="start-date"
                name="start-date"
                type="date"
                onChange={(e) => setStartDate(e.target.value)}
                className={classNames.selectInput}
              />
            </div>

            {/* END DATE */}
            <div>
              <label htmlFor="end-date" className={classNames.label}>
                End Date
              </label>
              <input
                id="end-date"
                name="end-date"
                type="date"
                onChange={(e) => setEndDate(e.target.value)}
                className={classNames.selectInput}
              />
            </div>
          </div>
        </div>

        {/* PIE CHART */}
        <div className="p-4 md:p-6 flex-grow rounded-lg shadow bg-white">
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={aggregatedData}
                cx="50%"
                cy="50%"
                label
                outerRadius={150}
                fill="#8884d8"
                dataKey="amount"
                onMouseEnter={(_, index) => setActiveIndex(index)}
              >
                {aggregatedData.map(
                  (entry: AggregatedDataItem, index: number) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        index === activeIndex ? "rgb(29,78,216)" : entry.color
                      }
                    />
                  )
                )}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Expenses;

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { TrendingUp } from "lucide-react";

import {
  ExpenseByCategorySummary,
  useGetDashboardMetricsQuery,
} from "@/state/api";

const colors = ["#00C49fF", "#0088FE", "#FFBB28"];

interface ExpenseSums {
  [category: string]: number;
}

export const ExpenseSummaryCard = () => {
  // getting data from redux toolkit setup //
  const { data: dashboardMetrics, isLoading } = useGetDashboardMetricsQuery();

  const expenseSummary = dashboardMetrics?.expenseSummary[0];

  const expenseByCategorySummary =
    dashboardMetrics?.expenseByCategorySummary || [];

  const expenseSums = expenseByCategorySummary.reduce(
    (acc: ExpenseSums, item: ExpenseByCategorySummary) => {
      const category = item.category + " Expenses";
      const amount = parseInt(item.amount, 10);
      if (!acc[category]) acc[category] = 0;
      acc[category] += amount;
      return acc;
    },
    {}
  );

  const expenseCategories = Object.entries(expenseSums).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  const totalExpenses = expenseCategories.reduce(
    (acc, category: { value: number }) => acc + category.value,
    0
  );
  const formattedTotalExpenses = totalExpenses.toFixed(2);

  return (
    <div className="row-span-3 flex flex-col justify-between rounded-2xl shadow-md bg-white">
      {isLoading ? (
        <div className="m-5">Loading...</div>
      ) : (
        <>
          {/* HEADER */}
          <div>
            <h2 className="mb-2 px-7 pt-5 text-lg font-semibold">
              Expense Summary
            </h2>
            <hr />
          </div>

          {/* BODY */}
          <div className="pr-7 xl:flex xl:justify-between">
            <div className="relative basis-3/5">
              {/* CHART */}
              <ResponsiveContainer width="100%" height={140}>
                <PieChart>
                  <Pie
                    data={expenseCategories}
                    innerRadius={50}
                    outerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                  >
                    {expenseCategories.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={colors[index % colors.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center basis-2/5">
                <span className="text-xl font-bold">
                  ${formattedTotalExpenses}
                </span>
              </div>
            </div>

            {/* LABELS */}
            <ul className="py-5 flex flex-col items-center xl:items-start justify-around gap-3">
              {expenseCategories.map((entry, index) => (
                <li
                  key={`legend-${index}`}
                  className="flex items-center text-xs"
                >
                  <span
                    className="w-3 h-3 mr-2 rounded-full"
                    style={{ backgroundColor: colors[index % colors.length] }}
                  ></span>
                  {entry.name}
                </li>
              ))}
            </ul>
          </div>

          {/* FOOTER */}
          <div>
            <hr />
            {expenseSummary && (
              <div className="mt-3 mb-4 px-7 flex justify-between items-center">
                <div className="pt-2">
                  <p className="text-sm">
                    Average:{" "}
                    <span className="font-semibold">
                      ${expenseSummary.totalExpenses.toFixed(2)}
                    </span>
                  </p>
                </div>
                <span className="mt-2 flex items-center">
                  <TrendingUp className="mr-2 text-green-500" />
                  30%
                </span>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

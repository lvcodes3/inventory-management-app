import React from "react";
import { LucideIcon } from "lucide-react";

interface StatDetail {
  title: string;
  amount: string;
  changePercentage: number;
  iconComponent: LucideIcon;
}

interface StatCardProps {
  title: string;
  primaryIcon: JSX.Element;
  details: StatDetail[];
  dateRange: string;
}

export const StatCard = ({
  title,
  primaryIcon,
  details,
  dateRange,
}: StatCardProps) => {
  const formatPercentage = (value: number) => {
    const signal = value >= 0 ? "+" : "";
    return `${signal}${value.toFixed()}%`;
  };

  const getChangeColor = (value: number) =>
    value >= 0 ? "text-green-500" : "text-red-500";

  return (
    <div className="md:row-span-1 xl:row-span-2 col-span-1 flex flex-col justify-between rounded-2xl shadow-md bg-white">
      {/* HEADER */}
      <div>
        <div className="mb-2 px-5 pt-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
          <span className="text-xs text-gray-400">{dateRange}</span>
        </div>
        <hr />
      </div>

      {/* BODY */}
      <div className="mb-6 px-5 flex justify-around items-center gap-4">
        <div className="p-5 border-[1px] border-sky-300 rounded-full bg-blue-50">
          {primaryIcon}
        </div>
        <div className="flex-1">
          {details.map((detail, index) => (
            <React.Fragment key={index}>
              <div className="my-4 flex justify-between items-center">
                <span className="text-gray-500">{detail.title}</span>

                <span className="font-bold text-gray-800">{detail.amount}</span>

                <div className="flex items-center">
                  <detail.iconComponent
                    className={`w-4 h-4 mr-1 ${getChangeColor(
                      detail.changePercentage
                    )}`}
                  />
                  <span
                    className={`font-medium ${formatPercentage(
                      detail.changePercentage
                    )}`}
                  >
                    {formatPercentage(detail.changePercentage)}
                  </span>
                </div>
              </div>
              {index < details.length - 1 && <hr />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

import { ShoppingBag } from "lucide-react";

import { useGetDashboardMetricsQuery } from "@/state/api";

import { Rating } from "@/app/(components)/Rating";

export const PopularProductsCard = () => {
  // getting data from redux toolkit setup //
  const { data: dashboardMetrics, isLoading } = useGetDashboardMetricsQuery();

  return (
    <div className="pb-16 row-span-3 xl:row-span-6 rounded-2xl shadow-md bg-white">
      {isLoading ? (
        <div className="m-5">Loading...</div>
      ) : (
        <>
          <h3 className="px-7 pt-5 pb-2 text-lg font-semibold">
            Popular Products
          </h3>

          <hr />

          <div className="h-full overflow-auto">
            {dashboardMetrics?.popularProducts.map((product) => (
              <div
                key={product.productId}
                className="px-5 py-7 flex justify-between items-center gap-3 border-b"
              >
                {/* LEFT SIDE */}
                <div className="flex items-center gap-3">
                  <div>image</div>
                  <div className="flex flex-col justify-between gap-1">
                    <div className="font-bold text-gray-700">
                      {product.name}
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="font-bold text-xs text-blue-500">
                        ${product.price}
                      </span>
                      <span className="mx-2">|</span>
                      <Rating rating={product.rating || 0} />
                    </div>
                  </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="flex items-center text-xs">
                  <button className="mr-2 p-2 rounded-full text-blue-600 bg-blue-100">
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                  {Math.round(product.stockQuantity / 1000)}k Sold
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

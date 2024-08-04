// creating API slices and making API requests using Redux Toolkit //

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Product {
  productId: string;
  name: string;
  price: number;
  rating?: number;
  stockQuantity: number;
}

export interface SalesSummary {
  salesSummaryId: string;
  totalValue: number;
  changePercentage?: number;
  date: string;
}

export interface PurchaseSummary {
  purchaseSummaryId: string;
  totalPurchased: number;
  changePercentage?: number;
  date: string;
}

export interface ExpenseSummary {
  expenseSummaryId: string;
  totalExpenses: number;
  date: string;
}

export interface ExpenseByCategorySummary {
  expenseByCategorySummary: string;
  category: string;
  amount: string;
  date: string;
}

export interface DashboardMetrics {
  popularProducts: Product[];
  salesSummary: SalesSummary[];
  purchaseSummary: PurchaseSummary[];
  expenseSummary: ExpenseSummary[];
  expenseByCategorySummary: ExpenseByCategorySummary[];
}

export interface NewProduct {
  productId: string;
  name: string;
  price: number;
  rating?: number;
  stockQuantity: number;
}

export interface User {
  userId: string;
  name: string;
  email: string;
}

// create api slice with Redux Toolkit Query //
export const api = createApi({
  // base query fxn for making requests //
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),

  // reducer path for api slice //
  reducerPath: "api",

  // defining tags for caching and invalidating queries //
  tagTypes: ["DashboardMetrics", "Products", "Users", "Expenses"],

  // defining endpoints for the api slice //
  endpoints: (build) => ({
    // endpoint for fetching dashboard metrics //
    getDashboardMetrics: build.query<DashboardMetrics, void>({
      // url for the api request //
      query: () => "/dashboard",
      // tags to provide for caching the response //
      providesTags: ["DashboardMetrics"],
    }),

    // endpoint for fetching products //
    getProducts: build.query<Product[], string | void>({
      // url w/ optional search params for the api request //
      query: (search) => ({
        url: "/products",
        params: search ? { search } : {},
      }),
      // tags to provide for caching the response //
      providesTags: ["Products"],
    }),

    // endpoint for creating a product //
    createProduct: build.mutation<Product, NewProduct>({
      // url and config for the api request //
      query: (newProduct) => ({
        url: "/products",
        method: "POST",
        body: newProduct,
      }),
      // invalidates cache for the Products tag after mutation //
      invalidatesTags: ["Products"],
    }),

    // endpoint for fetching users //
    getUsers: build.query<User[], void>({
      // url for the api request //
      query: () => "/users",
      // tags to provide for caching the response //
      providesTags: ["Users"],
    }),

    // endpoint for fetching expenses by category //
    getExpensesByCategory: build.query<ExpenseByCategorySummary[], void>({
      // url for the api request //
      query: () => "/expenses",
      // tags to provide for caching the response //
      providesTags: ["Expenses"],
    }),
  }),
});

export const {
  useGetDashboardMetricsQuery,
  useGetProductsQuery,
  useCreateProductMutation,
  useGetUsersQuery,
  useGetExpensesByCategoryQuery,
} = api;

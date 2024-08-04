"use client";

import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { useGetProductsQuery } from "@/state/api";

import { Header } from "@/app/(components)/Header";

// mui x-data-grid columns config //
const columns: GridColDef[] = [
  {
    field: "productId",
    headerName: "ID",
    width: 90,
  },
  {
    field: "name",
    headerName: "Product Name",
    width: 200,
  },
  {
    field: "price",
    headerName: "Product Price",
    width: 110,
    type: "number",
    valueGetter: (value, row) => `$${row.price}`,
  },
  {
    field: "rating",
    headerName: "Product Rating",
    width: 110,
    type: "number",
    valueGetter: (value, row) => (row.rating ? row.rating : "N/A"),
  },
  {
    field: "stockQuantity",
    headerName: "Stock Quantity",
    width: 150,
    type: "number",
  },
];

const Inventory = () => {
  // getting data from redux toolkit setup //
  const { data: products, isError, isLoading } = useGetProductsQuery();

  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }

  if (isError || !products) {
    return (
      <div className="py-4 text-center text-red-500">
        Failed to fetch products
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <Header name="Inventory" />
      <DataGrid
        rows={products}
        columns={columns}
        getRowId={(row) => row.productId}
        checkboxSelection
        className="mt-5 !text-gray-700 border border-gray-200 rounded-lg shadow bg-white"
      />
    </div>
  );
};

export default Inventory;

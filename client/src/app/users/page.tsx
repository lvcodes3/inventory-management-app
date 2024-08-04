"use client";

import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { useGetUsersQuery } from "@/state/api";

import { Header } from "@/app/(components)/Header";

// mui x-data-grid columns config //
const columns: GridColDef[] = [
  {
    field: "userId",
    headerName: "ID",
    width: 90,
  },
  {
    field: "name",
    headerName: "Name",
    width: 200,
  },
  {
    field: "email",
    headerName: "Email",
    width: 200,
  },
];

const Users = () => {
  // getting data from redux toolkit setup //
  const { data: users, isError, isLoading } = useGetUsersQuery();

  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }

  if (isError || !users) {
    return (
      <div className="py-4 text-center text-red-500">Failed to fetch users</div>
    );
  }

  return (
    <div className="flex flex-col">
      <Header name="Users" />
      <DataGrid
        rows={users}
        columns={columns}
        getRowId={(row) => row.userId}
        checkboxSelection
        className="mt-5 !text-gray-700 border border-gray-200 rounded-lg shadow bg-white"
      />
    </div>
  );
};

export default Users;

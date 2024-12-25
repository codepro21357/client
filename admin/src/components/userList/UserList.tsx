"use client";

import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { getAllUsers } from "@/services/users/api";
import { useQuery } from "@tanstack/react-query";
import UserListSkeleton from "./skeleton/UserListSkeleton";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "fullName",
    headerName: "Name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
  },
  { field: "country", headerName: "Country", width: 100 },
];

interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  country: string;
}

const UserList = () => {
  const [users, setUsers] = useState<IUser[] | null>(null);
  const axiosPrivate = useAxiosPrivate();

  const { data, isFetching, error } = useQuery({
    queryFn: () => getAllUsers(axiosPrivate),
    queryKey: ["users"],
  });

  useEffect(() => {
    if (data) {
      const modifiedUsers: IUser[] = [];
      data?.users?.map((user) =>
        modifiedUsers.push({
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          country: user.country,
        })
      );

      setUsers(modifiedUsers);
    }
  }, [data]);

  return (
    <div className="w-full lg:w-[40%] min-h-[300px] p-5 bg-white">
      <h3 className="text-xl font-bold">Top 3 latest users</h3>
      {isFetching && !data && <UserListSkeleton />}
      {error && (
        <p className="text-error">
          Something went wrong, please refresh your browser!
        </p>
      )}
      {users && (
        <div className="w-full mt-5">
          <DataGrid
            rows={users.slice(0, 3)}
            columns={columns}
            checkboxSelection
            sx={{ border: 0 }}
            disableColumnSorting
          />
        </div>
      )}
    </div>
  );
};

export default UserList;

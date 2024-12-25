"use client";

import DataTable from "@/components/dataTable/DataTable";
import Link from "next/link";
import { GridColDef } from "@mui/x-data-grid";
import { FiEdit } from "react-icons/fi";
import { IoTrashOutline } from "react-icons/io5";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { deleteUser, getAllUsers } from "@/services/users/api";
import toast from "react-hot-toast";

const Users = () => {
  const axiosPrivate = useAxiosPrivate();

  const queryClient = useQueryClient();

  const { data, isFetching, error } = useQuery({
    queryFn: () => getAllUsers(axiosPrivate),
    queryKey: ["users"],
  });

  const { mutate: deleteUserMutation, isPending } = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      toast.success("User deleted!");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const columns: GridColDef[] = [
    { field: "_id", headerName: "User ID", width: 170 },
    { field: "firstName", headerName: "First Name", width: 100 },
    { field: "lastName", headerName: "Last Name", width: 100 },
    { field: "phoneNumber", headerName: "Phone", width: 100 },
    { field: "email", headerName: "Email", width: 100 },
    { field: "country", headerName: "Country", width: 100 },
    { field: "createdAt", headerName: "CreatedAt", width: 140 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="h-full flex items-center gap-5">
            <Link
              href={`/dashboard/users/${params.row._id}`}
              className="cursor-pointer"
            >
              <FiEdit size={20} />
            </Link>
            <button
              className="cursor-pointer disabled:text-gray-200 disabled:cursor-not-allowed"
              onClick={() =>
                deleteUserMutation({ axiosPrivate, id: params.row._id })
              }
              disabled={isPending || params.row.role === "admin"}
            >
              <IoTrashOutline size={20} />
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <section className="w-full min-h-[calc(100vh-40px)] bg-gray-400">
      <div className="px-5 py-7 flex flex-col gap-5">
        <h3 className="text-2xl font-bold">All Users</h3>
        {error && (
          <p className="text-error">
            Something went wrong, please refresh your browser!
          </p>
        )}
        {!data && isFetching && (
          <div className="w-full h-[350px] p-5 bg-white animate-pulse"></div>
        )}
        {data && <DataTable rows={data.users} columns={columns} getRowId />}
      </div>
    </section>
  );
};

export default Users;

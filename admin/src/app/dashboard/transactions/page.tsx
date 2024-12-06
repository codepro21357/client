"use client";

import DataTable from "@/components/dataTable/DataTable";
import Link from "next/link";
import { GridColDef } from "@mui/x-data-grid";
import { FiEdit } from "react-icons/fi";
import { IoTrashOutline } from "react-icons/io5";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteTransaction,
  getAllTransactions,
} from "@/services/transactions/api";
import toast from "react-hot-toast";
import { useState } from "react";

const Transactions = () => {
  const [selectedId, setSelectedId] = useState("");
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  const { data, isFetching, error } = useQuery({
    queryFn: () => getAllTransactions(axiosPrivate),
    queryKey: ["transactions"],
  });

  const { mutate: deleteTransactionMutation, isPending } = useMutation({
    mutationFn: deleteTransaction,
    onSuccess: () => {
      toast.success("Transaction deleted!");
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const columns: GridColDef[] = [
    { field: "_id", headerName: "Transaction ID", width: 170 },
    {
      field: "user",
      headerName: "Name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 200,
      valueGetter: (value, row) => row.user.name,
    },
    { field: "amount", headerName: "Amount", width: 100 },
    { field: "total", headerName: "Total", width: 100 },
    { field: "status", headerName: "Status", width: 100 },
    { field: "createdAt", headerName: "CreatedAt", width: 140 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="h-full flex items-center gap-5">
            <Link
              href={`/dashboard/transactions/${params.row._id}`}
              className="cursor-pointer"
            >
              <FiEdit size={20} />
            </Link>
            <button
              className="cursor-pointer disabled:text-gray-200 disabled:cursor-not-allowed"
              onClick={() => {
                setSelectedId(params.row._id);
                deleteTransactionMutation({ axiosPrivate, id: params.row._id });
              }}
              disabled={selectedId === params.row._id && isPending}
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
        <h3 className="text-2xl font-bold">All Transactions</h3>
        {error && (
          <p className="text-error">
            Something went wrong, please refresh your browser!
          </p>
        )}
        {!data && isFetching && (
          <div className="w-full h-[350px] p-5 bg-white animate-pulse"></div>
        )}
        {data && (
          <DataTable rows={data.transactions} columns={columns} getRowId />
        )}
      </div>
    </section>
  );
};

export default Transactions;

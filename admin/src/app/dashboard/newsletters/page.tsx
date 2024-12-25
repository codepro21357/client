"use client";

import DataTable from "@/components/dataTable/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import { IoTrashOutline } from "react-icons/io5";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteNewsletter, getAllNewsletters } from "@/services/newsletter/api";
import toast from "react-hot-toast";

const Newsletter = () => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  const { data, isFetching, error } = useQuery({
    queryFn: () => getAllNewsletters(axiosPrivate),
    queryKey: ["newsletters"],
  });

  const { mutateAsync: deleteNewsletterMutation, isPending } = useMutation({
    mutationFn: deleteNewsletter,
    onSuccess: () => {
      toast.success("One email deleted!");
      queryClient.invalidateQueries({ queryKey: ["newsletters"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const columns: GridColDef[] = [
    { field: "_id", headerName: "ID", width: 170 },
    { field: "email", headerName: "Email", width: 300 },
    { field: "createdAt", headerName: "CreatedAt", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="h-full flex items-center">
            <button
              className="cursor-pointer disabled:text-gray-200 disabled:cursor-not-allowed"
              onClick={() =>
                deleteNewsletterMutation({ axiosPrivate, id: params.row._id })
              }
              disabled={isPending}
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
        <h3 className="text-2xl font-bold">Newsletter Subscribers</h3>
        {error && (
          <p className="text-error">
            Something went wrong, please refresh your browser!
          </p>
        )}
        {!data && isFetching && (
          <div className="w-full h-[350px] p-5 bg-white animate-pulse"></div>
        )}
        {data && (
          <DataTable rows={data.newsletters} columns={columns} getRowId />
        )}
      </div>
    </section>
  );
};

export default Newsletter;

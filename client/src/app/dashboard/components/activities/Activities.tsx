"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "@/hooks/redux";
import { getUserTransactions } from "@/services/transactions/api";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import moment from "moment";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CopyText from "../copyText/CopyText";

const Activities = () => {
  const axiosPrivate = useAxiosPrivate();
  const user = useAppSelector((state) => state.user?.user);

  const { data, isFetching, error } = useQuery({
    queryFn: () => getUserTransactions(axiosPrivate, user?._id),
    queryKey: ["transactions"],
  });

  return (
    <div className="mt-14 px-5 flex flex-col gap-6 rounded">
      <h1 className="text-2xl font-bold text-gray-700">Activities</h1>
      <div className="text-white bg-account-card rounded-lg">
        <Table className="mt-5">
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold text-white">
                Transactions
              </TableHead>
              <TableHead className="font-semibold text-white">Amount</TableHead>
              <TableHead className="font-semibold text-white">Total</TableHead>
              <TableHead className="font-semibold text-white">Status</TableHead>
              <TableHead className="font-semibold text-white">
                Transaction ID
              </TableHead>
              <TableHead className="font-semibold text-white">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.transactions?.map((transaction) => (
              <TableRow key={transaction._id}>
                <TableCell className="capitalize">
                  {transaction?.coinType
                    ? `${transaction.coinType} purchased`
                    : "Withdrawal"}
                </TableCell>
                <TableCell>
                  {transaction?.coinType
                    ? transaction.amount
                    : `$${transaction.amount}`}
                </TableCell>
                <TableCell>${transaction.total}</TableCell>
                <TableCell
                  className={`${
                    transaction.status.toLowerCase() === "pending"
                      ? "text-orange-200"
                      : ""
                  } 
                  ${
                    transaction.status.toLowerCase() === "failed"
                      ? "text-red-500"
                      : ""
                  } ${
                    transaction.status.toLowerCase() === "successful"
                      ? "text-green-300"
                      : ""
                  } font-[500] capitalize`}
                >
                  {transaction.status}
                </TableCell>
                <TableCell>
                  <CopyText text={transaction._id} truncate />
                </TableCell>
                <TableCell>
                  {moment(transaction.createdAt).format("MMMM Do, YYYY h:mm A")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {!isFetching && data?.transactions?.length === 0 && (
          <p className="px-5 py-6 text-center">No transaction</p>
        )}
        {isFetching && (
          <p className="px-5 py-6 text-center">Loading transactions...</p>
        )}
        {error && (
          <p className="px-5 py-6 text-center text-red-600">
            Something went wrong, try again later!
          </p>
        )}
      </div>
    </div>
  );
};

export default Activities;

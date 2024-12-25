"use client";

import Search from "../search/Search";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MdOutlineStarBorder } from "react-icons/md";
import millify from "millify";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { getCoinDetails } from "@/services/crypto/api";
import SkeletonCard from "../skeletonCard/SkeletonCard";
import { useEffect, useState } from "react";
import { ICoinDetails } from "@/types";

interface CryptoListProps {
  setCoinId: (value: string) => void;
  showChart: boolean;
  setShowChart: (value: boolean) => void;
}

const CryptoList = ({
  setCoinId,
  showChart,
  setShowChart,
}: CryptoListProps) => {
  const {
    data: coinDetails,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getCoinDetails(),
    queryKey: ["coin"],
  });
  const [cryptos, setCryptos] = useState<undefined | ICoinDetails[]>();
  const [search, setSearch] = useState("");

  const handleSearch = (value: string) => {
    setSearch(value);
  };

  const handleClick = (id: string) => {
    setCoinId(id);
    setShowChart(true);
  };

  useEffect(() => {
    setCryptos(coinDetails);

    const filteredData = coinDetails?.filter((coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase())
    );

    setCryptos(filteredData);
  }, [coinDetails, search]);

  if (isLoading) {
    return <SkeletonCard />;
  }

  return (
    <div
      className={`${
        showChart ? "hidden sm:block" : ""
      } flex-1 px-5 py-10 shadow-lg bg-white`}
    >
      <Search handleSearch={handleSearch} />
      <div className="min-h-screen sm:min-h-0 sm:h-[300px] mt-2 sm:overflow-y-auto">
        {error ? (
          <p className="mt-5 text-red-500">{error.message}</p>
        ) : (
          <Table className="mt-5">
            <TableHeader>
              <TableRow>
                <TableHead>ASSET</TableHead>
                <TableHead>BID</TableHead>
                <TableHead>ASK</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cryptos?.map((coin) => (
                <TableRow
                  key={coin.uuid}
                  onClick={() => handleClick(coin.uuid)}
                  className="cursor-pointer"
                >
                  <TableCell className="font-medium flex items-center gap-2">
                    <Avatar>
                      <AvatarImage src={coin.iconUrl} alt="Coin image" />
                      <AvatarFallback>
                        <Skeleton className="w-[40px] h-[40px] rounded-full" />
                      </AvatarFallback>
                    </Avatar>
                    {coin.name}
                  </TableCell>
                  <TableCell style={{ color: coin.color }}>
                    {millify(parseFloat(coin.price))}
                  </TableCell>
                  <TableCell>{millify(parseFloat(coin.price))}</TableCell>
                  <TableCell>
                    <MdOutlineStarBorder size={20} className="text-gray-500" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default CryptoList;

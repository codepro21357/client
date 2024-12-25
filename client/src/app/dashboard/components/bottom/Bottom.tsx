"use client";

import React, { useState } from "react";
import CryptoList from "../cryptoList/CryptoList";
import CryptoChart from "../cryptoChart/CryptoChart";
import CryptoDetails from "../cryptoDetails/CryptoDetails";

const Bottom = () => {
  const [coinId, setCoinId] = useState("Qwsogvtv82FCd");
  const [showChart, setShowChart] = useState(false);

  return (
    <div className="w-full flex flex-col gap-5">
      <div className="flex flex-col md:flex-row gap-5">
        <CryptoList
          setCoinId={setCoinId}
          showChart={showChart}
          setShowChart={setShowChart}
        />
        <CryptoChart
          coinId={coinId}
          showChart={showChart}
          setShowChart={setShowChart}
        />
      </div>
      <CryptoDetails showChart={showChart} />
    </div>
  );
};

export default Bottom;

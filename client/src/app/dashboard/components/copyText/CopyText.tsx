"use client";
import React, { useState } from "react";
import { TableCell } from "@/components/ui/table";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { AiFillCopy } from "react-icons/ai";
import { IoMdCheckmark } from "react-icons/io";

interface CopyTextProps {
  text: string;
  truncate?: boolean;
}

const CopyText = ({ text, truncate }: CopyTextProps) => {
  const [copied, setCopied] = useState(false);

  return (
    <div className="flex gap-2">
      <span className={`${truncate ? "truncate" : "break-words"} w-[120px]`}>
        {text}
      </span>
      <CopyToClipboard text={text} onCopy={() => setCopied(true)}>
        <button type="button" className="cursor-pointer">
          {copied ? <IoMdCheckmark size={20} /> : <AiFillCopy size={20} />}
        </button>
      </CopyToClipboard>
    </div>
  );
};

export default CopyText;

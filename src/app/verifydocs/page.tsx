"use client";

import React, { useState } from "react";
import { contract } from "../client";
import { useReadContract } from "thirdweb/react";
import style from "../../styles/input.module.css";

const Page = () => {
  const [hash, setHash] = useState<string>("");
  const [fetch, setFetch] = useState<boolean>(false);

  const formatDate = (timestamp: bigint | undefined) => {
    const time = Number(timestamp) * 1000; // Convert seconds to milliseconds
    return new Date(time).toLocaleString();
  };

  // ✅ Move useReadContract to the top level
  const { data, isPending } = useReadContract({
    contract,
    method:
      "function verifyDocument(string _contentHash) view returns ((address owner, string contentHash, uint256 timestamp, bool verified, string seal, uint256 expiration, string title, string description, string tags))",
    params: [hash],
  });

  return (
    <div>
      <h1 style={{ color: "white" }}>Verify Documents</h1>
      <input
        className={style.form__input}
        placeholder="Enter the content Hash to verify"
        onChange={(e) => setHash(e.target.value)}
      />
      <button className={style.btn} onClick={() => setFetch(!fetch)}>
        Submit
      </button>

      {data && (
        <div style={{ color: "white" }}>
          <p>
            <strong>Title:</strong> {data?.title}
          </p>
          <p>
            <strong>Description:</strong> {data?.description}
          </p>
          <h2>{data?.verified ? "Verified" : "Not Verified"}</h2>
          <p>
            <strong>Valid Till:</strong> {formatDate(data?.expiration)}
          </p>
          <p>
            <strong>Content Hash:</strong> {data?.contentHash}
          </p>
        </div>
      )}
    </div>
  );
};

export default Page;

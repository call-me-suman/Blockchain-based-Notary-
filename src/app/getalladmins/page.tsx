"use client";

import React from "react";

import { useReadContract } from "thirdweb/react";
import { contract } from "../client";
const Page = () => {
  const { data, isPending } = useReadContract({
    contract,
    method: "function getAllAdmins() view returns (address[])",
    params: [],
  });
  return (
    <div>
      {isPending ? <p>Wait</p> : <></>}
      {data?.map((e, index) => (
        <li key={index}>{e}</li>
      ))}
    </div>
  );
};

export default Page;

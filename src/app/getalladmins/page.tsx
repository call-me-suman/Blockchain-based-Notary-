"use client";

import React from "react";
import Spinner from "../../components/Spinner";

import { useReadContract } from "thirdweb/react";
import { contract } from "../client";
const Page = () => {
  const { data, isPending } = useReadContract({
    contract,
    method: "function getAllAdmins() view returns (address[])",
    params: [],
  });
  return (
    <div style={{ color: "white" }}>
      <h1>Get All Admins</h1>
      {isPending ? <Spinner /> : <></>}
      {data?.map((e, index) => (
        <li key={index}>{e}</li>
      ))}
    </div>
  );
};

export default Page;

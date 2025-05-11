"use client";

import React, { useState } from "react";
import { contract } from "../client";
import { prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";
import style from "../../styles/input.module.css";
import Spinner from "../../components/Spinner";
const Page = () => {
  const { mutate: sendTransaction, isPending } = useSendTransaction();
  const [hash, sethash] = useState("");

  const handleonclick = () => {
    const transaction = prepareContractCall({
      contract,
      method: "function revokeDocument(string _contentHash)",
      params: [hash],
    });
    sendTransaction(transaction);
  };
  return (
    <div>
      <div>
        <h1 style={{ color: "white" }}> Revoke Document</h1>
        {isPending ? (
          <p>
            <Spinner />
          </p>
        ) : (
          <p>done</p>
        )}
        <input
          className={style.form__input}
          placeholder="Enter the hash"
          onChange={(e) => {
            sethash(e.target.value);
          }}
        />
        <button className={style.btn} onClick={handleonclick}>
          Revoke The document
        </button>
      </div>
    </div>
  );
};

export default Page;

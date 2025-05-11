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
  const [seal, setseal] = useState("");
  const [loading, setloading] = useState(false);

  const handleonclick = async () => {
    if (!hash || !seal) {
      alert("Please enter both hash and seal");
      return;
    }
    try {
      setloading(true); // Start loading state

      const transaction = prepareContractCall({
        contract,
        method: "function certifyDocument(string _contentHash, string _seal)",
        params: [hash, seal],
      });

      await sendTransaction(transaction);
    } catch (error) {
      console.error("Transaction failed:", error);
      alert("Transaction failed!");
    } finally {
      setloading(false); // Stop loading state
      alert(
        "Transaction initiated successfully! Wait Until Prompted to Approve"
      );
    }
  };

  return (
    <div>
      <div>
        <h1>Certify Documents</h1>
        {isPending ? (
          <p>
            <Spinner />
          </p>
        ) : (
          <></>
        )}
        <input
          className={style.form__input}
          onChange={(e) => sethash(e.target.value)}
          placeholder="Enter the hash"
        />
        <input
          className={style.form__input}
          onChange={(e) => setseal(e.target.value)}
          placeholder="Enter the seal"
        />

        <button
          onClick={handleonclick}
          disabled={loading || isPending}
          className={style.btn}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Page;

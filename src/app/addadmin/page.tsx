"use client";
import React, { useEffect, useState } from "react";
import { prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";
import { contract } from "../client";
import style from "../../styles/input.module.css";
import Spinner from "../../components/Spinner";

const Page = () => {
  const { mutate: sendTransaction, isPending } = useSendTransaction();
  const [address, setAddress] = useState<string>("");
  const [clientready, setclientready] = useState(false);
  useEffect(() => {
    setclientready(true);
  }, []);

  const handleAddAdmin = async () => {
    if (!address || !/^0x[a-fA-F0-9]{40}$/.test(address)) {
      alert("Please enter a valid Ethereum address.");
      return;
    }

    try {
      const transaction = prepareContractCall({
        contract,
        method: "function addAdmin(address _admin)",
        params: [address as `0x${string}`],
      });

      const tx = await sendTransaction(transaction);
      console.log("Transaction sent:", tx);
      alert("Admin added successfully!");
    } catch (error) {
      console.error("Error adding admin:", error);
      alert("Transaction failed!");
    }
  };
  if (!clientready) return null; // Prevents SSR-client mismatch

  return (
    <div>
      <h1>Add Admin</h1>
      {isPending ? (
        <p>
          <Spinner />
        </p>
      ) : (
        <></>
      )}
      <div className={style.form}>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter admin address"
          className={style.form__input}
        />
      </div>

      <button
        onClick={handleAddAdmin}
        disabled={isPending}
        className={style.btn}
      >
        {isPending ? "Adding..." : "Add Admin"}
      </button>
    </div>
  );
};

export default Page;

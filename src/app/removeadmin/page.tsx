"use client";

import React, { useState } from "react";
import { prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";
import { contract } from "../client";
import style from "../../styles/input.module.css";
import Spinner from "../../components/Spinner";
const Page = () => {
  const { mutate: sendTransaction, isPending } = useSendTransaction();
  const [address, setAddress] = useState<string>("");
  const handleonclick = async () => {
    if (!address || !/^0x[a-fA-F0-9]{40}$/.test(address)) {
      alert("Please enter a valid Ethereum address.");
      return;
    }
    const transaction = prepareContractCall({
      contract,
      method: "function removeAdmin(address _admin)",
      params: [address as `0x${string}`],
    });
    await sendTransaction(transaction);
  };
  return (
    <div>
      <div>
        <h1 style={{ color: "white" }}> Remove Admin </h1>
        {isPending ? (
          <p>
            <Spinner />
          </p>
        ) : (
          <></>
        )}
        <input
          className={style.form__input}
          placeholder="Enter the address"
          onChange={(e) => setAddress(e.target.value)}
        />

        <button className={style.btn} onClick={handleonclick}>
          Remove Admin
        </button>
      </div>
    </div>
  );
};

export default Page;

// "use client";
// import React, { useState } from "react";
// import { prepareContractCall } from "thirdweb";
// import { useSendTransaction } from "thirdweb/react";
// import { contract } from "../client";

// const Page = () => {
//   const { mutate: sendTransaction, isPending } = useSendTransaction();
//   const [address, setAddress] = useState<string>("");

//   const handleAddAdmin = async () => {
//     if (!address || !/^0x[a-fA-F0-9]{40}$/.test(address)) {
//       alert("Please enter a valid Ethereum address.");
//       return;
//     }

//     try {
//       const transaction = prepareContractCall({
//         contract,
//         method: "function addAdmin(address _admin)",
//         params: [address as `0x${string}`],
//       });

//       const tx = await sendTransaction(transaction);
//       console.log("Transaction sent:", tx);
//       alert("Admin added successfully!");
//     } catch (error) {
//       console.error("Error adding admin:", error);
//       alert("Transaction failed!");
//     }
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         value={address}
//         onChange={(e) => setAddress(e.target.value)}
//         placeholder="Enter admin address"
//         className="border p-2 rounded"
//       />
//       <button
//         onClick={handleAddAdmin}
//         disabled={isPending}
//         className="ml-2 bg-blue-500 text-white p-2 rounded"
//       >
//         {isPending ? "Adding..." : "Add Admin"}
//       </button>
//     </div>
//   );
// };

// export default Page;

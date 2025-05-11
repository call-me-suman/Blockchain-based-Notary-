"use client";
import React, { useState } from "react";
import { prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";
import { contract } from "../client";
import { ThirdwebStorage } from "@thirdweb-dev/storage";
import style from "../../styles/input.module.css";
import Spinner from "../../components/Spinner";

const Page = () => {
  const [file, setFile] = useState<File | null>(null);
  const [seal, setSeal] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [timestamp, setTimestamp] = useState(0);
  const [filehash, setFileHash] = useState<string | null>(null);

  const { mutate: sendTransaction, isPending } = useSendTransaction();
  const storage = new ThirdwebStorage({
    clientId: "7ac8fc854915a019f9ff45473df9fbe8",
  });

  // Handle File Upload
  const handleFileUpload = async () => {
    if (!file) {
      alert("Please select a file.");
      return;
    }
    try {
      const ipfsUri = await storage.upload(file);
      const extractedHash = ipfsUri.split("/")[2]; // Extract hash from URL
      setFileHash(extractedHash || null);
      alert("file uploaded");
      console.log("Uploaded File Hash:", extractedHash);
    } catch (error) {
      console.error("File upload failed:", error);
    }
  };

  // const contract = getContract({
  //   client,
  //   chain: defineChain(11155111),
  //   // address: "0x08F77da525A019615Cd68DA677870cC0c33178B4",
  //   address: "0x03933dd1F4406a7d0e8392664449521311b34aD3",
  // });

  // Handle Smart Contract Call
  const onClickB = async () => {
    if (!filehash) {
      alert("Upload the file first!");
      return;
    }

    try {
      const transaction = prepareContractCall({
        contract,
        method:
          "function notarizeDocument(string _contentHash, string _seal, uint256 _expiration, string _title, string _description, string[] _tags)",
        params: [
          filehash,
          seal,
          BigInt(timestamp),
          title,
          description,
          tags.split(","),
        ],
      });

      sendTransaction(transaction);
      alert("Transaction Sent!");
    } catch (error) {
      console.error("Transaction failed:", error);
    }
  };

  return (
    <div className={style.grid}>
      <h2 style={{ color: "white" }}>Notarize Document</h2>
      {isPending ? (
        <>
          <Spinner />
        </>
      ) : (
        <></>
      )}

      {/* File Upload */}
      <div className={style.border}>
        <input
          className={style.form__input}
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <button className={style.btn} onClick={handleFileUpload}>
          Upload File
        </button>
      </div>

      <hr />

      {/* Form Inputs */}
      <input
        className={style.form__input}
        type="text"
        placeholder="Seal"
        value={seal}
        onChange={(e) => setSeal(e.target.value)}
      />
      <input
        className={style.form__input}
        type="date"
        onChange={(e) =>
          setTimestamp(new Date(e.target.value).getTime() / 1000)
        }
      />
      <input
        className={style.form__input}
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className={style.form__input}
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        className={style.form__input}
        type="text"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />

      {/* Submit Button */}
      <button className={style.btn} onClick={onClickB}>
        Submit
      </button>
    </div>
  );
};

export default Page;

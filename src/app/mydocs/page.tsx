"use client";

import React, { useState, useEffect } from "react";
import { readContract } from "thirdweb";
import { contract } from "../client";
import { useActiveAccount } from "thirdweb/react";

import style from "../../styles/table.module.css";

interface Document {
  owner: string;
  contentHash: string;
  timestamp: bigint;
  verified: boolean;
  seal: string;
  expiration: bigint;
  title: string;
  description: string;
  tags: string;
}

const Page = () => {
  const account = useActiveAccount();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDocuments = async () => {
      if (account) {
        try {
          const data = await readContract({
            contract,
            method:
              "function getDocumentsBasedOnUser(address _user) view returns ((address owner, string contentHash, uint256 timestamp, bool verified, string seal, uint256 expiration, string title, string description, string tags)[])",
            params: [account?.address as `0x${string}`],
          });
          // Convert readonly array to mutable array
          setDocuments([...data.map((doc) => ({ ...doc }))]);
        } catch (error) {
          console.error("Error fetching documents:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchDocuments();
  }, [account]);
  const formatDate = (timestamp: bigint | undefined) => {
    const time = Number(timestamp) * 1000; // Convert seconds to milliseconds
    return new Date(time).toLocaleString();
  };

  return (
    <div>
      <h1 className={style.header} style={{ color: "white" }}>
        My Documents
      </h1>
      {loading ? (
        <p>Loading documents...</p>
      ) : (
        <table border={2} className={style.container}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Owner</th>
              <th>Content Hash</th>
              <th>Timestamp</th>
              <th>Verified</th>
              <th>Seal</th>
              <th>Expiration</th>
              <th>Tags</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc, index) => (
              <tr key={index}>
                <td>{doc.title}</td>
                <td>{doc.description}</td>
                <td>{doc.owner}</td>
                <td>{doc.contentHash}</td>
                <td>{formatDate(doc.timestamp)}</td>
                <td>{doc.verified ? "✅" : "❌"}</td>
                <td>{doc.seal}</td>
                <td>{formatDate(doc.expiration)}</td>
                <td>{doc.tags}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Page;

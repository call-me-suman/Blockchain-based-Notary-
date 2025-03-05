"use client";

import React, { useState, useEffect } from "react";
import { readContract } from "thirdweb";
import { contract } from "../client";
import style from "../../styles/table.module.css";
// Define TypeScript type for document structure
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

const Page: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const data = await readContract({
          contract,
          method:
            "function getAllDocuments() view returns ((address owner, string contentHash, uint256 timestamp, bool verified, string seal, uint256 expiration, string title, string description, string tags)[])",
          params: [],
        });

        // Convert readonly array to mutable array
        setDocuments([...data.map((doc) => ({ ...doc }))]);
      } catch (error) {
        console.error("Error fetching documents:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);
  const formatDate = (timestamp: bigint | undefined) => {
    const time = Number(timestamp) * 1000; // Convert seconds to milliseconds
    return new Date(time).toLocaleString();
  };
  return (
    <div>
      <h1 className={style.header}>All Documents</h1>
      {loading ? (
        <p>Loading documents...</p>
      ) : (
        <table className={style.container} border={2}>
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
                <td>{doc.expiration.toString()}</td>
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

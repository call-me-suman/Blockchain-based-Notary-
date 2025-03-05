"use client";
import Link from "next/link";
import { useState } from "react";
import { useActiveAccount, useReadContract } from "thirdweb/react";
import { contract } from "./client";
import style from "../styles/input.module.css";

const Page = () => {
  const [role, setRole] = useState("user"); // 'user', 'admin', 'owner'
  const account = useActiveAccount();
  const { data } = useReadContract({
    contract,
    method: "function getAllAdmins() view returns (address[])",
    params: [],
  });

  function checkAdmin() {
    return account?.address && data?.includes(account.address);
  }

  function checkOwner() {
    return account?.address === "0xFC1c1F1C593bcB75FaB5F11A0BF12655E5cF3A06";
  }

  function handleRoleSwitch() {
    if (role === "user" && checkAdmin()) {
      setRole("admin");
    } else if (role === "admin" && checkOwner()) {
      setRole("owner");
    } else {
      setRole("user");
    }
  }

  return (
    <div>
      <h1>
        Blockchain Based Notary System&nbsp;
        <span className={style.textt}>{role}</span>
      </h1>

      {/* Navigation Buttons */}
      <div>
        <Link href="/mydocs">
          <button className={style.btn}>My Documents</button>
        </Link>
        <Link href="/verifydocs">
          <button className={style.btn}>Verify Documents</button>
        </Link>
        <Link href="/notarizeDocs">
          <button className={style.btn}>Notarize Document</button>
        </Link>

        {(role === "admin" || role === "owner") && (
          <>
            <Link href="/getAllDocs">
              <button className={style.btn}>Get All Documents</button>
            </Link>
            <Link href="/certifydocs">
              <button className={style.btn}>Certify Documents</button>
            </Link>
            <Link href="/revokedocs">
              <button className={style.btn}>Revoke Documents</button>
            </Link>
          </>
        )}

        {role === "owner" && (
          <>
            <Link href="/addadmin">
              <button className={style.btn}>Add Admin</button>
            </Link>
            <Link href="/removeadmin">
              <button className={style.btn}>Remove Admin</button>
            </Link>
          </>
        )}
      </div>

      {/* Role Switch Button */}
      <div>
        <button className={style.form__input} onClick={handleRoleSwitch}>
          Switch Role (Current: {role})
        </button>
      </div>
    </div>
  );
};

export default Page;

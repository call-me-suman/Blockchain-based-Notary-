"use client";
import Link from "next/link";
import { useState } from "react";
import { useActiveAccount, useReadContract } from "thirdweb/react";
import { contract } from "./client";
import style from "../styles/input.module.css";
import InteractiveButton from "@/components/InteractiveButton";

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
      <div className={style.mainbox}>
        <div>
          <InteractiveButton>
            {" "}
            <Link href="/mydocs" prefetch={true}>
              <button className={style.btn}>My Documents</button>
            </Link>
          </InteractiveButton>
          <InteractiveButton>
            {" "}
            <Link href="/verifydocs" prefetch={true}>
              <button className={style.btn}>Verify Documents</button>
            </Link>
          </InteractiveButton>
          <InteractiveButton>
            {" "}
            <Link href="/notarizeDocs" prefetch={true}>
              <button className={style.btn}>Notarize Document</button>
            </Link>
          </InteractiveButton>
        </div>
        <div>
          {(role === "admin" || role === "owner") && (
            <>
              <InteractiveButton>
                {" "}
                <Link href="/getAllDocs" prefetch={true}>
                  <button className={style.btn}>Get All Documents</button>
                </Link>
              </InteractiveButton>
              <InteractiveButton>
                {" "}
                <Link href="/certifydocs" prefetch={true}>
                  <button className={style.btn}>Certify Documents</button>
                </Link>
              </InteractiveButton>
              <InteractiveButton>
                {" "}
                <Link href="/revokedocs" prefetch={true}>
                  <button className={style.btn}>Revoke Documents</button>
                </Link>
              </InteractiveButton>
            </>
          )}
        </div>
        <div>
          {role === "owner" && (
            <>
              <InteractiveButton>
                <Link href="/addadmin" prefetch={true}>
                  <button className={style.btn}>Add Admin</button>
                </Link>
              </InteractiveButton>
              <InteractiveButton>
                <Link href="/removeadmin" prefetch={true}>
                  <button className={style.btn}>Remove Admin</button>
                </Link>
              </InteractiveButton>
            </>
          )}
        </div>
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

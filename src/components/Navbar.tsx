"use client";
import { client } from "../app/client";
import { ConnectButton, lightTheme, useActiveAccount } from "thirdweb/react";

const Navbar = () => {
  const account = useActiveAccount();

  return (
    <div className="flex items-center justify-between p-4 bg-gray-100">
      {account && (
        <p className="rounded-md px-3 py-2 text-sm font-medium text-slate-700"></p>
      )}
      <ConnectButton client={client} />
    </div>
  );
};

export default Navbar;

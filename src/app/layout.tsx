"use client";

import Navbar from "../components/Navbar";
import Landing from "../components/Landing";
import Features from "../components/Features";
import Howitworks from "../components/Howitworks";
import Footer from "../components/Footer";
import { useActiveAccount } from "thirdweb/react";
import { ThirdwebProvider } from "thirdweb/react";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ background: "black", width: "90%", margin: "0 auto" }}>
        <ThirdwebProvider>
          <RootLayoutContent>{children}</RootLayoutContent>
        </ThirdwebProvider>
      </body>
    </html>
  );
}

function RootLayoutContent({ children }: { children: React.ReactNode }) {
  const account = useActiveAccount();

  return (
    <>
      {account ? (
        <>
          <Navbar />
          {children}
        </>
      ) : (
        <>
          <Landing />
          <Features />
          <Howitworks />
          <Footer />
        </>
      )}
    </>
  );
}

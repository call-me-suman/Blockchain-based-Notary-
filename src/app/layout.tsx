import Navbar from "../components/Navbar";
import { createThirdwebClient, getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";
import { ThirdwebProvider } from "thirdweb/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const client = createThirdwebClient({
    clientId: "254ea8fb79a1b7a4f017ffe3d820edef",
  });
  const contract = getContract({
    client,
    chain: defineChain(11155111),
    address: "0x08F77da525A019615Cd68DA677870cC0c33178B4",
  });
  console.log(client, contract);
  return (
    <html lang="en">
      <body>
        <ThirdwebProvider>
          <Navbar />
          {children}
        </ThirdwebProvider>
      </body>
    </html>
  );
}

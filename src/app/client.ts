import { createThirdwebClient, defineChain, getContract } from "thirdweb";

// Replace this with your client ID string
// refer to https://portal.thirdweb.com/typescript/v5/client on how to get a client ID
// const clientId = "254ea8fb79a1b7a4f017ffe3d820edef";  THE OLD ID
const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
if (!clientId) {
  throw new Error("No client ID provided");
}

export const client = createThirdwebClient({
  clientId: clientId,
});

export const contract = getContract({
  client,
  chain: defineChain(11155111),
  address: process.env.NEXT_PUBLIC_ADDRESS as string,
});

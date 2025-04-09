import "dotenv/config";
import { Connection, Keypair, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { mintTo } from "@solana/spl-token";
import { getExplorerLink } from "@solana-developers/helpers";

let privateKey = process.env["PrK"];
if (privateKey === undefined) {
  console.log("Add private key to .env");
  process.exit(1);
}

const asArray = Uint8Array.from(JSON.parse(privateKey));
const sender = Keypair.fromSecretKey(asArray);

const connection = new Connection(clusterApiUrl("devnet"));

// Our token has two decimal places
const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10, 2);

const tokenMintAccount = new PublicKey(
  "EhbdZXLoyJsFbKLb1UimL2UesNd9xiJ8ch9erqbFB7zT"
);

const recipientAssociatedTokenAccount = new PublicKey(
  "14RXdkKVam9QRzBYxUvnb8HAHqZogqRcGGrzYcL3i6vS"
);

const transactionSignature = await mintTo(
  connection,
  sender,
  tokenMintAccount,
  recipientAssociatedTokenAccount,
  sender,
  10 * MINOR_UNITS_PER_MAJOR_UNITS
);

const link = getExplorerLink("transaction", transactionSignature, "devnet");

console.log("✅ Success!");
console.log(`Mint Token Transaction: ${link}`);

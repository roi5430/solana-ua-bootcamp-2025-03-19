import "dotenv/config";
import { getExplorerLink } from "@solana-developers/helpers";
import { clusterApiUrl, Connection, Keypair } from "@solana/web3.js";
import { createMint } from "@solana/spl-token";

let privateKey = process.env["PrK"];
if (privateKey === undefined) {
  console.log("Add private key to .env");
  process.exit(1);
}

const asArray = Uint8Array.from(JSON.parse(privateKey));
const sender = Keypair.fromSecretKey(asArray);

const connection = new Connection(clusterApiUrl("devnet"));

console.log(`public key ${sender.publicKey.toBase58()}`);

const tokenMint = await createMint(
  connection,
  sender,
  sender.publicKey,
  null,
  2
);

const link = getExplorerLink("address", tokenMint.toString(), "devnet");

console.log(`token mint ${link}`);
// EhbdZXLoyJsFbKLb1UimL2UesNd9xiJ8ch9erqbFB7zT

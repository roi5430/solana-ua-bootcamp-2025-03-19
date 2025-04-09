import "dotenv/config";
import { getExplorerLink } from "@solana-developers/helpers";
import { clusterApiUrl, Connection, Keypair, PublicKey } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token";

let privateKey = process.env["PrK"];
if (privateKey === undefined) {
  console.log("Add private key to .env");
  process.exit(1);
}

const asArray = Uint8Array.from(JSON.parse(privateKey));
const sender = Keypair.fromSecretKey(asArray);

const connection = new Connection(clusterApiUrl("devnet"));
console.log(`public key ${sender.publicKey.toBase58()}`);

const tokenMintAccount = new PublicKey(
  "EhbdZXLoyJsFbKLb1UimL2UesNd9xiJ8ch9erqbFB7zT"
);
const recipient = new PublicKey("7zR6M184YzcEAXPCuLbHFcKk55PTVvtuMfiYMZkFbDoX");

const tokenAccount = await getOrCreateAssociatedTokenAccount(
  connection,
  sender,
  tokenMintAccount,
  recipient
);
console.log(`Token Account: ${tokenAccount.address.toBase58()}`);

const link = getExplorerLink(
  "address",
  tokenAccount.address.toBase58(),
  "devnet"
);
console.log(`Created token account: ${link}`);
// 14RXdkKVam9QRzBYxUvnb8HAHqZogqRcGGrzYcL3i6vS

import { Keypair } from "@solana/web3.js";
import "dotenv/config";

const pk = process.env.PrK;

if (!pk) {
  console.log("No pritave key provided");
  process.exit(1);
}

const asBytes = Uint8Array.from(JSON.parse(pk));
const keypair = Keypair.fromSecretKey(asBytes);

console.log("Public key", keypair.publicKey.toBase58());

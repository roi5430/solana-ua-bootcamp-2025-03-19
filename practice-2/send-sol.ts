import {
  Connection,
  PublicKey,
  clusterApiUrl,
  Keypair,
  Transaction,
  SystemProgram,
  TransactionInstruction,
} from "@solana/web3.js";
import "dotenv/config";

const pk = process.env.PrK;
if (!pk) {
  console.log("No pritave key provided");
  process.exit(1);
}

const asBytes = Uint8Array.from(JSON.parse(pk));
const keypair = Keypair.fromSecretKey(asBytes);

const connection = new Connection(clusterApiUrl("devnet"));

const rec = new PublicKey("DXHhuce5v2LWuv693BCsE1YLfHDtwuhTor1D3qqy1CPn");
const transaction = new Transaction();

const sendSolIn = SystemProgram.transfer({
  fromPubkey: keypair.publicKey,
  toPubkey: rec,
  lamports: 10_000_000,
});

transaction.add(sendSolIn);
const signature = await connection.sendTransaction(transaction, [keypair]);
console.log(`✅ Transaction confirmed, signature: ${signature}!`);

const memoProgram = new PublicKey(
  "MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr"
);

const memoText = "it`s your day, lukky";

const addMemoInstruction = new TransactionInstruction({
  keys: [{ pubkey: keypair.publicKey, isSigner: true, isWritable: true }],
  data: Buffer.from(memoText, "utf-8"),
  programId: memoProgram,
});

transaction.add(addMemoInstruction);
console.log(`memo is: ${memoText}`);

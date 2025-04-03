import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  clusterApiUrl,
} from "@solana/web3.js";

import { airdropIfRequired } from "@solana-developers/helpers";
import "dotenv/config";

const connection = new Connection(clusterApiUrl("devnet"));
console.log(`Connected to devnet`);

const publickey = new PublicKey("7zR6M184YzcEAXPCuLbHFcKk55PTVvtuMfiYMZkFbDoX");

// First way to airdrop

const airdrop1 = await airdropIfRequired(
  connection,
  publickey,
  1 * LAMPORTS_PER_SOL,
  0.5 * LAMPORTS_PER_SOL
);
console.log(airdrop1);

// Second way to airdrop

// await connection.requestAirdrop(publickey, 1 * LAMPORTS_PER_SOL);

const balanceInSol =
  (await connection.getBalance(publickey)) / LAMPORTS_PER_SOL;

console.log(
  `💰 The balance for the wallet at address ${publickey} is: ${balanceInSol}`
);

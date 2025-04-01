import { Keypair } from "@solana/web3.js";

const prefix = "ksy"; // Ksyusha
let i = 0;

const findKeypairWithPrefix = (): void => {
  while (true) {
    i++;
    const keypair = Keypair.generate();
    const publicKey = keypair.publicKey.toBase58();

    if (publicKey.startsWith(prefix)) {
      console.log(`Знайдено! Публічний ключ: ${publicKey}`);
      console.log(`Приватний ключ:`, Buffer.from(keypair.secretKey));
      console.log(`Кількість спроб: ${i}`);
      break;
    }

    if (i % 10000 === 0) {
      console.log(`Було ${i}ключів...`);
    }
  }
};

findKeypairWithPrefix();
// ksyRvhRFLdTUKGB9B3auVCvqopP9uiV6ycFbiFT46hW

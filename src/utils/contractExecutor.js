// utils/contractExecutor.js
import { writeContract, waitForTransactionReceipt } from "@wagmi/core";

import { mlmContract } from "../config.js";


export async function executeContract({
  config,
  functionName,
  args = [],
  contract = mlmContract,
  onSuccess = () => {},
  onError = () => {},
}) {
  try {
    const txHash = await writeContract(config, {
      ...contract,
      functionName,
      args,
    });

    const receipt = await waitForTransactionReceipt(config, { hash: txHash });

    console.log("✅ Tx confirmed:", receipt);

    await onSuccess(txHash, receipt); // <-- pass both hash and receipt
    return txHash;
  } catch (error) {
    console.error("❌ Contract execution error:", error);
    onError(error);
    throw error;
  }
}


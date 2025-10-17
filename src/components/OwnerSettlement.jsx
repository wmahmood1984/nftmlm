import { useEffect, useState } from "react";
import { executeContract } from "../utils/contractExecutor";
import { useConfig } from "wagmi";
// import { useAppKitAccount } from "@reown/appkit/react";
import {
  mlmcontractaddress,
  mlmabi,

  web3,
  usdtContract,
} from "../config";
import {  formatEther } from "ethers";

export default function OwnerSettlement() {
  const [nftUsed, setNftUsed] = useState(null);
  const [loading, setLoading] = useState(false);
  const config = useConfig();
//   const { address } = useAppKitAccount();

  // ✅ Fetch nftused array
  useEffect(() => {
    const fetchNFTused = async () => {
      try {
        const contract = new web3.eth.Contract(mlmabi,mlmcontractaddress)
        const nftData = await contract.methods.getNFTused().call();
        console.log("Fetched nftused:", nftData);
        
        if (nftData.length > 0) {
          setNftUsed(nftData[0]); // only first one as per contract logic
 

        }
      } catch (err) {
        console.error("Error fetching nftused:", err);
      }
    };
    fetchNFTused();
  }, []);

  // ✅ Handler for settlement
  const handleOwnerSettlement = async () => {
    if (!nftUsed) {
      alert("No NFT used available for settlement");
      return;
    }

    setLoading(true);
    try {
       await executeContract({
        config,
        functionName: "ownerSettlement",
        args: ["https://example.com/uri.json"], // replace with your actual URI
        onSuccess: (txHash, receipt) => {
          console.log("🎉 Tx Hash:", txHash);
          console.log("🚀 Tx Receipt:", receipt);
          alert("Settlement completed successfully!");
          setLoading(false);
        },
        onError: (err) => {
          console.error("🔥 Error in ownerSettlement:", err);
          alert("Transaction failed");
          setLoading(false);
        },
      });
    } catch (err) {
      console.error("Error in settlement process:", err);
      alert("Transaction failed");
      setLoading(false);
    }
  };



      const handleRegister = async () => {

              await executeContract({
                  config,
                  functionName: "approve",
                  args: [mlmcontractaddress, nftUsed.premium],
                  onSuccess: () => handleOwnerSettlement(),
                  onError: (err) => alert("Transaction failed",err),
                  contract: usdtContract
              });
          // }
  
  
      };

             console.log("nft creat",nftUsed)

  return (
    <div className="p-6 bg-gray-900 text-white rounded-2xl shadow-lg w-full max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Owner Settlement</h2>

      {nftUsed ? (
        <div className="mb-6 text-sm text-gray-300">
          <p><strong>Token ID:</strong> {nftUsed.id?.toString?.() || "N/A"}</p>
          <p><strong>Price:</strong> {formatEther(nftUsed.price) || "N/A"}</p>
          <p><strong>Premium:</strong> {formatEther(nftUsed.premium) || "N/A"}</p>
          <p><strong>Owner:</strong> {nftUsed._owner || "N/A"}</p>
        </div>
      ) : (
        <p className="text-center text-gray-400 mb-6">No NFT used found.</p>
      )}

      <button
        disabled={!nftUsed || loading}
        onClick={handleRegister}
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition disabled:bg-gray-500"
      >
        {loading ? "Processing..." : "Settle Owner Payment"}
      </button>
    </div>
  );
}

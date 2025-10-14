import { useState } from "react";
import pinataSDK from "@pinata/sdk";
import { useDispatch, useSelector } from "react-redux";
import { executeContract } from "../utils/contractExecutor";
import { useConfig } from "wagmi";
import { readName } from "../slices/contractSlice";
import { useAppKitAccount } from "@reown/appkit/react";
import { mlmcontractaddress, usdtContract } from "../config";
import { formatEther, parseEther } from "ethers";

export default function MintModal({ isOpen, onClose }) {
      const { nftused,allowance, status, error } = useSelector((state) => state.contract);
          const { address, isConnected, caipAddress, status: accountStatus } = useAppKitAccount();
    const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const config = useConfig()
   const dispatch = useDispatch()
  // ⚠️ SECURITY: Do NOT expose Pinata keys in frontend production apps!
  // Instead, build a small Express backend that signs requests.
  const pinata = new pinataSDK({
    pinataApiKey: import.meta.env.VITE_PINATA_API_KEY,
    pinataSecretApiKey: import.meta.env.VITE_PINATA_SECRET,
  });


    const handleUpdate = async (uri,add) => {
          await executeContract({
              config,
              functionName: "mint",
              args: [uri,add],
              onSuccess: (txHash, receipt) => {
                  console.log("🎉 Tx Hash:", txHash);
                  console.log("🚀 Tx Receipt:", receipt);
                  dispatch(readName({ address: receipt.from }));
                     setLoading(false);
    onClose();
              },
              onError: (err) => {
                  console.error("🔥 Error in register:", err);
                  alert("Transaction failed");
                  setLoading(false)
                  onClose()
              },
          });
      };

  const handleFileChange = (e) => setFile(e.target.files[0]);

const handleMint = async () => {
  try {
    setLoading(true);

    // -----------------------
    // 1. Upload image to Pinata
    // -----------------------
    const formData = new FormData();
    formData.append("file", file);

    const imgRes = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_PINATA_JWT}`,
      },
      body: formData,
    });

    const imgResult = await imgRes.json();

    if (!imgRes.ok || !imgResult.IpfsHash) {
      throw new Error(
        `Image upload failed: ${imgRes.status} ${JSON.stringify(imgResult)}`
      );
    }

    const imageURI = `https://peach-key-sailfish-125.mypinata.cloud/ipfs/${imgResult.IpfsHash}`;
    console.log("✅ Image uploaded:", imageURI);

    // -----------------------
    // 2. Create metadata JSON
    // -----------------------
    const metadata = {
      name,
      description: `${name} minted from dApp`,
      image: imageURI,
      attributes: [],
    };

    // -----------------------
    // 3. Upload metadata JSON
    // -----------------------
    const metaRes = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_PINATA_JWT}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(metadata),
    });

    const metaResult = await metaRes.json();

    if (!metaRes.ok || !metaResult.IpfsHash) {
      throw new Error(
        `Metadata upload failed: ${metaRes.status} ${JSON.stringify(metaResult)}`
      );
    }

    const metadataURI = `https://peach-key-sailfish-125.mypinata.cloud/ipfs/${metaResult.IpfsHash}`;
    console.log("✅ Metadata uploaded:", metadataURI);

    // -----------------------
    // 4. Send to smart contract
    // -----------------------
    if (!metadataURI) {
      throw new Error("Metadata URI is missing, aborting mint.");
    }

    handleUpdate(metadataURI,address); // call your mint function
    console.log("🚀 Mint request sent with URI:", metadataURI);

 
  } catch (err) {
    console.error("❌ Error uploading to Pinata:", err);
    alert(`Mint failed: ${err.message}`);
    setLoading(false);
  }
};


    const handleRegister = async () => {
      console.log("handle",nftused)
        if (allowance >= (nftused.price+nftused.premium)) {
            handleMint()
        } else {
                const value = Number(formatEther(nftused[0].premium)) + Number(formatEther(nftused[0].price)*0.07)
                      console.log("value", value.toString())
            await executeContract({
                config,
                functionName: "approve",
                args: [mlmcontractaddress, parseEther(value.toString())],
                onSuccess: () => handleMint(),
                onError: (err) => alert("Transaction failed"),
                contract: usdtContract
            });
        }


    };


// console.log("first",import.meta.env.VITE_PINATA_JWT,)

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-96">
        <h2 className="text-lg font-bold mb-4">Mint NFT</h2>

        <input
          type="text"
          placeholder="NFT Name"
          className="w-full border p-2 mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          className="mb-4"
          onChange={handleFileChange}
        />

        <button
          onClick={handleRegister}
          disabled={loading}
          className="bg-blue-600 text-white w-full py-2 rounded"
        >
          {loading ? "Uploading..." : "Mint"}
        </button>
      </div>
    </div>
  );
}

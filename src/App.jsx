import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { init, readName } from "./slices/contractSlice";
import NFTGrid from "./NFTGrid";
import "./App.css"
import ProfileSection from "./ProfileSection";
import {  useAppKitAccount } from "@reown/appkit/react";
import ConnectButton from "./ConnectButton";
// import { useConfig } from "wagmi";
import MintModal from "./components/MintModal";
import AddressHierarchy from "./components/Tree";
import OwnerSettlement from "./components/OwnerSettlement";
import Tree2 from "./components/Tree3";


function App() {
  const dispatch = useDispatch();
  const { nfts, name, NFTMayBeCreated,admin, status, error } = useSelector((state) => state.contract);
  const { address } = useAppKitAccount();
  // const config = useConfig()
  const [isOpen, setIsOpen] = useState(false)


  useEffect(() => {
    // init contract first, then read
    dispatch(init()).then(() => {
      if (address) {
        dispatch(readName({ address }));
      }

    });
  }, [dispatch, address]);

  const handleMint = async () => {
    setIsOpen(true)
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Heading */}


      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-700 border-b-4 border-indigo-300 pb-2">
        Contract Interaction
      </h1>
      <ConnectButton />

      {address && admin && address.toLowerCase() === admin.toLowerCase() && 
      <OwnerSettlement/>
      }

      {/* Contract info */}
      <div className="bg-gray-50 rounded-xl shadow-md p-6 mb-8">
        {status === "loading" && <p className="text-gray-600">Loading...</p>}
        {error && <p className="text-red-600 font-semibold">{error}</p>}
        {name && (
          <p className="text-lg font-medium text-gray-800">
            <span className="font-bold text-indigo-600">Contract Name:</span> {name}
          </p>
        )}
      </div>

      <Tree2/>

      {/* <AddressHierarchy/> */}

      {NFTMayBeCreated && (
        <p className="text-lg font-medium text-gray-800">
          <button

            className={`w-full py-3 rounded-lg font-semibold transition-colors bg-indigo-700 text-white cursor-pointer"`}
            onClick={handleMint}
          >
            Create NFT
          </button>
        </p>
      )}

      <ProfileSection />

      {/* NFT section */}
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">NFT Collection</h2>
        <NFTGrid nfts={nfts} />
      </div>
      <MintModal isOpen={isOpen} onClose={() => setIsOpen(false)}></MintModal>
    </div>

  );
}

export default App;

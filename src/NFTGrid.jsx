import axios from "axios";
import { formatEther, parseEther } from "ethers";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mlmcontractaddress, usdtContract } from "./config";
import { useConfig } from "wagmi";
import { useAppKitAccount } from "@reown/appkit/react";
import { executeContract } from "./utils/contractExecutor";
import { readName } from "./slices/contractSlice";


export const Image = ({ nft, index }) => {
    const config = useConfig()
    const [image, setImage] = useState()
    const [name, setName] = useState()
    const {  nfts  } = useSelector((state) => state.contract);
    const { address } = useAppKitAccount();

    const dispatch = useDispatch()
    useEffect(() => {
        const abc = async () => {
    

            const res = await axios.get(nft.uri)


            if (nft._owner != "0x0000000000000000000000000000000000000000") {
                setImage(res.data.image)
                setName(res.data.name)
            }

        }

        abc()

    }, [])

  
    const handleBuy2 = async (id) => {
        console.log("handle buy",id)
        await executeContract({
            config,
            functionName: "buyNFT",
            args: [id],
            onSuccess: (txHash, receipt) => {
                console.log("🎉 Tx Hash:", txHash);
                console.log("🚀 Tx Receipt:", receipt);
                dispatch(readName({ address: receipt.from }));
            },
            onError: (err) => alert("Transaction failed",err),
        });
    }


    const handleBuy = async (id) => {
        // if (allowance >= (nfts[id].price+nfts[id].premium)) {

        //     handleBuy2(id, address)
        // } else {

            const value = Number(formatEther(nfts[id-1].premium)) + Number(formatEther(nfts[id-1].price)*0.07)
            console.log("value", value.toString())
            await executeContract({
                config,
                functionName: "approve",
                args: [mlmcontractaddress, parseEther(value.toString())],
                onSuccess: () => handleBuy2(id, address),
                onError: (err) => alert("Transaction failed",err),
                contract: usdtContract
            });
//        }


    };



    return (image && name &&

        <div
            key={index}
            className="bg-white shadow-md rounded-xl overflow-hidden flex flex-col hover:shadow-xl transition"
        >
            {/* Image (80% height) */}
            <div className="flex-1">
                <img
                    src={image}
                    alt={name}
                    className="h-full w-full object-cover"
                />
            </div>

            {/* Info (20% height) */}
            <div className="p-3 bg-gray-100 text-sm space-y-1">
                <p>
                    <span className="font-semibold">Name:</span> {name}
                </p>
                <p className="truncate">
                    <span className="font-semibold">Owner:</span> {`${nft._owner.slice(0, 4)}...${nft._owner.slice(-4)}`}
                </p>

                {/* Price + Buy Button */}
                <div className="flex items-center justify-between">
                    <p>
                        <span className="font-semibold">Price:</span> {Number(formatEther(nft.price)*1.07).toFixed(2) } $
                    </p>
                    {address != nft._owner && <button
                        onClick={() => handleBuy(nft.id)}
                        className="bg-blue-600 text-white text-xs px-3 py-1 rounded-lg hover:bg-blue-700 transition"
                    >
                        Buy
                    </button>}
                </div>
            </div>
        </div>


    )
}

const NFTGrid = ({ nfts }) => {

//console.log("nft",nfts)
    return (
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {nfts.map((nft, index) => {
             if(nft._owner!="0x0000000000000000000000000000000000000000"){
                return (
                <Image nft={nft} index={index} key={index} />
            )
             }   

            
            })}
        </div>
    );
};

export default NFTGrid;

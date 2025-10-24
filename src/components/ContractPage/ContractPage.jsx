
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { init, readName } from "../../slices/contractSlice";
import { useAppKitAccount } from "@reown/appkit/react";
import ContractInfo from "../ContractInfo/ContractInfo";
import NFTGrid from "../../NFTGrid";
import { useNavigate } from "react-router-dom";

import Modal from "react-modal";
import ProfileSection from "../../ProfileSection";



import Header from "../Header/Header";
import Footer from "../Footer/Footer";


Modal.setAppElement("#root");

const ContractPage = () => {
    const dispatch = useDispatch();
    const { name, status, error, NFTMayBeCreated, nfts } = useSelector(
        (state) => state.contract
    );
    const { address } = useAppKitAccount();
    const navigate = useNavigate();

    const [isProfileOpen, setIsProfileOpen] = useState(false);

    useEffect(() => {
        dispatch(init());
        if (address) {
            dispatch(readName({ address }));
        }
    }, [dispatch, address]);

    const handleRegister = () => {
        setIsProfileOpen(true);
    };

    return (
        <div>
            <Header onRegister={() => setIsProfileOpen(true)} />
            <div className="bg-[#0a0125] min-h-screen flex flex-col justify-between">




                <main className="flex-1 py-12">
                    <div className="container mx-auto px-6">
                        <button
                            onClick={() => navigate("/")}
                            className="mb-6 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg bckbtnscstm"
                        >
                            ← Back to Home
                        </button>

                        <ContractInfo
                            name={name}
                            status={status}
                            error={error}
                            NFTMayBeCreated={NFTMayBeCreated}
                        />

                        <div className="mt-12">
                            <h2 className="text-3xl font-extrabold mb-6 text-white text-center">
                                NFT Collection
                            </h2>
                            <NFTGrid
                                nfts={nfts}
                                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
                            />
                        </div>
                    </div>


                    <Modal
                        isOpen={isProfileOpen}
                        onRequestClose={() => setIsProfileOpen(false)}
                        className="max-w-3xl mx-auto mt-20 bg-[#120038] rounded-xl p-6 text-white outline-none"
                        overlayClassName="fixed inset-0 bg-black/50 flex justify-center items-start z-50"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold">Profile</h2>
                            <button
                                onClick={() => setIsProfileOpen(false)}
                                className="text-gray-300 hover:text-white font-bold text-xl"
                            >
                                ×
                            </button>
                        </div>
                        <ProfileSection />
                    </Modal>
                </main>

                <Footer />

            </div>
        </div>
    );
};

export default ContractPage;

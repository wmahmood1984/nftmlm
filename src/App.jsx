// src/App.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { init, readName } from "./slices/contractSlice";
import NFTGrid from "./NFTGrid";
import "./App.css";
import ProfileSection from "./ProfileSection";
import { useAppKitAccount } from "@reown/appkit/react";
import ConnectButton from "./ConnectButton";
import MintModal from "./components/MintModal";
import OwnerSettlement from "./components/OwnerSettlement";
import Tree2 from "./components/Tree3";

import "bootstrap/dist/css/bootstrap.min.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";


import { motion } from "framer-motion";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

// 🖼️ Images
import bnr from "./images/bannerimg.png";
import ring from "./images/bannerimgbg.png";
import chked from "./images/checkedal.png";
import logo1 from "./images/coindesk.png";
import logo2 from "./images/entrepreneur.png";
import logo3 from "./images/smashing.png";
import logo4 from "./images/blockchain.png";
import logo5 from "./images/opensea.png";
import logo6 from "./images/wallets.png";
import logo7 from "./images/uploads.png";
import logo8 from "./images/addone.png";
import logo9 from "./images/shoppingcart.png";
import collectionone from "./images/collection-1.png";
import collectiontwo from "./images/collection-2.png";
import collectionthree from "./images/collection-3.png";
import collectionfour from "./images/collection-4.png";
import collectionfive from "./images/collection-5.png";
import collectionsix from "./images/collection-6.png";
import collectionseven from "./images/collection-7.png";
import collectioneight from "./images/collection-8.png";
import collectionnine from "./images/collection-9.png";
import hrt from "./images/whitehrt.png";
import socialone from "./images/twitters.png";
import socialtwo from "./images/instagrams.png";
import socialthree from "./images/discords.png";
import socialfour from "./images/tiktoks.png";
import mail from "./images/paperplanes.png";
import sellerone from "./images/seller-1.png";
import sellertwo from "./images/seller-2.png";
import sellerthree from "./images/seller-3.png";
import sellerfour from "./images/seller-4.png";
import sellerfive from "./images/seller-5.png";
import sellersix from "./images/seller-6.png";
import srchicon from "./images/searchicon.png";
import mainlogo from "./images/mainlogo.png";


import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";


function App() {
  const dispatch = useDispatch();
  const { nfts, name, NFTMayBeCreated, admin, status, error } = useSelector(
    (state) => state.contract
  );
  const { address } = useAppKitAccount();

  const [isOpen, setIsOpen] = useState(false);
const [isProfileOpen, setIsProfileOpen] = useState(false);
const navigate = useNavigate();

  useEffect(() => {
    dispatch(init()).then(() => {
      if (address) {
        dispatch(readName({ address }));
      }
    });
  }, [dispatch, address]);

  const handleMint = () => {
    setIsOpen(true);
  };

  return (
    <div className="">

      <Header onRegister={() => setIsProfileOpen(true)} />
      <section className="hero-section relative overflow-hidden py-20 bg-gradient-to-b from-[#0a0125] via-[#120038] to-[#1a003f]">

        <div className="absolute top-10 left-10 w-8 h-8 bg-gradient-to-b from-purple-400 to-purple-700 rounded-full blur-lg opacity-80 animate-bounce"></div>
        <div className="absolute top-32 right-20 w-6 h-6 bg-gradient-to-b from-purple-400 to-purple-600 rounded-full blur-md opacity-70 animate-pulse"></div>
        <div className="absolute bottom-20 left-1/4 w-10 h-10 bg-gradient-to-b from-purple-500 to-purple-800 rounded-full blur-lg opacity-60 animate-float"></div>
        <div className="absolute bottom-40 right-1/3 w-12 h-12 bg-gradient-to-b from-purple-400 to-purple-700 rounded-full blur-xl opacity-75 animate-float-slow"></div>
        <div className="absolute top-1/3 left-1/2 w-4 h-4 bg-purple-500 rounded-full opacity-40 animate-ping"></div>


        <div className="container relative">
          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            speed={1500}
            loop={true}
            className="hero-swiper"
          >
            {[1, 2].map((slide) => (
              <SwiperSlide key={slide}>
                <div className="relative flex flex-col lg:flex-row items-center justify-center gap-32 slide-content">

                  <motion.div
                    className="max-w-xl text-white"
                    key={slide + "-text"}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    <h2 className="leading-tight text-4xl font-extrabold">
                      Discover, Collect & <br />
                      <span className="txtbtm">
                        Sell Extraordinary NFT’s
                      </span>
                    </h2>
                    <p className="my-4 text-gray-300">
                      There are many variations of passages of Lorem Ipsum
                      available, but the majority have suffered alteration.
                    </p>
                  </motion.div>


                  <motion.div
                    className="relative mt-12 lg:mt-0 sliderimg"
                    key={slide + "-img"}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  >
                    <img
                      src={ring}
                      alt="ring"
                      className="bnrbgring absolute top-0 left-0 w-full h-full opacity-30 z-0"
                    />
                    <img
                      src={bnr}
                      alt="NFT Hero"
                      className="bnrimg relative z-10"
                    />
                  </motion.div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
      <section className="py-6 bglogo">
        <div className="container mx-auto flex flex-wrap justify-center items-center gap-12">
          {[logo1, logo2, logo3, logo4, logo5].map((logo, i) => (
            <div key={i} className="sponsers__logo">
              <img src={logo} alt={`Logo ${i + 1}`} className="h-10" />
            </div>
          ))}
        </div>
      </section>
          
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-700 border-b-4 border-indigo-300 pb-2">
        Contract Interaction
      </h1>
          <main className="w-full relative bg-gradient-to-b from-[#0a0125] via-[#120038] to-[#0a0125] py-12">
  <div className="container mx-auto px-6">
    <div className="bg-[#120038] rounded-xl p-4 mb-8 flex items-center justify-between">
      <div>
        <h2 className="text-xl font-bold text-white">Contract Info</h2>
        <p className="text-gray-300">
          View contract registration and mint options on the Contract page.
        </p>
      </div>
      <div>
        <button
          onClick={() => navigate("/contract")}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg openinfo"
        >
          Open Contract Info
        </button>
      </div>
    </div>

    <MintModal isOpen={isOpen} onClose={() => setIsOpen(false)} />

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
  </div>
</main>

      <ConnectButton />


      {address && admin && address.toLowerCase() === admin.toLowerCase() && (
        <OwnerSettlement />
      )}


      <div className="bg-gray-50 rounded-xl shadow-md p-6 mb-8">
        {status === "loading" && (
          <p className="text-gray-600">Loading...</p>
        )}
        {error && <p className="text-red-600 font-semibold">{error}</p>}
        {name && (
          <p className="text-lg font-medium text-gray-800">
            <span className="font-bold text-indigo-600">Contract Name:</span>{" "}
            {name}
          </p>
        )}
      </div>


      <Tree2 />


      {NFTMayBeCreated && (
        <div className="text-center mb-6">
          <button
            onClick={handleMint}
            className="w-full py-3 rounded-lg font-semibold transition-colors bg-indigo-700 text-white hover:bg-indigo-800"
          >
            Create NFT
          </button>
        </div>
      )}


      <ProfileSection />


      <div>
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          NFT Collection
        </h2>
        <NFTGrid nfts={nfts} />
      </div>


      <MintModal isOpen={isOpen} onClose={() => setIsOpen(false)} />


      <section className="bg-[#0a0125] py-0 text-white">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-10 mb-10">
            <h2 className="text-3xl font-extrabold text-white">Top Sellers</h2>
            <div className="relative">
              <select className="bg-[#120038] text-white px-4 py-2 pr-10 rounded-lg appearance-none cursor-pointer selectdays">
                <option>1 Day</option>
                <option>7 Days</option>
                <option>30 Days</option>
              </select>
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-white">
                ▼
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 text-center">
            {[
              { rank: "01", name: "Minisa Lio", eth: "207.5", img: sellerone },
              { rank: "02", name: "James Tom", eth: "250.5", img: sellertwo },
              { rank: "03", name: "Anderson", eth: "350.5", img: sellerthree },
              { rank: "04", name: "Mark Wood", eth: "150.5", img: sellerfour },
              { rank: "05", name: "James Wp", eth: "230.5", img: sellerfive },
              { rank: "06", name: "Tino Mory", eth: "600.5", img: sellersix },
            ].map((seller, i) => (
              <div key={i} className="bg-[#120038] rounded-xl p-4 shadow-lg hover:shadow-purple-500/40 transition">
                <p className="top-sellers-number text-gray-400 mb-2">{seller.rank}</p>
                <div className="relative w-16 h-16 mx-auto mb-3">
                  <img
                    src={seller.img}
                    alt={seller.name}
                    className="w-16 h-16 rounded-full border-2 border-purple-500"
                  />
                  <img
                    src={chked}
                    alt="checked"
                    className="absolute bottom-0 right-0 w-5 h-5 chkbgicon"
                  />
                </div>
                <h3 className="font-bold">{seller.name}</h3>
                <p className="text-sm text-gray-400">{seller.eth} ETH</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-[#0a0125] py-16 text-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-extrabold mb-10 text-center hdingall">Popular Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Digital Assets", likes: 403, images: [collectionone, collectiontwo, collectionthree] },
              { title: "Virtual World", likes: 420, images: [collectionfour, collectionfive, collectionsix] },
              { title: "Tranding Pattern", likes: 203, images: [collectionseven, collectioneight, collectionnine] },
            ].map((collection, i) => (
              <div key={i} className="bg-[#120038] rounded-xl shadow-lg hover:shadow-purple-500/40 transition overflow-hidden">
                <div className="grid grid-cols-2 gap-2 p-4 collectioncstms">
                  <img src={collection.images[0]} alt={`${collection.title} 1`} className="col-span-1 row-span-2 rounded-lg h-48 w-full object-cover" />
                  <img src={collection.images[1]} alt={`${collection.title} 2`} className="rounded-lg h-24 w-full object-cover" />
                  <img src={collection.images[2]} alt={`${collection.title} 3`} className="rounded-lg h-24 w-full object-cover" />
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold">{collection.title}</h3>
                    <p className="text-sm text-gray-400">120 Collection</p>
                  </div>
                  <div className="flex items-center text-purple-400 font-bold bgnubrs">
                    <img src={hrt} alt="" className="hrt" /> {collection.likes}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-[#0a0125] py-16 text-white relative">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-extrabold mb-10 hdingall">Clients Feedback</h2>
          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop={true}
            className="testimonial-swiper"
          >
            {[
              { text: "Ipsum dolor sit amet, consectetur adipisicing elit sed do eiusmod tempor incididunt labore etuy dolore magna aduras minim veniam.", name: "Robert Mugaber", role: "Founder", img: "https://i.pravatar.cc/80?img=20" },
              { text: "Quis nostrud exercitation ullamco enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", name: "Sarah Lee", role: "Designer", img: "https://i.pravatar.cc/80?img=21" },
            ].map((t, i) => (
              <SwiperSlide key={i}>
                <div className="max-w-2xl mx-auto">
                  <div className="flex justify-center mb-6">
                    <img src={t.img} alt={t.name} className="w-16 h-16 rounded-full border-2 border-purple-500" />
                  </div>
                  <p className="text-gray-300 mb-6">"{t.text}"</p>
                  <h3 className="font-bold">{t.name}</h3>
                  <p className="text-sm text-gray-400">{t.role}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
      <section className="bg-[#1a1a2e] py-16">
        <div className="container mx-auto px-6">
          <div className="bg-[#2c2c3e] rounded-xl text-center py-12 px-6 shadow-lg">
            <span className="text-4xl mb-4 inline-block">🎉</span>
            <h2 className="text-3xl font-extrabold text-white mb-4">Join Our Community</h2>
            <p className="text-gray-400 mb-6">Lorem ipsum dolor sit amet consectetur adipisicing elit Quis non fugit</p>
            <a href="#" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-indigo-600 hover:bg-purple-600 text-white font-semibold transition joincstm">
              JOIN DISCORD <img src={socialthree} alt="" className="joinicons" />
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default App;

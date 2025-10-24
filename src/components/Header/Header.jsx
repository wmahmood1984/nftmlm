import React, { useState } from "react";
import ConnectButton from "../../ConnectButton";
import { useAppKitAccount } from "@reown/appkit/react";
import srchicon from "../../images/searchicon.png";
import mainlogo from "../../images/mainlogo.png";

const Header = ({ onRegister }) => {
  const { address } = useAppKitAccount();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-container flex items-center justify-between px-4 py-3 md:py-4">
     
        <div className="logo">
          <img src={mainlogo} alt="logo" className="h-8 w-auto" />
        </div>

        
        <nav className="nav dsktopcstm hidden md:flex space-x-6 items-center">
          <a href="/">Home</a>
          <a href="#">About Us</a>
          <a href="#">Explore</a>
          <a href="#">NFT Payments</a>
          <a href="#">Blog</a>
          <button className="search-btn">
            <img src={srchicon} alt="srch" className="srchicons" />
          </button>
        </nav>

       
        <div className="wallet flex items-center gap-2 hidden md:flex">
          <ConnectButton />
          {!address && (
            <button
              onClick={onRegister}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg"
            >
              Register
            </button>
          )}
        </div>

     
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-700 focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      
      {menuOpen && (
        <div className="nav md:hidden bg-black border-t border-gray-200 mobilebg">
          <nav className="flex flex-col p-4 space-y-2">
            <a href="/">Home</a>
            <a href="#">About Us</a>
            <a href="#">Explore</a>
            <a href="#">NFT Payments</a>
            <a href="#">Blog</a>
            <div className="wallet flex items-center gap-2 mt-2">
              <ConnectButton />
              {!address && (
                <button
                  onClick={onRegister}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg"
                >
                  Register
                </button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

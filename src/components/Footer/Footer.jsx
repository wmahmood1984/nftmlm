import React from "react";
import mainlogo from "../../images/mainlogo.png";
import socialone from "../../images/twitters.png";
import socialtwo from "../../images/instagrams.png";
import socialthree from "../../images/discords.png";
import socialfour from "../../images/tiktoks.png";

const Footer = () => {
  return (
    <footer className="bg-[#0a0125] text-gray-300 pt-16 pb-7 ftrtexts">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 px-6">
        <div>
          <div className="logo">
            <img src={mainlogo} alt="logo" />
          </div>
          <p className="text-gray-400 text-sm my-4">
            There are many variations of passages of Lorem Ipsum available but
            majority have suffered alteration in some form by injected.
          </p>
          <div className="flex gap-3">
            {[socialone, socialtwo, socialthree, socialfour].map((icon, i) => (
              <a key={i} href="#">
                <img src={icon} alt="" className="w-6 h-6" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Explore</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><a href="/">Home</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Explore</a></li>
            <li><a href="#">Pages</a></li>
            <li><a href="#">Blog</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><a href="#">Collection</a></li>
            <li><a href="#">NFT</a></li>
            <li><a href="#">Wallets</a></li>
            <li><a href="#">Community</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Subscribe</h3>
          <p className="text-gray-400 text-sm mb-4">
            Get the latest updates and offers.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-3 py-2 rounded-l-md bg-[#120038] text-white border-none focus:outline-none"
            />
            <button className="px-4 py-2 rounded-r-md bg-purple-600 hover:bg-purple-700">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <div className="mt-10 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} NFChawk. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;

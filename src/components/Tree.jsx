import React, { useEffect } from "react";
import Tree from "react-d3-tree";
import { useSelector } from "react-redux";

const addressTree = {
  name: "0x123",
  children: [
    {
      name: "0x456",
      children: [
        { name: "0x789" },
        { name: "0xABC" },
      ],
    },
    { name: "0xDEF" },
  ],
};

export default function AddressHierarchy() {
const { Package, myNFTs, packages, uplines, downlines, registered, admin, allowance, directReferrals, NFTQueBalance, limitUtilized, NFTque, status, error } = useSelector((state) => state.contract);
    const containerStyles = {
    width: "100%",
    height: "100vh",
  };



  


  return (
    <div style={containerStyles}>
      <Tree
        data={addressTree}
        orientation="vertical"
        pathFunc="diagonal"
        translate={{ x: 400, y: 100 }}
      />
    </div>
  );
}

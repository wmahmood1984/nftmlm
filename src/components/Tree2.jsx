import React, { useEffect, useState } from "react";
import Tree from "react-d3-tree";
import { useSelector } from "react-redux";
import { mlmabi, mlmcontractaddress, web3 } from "../config";
import { useAppKitAccount } from "@reown/appkit/react";

export default function AddressHierarchy() {
  const {

    uplines,
 
  } = useSelector((state) => state.contract);

      const { address } = useAppKitAccount();

  const [treeData, setTreeData] = useState(null);

  const containerStyles = {
    width: "100%",
    height: "100vh",
  };

  const contract = new web3.eth.Contract(mlmabi, mlmcontractaddress);

  // Helper function to shorten addresses recursively
  const shortenAddresses = (node) => {
    const shortName =
      node.name.length > 8
        ? `${node.name.slice(0, 6)}...${node.name.slice(-4)}`
        : node.name;
    if (node.children) {
      return {
        ...node,
        name: shortName,
        children: node.children.map(shortenAddresses),
      };
    }
    return { ...node, name: shortName };
  };

  useEffect(() => {
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));

    const fetchUserTree = async (address, depth = 0) => {
      if (
        !address ||
        address === "0x0000000000000000000000000000000000000000" ||
        depth > 20
      )
        return null;

      try {
        const user = await contract.methods.getUser(address).call();
        const [ , children] = user;

        // Ensure 2x2 structure
        const validChildren = (children || [])
          .slice(0, 2)
          .filter(
            (child) =>
              child && child !== "0x0000000000000000000000000000000000000000"
          );

        // If no valid children, return leaf node
        if (validChildren.length === 0) return { name: address };

        // Otherwise fetch child subtrees
        const childNodes = [];
        for (const child of validChildren) {
          await delay(200);
          const subtree = await fetchUserTree(child, depth + 1);
          if (subtree) childNodes.push(subtree);
        }

        return { name: address, children: childNodes };
      } catch (err) {
        console.error("Error fetching user:", address, err);
        return { name: address };
      }
    };

    const buildTree = async () => {
      const rootAddress = uplines[uplines.length-1]; // change as needed
      const tree = await fetchUserTree(rootAddress);
      if (tree) {
        setTreeData(shortenAddresses(tree));
        console.log("Full 2x2 Tree:", tree);
      }
    };

    buildTree();
  }, [address]);

  return (
    <div style={containerStyles}>
      {treeData ? (
        <Tree
          data={treeData}
          orientation="vertical"
          pathFunc="diagonal"
          translate={{ x: 400, y: 100 }}
          collapsible={false}
        />
      ) : (
        <p style={{ textAlign: "center", marginTop: "2rem" }}>
          Loading hierarchy...
        </p>
      )}
    </div>
  );
}

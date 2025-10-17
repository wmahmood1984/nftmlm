import React, { useEffect, useState } from "react";
import Tree from "react-d3-tree";
import { useSelector } from "react-redux";
import { mlmabi, mlmcontractaddress, web3 } from "../config";
//import { useAppKitAccount } from "@reown/appkit/react";

export default function AddressHierarchy() {
  const { uplines } = useSelector((state) => state.contract);
//  const { address } = useAppKitAccount();
  const [treeData, setTreeData] = useState(null);

  const containerStyles = {
    width: "100%",
    height: "100vh",
  };

  const contract = new web3.eth.Contract(mlmabi, mlmcontractaddress);

  // 🎨 Color map based on package IDs
  const packageColors = {
    0: "#9E9E9E", // Default / unregistered
    1: "#4CAF50", // Green - Basic
    2: "#2196F3", // Blue - Silver
    3: "#FFC107", // Amber - Gold
    4: "#E91E63", // Pink - Platinum
    5: "#9C27B0", // Purple - Diamond
  };

  // Optional: human-readable package names
  const packageNames = {
    0: "None",
    1: "Basic",
    2: "Silver",
    3: "Gold",
    4: "Platinum",
    5: "Diamond",
  };

  // Helper to shorten address
  const shortenAddress = (addr) =>
    addr?.length > 10 ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : addr;

  useEffect(() => {
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));

    const fetchUserTree = async (addr, depth = 0) => {
      if (
        !addr ||
        addr === "0x0000000000000000000000000000000000000000" ||
        depth > 20
      )
        return null;

      try {
        const { 
          
          //referrer, parent, 
          
          children } = await contract.methods
          .getUser(addr)
          .call();

        // ✅ Fetch only package ID
        let pkgId = 0;
        try {
          const pkg = await contract.methods.userPackage(addr).call();
          pkgId = pkg.id ? Number(pkg.id) : 0;
          console.log("package",pkg)
        } catch (err) {
          console.warn("Error fetching package for:", addr, err);
        }

        const color = packageColors[pkgId] || "#999";

        const validChildren = (children || [])
          .slice(0, 2)
          .filter(
            (child) =>
              child &&
              child !== "0x0000000000000000000000000000000000000000"
          );

        const childNodes = [];
        for (const child of validChildren) {
          await delay(200);
          const subtree = await fetchUserTree(child, depth + 1);
          if (subtree) childNodes.push(subtree);
        }

        return {
          name: shortenAddress(addr),
          attributes: { Package: packageNames[pkgId] },
          nodeSvgShape: {
            shape: "circle",
            shapeProps: {
              r: 15,
              fill: color,
            },
          },
          children: childNodes.length ? childNodes : undefined,
        };
      } catch (err) {
        console.error("Error fetching user:", addr, err);
        return { name: shortenAddress(addr) };
      }
    };

    const buildTree = async () => {
      if (!uplines || uplines.length === 0) return;
      const rootAddress = uplines[uplines.length - 1];
      const tree = await fetchUserTree(rootAddress);
      if (tree) {
        setTreeData(tree);
        console.log("Colored 2x2 Tree:", tree);
      }
    };

    buildTree();
  }, [
  //  address, uplines
  ]);

  return (
    <div style={{ ...containerStyles, position: "relative" }}>
      {/* 🌈 Color Legend */}
      <div
        style={{
          position: "absolute",
          top: 10,
          left: 20,
          display: "flex",
          gap: "12px",
          background: "rgba(255,255,255,0.9)",
          padding: "8px 14px",
          borderRadius: "8px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
          zIndex: 10,
        }}
      >
        {Object.entries(packageColors).map(([id, color]) => (
          <div
            key={id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <div
              style={{
                width: "14px",
                height: "14px",
                borderRadius: "50%",
                backgroundColor: color,
              }}
            />
            <span style={{ fontSize: "0.85rem", fontWeight: 500 }}>
              {packageNames[id]}
            </span>
          </div>
        ))}
      </div>

      {/* 🌳 The MLM Tree */}
      {treeData ? (
        <Tree
          data={treeData}
          orientation="vertical"
          pathFunc="diagonal"
          translate={{ x: 400, y: 100 }}
          collapsible={false}
          nodeSize={{ x: 150, y: 100 }}
          separation={{ siblings: 1, nonSiblings: 1 }}
        />
      ) : (
        <p style={{ textAlign: "center", marginTop: "2rem" }}>
          Loading hierarchy...
        </p>
      )}
    </div>
  );
}

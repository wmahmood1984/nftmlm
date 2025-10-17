import React, { useEffect, useState, useRef } from "react";
import Tree from "react-d3-tree";
import { useSelector } from "react-redux";
import { mlmabi, mlmcontractaddress, web3 } from "../config";

export default function Tree2() {
  const { uplines } = useSelector((state) => state.contract);
  const [treeData, setTreeData] = useState(null);
  const treeContainer = useRef(null);

  // Map package ID to color
  const getColorByPackageId = (pkgId) => {
    switch (Number(pkgId)) {
      case 1:
        return "#4CAF50"; // green
      case 2:
        return "#2196F3"; // blue
      case 3:
        return "#FFC107"; // amber
      case 4:
        return "#9C27B0"; // purple
      default:
        return "#9E9E9E"; // grey
    }
  };

  // Recursive function to build the tree
  const buildTree = async (address, contract, visited = new Set()) => {
    if (!address || visited.has(address)) return null;
    visited.add(address);

    try {
      const user = await contract.methods.getUser(address).call();
      const pkg = await contract.methods.userPackage(address).call();

      const node = {
        name: address.slice(0, 4) + "..."+address.slice(-4), // short address
        attributes: {
          address,
          packageId: pkg.id,
          packagePrice: pkg.price,
        },
        children: [],
      };

      if (user.children && user.children.length > 0) {
        for (const child of user.children) {
          const childNode = await buildTree(child, contract, visited);
          if (childNode) node.children.push(childNode);
        }
      }

      return node;
    } catch (err) {
      console.error("Error building tree for:", address, err);
      return null;
    }
  };

  useEffect(() => {
    const fetchTree = async () => {
      if (!uplines || uplines.length === 0) return;

      const contract = new web3.eth.Contract(mlmabi, mlmcontractaddress);
      const rootAddress = uplines[uplines.length - 1];
      const tree = await buildTree(rootAddress, contract);
      setTreeData(tree);
    };

    fetchTree();
  }, [uplines]);

  // Custom node renderer with color coding
  const renderCustomNode = ({ nodeDatum }) => {
    const color = getColorByPackageId(nodeDatum.attributes?.packageId);

    return (
      <g>
        <circle r={20} fill={color} stroke="#333" strokeWidth={2} />
        <text  x={25} dy={5} fontSize="18">
          {nodeDatum.name}
        </text>
        <text fill="#555" x={25} dy={20} fontSize="10">
          pkg: {nodeDatum.attributes?.packageId || "N/A"}
        </text>
      </g>
    );
  };

  return (
    <div style={{ width: "100%", height: "90vh" }} ref={treeContainer}>
      {treeData ? (
        <Tree
          data={treeData}
          translate={{ x: 300, y: 200 }}
          renderCustomNodeElement={renderCustomNode}
          orientation="vertical"
          pathFunc="diagonal"
          collapsible={true}
        />
      ) : (
        <h4>Loading tree data...</h4>
      )}
    </div>
  );
}

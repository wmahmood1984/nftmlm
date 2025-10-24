import React, { forwardRef } from "react";
import RegisterAlert from "../RegisterAlert/RegisterAlert";

const ContractInfo = forwardRef(({ status, error, name }, ref) => {
  return (
    <div
      ref={ref}
      className="bg-[#120038] rounded-2xl shadow-2xl p-4 mb-12 relative overflow-hidden border-2 border-purple-600 hover:shadow-purple-700 transition-shadow"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white">Contract Info</h3>
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${
            name ? "bg-green-600 text-white" : "bg-red-600 text-white"
          }`}
        >
          {name ? "Registered" : "Not Registered"}
        </span>
      </div>

      {status === "loading" && <p className="text-gray-400 mt-2">Loading...</p>}
      {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}
      {name && (
        <p className="text-lg text-white mt-3">
          <span className="font-bold text-indigo-400">Contract Name:</span> {name}
        </p>
      )}
      {!name && <RegisterAlert />}
    </div>
  );
});

export default ContractInfo;

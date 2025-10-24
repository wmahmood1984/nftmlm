import React from "react";

function RegisterAlert() {
  return (
    <div
      className="mt-4 flex items-center gap-4 bg-gradient-to-r from-red-600/30 via-red-700/20 to-red-600/30 
         border border-red-500/60 rounded-2xl px-5 py-3 
         backdrop-blur-md shadow-lg shadow-red-900/30 animate-in fade-in-50"
    >
      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-red-500/20 border border-red-400/50">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-red-400 animate-bounce"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v2m0 4h.01M12 3a9 9 0 100 18 9 9 0 000-18z"
          />
        </svg>
      </div>
      <div className="flex flex-col">
        <p className="text-red-100 font-bold text-lg tracking-wide">
          You are not registered
        </p>
        <p className="text-red-300 text-sm mb-2">
          Please register your wallet to continue.
        </p>
        
      </div>
    </div>
  );
}

export default RegisterAlert;

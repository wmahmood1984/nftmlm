import React, { useState } from "react";
import ProfileSection from "../../ProfileSection";
import MintModal from "../MintModal"; // make sure the path is correct

function Register() {
  const [isOpen, setIsOpen] = useState(false); // add modal state

  return (
    <div className="p-6">
      {/* Pass handler to open modal */}
      <ProfileSection onMintClick={() => setIsOpen(true)} />

      {/* MintModal with isOpen and onClose */}
      <MintModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}

export default Register;

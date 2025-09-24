import { useAppKit, useAppKitAccount, useDisconnect } from "@reown/appkit/react";

export default function ConnectButton() {
    const { open, close,} = useAppKit()
    const {disconnect} = useDisconnect()

    const { address, isConnected, caipAddress, status } = useAppKitAccount()
    
    return (
        <div>
           {  <button
                onClick={async () => {
                    if (isConnected) {
                        await disconnect()
                    } else {
                        await open()
                    }
                }}
                style={{
                    border: "2px solid blue",
                    padding: "10px 20px",
                    backgroundColor: "transparent",
                    cursor: "pointer",
                    transition: "border-color 0.3s"
                }}
                onMouseOver={(e) => {
                    e.currentTarget.style.borderColor = "green";
                }}
                onMouseOut={(e) => {
                    e.currentTarget.style.borderColor = "blue";
                }}
            >
                {isConnected ? `${address.slice(0,4)}...${address.slice(-5)}` : "Not connected"}
            </button>}

        </div>
    )
}

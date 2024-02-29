import { useWeb3ModalAccount, useDisconnect } from "@web3modal/ethers/react";
import { useState, useEffect, useRef } from "react";
import { TbLogout } from "react-icons/tb";
import { RiFileCopy2Line } from "react-icons/ri";
import { shortenAddress } from "../../../utils";
import { Link } from "react-router-dom";

export default function ConnectButton() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const disconnectRef = useRef<HTMLDivElement | null>(null);

  const { address, isConnected } = useWeb3ModalAccount();
  const { disconnect } = useDisconnect();

  //for closing the disconnect button, when clicked outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        disconnectRef.current &&
        !disconnectRef.current.contains(event.target as Node)
      ) {
        setDrawerOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDisconnect = () => {
    disconnect();
    setDrawerOpen(false);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(address || "");
  };
  return (
    <>
      {!isConnected ? (
        <Link to={"/signin"}>
          <button
            className="border-[1px] border-secondary px-2 py-1 text-secondary rounded-lg"
          >
            Connect Wallet
          </button>
        </Link>
      ) : (
        <div className="relative" ref={disconnectRef}>
          <button
            className="border-[1px] border-secondary px-2 py-1 text-secondary rounded-lg flex items-center"
            onClick={() => setDrawerOpen(!isDrawerOpen)}
          >
            {shortenAddress(address || "")}
            <RiFileCopy2Line
              onClick={handleCopyToClipboard}
              className="ml-1 cursor-pointer"
            />
          </button>
          {isDrawerOpen && (
            <div className="absolute top-9 left-0 bg-white rounded-lg p-2 hover:bg-gray-300">
              <button
                onClick={handleDisconnect}
                className="flex items-center gap-1"
              >
                <TbLogout color="black" /> Disconnect
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}

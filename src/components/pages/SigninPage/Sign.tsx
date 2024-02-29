import Text from "../../common/Typography/Text";
import { useWeb3Modal } from "@web3modal/ethers/react";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Sign = () => {
  const { open } = useWeb3Modal();
  const { isConnected, address } = useWeb3ModalAccount();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Open modal when Metamask is connected
    if (isConnected) {
      setShowModal(true);
    }
  }, [isConnected]);

  const handleSubmit = () => {
    // Make a request to the endpoint with username, email, and wallet address
    axios
      .post("http://localhost:8000/insert", {
        username,
        email,
        wallet_address: address,
      })
      .then((response) => {
        if (response) {
          console.log("Data inserted successfully");
          // Redirect to homepage or any other page
          navigate("/account");
        } else {
          console.error("Failed to insert data");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="flex">
      <div className="flex-1">
        <img src="/banner (1).png" alt="background-image" />
      </div>
      <div className="flex flex-1 flex-col text-center">
        <Text title weight="bold" className="mt-[70px] mb-[30px]">
          Sign In
        </Text>
        <Text detail weight="semibold" className="mb-[30px]">
          Choose One Of Available Wallet Providers Or <br />
          Create A New Wallet. What is a Wallet?
        </Text>
        <div className="flex flex-col px-[50px] gap-7">
          {isConnected ? (
             <div
             onClick={() => open()}
             className="px-[90px] py-[20px] bg-primary flex flex-row justify-center items-center gap-[20px] text-white rounded-full"
           >
             <img src="/metamask.png" alt="logo" className="w-[25px]" />
             <p className="font-bold text-md">Connected</p>
           </div>
          ):(
            <div
              onClick={() => open()}
              className="px-[90px] py-[20px] bg-primary flex flex-row justify-center items-center gap-[20px] text-white rounded-full cursor-pointer"
            >
              <img src="/metamask.png" alt="logo" className="w-[25px]" />
              <p className="font-bold text-md">Connect with Metamask</p>
            </div>
          )}
          {showModal && (
            <div className="modal fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary p-8 rounded-lg shadow-lg">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-2 right-2 text-white hover:text-gray-300 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <Text title variant={2} className="text-white">
                You are almost there
              </Text>
              <Text className="max-w-xl text-white/80 my-4">
                Choose a display name and enter your email address to receive
                updates when your NFTs sell or receive offers.
              </Text>
              <input
                type="text"
                placeholder="Display Name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:border-blue-500"
              />
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={handleSubmit}
                className="bg-secondary hover:bg-secondary/80  text-primary font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Submit
              </button>
            </div>
          )}

          <div className="px-[90px] cursor-pointer py-[20px] border-2 border-secondary flex flex-row justify-center items-center gap-[20px] text-black rounded-full">
            <img src="/torus.png" alt="logo" className="w-[25px]" />
            <p className="font-bold text-md">Torus</p>
          </div>
          <div className="px-[90px] py-[20px] cursor-pointer border-2 border-secondary  flex flex-row justify-center items-center gap-[20px] text-black rounded-full">
            <img src="/mobilewallet.jpg" alt="logo" className="w-[25px]" />
            <p className="font-bold text-md">Connect Wallet</p>
          </div>
          <div className="px-[90px] py-[20px] cursor-pointer border-2 border-secondary  flex flex-row justify-center items-center text-black rounded-full">
            <p className="font-bold text-md">Show More Option</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sign;

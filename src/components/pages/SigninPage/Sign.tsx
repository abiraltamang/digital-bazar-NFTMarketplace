import Text from "../../common/Typography/Text";
import { useWeb3Modal } from "@web3modal/ethers/react";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Sign = () => {

  const { open } = useWeb3Modal();
  const { isConnected } = useWeb3ModalAccount();

  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to homepage when Metamask is connected
    if (isConnected) {
     navigate('/')
    }
  }, [isConnected]);

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
        {/* <div className="mb-[30px]">
          <TabNavigation />
        </div> */}
        <div className="flex flex-col px-[50px] gap-7">
          <div
            onClick={() => open()}
            className="px-[90px] py-[20px] bg-primary flex flex-row justify-center items-center gap-[20px] text-white rounded-full"
          >
            <img src="/metamask.png" alt="logo" className="w-[25px]" />
            <p className="font-bold text-md">Connect with Metamask</p>
          </div>
         
          
          <div className="px-[90px] py-[20px] border-2 border-secondary flex flex-row justify-center items-center gap-[20px] text-black rounded-full">
            <img src="/torus.png" alt="logo" className="w-[25px]" />
            <p className="font-bold text-md">Torus</p>
          </div>
          <div className="px-[90px] py-[20px] border-2 border-secondary  flex flex-row justify-center items-center gap-[20px] text-black rounded-full">
            <img src="/mobilewallet.jpg" alt="logo" className="w-[25px]" />
            <p className="font-bold text-md">Connect Wallet</p>
          </div>
          <div className="px-[90px] py-[20px] border-2 border-secondary  flex flex-row justify-center items-center text-black rounded-full">
            <p className="font-bold text-md">Show More Option</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sign;

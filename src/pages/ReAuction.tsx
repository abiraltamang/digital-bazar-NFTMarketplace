import { useEffect, useState } from "react";
import axios from "axios";
import { BrowserProvider } from "ethers";
import Text from "../components/common/Typography/Text.tsx";
import { useParams, useNavigate } from "react-router-dom";
import { NFT } from "./Home";
import { ethers } from "ethers";
import { useWeb3ModalProvider } from "@web3modal/ethers/react";

//@ts-expect-error config
import { marketplaceAddress } from "../../config.js";
import NFTMarketplace from "../../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json";
import { extractCIDFromImage } from "../utils";

const ReAuction = () => {
  const navigate = useNavigate();
  const { tokenId } = useParams();
  const [minimumPrice, setMinimumPrice] = useState("");
  const [nft, setNFT] = useState<NFT>({
    tokenId: "",
    seller: "",
    owner: "",
    price: 0,
    image: "",
    name: "",
    description: "",
    tokenUri: "",
    sold: false,
    isAuction: false,
  });
  const [loadingState, setloadingState] = useState(false);
  const { walletProvider } = useWeb3ModalProvider();

  useEffect(() => {
    if (walletProvider) {
      fetchNFT();
    }
  }, [walletProvider]);

  const fetchNFT = async () => {
    try {
      setloadingState(true);
      if (!walletProvider) {
        throw Error("Wallet provider is undefined");
      }
      const provider = new BrowserProvider(walletProvider);
      const signer = await provider.getSigner();
      const marketplaceContract = new ethers.Contract(
        marketplaceAddress,
        NFTMarketplace.abi,
        signer
      );
      const tokenUri = await marketplaceContract.tokenURI(tokenId);
      const tokenDetails = await marketplaceContract.fetchTokenDetails(tokenId);
      let meta;
      if (tokenUri.startsWith("ipfs://")) {
        const ipfsLink = tokenUri.replace("ipfs://", "https://ipfs.io/ipfs/");
        meta = await axios.get(ipfsLink);
      } else {
        meta = await axios.get(tokenUri);
      }
      console.log("meta data", meta);
      setNFT({
        ...meta.data,
        price: ethers.formatUnits(tokenDetails.price.toString(), "ether"),
        seller: tokenDetails.seller,
        owner: tokenDetails.owner,
        tokenUri,
        tokenId,
        isAuction: tokenDetails.isAuction,
      });
    } catch (error) {
      console.error("Error fetching NFT:", error);
    } finally {
      setloadingState(false);
    }
  };

  async function reauction() {
    try {
      setloadingState(true);
      if (!walletProvider) {
        throw Error("Wallet provider is undefined");
      }
      const provider = new BrowserProvider(walletProvider);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        marketplaceAddress,
        NFTMarketplace.abi,
        signer
      );

      const price = ethers.parseEther(minimumPrice.toString());

      const transaction = await contract.restartAuction(nft.tokenId, price);
      await transaction.wait();
      console.log("Reauction transaction successful");
      navigate("/");
    } catch (error) {
      console.error("Error reauctioning NFT:", error);
    }
  }

  const cid = extractCIDFromImage(nft.image);
  const gatewayUrl = "https://ipfs.io";

  return (
    <div className="container mx-auto mt-8">
      <Text className="text-center text-black/80" title weight="semibold">
        Reauction NFT
      </Text>
      <div className="flex justify-center items-center">
        <div className="w-1/2 flex flex-col p-12 justify-center items-center">
          <img
            src={`${gatewayUrl}/ipfs/${cid}`}
            alt=""
            className="max-w-xs h-56 rounded-xl"
          />
          <Text className="mb-4">{`Current Price: ${nft.price}`}</Text>
          <input
            placeholder="Enter minimum price"
            value={minimumPrice}
            onChange={(e) => setMinimumPrice(e.target.value)}
            className="mt-2 border rounded p-4 focus:outline-none w-full"
          />
          <button
            onClick={reauction}
            className="font-bold mt-4 bg-primary text-white rounded p-4 shadow-lg w-full"
          >
            {loadingState ? "Listing in Marketplace" : "Reauction"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReAuction;

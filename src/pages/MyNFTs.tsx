import Text from "../components/common/Typography/Text";
import SectionWrapper from "../components/common/SectionWrapper";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { useWeb3ModalProvider } from "@web3modal/ethers/react";
import { NFT } from "./Home";
import { BrowserProvider } from "ethers";
import Button from "../components/common/Button/Button.js";
import { MarketItem } from "./Home";
import { extractCIDFromImage } from "../utils";

//@ts-expect-error config
import { marketplaceAddress } from "../../config.js";
import NFTMarketplace from "../../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json";
import MyNFT from "../components/common/Cards/MyNFT.js";

const MyNFTs = () => {
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  const navigate = useNavigate();
  const { walletProvider } = useWeb3ModalProvider();

  useEffect(() => {
    // Check if walletProvider is available
    if (walletProvider) {
      // Wallet provider is available, proceed with loading NFTs
      loadNFTs();
    }
  }, [walletProvider]);

  async function loadNFTs() {
    try {
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
      const data = await marketplaceContract.fetchMyNFTs();

      // Fetch additional details for each item
      const items = await Promise.all(
        data.map(async (item: MarketItem) => {
          const tokenUri = await marketplaceContract.tokenURI(item.tokenId);
          console.log(tokenUri);
          let meta;
          if (tokenUri.startsWith("ipfs://")) {
            // Handle IPFS protocol separately
            // You may need to use an IPFS library or gateway to fetch the data
            // For simplicity, this example assumes the IPFS link is just an HTTP link
            const ipfsLink = tokenUri.replace(
              "ipfs://",
              "https://ipfs.io/ipfs/"
            );
            meta = await axios.get(ipfsLink);
          } else {
            // Fetch metadata using the regular HTTP protocol
            meta = await axios.get(tokenUri);
          }

          // Format the item details
          const formattedItem = {
            price: ethers.formatUnits(item.price.toString(), "ether"),
            tokenId: item.tokenId,
            seller: item.seller,
            owner: item.owner,
            image: meta.data.image,
            name: meta.data.name,
            description: meta.data.description,
            tokenUri,
          };

          return formattedItem;
        })
      );
      setNfts(items);
      console.log(items);
      setLoadingState("loaded");
    } catch (error) {
      console.log("Error loading my NFTs"), error;
    }
  }
  function listNFT(nft: NFT) {
    console.log("nft:", nft);
    navigate(`/resell-nft?id=${nft.tokenId}&tokenURI=${nft.tokenURI}`);
  }
  return (
    <SectionWrapper>
      <Text className="text-center text-black/60 pb-8" title weight="semibold">
        My NFTs
      </Text>
      {loadingState === "loaded" && !nfts.length ? (
        <>
          <Text className="text-center">No NFts owned</Text>
          <div className="flex justify-center mt-6">
            <Button primary rounded>
              Explore NFTs
            </Button>
          </div>
        </>
      ) : (
        <div className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
            {nfts.map((nft, i) => (
              <MyNFT key={i} nft={nft} listNFT={listNFT} />
              // <div key={i} className="border shadow rounded-xl overflow-hidden">
              //   <img src={nft.image} className="rounded" />
              //   <div className="p-4 bg-black">
              //     <p className="text-2xl font-bold text-white">
              //       Price - {nft.price} Eth
              //     </p>
              //     <button
              //       className="mt-4 w-full bg-pink-500 text-white font-bold py-2 px-12 rounded"
              //       onClick={() => listNFT(nft)}
              //     >
              //       List
              //     </button>
              //   </div>
              // </div>
            ))}
          </div>
        </div>
      )}
    </SectionWrapper>
  );
};

export default MyNFTs;

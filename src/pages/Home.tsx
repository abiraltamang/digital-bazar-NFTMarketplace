// import Test from "../components/common/Test";
import Banner from "../components/pages/HomePage/Banner";
import CollectionSection from "../components/pages/HomePage/CollectionSection";
import HotBidSection from "../components/pages/HomePage/HotBidSection";
import HowItWorks from "../components/pages/HomePage/HowItWorks";
import TrendingSection from "../components/pages/HomePage/TrendingSection";
import { useState, useEffect } from "react";
import axios from "axios";
import * as ethers from "ethers";

export interface NFT {
  tokenId: number;
  seller: string;
  owner: string;
  price: string;
  image: string;
  name: string;
  description: string;
}

//@ts-expect-error config
import { marketplaceAddress } from "../../config.js";
import NFTMarketplace from "../../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json";

export default function Homepage() {
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [loadingState, setLoadingState] = useState<"loaded" | "not-loaded">(
    "not-loaded"
  );

  useEffect(() => {
    loadNFTs();
  }, []);

  async function loadNFTs() {
    try {
      // Connect to Ethereum provider
      const provider = new ethers.JsonRpcProvider(
        "https://sepolia.infura.io/v3/eb69522e52ba4c3babe2118a59a0b301"
      );

      // Create a contract instance
      const contract = new ethers.Contract(
        marketplaceAddress,
        NFTMarketplace.abi,
        provider
      );

      // Fetch market items from the smart contract
      const marketItems = await contract.fetchMarketItems();

      // Fetch additional details for each item
      const items = await Promise.all(
        marketItems.map(async (item) => {
          const tokenUri = await contract.tokenURI(item.tokenId);
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
          };

          return formattedItem;
        })
      );
      console.log(items);

      // Update the state with the fetched NFTs
      setNfts(items);
      setLoadingState("loaded");
    } catch (error) {
      console.error("Error loading NFTs:", error);
    }
  }

  return (
    <>
      <Banner />
      <HotBidSection sectionText="🔥 Hot Bids" nfts={nfts} />
      <TrendingSection customText="Trending Categories" />
      <CollectionSection />
      <HowItWorks />
      {/* <Test /> */}
    </>
  );
}

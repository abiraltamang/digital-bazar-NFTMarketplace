// import Test from "../components/common/Test";
import Banner from "../components/pages/HomePage/Banner";
import CollectionSection from "../components/pages/HomePage/CollectionSection";
import HotBidSection from "../components/pages/HomePage/HotBidSection";
import HowItWorks from "../components/pages/HomePage/HowItWorks";
import TrendingSection from "../components/pages/HomePage/TrendingSection";
import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserProvider } from "ethers";
import { calculateRemainingTime } from "../utils/index.js";
import * as ethers from "ethers";
import {
  useWeb3ModalProvider,
  useWeb3ModalAccount,
  useWeb3Modal,
} from "@web3modal/ethers/react";

export interface NFT {
  tokenId: string;
  seller: string;
  owner: string;
  price: number;
  image: string;
  name: string;
  description: string;
  tokenUri?: string;
  sold?: boolean;
  isAuction?: boolean;
  endTime?: bigint;
  remainingTime?: bigint;
}
export interface MarketItem {
  tokenId: number;
  seller: string;
  owner: string;
  price: number;
  sold: boolean;
  isAuction: boolean;
  endTime: bigint;
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
        marketItems.map(async (item: MarketItem) => {
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

          const formattedItem = {
            price: ethers.formatUnits(item.price.toString(), "ether"),
            tokenId: item.tokenId,
            seller: item.seller,
            owner: item.owner,
            image: meta.data.image,
            name: meta.data.name,
            description: meta.data.description,
            tokenUri,
            isAuction: item.isAuction,
            endTime: BigInt(item.endTime), // Cast to BigInt
            remainingTime: calculateRemainingTime(BigInt(item.endTime)), // Cast to BigInt
          };

          // Filter out NFTs with ended auctions and keep resold tokens
          if (
            formattedItem.isAuction &&
            formattedItem.remainingTime !== "Auction ended"
          ) {
            return formattedItem;
          } else if (!formattedItem.isAuction) {
            return formattedItem;
          } else {
            return null;
          }
        })
      );

      // Filter out null values
      const filteredItems = items.filter((item) => item !== null);

      // Update the state with the fetched NFTs
      setNfts(filteredItems);
      setLoadingState("loaded");
    } catch (error) {
      console.error("Error loading NFTs:", error);
    }
  }

  const { walletProvider } = useWeb3ModalProvider();
  const { isConnected } = useWeb3ModalAccount();
  const { open } = useWeb3Modal();

  async function placeBid(nft: NFT, bidPrice: number) {
    /* needs the user to sign the transaction, so will use Web3Provider and sign it */

    if (!isConnected) {
      open();
    }
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

    /* user will be prompted to pay the bid price to place the bid */
    const bidAmount = ethers.parseUnits(bidPrice.toString(), "ether");
    const transaction = await contract.placeBid(nft.tokenId, {
      value: bidAmount,
    });
    await transaction.wait();
    loadNFTs();
  }

  async function checkAndEndAuctions() {
    try {
      if (!isConnected) {
        open();
      }
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
      await contract.checkAndEndAuctions();
      loadNFTs();
    } catch (error) {
      console.error("Error checking and ending auctions:", error);
    }
  }

  async function buyNft(nft: NFT) {
    /* needs the user to sign the transaction, so will use Web3Provider and sign it */

    if (!isConnected) {
      open();
    }
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

    /* user will be prompted to pay the asking proces to complete the transaction */
    const price = ethers.parseUnits(nft.price.toString(), "ether");
    const transaction = await contract.buyNFT(nft.tokenId, {
      value: price,
    });
    await transaction.wait();
    loadNFTs();
  }

  return (
    <>
      <Banner />
      <HotBidSection
        refresh={checkAndEndAuctions}
        nfts={nfts}
        placeBid={placeBid}
        buyNft={buyNft}
        loadingState={loadingState}
      />
      <TrendingSection nfts={nfts} customText="Trending Categories" />
      <CollectionSection />
      <HowItWorks />
      {/* <Test /> */}
    </>
  );
}

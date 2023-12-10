import HotBidSection from "../HomePage/HotBidSection";
import Text from "../../common/Typography/Text";
import { NFT, MarketItem } from "../../../pages/Home";
import axios from "axios";
import * as ethers from "ethers";
import { BrowserProvider } from "ethers";
import {
  useWeb3ModalProvider,
  useWeb3ModalAccount,
  useWeb3Modal,
} from "@web3modal/ethers/react";

//@ts-expect-error config
import { marketplaceAddress } from "../../../../config.js";
import NFTMarketplace from "../../../../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json";
import { useEffect, useState } from "react";

const ExploreBody = () => {
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

  const { walletProvider } = useWeb3ModalProvider();
  const { isConnected } = useWeb3ModalAccount();
  const { open } = useWeb3Modal();

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
    const transaction = await contract.createMarketSale(nft.tokenId, {
      value: price,
    });
    await transaction.wait();
    loadNFTs();
  }
  return (
    <div>
      <div className="px-7 text-[#5F5858]">
        <Text title weight="bold">
          Explore Collections
        </Text>
        <Text detail weight="bold">
          10000 items
        </Text>
      </div>

      <HotBidSection nfts={nfts} buyNFT={buyNft} loadingState={loadingState} />
    </div>
  );
};

export default ExploreBody;

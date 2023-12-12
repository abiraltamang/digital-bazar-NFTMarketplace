import { NFT, MarketItem } from "../../../pages/Home";
import axios from "axios";
import HotBidCard from "../../common/Cards/HotBidCard.js";
import * as ethers from "ethers";
import { BrowserProvider } from "ethers";
import { FallingLines } from "react-loader-spinner";
import Text from "../../common/Typography/Text";
import {
  useWeb3ModalProvider,
  useWeb3ModalAccount,
  useWeb3Modal,
} from "@web3modal/ethers/react";
import Dropdown from "./ExploreDropdown.js";

//@ts-expect-error config
import { marketplaceAddress } from "../../../../config.js";
import NFTMarketplace from "../../../../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json";
import { useEffect, useState } from "react";

const ExploreBody = () => {
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [loadingState, setLoadingState] = useState<"loaded" | "not-loaded">(
    "not-loaded"
  );
  const [selectedOption, setSelectedOption] = useState<string>("");

  useEffect(() => {
    loadNFTs();
  }, [selectedOption]);

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

      // Sort or filter the items based on the selected option
      let sortedNFTs = [...items];
      if (selectedOption === "price-low-to-high") {
        sortedNFTs = sortedNFTs.sort(
          (a, b) => parseFloat(a.price) - parseFloat(b.price)
        );
      } else if (selectedOption === "price-high-to-low") {
        sortedNFTs = sortedNFTs.sort(
          (a, b) => parseFloat(b.price) - parseFloat(a.price)
        );
      } else if (selectedOption === "latest") {
        sortedNFTs = sortedNFTs.sort(
          (a, b) => Number(b.tokenId) - Number(a.tokenId)
        );
        // Add sorting logic for the latest
        // Example: sortedNFTs = sortedNFTs.sort((a, b) => a.createdAt - b.createdAt);
      }
      console.log(items);

      // Update the state with the fetched NFTs
      setNfts(sortedNFTs);
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
  if (loadingState == "not-loaded")
    return (
      <div className="h-[50vh] w-full flex justify-center items-center">
        <FallingLines color="#002F5B" width="80" visible={true} />
      </div>
    );
  return (
    <div>
      <div className="flex justify-between mb-7 ">
        <Text weight="semibold" className="text-black/70">
          Showing {nfts.length} items{" "}
        </Text>
        <Dropdown onSelectOption={setSelectedOption} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3  lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {nfts.map((nft, index: number) => (
          <HotBidCard key={index} nft={nft} buyNft={() => buyNft(nft)} />
        ))}
      </div>
    </div>
  );
};

export default ExploreBody;

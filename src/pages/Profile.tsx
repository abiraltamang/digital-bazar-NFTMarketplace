import ProfileCard from "../components/pages/ProfilePage/ProfileCard";
import TabNavigation from "../components/pages/ProfilePage/TabNavigation";
import {
  useWeb3ModalProvider,
  useWeb3ModalAccount,
  useWeb3Modal,
} from "@web3modal/ethers/react";
import axios from "axios";
import { BrowserProvider, ethers } from "ethers";
import { useState, useEffect } from "react";
import { NFT, MarketItem } from "./Home";

//@ts-expect-error config
import { marketplaceAddress } from "../../config.js";
import NFTMarketplace from "../../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json";

const Profile = () => {
  const [nftsListed, setNftsListed] = useState<NFT[]>([]);
  const [ownedNfts, setOwnedNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingState, setLoadingState] = useState<"loaded" | "not-loaded">(
    "not-loaded"
  );
  const { walletProvider } = useWeb3ModalProvider();
  const { isConnected, address } = useWeb3ModalAccount();
  const { open } = useWeb3Modal();

  useEffect(() => {
    try {
      if (!isConnected) {
        setLoading(true);
        open();
      }
      if (walletProvider) {
        loadNFTs();
      }
    } finally {
      setLoading(false);
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
      const listedNftData = await marketplaceContract.fetchItemsListed();
      const myNFtdata = await marketplaceContract.fetchMyNFTs();

      // Fetch additional details for each item
      const listedNFTs = await Promise.all(
        listedNftData.map(async (item: MarketItem) => {
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
      // Fetching additional details for my purchaed NFTs
      const myownNfts = await Promise.all(
        myNFtdata.map(async (item: MarketItem) => {
          const tokenUri = await marketplaceContract.tokenURI(item.tokenId);
          console.log(tokenUri);
          let meta;
          if (tokenUri.startsWith("ipfs://")) {
            const ipfsLink = tokenUri.replace(
              "ipfs://",
              "https://ipfs.io/ipfs/"
            );
            meta = await axios.get(ipfsLink);
          } else {
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
      setNftsListed(listedNFTs);
      setOwnedNfts(myownNfts);
      setLoadingState("loaded");
    } catch (error) {
      console.log("Error loading my NFTs"), error;
    }
  }

  if (loading) return <div className="h-[80vh]">Loading</div>;
  return (
    <div className="pt-0 ">
      <ProfileCard
        walletAddress={address}
        coverImage="/image1.png"
        profileImage="/profile.jpeg"
        name="Arbin Koirala"
        description={
          " Unique, Fully 3D And Built To Unite The Design Multiverse. Designed And Styled By Digimental."
        }
      />
      <TabNavigation
        nftsListed={nftsListed}
        myownNfts={ownedNfts}
        loadingState={loadingState}
      />
    </div>
  );
};

export default Profile;

import ProfileCard from "../components/pages/ProfilePage/ProfileCard";
import TabNavigation from "../components/pages/ProfilePage/TabNavigation";
import TrendingSection from "../components/pages/HomePage/TrendingSection";
import { useWeb3ModalProvider } from "@web3modal/ethers/react";
import axios from "axios";
import { BrowserProvider, ethers } from "ethers";
import { useState, useEffect } from "react";
import { NFT, MarketItem } from "./Home";
import SectionWrapper from "../components/common/SectionWrapper";

//@ts-expect-error config
import { marketplaceAddress } from "../../config.js";
import NFTMarketplace from "../../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json";
import NFTCard from "../components/common/Cards/NFTCard.js";

const Profile = () => {
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
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
      const data = await marketplaceContract.fetchItemsListed();

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

  const tabs = ["On Sale", "Owned", "Created", "Latest", "Collections"];
  return (
    <SectionWrapper>
      <ProfileCard
        coverImage="/Cover image.png"
        profileImage="/Profile.png"
        name="Arbin Koirala"
        address="0xb75ec484089cF6.....C0"
        description={
          " Unique, Fully 3D And Built To Unite The Design Multiverse. Designed And Styled By Digimental."
        }
      />
      <TabNavigation tabs={tabs} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-4">
        {nfts.map((nft, i) => (
          <NFTCard key={i} nft={nft} />
        ))}
      </div>
    </SectionWrapper>
  );
};

export default Profile;

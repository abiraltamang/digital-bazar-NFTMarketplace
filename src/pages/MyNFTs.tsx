import Text from "../components/common/Typography/Text";
import SectionWrapper from "../components/common/SectionWrapper";
import { useEffect, useState } from "react";
import axios from "axios";
import { Bars } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import {
  useWeb3ModalProvider,
  useWeb3Modal,
  useWeb3ModalAccount,
} from "@web3modal/ethers/react";
import { NFT } from "./Home";
import { BrowserProvider } from "ethers";
import Button from "../components/common/Button/Button.js";
import { MarketItem } from "./Home";

//@ts-expect-error config
import { marketplaceAddress } from "../../config.js";
import NFTMarketplace from "../../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json";
import MyNFT from "../components/common/Cards/MyNFT.js";

const MyNFTs = () => {
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  const navigate = useNavigate();
  const { walletProvider } = useWeb3ModalProvider();
  const { isConnected } = useWeb3ModalAccount();
  const { open } = useWeb3Modal();

  useEffect(() => {
    if (!isConnected) {
      open();
    }
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
    if (nft.tokenUri) {
      navigate(`/resell-nft?id=${nft.tokenId}&tokenURI=${nft.tokenUri}`);
    }
  }
  return (
    <SectionWrapper>
      <Text className="text-center text-black/60 pb-8" title weight="semibold">
        My NFTs
      </Text>
      {loadingState == "not-loaded" && (
        <div className="flex justify-center items-center gap-4 ">
          <Bars
            height="30"
            width="30 "
            color="#00008b"
            ariaLabel="bars-loading"
            visible={true}
          />
          <Text weight="semibold" className="text-center text-black/60">
            NFTs are loading
          </Text>
        </div>
      )}
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
            ))}
          </div>
        </div>
      )}
    </SectionWrapper>
  );
};

export default MyNFTs;

import ProductDetail from "../components/pages/ProductPage/ProductDetail";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ethers } from "ethers";
import { NFT } from "./Home";
import { useEffect, useState } from "react";
import { useWeb3ModalProvider } from "@web3modal/ethers/react";
import { BrowserProvider } from "ethers";
// import HotBidSection from "../components/pages/HomePage/HotBidSection";

//@ts-expect-error config
import { marketplaceAddress } from "../../config.js";
import NFTMarketplace from "../../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json";
const Product = () => {
  const [nft, setNFT] = useState<NFT>();
  const { tokenId } = useParams();
  const { walletProvider } = useWeb3ModalProvider();
  console.log("TOken ID ---", tokenId);

  useEffect(() => {
    const fetchNFT = async () => {
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
        const tokenUri = await marketplaceContract.tokenURI(tokenId);
        const tokenDetails = await marketplaceContract.fetchTokenDetails(
          tokenId
        );
        let meta;
        if (tokenUri.startsWith("ipfs://")) {
          const ipfsLink = tokenUri.replace("ipfs://", "https://ipfs.io/ipfs/");
          meta = await axios.get(ipfsLink);
        } else {
          meta = await axios.get(tokenUri);
        }
        setNFT({
          ...meta.data,
          price: ethers.formatUnits(tokenDetails.price.toString(), "ether"),
          sellet: tokenDetails.seller,
          owner: tokenDetails.owner,
        });
      } catch (error) {
        console.error("Error fetching NFT:", error);
      }
    };

    fetchNFT();
  }, [tokenId]);

  return (
    <div>
      <ProductDetail nft={nft as NFT} />
      {/* <HotBidSection sectionText="More From This Collection" /> */}
    </div>
  );
};

export default Product;

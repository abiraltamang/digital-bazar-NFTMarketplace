import ProductDetail from "../components/pages/ProductPage/ProductDetail";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { NFT } from "./Home";
import {
  useWeb3ModalProvider,
  useWeb3ModalAccount,
  useWeb3Modal,
} from "@web3modal/ethers/react";
import { BrowserProvider } from "ethers";
import { Bars } from "react-loader-spinner";
// import HotBidSection from "../components/pages/HomePage/HotBidSection";

//@ts-expect-error config
import { marketplaceAddress } from "../../config.js";
import NFTMarketplace from "../../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json";
const Product = () => {
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
  });
  const [loadingState, setloadingState] = useState(false);
  const { tokenId } = useParams();
  const { walletProvider } = useWeb3ModalProvider();
  const { isConnected } = useWeb3ModalAccount();
  const { open } = useWeb3Modal();

  useEffect(() => {
    if (!isConnected) {
      setloadingState(true);
      open();
    }
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
      });
    } catch (error) {
      console.error("Error fetching NFT:", error);
    } finally {
      setloadingState(false);
    }
  };

  async function buyNft(nft: NFT) {
    /* needs the user to sign the transaction, so will use Web3Provider and sign it */
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
  }
  return (
    <div>
      {loadingState ? (
        <div className="flex justify-center items-center gap-4 h-[80vh] ">
          <Bars
            height="30"
            width="30 "
            color="#00008b"
            ariaLabel="bars-loading"
            visible={true}
          />
          <p className="text-center text-black/60">Loading</p>
        </div>
      ) : (
        <ProductDetail nft={nft} buyNFT={buyNft} />
      )}

      {/* <HotBidSection sectionText="More From This Collection" /> */}
    </div>
  );
};

export default Product;

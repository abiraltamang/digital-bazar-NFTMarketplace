import Text from "../components/common/Typography/Text";
import SectionWrapper from "../components/common/SectionWrapper";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { useWeb3ModalProvider } from "@web3modal/ethers/react";
import { NFT } from "./Home";
import { BrowserProvider } from "ethers";

//@ts-expect-error config
import { marketplaceAddress } from "../../config.js";
import NFTMarketplace from "../../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json";

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
    if (!walletProvider) {
      throw Error("Wallet provider is undefined");
    }
    const provider = new BrowserProvider(walletProvider);
    const signer = await provider.getSigner();

    console.log("SIgner provided----", signer);

    const marketplaceContract = new ethers.Contract(
      marketplaceAddress,
      NFTMarketplace.abi,
      provider
    );
    const data = await marketplaceContract.fetchMyNFTs();

    const items = await Promise.all(
      data.map(async (i) => {
        const tokenURI = await marketplaceContract.tokenURI(i.tokenId);
        console.log("Token URI:", tokenURI);
        const meta = await axios.get(tokenURI);
        console.log("Metadata:", meta.data);
        const price = ethers.formatUnits(i.price.toString(), "ether");
        const item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.data.image,
          tokenURI,
        };
        return item;
      })
    );
    setNfts(items);
    console.log(items);
    setLoadingState("loaded");
  }
  function listNFT(nft) {
    console.log("nft:", nft);
    navigate(`/resell-nft?id=${nft.tokenId}&tokenURI=${nft.tokenURI}`);
  }
  //   if (loadingState === "loaded" && !nfts.length)
  //     return <h1 className="py-10 px-20 text-3xl">No NFTs owned</h1>;
  return (
    <SectionWrapper>
      <Text className="text-center text-black/60 pb-8" title weight="semibold">
        My NFTs
      </Text>
      <div className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {nfts.map((nft, i) => (
            <div key={i} className="border shadow rounded-xl overflow-hidden">
              <img src={nft.image} className="rounded" />
              <div className="p-4 bg-black">
                <p className="text-2xl font-bold text-white">
                  Price - {nft.price} Eth
                </p>
                <button
                  className="mt-4 w-full bg-pink-500 text-white font-bold py-2 px-12 rounded"
                  onClick={() => listNFT(nft)}
                >
                  List
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default MyNFTs;

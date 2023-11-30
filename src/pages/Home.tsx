// import Test from "../components/common/Test";
import Banner from "../components/pages/HomePage/Banner";
import CollectionSection from "../components/pages/HomePage/CollectionSection";
import HotBidSection from "../components/pages/HomePage/HotBidSection";
import HowItWorks from "../components/pages/HomePage/HowItWorks";
import TrendingSection from "../components/pages/HomePage/TrendingSection";
import { useState, useEffect } from "react";
import axios from "axios";
import ethers from "ethers";

//@ts-expect-error config
import { marketplaceAddress } from "../../config.js";
import NFTMarketplace from "../../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json";

export default function Homepage() {
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");

  useEffect(() => {
    loadNFTs();
  }, []);

  async function loadNFTs() {
    /* create a generic provider and query for unsold market items */
    const provider = new ethers.JsonRpcProvider();
    const contract = new ethers.Contract(
      marketplaceAddress,
      NFTMarketplace.abi,
      provider
    );
    const data = await contract.fetchMarketItems();

    /*
     *  map over items returned from smart contract and format
     *  them as well as fetch their token metadata
     */
    const items = await Promise.all(
      data.map(async (i) => {
        const tokenUri = await contract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenUri);
        const price = ethers.formatUnits(i.price.toString(), "ether");
        const item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.data.image,
          name: meta.data.name,
          description: meta.data.description,
        };
        return item;
      })
    );
    console.log(items);
    setNfts(items);
    setLoadingState("loaded");
  }
  return (
    <>
      <Banner />
      <HotBidSection sectionText="🔥 Hot Bids" />
      <TrendingSection customText="Trending Categories" />
      <CollectionSection />
      <HowItWorks />
      {/* <Test /> */}
    </>
  );
}

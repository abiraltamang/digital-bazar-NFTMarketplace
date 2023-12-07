import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ethers } from "ethers";
import { useWeb3ModalProvider } from "@web3modal/ethers/react";
import { BrowserProvider } from "ethers";
//@ts-expect-error config
import { marketplaceAddress } from "../../config.js";
import NFTMarketplace from "../../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json";
import { extractCIDFromImage } from "../utils";
import Text from "../components/common/Typography/Text.tsx";
import SectionWrapper from "../components/common/SectionWrapper.tsx";

export default function ResellNFT() {
  const [formInput, setFormInput] = useState({
    price: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const { price, image } = formInput;

  const [params] = useSearchParams();
  const id = params.get("id");
  const tokenURI = params.get("tokenURI");

  const navigate = useNavigate();
  const { walletProvider } = useWeb3ModalProvider();

  useEffect(() => {
    fetchNFT();
  }, [id]);

  async function fetchNFT() {
    if (!tokenURI) return;
    try {
      const meta = await axios.get(tokenURI);
      setFormInput((state) => ({ ...state, image: meta.data.image }));
    } catch (error) {
      console.error("Error fetching NFT:", error);
    }
  }

  async function listNFTForSale() {
    if (!price) return;
    if (!walletProvider) {
      throw Error("Wallet provider is undefined");
    }
    try {
      setLoading(true);

      const provider = new BrowserProvider(walletProvider);
      const signer = await provider.getSigner();

      const priceFormatted = ethers.parseUnits(formInput.price, "ether");
      const contract = new ethers.Contract(
        marketplaceAddress,
        NFTMarketplace.abi,
        signer
      );
      let listingPrice = await contract.getListingPrice();

      listingPrice = listingPrice.toString();
      const transaction = await contract.resellToken(id, priceFormatted, {
        value: listingPrice,
      });
      await transaction.wait();

      navigate("/");
    } catch (error) {
      console.error("Error while reselling");
    } finally {
      setLoading(false);
    }
  }
  const CID = extractCIDFromImage(image);
  console.log(CID);
  return (
    <SectionWrapper>
      <Text className="text-center text-black/80" title weight="semibold">
        Resell your NFT
      </Text>
      <Text subtitle className="text-black/40 text-center">
        Turn Your NFT into a Valuable Investment
      </Text>
      <div className="flex justify-center">
        <div className="w-1/2 flex flex-col p-12">
          {image && (
            <img
              className="rounded mt-4"
              width="350"
              src={`https://ipfs.io/ipfs/${CID}`}
            />
          )}
          <input
            placeholder="Asset Price in Eth"
            className="mt-2 border rounded p-4 focus:outline-none"
            onChange={(e) =>
              setFormInput({ ...formInput, price: e.target.value })
            }
          />
          <button
            onClick={listNFTForSale}
            className="font-bold mt-4 bg-primary text-white rounded p-4 shadow-lg"
          >
            {loading ? "Listing NFT..." : "List NFT"}
          </button>
        </div>
      </div>
    </SectionWrapper>
  );
}

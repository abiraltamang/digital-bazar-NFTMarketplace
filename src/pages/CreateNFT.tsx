import { useState } from "react";
import SectionWrapper from "../components/common/SectionWrapper";
import Text from "../components/common/Typography/Text";
import axios from "axios";
import { redirect } from "react-router-dom";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

const JWT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI3MTU2YjMzMi1mODhlLTQ2ZTctOTQyZS0yZGE2NjNlZjA3MDQiLCJlbWFpbCI6ImFiaXJhbC50YW1hbmc4MTZAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjRkM2IyZTllMGIxZDI5NTk2Yjk4Iiwic2NvcGVkS2V5U2VjcmV0IjoiZWFiZjQwOGZkYjBkZTYwYTBkMWM0ZjNkYjA3MWE4NGEyYjNhZDJjNzBhNWQyYmFiMWZhZTJjNzIyYmQ2ZmI1YiIsImlhdCI6MTcwMTI2NTk1MH0.iwH78a4e0jTH5aNGRnp2JZo_r7Hms6VaDjxdwTTlnP8";

//@ts-expect-error config
import { marketplaceAddress } from "../../config.js";
import NFTMarketplace from "../../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json";

console.log(marketplaceAddress);
export const CreateNFT = () => {
  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, setFormInput] = useState({
    name: "",
    price: "",
    description: "",
    external_url: "",
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      fileToIPFS(file);
      previewFile(file);
    }
  };
  const previewFile = (file) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      setFileUrl(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const fileToIPFS = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const pinataMetadata = JSON.stringify({
      name: formInput.name || "File name",
    });
    formData.append("pinataMetadata", pinataMetadata);

    try {
      const res = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          headers: {
            "Content-Type": `multipart/form-data;`,
            Authorization: `Bearer ${JWT}`,
          },
        }
      );
      console.log(res.data);

      const url = `ipfs://${res.data.IpfsHash}`;
      setFileUrl(url);
      console.log(url);
    } catch (error) {
      console.log("Error uploading file to IPFS:", error);
    }
  };

  async function uploadToIPFS() {
    const { name, description, price, external_url } = formInput;
    if (!name || !description || !price || !fileUrl) return;
    /* first, upload to IPFS */
    const data = JSON.stringify({
      pinataContent: {
        name,
        description,
        external_url,
        image: fileUrl,
      },
      pinataMetadata: {
        name: "metadata.json",
      },
    });
    try {
      const res = await axios.post(
        "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JWT}`,
          },
        }
      );
      const url = `ipfs://${res.data.IpfsHash}`;
      return url;
    } catch (error) {
      console.log(error);
    }
  }

  async function listNFTForSale() {
    const url = await uploadToIPFS();
    const web3Modal = new Web3Modal({ cacheProvider: true });
    const connection = await web3Modal.connect();
    if (!connection) {
      console.error("User rejected connection");
      return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = await provider.getSigner();

    /* next, create the item */
    const price = ethers.utils.parseUnits(formInput.price, "ether");
    const contract = new ethers.Contract(
      marketplaceAddress,
      NFTMarketplace.abi,
      signer
    );
    let listingPrice = await contract.getListingPrice();
    listingPrice = listingPrice.toString();
    const transaction = await contract.createToken(url, price, {
      value: listingPrice,
    });
    try {
      await transaction.wait();
      console.log("Transaction mined");
      redirect("/");
    } catch (error) {
      console.error("Transaction error:", error);
    }
  }

  return (
    <SectionWrapper>
      <div className="py-8">
        <Text className="text-center text-black/80" title weight="semibold">
          Create New NFT
        </Text>
        <Text subtitle className="text-black/40 text-center">
          You can set preferred display name, create your <b /> profile URL and
          manage other personal settings.
        </Text>
      </div>
      <div className="max-w-lg mx-auto flex flex-col py-8 space-y-4">
        <div className="flex flex-col">
          <label htmlFor="name" className="font-semibold text-primary">
            Name*
          </label>
          <input
            id="name"
            placeholder="Name your NFT"
            className="mt-2 border rounded p-2 focus:outline-none"
            onChange={(e) =>
              setFormInput({ ...formInput, name: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="file" className="font-semibold text-primary">
            Image
          </label>
          <input
            type="file"
            name="Asset"
            className="my-4"
            onChange={handleFileChange}
          />
        </div>
        {fileUrl && (
          <img alt="" className="rounded mt-4 w-32 h-32" src={fileUrl} />
        )}
        <div className="flex flex-col">
          <label htmlFor="description" className="font-semibold text-primary">
            Description*
          </label>
          <textarea
            id="description"
            placeholder="Enter a description"
            className="mt-2 border rounded p-4 w-full h-28 focus:outline-none"
            onChange={(e) =>
              setFormInput({ ...formInput, description: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="price" className="font-semibold text-primary">
            Price*
          </label>
          <input
            id="price"
            placeholder="Asset Price in Eth"
            className="mt-2 border rounded p-4 focus:outline-none"
            onChange={(e) =>
              setFormInput({ ...formInput, price: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="external_url" className="font-semibold text-primary">
            External Link
          </label>
          <input
            id="external_url"
            placeholder="https://collections.io/item/123"
            className="mt-2 border rounded p-4 focus:outline-none"
            onChange={(e) =>
              setFormInput({ ...formInput, external_url: e.target.value })
            }
          />
        </div>

        <button
          onClick={listNFTForSale}
          className="font-bold mt-4 bg-primary text-white rounded p-4 shadow-lg"
        >
          Create NFT
        </button>
      </div>
    </SectionWrapper>
  );
};

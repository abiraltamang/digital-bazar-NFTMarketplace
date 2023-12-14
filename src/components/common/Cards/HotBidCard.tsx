import Text from "../Typography/Text";
import Button from "../Button/Button";
import { extractCIDFromImage } from "../../../utils";
import { NFT } from "../../../pages/Home";
import { useNavigate } from "react-router-dom";
import BiddingModal from "./BiddingModal";
import { useState } from "react";

interface HotBidCardProps {
  nft: NFT;
  placeBid: (bidAmount: string) => void;
}

const HotBidCard = ({ nft, placeBid }: HotBidCardProps) => {
  const { image, name, price } = nft;
  const cid = extractCIDFromImage(image);
  const gatewayUrl = "https://ipfs.io";
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <div className="bg-gray-100 max-w-xs border rounded-md p-4 space-y-3 hover:shadow-lg hover:shadow-slate-300 transition-none ease-in-out delay-500">
      <div
        onClick={() => {
          navigate(`/product/${nft.tokenId}`);
        }}
      >
        <div className="w-full h-60 rounded-lg overflow-hidden">
          <img
            src={`${gatewayUrl}/ipfs/${cid}`}
            className="w-full h-full object-cover rounded-lg hover:scale-110 transition-all delay-50 ease-in-out"
            alt=""
          />
        </div>
        <div className="flex items-center justify-between ">
          <div>
            <Text weight="semibold">{name}</Text>
          </div>
          <Text
            className="px-2 py-1 border-2 border-gray-200 rounded-xl text-green-700"
            detail
          >
            {price} <span className="font-bold text-black pl-1">ETH</span>
          </Text>
        </div>
      </div>
      <Button
        className="hover:bg-primary/80 bg-primary/90 text-white"
        size="small"
        onClick={() => setIsModalOpen(!isModalOpen)}
      >
        <Text>Place Bid</Text>
      </Button>
      {isModalOpen && (
        <BiddingModal
          onClose={() => setIsModalOpen(!isModalOpen)}
          nft={nft}
          onPlaceBid={placeBid}
        />
      )}
    </div>
  );
};

export default HotBidCard;

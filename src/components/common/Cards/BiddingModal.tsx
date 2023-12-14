// BiddingModal.tsx
import Text from "../../common/Typography/Text";
import React, { useState } from "react";
import { NFT } from "../../../pages/Home";

interface BiddingModalProps {
  onPlaceBid: (bidAmount: string) => void;
  onClose: () => void;
  nft: NFT;
}

const BiddingModal: React.FC<BiddingModalProps> = ({
  onClose,
  nft,
  onPlaceBid,
}) => {
  const [inputBidAmount, setInputBidAmount] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handlePlaceBid = () => {
    // You can add validation for inputBidAmount here if needed
    if (!isNaN(Number(inputBidAmount))) {
      onPlaceBid(inputBidAmount);
      onClose();
    } else {
      setError("Invalid bid amount");
    }
  };

  return (
    <div className="fixed inset-[-20px] bg-black/50 bg-opacity-50 flex items-center justify-center text-primary z-50">
      <div className="bg-secondary p-4 rounded-md w-96">
        <Text weight="bold" className="text-2xl mb-2">
          Place a bid
        </Text>
        <Text className="text-primary/80 mb-2">
          You are about to place a bid for {nft.name}
        </Text>
        <label className="font-semibold" htmlFor="bid-input">
          Bid Price
        </label>
        <input
          id="bid-input"
          type="text"
          placeholder="Enter bid amount"
          value={inputBidAmount}
          onChange={(e) => setInputBidAmount(e.target.value)}
          className="w-full p-2 border rounded-md mb-2 focus:outline-none"
        />
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <div className="flex justify-between">
          <button
            onClick={handlePlaceBid}
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/80"
          >
            Place Bid
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-600 px-4 py-2 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BiddingModal;

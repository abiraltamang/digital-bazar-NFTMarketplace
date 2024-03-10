import React, { useState } from "react";
import Button from "../Button/Button";
import Text from "../Typography/Text";

interface BiddingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (bidAmount: number) => void;
}

const BiddingModal: React.FC<BiddingModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [bidAmount, setBidAmount] = useState<string>("");

  const handleConfirm = () => {
    if (isValidBidAmount(bidAmount)) {
      onConfirm(parseFloat(bidAmount));
      setBidAmount(""); // Reset bidAmount after confirmation
    }
  };

  const isValidBidAmount = (amount: string): boolean => {
    const regex = /^\d*\.?\d*$/;
    return regex.test(amount);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md">
            <Text className="mb-2">Enter Bid Amount:</Text>
            <input
              type="text"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              className="border p-2 rounded-md mb-2"
              placeholder="Bid amount (in ETH)"
            />
            <div className="flex justify-between">
              <Button
                className="bg-primary/90 hover:bg-primary/80 text-white"
                onClick={handleConfirm}
              >
                Place Bid
              </Button>
              <Button
                className="bg-red-500 hover:bg-red-400 text-white"
                onClick={onClose}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BiddingModal;

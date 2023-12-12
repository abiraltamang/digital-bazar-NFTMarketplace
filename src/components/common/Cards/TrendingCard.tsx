import { extractCIDFromImage } from "../../../utils";
import { useNavigate } from "react-router-dom";
import { NFT } from "../../../pages/Home";

type TrendingCardProps = {
  nft: NFT;
};

const TrendingCard = ({ nft }: TrendingCardProps) => {
  const { image, name, price } = nft;
  const cid = extractCIDFromImage(image);
  const gatewayUrl = "https://ipfs.io";
  const navigate = useNavigate();
  return (
    <div
      className="relative max-w-xs h-72 rounded-2xl overflow-hidden brightness-90 "
      onClick={() => navigate(`/product/${nft.tokenId}`)}
    >
      <img
        src={`${gatewayUrl}/ipfs/${cid}`}
        alt="YourImage"
        className="w-full h-full object-cover rounded-2xl brightness-80 hover:brightness-50"
      />
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent"></div>
      <div className="absolute bottom-0 left-0 p-4 w-full">
        <p className="text-white text-lg font-bold">{name}</p>
        <p className="text-white">Price ${price}</p>
      </div>
    </div>
  );
};

export default TrendingCard;

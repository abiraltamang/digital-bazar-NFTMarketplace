import Text from "../Typography/Text";
import Button from "../Button/Button";
import { Link } from "react-router-dom";

interface HotBidCardProps {
  image: string;
  title: string;
  price?: string;
}

const extractCIDFromImage = (image: string): string => {
  const cidIndex = image.lastIndexOf("/");
  return image.substring(cidIndex + 1);
};

const HotBidCard = ({ image, title, price }: HotBidCardProps) => {
  const cid = extractCIDFromImage(image);
  const gatewayUrl = "https://ipfs.io";
  return (
    <div className="bg-gray-100 max-w-xs border rounded-md p-4 space-y-3">
      <div className="w-full h-60 rounded-lg overflow-hidden">
        <img
          src={`${gatewayUrl}/ipfs/${cid}`}
          className="w-full h-full object-cover rounded-lg hover:scale-110 transition-all delay-50 ease-in-out"
          alt=""
        />
      </div>
      <div className="flex items-start justify-between ">
        <div>
          <Text weight="semibold">{title}</Text>
        </div>
        <Button size="small">{price}</Button>
      </div>
      <Link to="/products/:id">
        <div>
          <Text>Buy Now</Text>
        </div>
      </Link>
    </div>
  );
};

export default HotBidCard;

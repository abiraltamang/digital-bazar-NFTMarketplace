import { extractCIDFromImage } from "../../../utils";

type TrendingCardProps = {
  image: string;
  title: string;
  price: number;
};

const TrendingCard = ({ image, title, price }: TrendingCardProps) => {
  const cid = extractCIDFromImage(image);
  const gatewayUrl = "https://ipfs.io";
  return (
    <div className="relative max-w-xs h-72 rounded-2xl overflow-hidden ">
      <img
        src={image}
        alt="YourImage"
        className="w-full h-full object-cover rounded-2xl"
      />
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black to-transparent"></div>
      <div className="absolute bottom-0 left-0 p-4 w-full">
        <p className="text-white text-lg font-bold">{title}</p>
        <p className="text-white">Price ${price}</p>
      </div>
    </div>
  );
};

export default TrendingCard;

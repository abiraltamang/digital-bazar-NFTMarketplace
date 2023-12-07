import { NFT } from "../../../pages/Home";
import { extractCIDFromImage } from "../../../utils";
import Text from "../Typography/Text";
import Button from "../Button/Button";
type MyNFTProps = {
  nft: NFT;
  listNFT: (nft: NFT) => void;
};

const MyNFT = ({ nft, listNFT }: MyNFTProps) => {
  const { image, name, price } = nft;
  const cid = extractCIDFromImage(image);
  const gatewayUrl = "https://ipfs.io";

  return (
    <div>
      <div className="relative max-w-xs h-72 rounded-2xl overflow-hidden  transition-opacity group">
        <img
          src={`${gatewayUrl}/ipfs/${cid}`}
          alt="YourImage"
          className="w-full h-full object-cover rounded-2xl opacity-100 group-hover:brightness-50  group-hover:cursor-pointer "
        />
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-primary to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4 w-full">
          <Text className="text-white text-lg font-bold">{name}</Text>
          <Text className="text-white flex items-center">
            Price : {price} ETH
          </Text>
        </div>
      </div>
      <Button className="bg-primary/60" onClick={() => listNFT(nft)}>
        List
      </Button>
    </div>
  );
};

export default MyNFT;

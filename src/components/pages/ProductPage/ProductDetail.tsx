import Text from "../../common/Typography/Text";
import Button from "../../common/Button/Button";
import { NFT } from "../../../pages/Home";
import { extractCIDFromImage } from "../../../utils/index";
import { shortenAddress } from "../../../utils/index";

interface ProductDetailProps {
  nft: NFT;
  buyNFT: (nft: NFT) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({
  nft,
  buyNFT,
}: ProductDetailProps) => {
  const { image, name, description, price, owner } = nft;
  const CID = extractCIDFromImage(image);

  return (
    <div className="grid py-24 px-40 grid-cols-2 gap-6 rounded-xl">
      <div className="w-full h-ful hover:shadow-lg hover:shadow-gray-700 tansition-all ease-in-out duration-300 hover:cursor-pointer">
        <img
          src={`https://ipfs.io/ipfs/${CID}`}
          alt="product image"
          className="rounded-xl w-full h-full"
        />
      </div>
      <div className="pt-7 flex flex-col justify-center gap-4">
        <Text title weight="semibold" className="text-primary/90">
          {name}
        </Text>
        <p className="text-sm text-slate-700">
          by{" "}
          <span className="p-1 border-[1px] border-zinc-500 rounded-lg ">
            {shortenAddress(owner)}
          </span>
        </p>
        <Text subtitle weight="medium" className="text-black/50">
          {description}
        </Text>
        <Button secondary className="bg-primary/80 text-black">
          {price} ETH
        </Button>
        <Button primary onClick={() => buyNFT(nft)}>
          Buy Now
        </Button>
      </div>
    </div>
  );
};

export default ProductDetail;

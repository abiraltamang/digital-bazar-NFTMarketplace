import Text from "../../common/Typography/Text";
import Button from "../../common/Button/Button";
import { NFT } from "../../../pages/Home";
// import { extractCIDFromImage } from "../../../utils/index";

interface ProductDetailProps {
  nft: NFT;
}

const ProductDetail: React.FC<ProductDetailProps> = ({
  nft,
}: ProductDetailProps) => {
  const { image, name, description, price } = nft;
  // const CID = extractCIDFromImage(image);
  return (
    <div className="flex pt-[103px] mb-[113px]">
      <img
        // src={`https://ipfs.io/ipfs/${CID}`}
        src={image}
        alt="product image"
        className="pl-[150px] w-[480px] h-[450px]"
      />
      <div className="pl-[48px]">
        <Text title weight="semibold">
          {name}
        </Text>
        <Text title weight="bold">
          {description}
        </Text>
        <div className="space-x-[12px]">
          <Button primary size="small" rounded>
            {price}
          </Button>
          <Button primary size="small" rounded>
            {price}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

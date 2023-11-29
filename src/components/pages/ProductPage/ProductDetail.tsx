import Text from "../../common/Typography/Text";
import Button from "../../common/Button/Button";

interface ProductDetailProps {
  imageUrl: string;
  productName: string;
  productDescription: string;
  price: number;
}

const ProductDetail: React.FC<ProductDetailProps> = ({
  imageUrl,
  productName,
  productDescription,
  price,
}) => {
  return (
    <div className="flex pt-[103px] mb-[113px]">
      <img
        src={imageUrl}
        alt="product image"
        className="pl-[150px] w-[480px] h-[450px]"
      />
      <div className="pl-[48px]">
        <Text title weight="semibold">
          {productName}
        </Text>
        <Text title weight="bold">
          {productDescription}
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

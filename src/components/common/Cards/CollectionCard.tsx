import Text from "../Typography/Text";

interface CollectioncCardProps {
  image: string;
  title: string;
  totalETH: number;
}

const CollectioncCard = ({ image, title, totalETH }: CollectioncCardProps) => {
  return (
    <div className="w-full md:max-w-sm bg-primary/90 rounded-2xl text-secondary flex items-start justify-start gap-3 p-4 ">
      <div className="w-14 h-14">
        <img src={image} className="w-full h-full object-cover rounded-md" />
      </div>
      <div>
        <Text body weight="bold">
          {title}
        </Text>
        <Text detail weight="bold">
          {totalETH} ETH
        </Text>
      </div>
    </div>
  );
};

export default CollectioncCard;

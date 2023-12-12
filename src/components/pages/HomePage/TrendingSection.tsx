import Button from "../../common/Button/Button";
import TrendingCard from "../../common/Cards/TrendingCard";
import SectionWrapper from "../../common/SectionWrapper";
import Text from "../../common/Typography/Text";
import { NFT } from "../../../pages/Home";

interface TrendingSectionProps {
  showText?: boolean; // Optional prop to control whether to show the text or not
  customText?: string;
  nfts: NFT[];
}

const TrendingSection: React.FC<TrendingSectionProps> = ({
  showText = true,
  customText,
  nfts,
}) => {
  return (
    <SectionWrapper>
      <div>
        {showText && (
          <Text
            className="text-center text-black/60 pb-6"
            title
            weight="semibold"
          >
            {customText}
          </Text>
        )}
        {/* <div>
          <div>
            <Button>Al NFTs</Button>
            <Button>art</Button>
            <Button>Music</Button>
          </div>
        </div> */}
      </div>
      <div className="grid grid-cols-5 gap-4">
        {nfts.map((item, index) => (
          <TrendingCard
            key={index}
            image={item.image}
            title={item.name}
            price={item.price}
          />
        ))}
      </div>
    </SectionWrapper>
  );
};

export default TrendingSection;

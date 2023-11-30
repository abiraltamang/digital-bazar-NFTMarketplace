import Button from "../../common/Button/Button";
import TrendingCard from "../../common/Cards/TrendingCard";
import SectionWrapper from "../../common/SectionWrapper";
import Text from "../../common/Typography/Text";

const trendingcards = [
  {
    image: "/space.png",
    price: 5,
    title: "Funky Demi",
  },
  {
    image: "/image1.png",
    price: 5,
    title: "Funky Demi",
  },
  {
    image: "/space2.png",
    price: 5,
    title: "Funky Demi",
  },
  {
    image: "/background.jpg",
    price: 5,
    title: "Funky Demi",
  },
  {
    image: "/space2.png",
    price: 5,
    title: "Funky Demi",
  },
  {
    image: "/image1.png",
    price: 5,
    title: "Funky Demi",
  },
  {
    image: "/space2.png",
    price: 5,
    title: "Funky Demi",
  },
  {
    image: "/nft.png",
    price: 5,
    title: "Funky Demi",
  },
];

interface TrendingSectionProps {
  showText?: boolean; // Optional prop to control whether to show the text or not
  customText?: string;
}

const TrendingSection: React.FC<TrendingSectionProps> = ({
  showText = true,
  customText,
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
        <div>
          <div>
            <Button>Al NFTs</Button>
            <Button>art</Button>
            <Button>Music</Button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-4">
        {trendingcards.map((item, index) => (
          <TrendingCard
            key={index}
            image={item.image}
            title={item.title}
            price={item.price}
          />
        ))}
      </div>
    </SectionWrapper>
  );
};

export default TrendingSection;

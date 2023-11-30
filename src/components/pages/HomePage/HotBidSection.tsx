import HotBidCard from "../../common/Cards/HotBidCard";
import SectionWrapper from "../../common/SectionWrapper";
import Text from "../../common/Typography/Text";

const nfts = [
  {
    image: "/banner.png",
    title: "Dawn Hawk Photo",
    price: "$19.99",
  },
  {
    image: "/space2.png",
    title: "Dawn Hawk Photo",
    price: "$19.99",
  },
  {
    image: "/nft3.png",
    title: "A Man in Space",
    price: "$19.99",
  },
  {
    image: "/space2.png",
    title: "Dawn Hawk Photo",
    price: "$19.99",
  },
  {
    image: "/space.png",
    title: "A Man in Space",
    price: "$19.99",
  },
];
interface HotBidSectionProps {
  sectionText?: string; // Optional prop for custom section text
}

const HotBidSection: React.FC<HotBidSectionProps> = ({ sectionText }) => {
  return (
    <SectionWrapper>
      {sectionText && (
        <Text
          className="text-center text-black/60 pb-8"
          title
          weight="semibold"
        >
          {sectionText}
        </Text>
      )}
      <div className="grid grid-cols-5 gap-5">
        {nfts.map((nft, index: number) => (
          <HotBidCard
            key={index}
            image={nft.image}
            title={nft.title}
            price={nft.price}
          />
        ))}
      </div>
    </SectionWrapper>
  );
};

export default HotBidSection;

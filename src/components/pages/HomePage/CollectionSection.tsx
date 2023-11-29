import CollectionCard from "../../common/Cards/CollectionCard";
import SectionWrapper from "../../common/SectionWrapper";
import Text from "../../common/Typography/Text";

const cards = [
  {
    image: "/crypto/nft1.jpg",
    title: "NFT Funny Cat",
    totalETH: 23452,
  },
  {
    image: "/crypto/nft2.png",
    title: "NFT Funny Cat",
    totalETH: 23452,
  },
  {
    image: "/Cat.png",
    title: "NFT Funny Cat",
    totalETH: 23452,
  },
  {
    image: "/Cat.png",
    title: "NFT Funny Cat",
    totalETH: 23452,
  },
  {
    image: "/Cat.png",
    title: "NFT Funny Cat",
    totalETH: 23452,
  },
  {
    image: "/Cat.png",
    title: "NFT Funny Cat",
    totalETH: 23452,
  },
  {
    image: "/Cat.png",
    title: "NFT Funny Cat",
    totalETH: 23452,
  },
  {
    image: "/crypto/nft3.png",
    title: "NFT Funny Cat",
    totalETH: 23452,
  },
  {
    image: "/Cat.png",
    title: "NFT Funny Cat",
    totalETH: 23452,
  },
  {
    image: "/Cat.png",
    title: "NFT Funny Cat",
    totalETH: 23452,
  },
  {
    image: "/Cat.png",
    title: "NFT Funny Cat",
    totalETH: 23452,
  },
];

const CollectionSection = () => {
  return (
    <SectionWrapper>
      <Text className="text-center text-black/60 pb-8" title weight="semibold">
        Top Collections Over <span className="text-primary"> last 7 days</span>
      </Text>
      <div className="grid grid-cols-4 gap-4">
        {cards.map((card, index) => {
          return (
            <CollectionCard
              key={index}
              image={card.image}
              title={card.title}
              totalETH={card.totalETH}
            />
          );
        })}
      </div>
    </SectionWrapper>
  );
};

export default CollectionSection;

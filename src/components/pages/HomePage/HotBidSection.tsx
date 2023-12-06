import HotBidCard from "../../common/Cards/HotBidCard";
import SectionWrapper from "../../common/SectionWrapper";
import Text from "../../common/Typography/Text";
import { NFT } from "../../../pages/Home";

interface HotBidSectionProps {
  sectionText?: string;
  nfts: NFT[];
  buyNFT: (nft: NFT) => void;
}

const HotBidSection: React.FC<HotBidSectionProps> = ({
  sectionText = "🔥 Hot Bids",
  nfts,
  buyNFT,
}) => {
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
      <div className="grid grid-cols-2 sm:grid-cols-2  md:grid-cols-3  lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {nfts.map((nft, index: number) => (
          <HotBidCard key={index} nft={nft} buyNft={buyNFT} />
        ))}
      </div>
    </SectionWrapper>
  );
};

export default HotBidSection;

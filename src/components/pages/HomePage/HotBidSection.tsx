import HotBidCard from "../../common/Cards/HotBidCard";
import SectionWrapper from "../../common/SectionWrapper";
import Text from "../../common/Typography/Text";
import { NFT } from "../../../pages/Home";
import { FallingLines } from "react-loader-spinner";

interface HotBidSectionProps {
  sectionText?: string;
  loadingState?: "loaded" | "not-loaded";
  nfts: NFT[];
  buyNFT: (nft: NFT) => void;
}

const HotBidSection: React.FC<HotBidSectionProps> = ({
  sectionText = "🔥 Explore Latest NFTs",
  nfts,
  buyNFT,
  loadingState,
}) => {
  const sortedNfts = [...nfts].sort(
    (a, b) => Number(b.tokenId) - Number(a.tokenId)
  );

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
      {loadingState == "not-loaded" ? (
        <div className="flex justify-center items-center gap-4 ">
          <FallingLines color="#002F5B" width="80" visible={true} />
          <Text weight="semibold" className="text-center text-black/60">
            NFTs are loading
          </Text>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-2  md:grid-cols-3  lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {sortedNfts.map((nft, index: number) => (
              <HotBidCard key={index} nft={nft} buyNft={buyNFT} />
            ))}
          </div>
        </>
      )}
    </SectionWrapper>
  );
};

export default HotBidSection;

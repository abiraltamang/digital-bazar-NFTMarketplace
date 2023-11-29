import HotBidCard from "../../common/Cards/HotBidCard";
import SectionWrapper from "../../common/SectionWrapper";
import Text from "../../common/Typography/Text";

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
      <div className="grid grid-cols-4 gap-5">
        <HotBidCard
          image="/banner.png"
          title="Dawn Hawk Photo"
          price="$19.99"
        />
        <HotBidCard
          image="/Monkey.png"
          title="Dawn Hawk Photo"
          price="$19.99"
        />
        <HotBidCard
          image="/image1.png"
          title="Dawn Hawk Photo"
          price="$19.99"
        />
        <HotBidCard
          image="/image1.png"
          title="Dawn Hawk Photo"
          price="$19.99"
        />
      </div>
    </SectionWrapper>
  );
};

export default HotBidSection;

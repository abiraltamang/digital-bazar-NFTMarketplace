import HotBidSection from "../HomePage/HotBidSection";
import Text from "../../common/Typography/Text";

const ExploreBody = () => {
  return (
    <div>
      <div className="px-7 text-[#5F5858]">
        <Text title weight="bold">
          Explore Collections
        </Text>
        <Text detail weight="bold">
          10000 items
        </Text>
      </div>

      <HotBidSection />
      <HotBidSection />
      <HotBidSection />
    </div>
  );
};

export default ExploreBody;

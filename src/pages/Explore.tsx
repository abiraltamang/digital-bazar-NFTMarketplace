import ExploreBody from "../components/pages/ExplorePage/ExploreBody";
import Text from "../components/common/Typography/Text";
import SectionWrapper from "../components/common/SectionWrapper";

const Explore = () => {
  return (
    <SectionWrapper>
      <div className="flex justify-center">
        <Text title weight="bold" className="text-black/60">
          Explore Collections
        </Text>
      </div>
      <ExploreBody />
    </SectionWrapper>
  );
};

export default Explore;

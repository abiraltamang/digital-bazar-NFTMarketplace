// import Test from "../components/common/Test";
import Banner from "../components/pages/HomePage/Banner";
import CollectionSection from "../components/pages/HomePage/CollectionSection";
import HotBidSection from "../components/pages/HomePage/HotBidSection";
import HowItWorks from "../components/pages/HomePage/HowItWorks";
import TrendingSection from "../components/pages/HomePage/TrendingSection";

export default function Homepage() {
  return (
    <>
      <Banner />
      <HotBidSection sectionText="🔥 Hot Bids" />
      <TrendingSection customText="Trending Categories" />
      <CollectionSection />
      <HowItWorks />
      {/* <Test /> */}
    </>
  );
}

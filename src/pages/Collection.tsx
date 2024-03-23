import Profile from "../components/pages/CollectionPage/Profile";
import TabNavigation from "../components/pages/ProfilePage/TabNavigation";
import TrendingSection from "../components/pages/HomePage/TrendingSection";

const Collection = () => {
  const tabs = ["Items", "Activity"];
  return (
    <div>
      <Profile
        coverImage="/Cover image1.png"
        profileImage="/Profile.png"
        name="Abiral Blon"
        title=" Created by Abiral "
        description="  Unique, Fully 3D And Built To Unite The Design Multiverse. Designed And Styled By Digimental."
      />
      <TabNavigation tabs={tabs} />
      <TrendingSection showText={false} nfts={[]} />
    </div>
  );
};

export default Collection;

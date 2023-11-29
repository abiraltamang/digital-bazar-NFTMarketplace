import ProfileCard from "../components/pages/ProfilePage/ProfileCard";
import TabNavigation from "../components/pages/ProfilePage/TabNavigation";
import TrendingSection from "../components/pages/HomePage/TrendingSection";

const Profile = () => {
  const tabs = ["On Sale", "Owned", "Created", "Latest", "Collections"];
  return (
    <div>
      <ProfileCard
        coverImage="/Cover image.png"
        profileImage="/Profile.png"
        name="Arbin Koirala"
        address="0xb75ec484089cF6.....C0"
        description={
          <>
            Unique, Fully 3D And Built To Unite The Design Multiverse.
            <br />
            Designed And Styled By Digimental.
          </>
        }
      />
      <TabNavigation tabs={tabs} />
      <TrendingSection showText={false} />
    </div>
  );
};

export default Profile;

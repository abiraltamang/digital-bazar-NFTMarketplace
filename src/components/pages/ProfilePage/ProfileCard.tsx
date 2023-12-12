import React from "react";
import { shortenAddress } from "../../../utils";
import Text from "../../common/Typography/Text";

interface ProfileCardProps {
  coverImage: string;
  profileImage: string;
  name: string;
  walletAddress?: string;
  description: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  walletAddress,
  coverImage,
  profileImage,
  name,
  description,
}) => {
  return (
    <div className="w-full pb-4">
      <div className="w-full text-center text-[#333]">
        <img src={coverImage} alt="cover" className="w-full h-[120px]" />
        <img
          src={profileImage}
          alt="profilepic"
          className="w-[150px] border-r-[50%] mx-auto my-auto mt-[-95px]"
        />

        <h1 className="text-[24px] font-bold pt-[17px]">@{name}</h1>

        <div className=" flex items-center justify-center">
          <Text className="px-3 py-1 bg-primary/90 text-white w-[150px] rounded-xl">
            {shortenAddress(walletAddress)}
          </Text>
        </div>
        <Text weight="semibold" className="text-[#5F5858] pt-3 ">
          {description}
        </Text>
        <div className="flex items-center justify-center space-x-[20px] mt-[20px]">
          <div className="w-[40px] h-[40px] bg-[#00477F] rounded-[15px] flex items-center justify-center">
            <img src="/Share.png" alt="shareicon" />
          </div>
          <div className="w-[40px] h-[40px] bg-[#00477F] rounded-[15px] flex items-center justify-center">
            <img src="/Favorite.png" alt="favoriteicon" />
          </div>
          <div className="w-[40px] h-[40px] bg-[#00477F] rounded-[15px] flex items-center justify-center">
            <img src="/Ellipsis.png" alt="ellipsisicon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;

import React from "react";
import { Link } from "react-router-dom";
import { shortenAddress } from "../../../utils";
import Text from "../../common/Typography/Text";

interface ProfileCardProps {
  coverImage: string;
  profileImage: string;
  username: string | undefined;
  walletAddress?: string;
  description: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  username,
  walletAddress,
  coverImage,
  profileImage,
  description,
}) => {
  return (
    <div className="w-full pb-4">
      <div className="w-full text-center text-[#333]">
        <div className="w-full h-[120px]">
          <img
            src={coverImage}
            alt="cover"
            className="w-full h-full object-cover object-center"
          />
        </div>
        <img
          src={profileImage}
          alt="profilepic"
          className="w-[150px] border-r-[50%] mx-auto my-auto mt-[-95px] rounded-lg"
        />

        <h1 className="text-[24px] font-bold pt-[17px]">@{username}</h1>

        <div className=" flex items-center justify-center">
          <Text className="px-3 py-1 bg-primary/90 text-white w-[150px] rounded-xl">
            {shortenAddress(walletAddress || "")}
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
          <Link to="/editprofile">
            <div className="w-[40px] h-[40px] bg-[#00477F] rounded-[15px] flex items-center justify-center">
              <img src="/Ellipsis.png" alt="ellipsisicon" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;

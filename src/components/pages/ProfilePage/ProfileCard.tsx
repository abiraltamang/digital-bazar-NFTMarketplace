import React from "react";

interface ProfileCardProps {
  coverImage: string;
  profileImage: string;
  name: string;
  address: string;
  description: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  coverImage,
  profileImage,
  name,
  address,
  description,
}) => {
  return (
    <div className="w-full bg-[#212121] flex items-center justify-center mb-[80px]">
      <div className="w-full text-center bg-[#fff] text-[#333]">
        <img src={coverImage} alt="cover" className="w-full h-[120px]" />
        <img
          src={profileImage}
          alt="profilepic"
          className="w-[190px] border-r-[50%] mx-auto my-auto mt-[-95px]"
        />

        <h1 className="text-[24px] font-bold pt-[17px]">{name}</h1>
        <div className="w-[330px] h-[52px] bg-[#00477F] rounded-[10px] mx-auto my-4 flex items-center justify-center">
          <span className="text-white text-[20px] font-bold">{address}</span>
        </div>
        <p className="text-[#5F5858] font-bold text-[20px]">{description}</p>
        <div className="flex items-center justify-center space-x-[20px] mt-[20px]">
          <div className="w-[45px] h-[45px] bg-[#00477F] rounded-[15px] flex items-center justify-center">
            <img src="/Share.png" alt="shareicon" />
          </div>
          <div className="w-[45px] h-[45px] bg-[#00477F] rounded-[15px] flex items-center justify-center">
            <img src="/Favorite.png" alt="favoriteicon" />
          </div>
          <div className="w-[45px] h-[45px] bg-[#00477F] rounded-[15px] flex items-center justify-center">
            <img src="/Ellipsis.png" alt="ellipsisicon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;

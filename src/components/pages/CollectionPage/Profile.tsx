import React from "react";

interface ProfileProps {
  coverImage: string;
  profileImage: string;
  name: string;
  title: string;
  description: string;
}

const Profile: React.FC<ProfileProps> = ({
  coverImage,
  profileImage,
  name,
  title,
  description,
}) => {
  return (
    <div className="w-full bg-[#212121] flex items-center justify-center mb-[80px]">
      <div className="w-full text-center bg-[#fff] text-[#333]">
        <img src={coverImage} alt="cover" className="w-full h-[220px]" />
        <img
          src={profileImage}
          alt="profilepic"
          className="w-[190px] border-r-[50%] mx-auto my-auto mt-[-95px]"
        />

        <h1 className="text-[24px] font-bold pt-[17px]">{name}</h1>
        <p className="text-[#5F5858] font-bold text-[20px] pt-[17px] pb-[10px]">
          {title}
        </p>
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

export default Profile;

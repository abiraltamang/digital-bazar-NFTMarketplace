import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ChangeEvent } from "react";
import SectionWrapper from "../components/common/SectionWrapper";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { FaPencilAlt } from "react-icons/fa";

const EditProfile = () => {
  const navigate = useNavigate();
  const { address } = useWeb3ModalAccount();
  const [formData, setFormData] = useState({
    username: "",
    wallet_address: "",
    email: "",
    bio: "",
    socialNetworks: "",
    image: "",
  });

  useEffect(() => {
    loadUserData();
  }, []);

  async function loadUserData() {
    try {
      const response = await axios.post("http://localhost:8000/user", {
        wallet_address: address,
      });
      setFormData({
        username: response.data.username,
        wallet_address: response.data.wallet_address,
        email: response.data.email,
        bio: response.data.bio,
        socialNetworks: response.data.social_networks,
        image: response.data.image, // Load image data
      });
      console.log("user info", response.data); // Set user data in state
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedImage = e.target.files?.[0];
    if (selectedImage) {
      setFormData({
        ...formData,
        image: selectedImage,
      });
    }
  };

  const handleSubmit = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    try {
      const formDataWithImage = new FormData();
      formDataWithImage.append("image", formData.image);
      formDataWithImage.append("wallet_address", formData.wallet_address);
      formDataWithImage.append("username", formData.username);
      formDataWithImage.append("email", formData.email);
      formDataWithImage.append("bio", formData.bio);
      formDataWithImage.append("socialNetworks", formData.socialNetworks);

      const response = await axios.post(
        "http://localhost:8000/update-profile",
        formDataWithImage,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Profile updated successfully:", response.data);
      navigate("/account");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div>
      <div className="w-full h-[120px]">
        <img
          src={"/image1.png"}
          alt="cover"
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="relative">
        <input
          type="file"
          id="profileImageInput"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleImageChange}
        />
        <label htmlFor="profileImageInput">
          {formData.image ? (
            <img
              src={URL.createObjectURL(formData.image)}
              alt="profilepic"
              className="w-[150px] border-r-[50%] mx-auto my-auto mt-[-95px] rounded-lg cursor-pointer z-0"
            />
          ) : (
            <img
              src={"/profile.jpeg"}
              alt="profilepic"
              className="w-[150px] border-r-[50%] mx-auto my-auto mt-[-95px] rounded-lg cursor-pointer"
            />
          )}
          <div className="flex items-center gap-3 justify-center mt-4">
            <FaPencilAlt size="16" />
            <h2>Change Profile</h2>
          </div>
        </label>
      </div>

      <SectionWrapper>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <div className="flex flex-col my-5">
                <label htmlFor="username">Username</label>
                <input
                  className="w-full  h-10 rounded-md px-4"
                  placeholder="Enter Username"
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col my-5">
                <label htmlFor="wallet_address">Wallet Address</label>
                <input
                  className="w-full h-10 rounded-md px-4"
                  type="text"
                  id="wallet_address"
                  name="wallet_address"
                  value={formData.wallet_address}
                  readOnly
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col my-5">
                <label htmlFor="email">Enter Email</label>
                <input
                  className="w-full h-10 rounded-md px-4"
                  type="text"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col my-5">
                <label htmlFor="socialNetworks">Social network</label>
                <input
                  className="w-full h-10 rounded-md px-4"
                  type="text"
                  id="socialNetworks"
                  name="socialNetworks"
                  value={formData.socialNetworks}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <div className="flex flex-col my-5">
                <label htmlFor="bio">Bio</label>
                <textarea
                  className="w-full h-20 rounded-md px-4"
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  style={{ height: "200px", width: "100%" }}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center ">
            <button
              className="bg-primary/80 text-white rounded-md px-4 py-3"
              type="submit"
            >
              Save Changes
            </button>
          </div>
        </form>
      </SectionWrapper>
    </div>
  );
};

export default EditProfile;

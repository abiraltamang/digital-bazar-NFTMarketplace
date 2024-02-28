import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SectionWrapper from "../components/common/SectionWrapper";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { UserType } from "./Profile";

const EditProfile = () => {
  const navigate = useNavigate();
  const { address } = useWeb3ModalAccount();
  const [user, setUser] = useState<UserType | undefined>();
  const [formData, setFormData] = useState({
    username: "",
    wallet_address: "",
    email: "",
    bio: "",
    socialNetworks: "",
  });

  useEffect(() => {
    loadUserData();
  }, []);

  async function loadUserData() {
    try {
      const response = await axios.post("http://localhost:8000/user", {
        wallet_address: address,
      });
      setUser(response.data);
      setFormData({
        username: response.data.username,
        wallet_address: response.data.wallet_address,
        email: response.data.email,
        bio: response.data.bio,
        socialNetworks: response.data.socialNetworks,
      });
      console.log("user info", response.data); // Set user data in state
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a request to update user profile
      const response = await axios.put(
        "http://localhost:8000/update-profile",
        formData
      );

      // Handle successful response
      console.log("Profile updated successfully:", response.data);

      // Redirect user to their profile page
      navigate("/account");
    } catch (error) {
      // Handle error
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
      <h2 className="text-center text-lg font-bold text-black/80">
        Edit Profile
      </h2>
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
                  readOnly // Make it read-only
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
          </div>
          <button
            className="bg-primary/80 text-white rounded-md px-4 py-3"
            type="submit"
          >
            Save Changes
          </button>
        </form>
      </SectionWrapper>
    </div>
  );
};

export default EditProfile;

/* eslint-disable no-undef */
require("@nomicfoundation/hardhat-toolbox");
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [process.env.SEPOLIA_PRIVATE_KEY],
    },
  },
};

/* eslint-disable no-undef */
import hre from "hardhat";
import fs from "fs";

async function main() {
  const NFTMarketplace = await hre.ethers.getContractFactory("NFTMarketplace");
  const nftMarketplace = await NFTMarketplace.deploy();
  await nftMarketplace.waitForDeployment();
  console.log("NFTMarketplace object:", nftMarketplace);

  console.log("nftMarketplace deployed to:", nftMarketplace.target);

  fs.writeFileSync(
    "./config.js",
    `
  export const marketplaceAddress = "${nftMarketplace.target}"
  `
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

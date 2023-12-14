/* eslint-disable no-undef */
describe("NFTMarket", function () {
  it("Should create and execute market sales", async function () {
    /* deploy the marketplace */
    const NFTMarketplace = await ethers.getContractFactory("NFTMarketplace");
    const nftMarketplace = await NFTMarketplace.deploy();
    await nftMarketplace.waitForDeployment();

    const startTime = Math.floor(Date.now() / 1000);
    let listingPrice = await nftMarketplace.getListingPrice();
    listingPrice = listingPrice.toString();

    const auctionPrice = ethers.parseUnits("1", "ether");

    /* create two tokens */
    await nftMarketplace.createToken(
      "https://www.mytokenlocation.com",
      auctionPrice,
      { value: listingPrice, startTime }
    );
    await nftMarketplace.createToken(
      "https://www.mytokenlocation2.com",
      auctionPrice,
      { value: listingPrice, startTime }
    );

    const [buyerAddress] = await ethers.getSigners();

    const higherAmount = ethers.parseUnits("2", "ether");
    /* place  bids on the tokens*/
    await nftMarketplace
      .connect(buyerAddress)
      .placeBid(1, { value: higherAmount });
    await nftMarketplace
      .connect(buyerAddress)
      .placeBid(2, { value: higherAmount });

    // Wait for the required auction duration (in seconds)
    await ethers.provider.send("evm_increaseTime", [172800]); // Increase time by 1 hour

    /* end the auctions to finalize the sales */
    await nftMarketplace.endAuction(1);
    await nftMarketplace.endAuction(2);

    /* query for and return the unsold items */
    var items = await nftMarketplace.fetchMarketItems();
    items = await Promise.all(
      items.map(async (i) => {
        const tokenUri = await nftMarketplace.tokenURI(i.tokenId);
        let item = {
          price: i.price.toString(),
          tokenId: i.tokenId.toString(),
          seller: i.seller,
          owner: i.owner,
          tokenUri,
        };
        return item;
      })
    );
    console.log("items: ", items);
  });
});

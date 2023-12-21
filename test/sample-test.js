/* eslint-disable no-undef */
describe("NFTMarket", function () {
  it("Should create and execute market sales", async function () {
    /* deploy the marketplace */
    const NFTMarketplace = await ethers.getContractFactory("NFTMarketplace");
    const nftMarketplace = await NFTMarketplace.deploy();
    await nftMarketplace.waitForDeployment();

    let listingPrice = await nftMarketplace.getListingPrice();

    // const listingPrice = ethers.parseUnits("0.025", "ether");
    console.log("listing price: ", listingPrice);
    const auctionPrice = ethers.parseUnits("0.025", "ether");
    console.log("auction price: ", auctionPrice);

    /* create two tokens */
    await nftMarketplace.createToken(
      "https://www.mytokenlocation.com",
      auctionPrice,
      "https://www.myaudiolocation.com/audio.mp3",
      { value: listingPrice }
    );
    await nftMarketplace.createToken(
      "https://www.mytokenlocation2.com",
      auctionPrice,
      { value: listingPrice }
    );

    const [buyerAddress] = await ethers.getSigners();

    /* execute sale of token to another user */
    await nftMarketplace
      .connect(buyerAddress)
      .createMarketSale(1, { value: auctionPrice });

    /* resell a token */
    await nftMarketplace
      .connect(buyerAddress)
      .resellToken(1, auctionPrice, { value: listingPrice });

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
          audioUri: i.audioURI,
          tokenUri,
        };
        return item;
      })
    );
    console.log("items: ", items);
  });
});

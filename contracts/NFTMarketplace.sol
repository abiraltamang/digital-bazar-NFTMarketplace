// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "hardhat/console.sol";

contract NFTMarketplace is ERC721URIStorage {
    uint256 private _tokenIds;
    uint256 private _itemsSold;

    uint256 public listingPrice = 0.025 ether;
    address payable public owner;

    uint256 public auctionDuration = 5 minutes;
    mapping(uint256 => Auction) private idToAuction;

    struct Auction {
        uint256 tokenId;
        address payable highestBidder;
        uint256 highestBid;
        uint256 endTime;
        bool ended;
    }

    mapping(uint256 => MarketItem) private idToMarketItem;

    struct MarketItem {
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
    }

    event MarketItemCreated(
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold
    );

    event AuctionCreated(
        uint256 indexed tokenId,
        address creator,
        uint256 endTime
    );
    event BidPlaced(uint256 indexed tokenId, address bidder, uint256 bidAmount);
    event AuctionEnded(
        uint256 indexed tokenId,
        address winner,
        uint256 winningBid
    );

    constructor() ERC721("Metaverse Tokens", "METT") {
        owner = payable(msg.sender);
    }

    /* Updates the listing price of the contract */
    function updateListingPrice(uint256 _listingPrice) public payable {
        require(
            owner == msg.sender,
            "Only marketplace owner can update listing price."
        );
        listingPrice = _listingPrice;
    }

    /* Returns the listing price of the contract */
    function getListingPrice() public view returns (uint256) {
        return listingPrice;
    }

    /* Mints a token and lists it in the marketplace */
    function createToken(
        string memory tokenURI,
        uint256 price
    ) public payable returns (uint256) {
        _tokenIds++;
        uint256 newTokenId = _tokenIds;

        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        createMarketItem(newTokenId, price);
        return newTokenId;
    }

    function createMarketItem(uint256 tokenId, uint256 startingPrice) private {
        require(startingPrice > 0, "Price must be at least 1 wei");
        require(
            msg.value == listingPrice,
            "Price must be equal to listing price"
        );

        idToMarketItem[tokenId] = MarketItem(
            tokenId,
            payable(msg.sender),
            payable(address(this)),
            startingPrice,
            false
        );

        // Create an auction for the item
        idToAuction[tokenId] = Auction(
            tokenId,
            payable(address(0)),
            startingPrice,
            block.timestamp + auctionDuration,
            false
        );

        console.log("Auction created for tokenId:", tokenId);
        console.log("Auction end time:", idToAuction[tokenId].endTime);

        emit AuctionCreated(tokenId, msg.sender, idToAuction[tokenId].endTime);
        _transfer(msg.sender, address(this), tokenId);
        emit MarketItemCreated(
            tokenId,
            msg.sender,
            address(this),
            startingPrice,
            false
        );
    }

    function placeBid(uint256 tokenId) public payable {
        Auction storage auction = idToAuction[tokenId];

        require(block.timestamp < auction.endTime, "Auction has ended");
        require(
            msg.value > auction.highestBid,
            "Bid must be higher than the current highest bid"
        );

        if (auction.highestBidder != address(0)) {
            // Refund the previous highest bidder
            payable(auction.highestBidder).transfer(auction.highestBid);
        }

        console.log("Placing bid for tokenId:", tokenId);
        console.log("Auction end time:", auction.endTime);

        auction.highestBidder = payable(msg.sender);
        auction.highestBid = msg.value;

        emit BidPlaced(tokenId, msg.sender, msg.value);
    }

    function endAuction(uint256 tokenId) public {
        Auction storage auction = idToAuction[tokenId];

        require(!auction.ended, "Auction has already ended");
        require(
            block.timestamp >= auction.endTime,
            "Auction has not ended yet"
        );

        auction.ended = true;

        if (auction.highestBidder != address(0)) {
            // Transfer NFT to the highest bidder
            _transfer(address(this), auction.highestBidder, tokenId);

            // Transfer funds to the seller
            payable(idToMarketItem[tokenId].seller).transfer(
                auction.highestBid
            );

            emit AuctionEnded(
                tokenId,
                auction.highestBidder,
                auction.highestBid
            );
        } else {
            // If no bids, return the NFT to the seller
            _transfer(address(this), idToMarketItem[tokenId].seller, tokenId);
        }
    }

    function checkAndEndAuctions() public {
        uint256 itemCount = _tokenIds;

        for (uint256 i = 1; i <= itemCount; i++) {
            Auction storage auction = idToAuction[i];

            if (!auction.ended && block.timestamp >= auction.endTime) {
                endAuction(i);
            }
        }
    }

    /* allows someone to resell a token they have purchased */
    function resellToken(uint256 tokenId, uint256 price) public payable {
        require(
            idToMarketItem[tokenId].owner == msg.sender,
            "Only item owner can perform this operation"
        );
        require(
            msg.value == listingPrice,
            "Price must be equal to listing price"
        );
        idToMarketItem[tokenId].sold = false;
        idToMarketItem[tokenId].price = price;
        idToMarketItem[tokenId].seller = payable(msg.sender);
        idToMarketItem[tokenId].owner = payable(address(this));
        _itemsSold--;

        _transfer(msg.sender, address(this), tokenId);
    }

    /* Creates the sale of a marketplace item */
    /* Transfers ownership of the item, as well as funds between parties */
    function createMarketSale(uint256 tokenId) public {
        endAuction(tokenId);
        checkAndEndAuctions();
    }

    /* Returns all unsold market items */
    function fetchMarketItems() public view returns (MarketItem[] memory) {
        uint256 itemCount = _tokenIds;
        uint256 unsoldItemCount = _tokenIds - _itemsSold;
        uint256 currentIndex = 0;

        MarketItem[] memory items = new MarketItem[](unsoldItemCount);
        for (uint256 i = 1; i <= itemCount; i++) {
            if (idToMarketItem[i].owner == address(this)) {
                uint256 currentId = i;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    /* Returns only items that a user has purchased */
    function fetchMyNFTs() public view returns (MarketItem[] memory) {
        uint256 totalItemCount = _tokenIds;
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 1; i <= totalItemCount; i++) {
            if (idToMarketItem[i].owner == msg.sender) {
                itemCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint256 i = 1; i <= totalItemCount; i++) {
            if (idToMarketItem[i].owner == msg.sender) {
                uint256 currentId = i;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    /* Returns only items a user has listed */
    function fetchItemsListed() public view returns (MarketItem[] memory) {
        uint256 totalItemCount = _tokenIds;
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 1; i <= totalItemCount; i++) {
            if (idToMarketItem[i].seller == msg.sender) {
                itemCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint256 i = 1; i <= totalItemCount; i++) {
            if (idToMarketItem[i].seller == msg.sender) {
                uint256 currentId = i;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    //returns the only one market item based on token
    function fetchTokenDetails(
        uint256 tokenId
    ) public view returns (MarketItem memory) {
        return idToMarketItem[tokenId];
    }
}

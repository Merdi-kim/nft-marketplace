const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFTMarket", function () {
  it("Should create and execute marketplace sales", async function () {
    const MarketRef = await ethers.getContractFactory("NFTMarket");
    const market = await MarketRef.deploy()
    await market.deployed()
    const marketAddress = market.address

    const NFTRef = await ethers.getContractFactory("NFT")
    const nft = await NFTRef.deploy(marketAddress)
    nft.deployed()
    const nftAddress = nft.address

    let listingPrice = await market.getListingPrice()
    listingPrice = listingPrice.toString()

    const auctionPrice = ethers.utils.parseUnits('100', 'ether')

    await nft.createToken('https://www.mytokenlocation.com')
    await nft.createToken('https://www.mytokenlocation2.com')

    await market.createMarketItem(nftAddress, 1, auctionPrice, {value:listingPrice})
    await market.createMarketItem(nftAddress, 2, auctionPrice, {value:listingPrice})

    const [_, buyerAddress] = await ethers.getSigners()

    await market.connect(buyerAddress).createMarketSale(nftAddress, 1, {value:auctionPrice})

    const items = await market.fetchMarketItems()
    console.log('items', items)

  });
});

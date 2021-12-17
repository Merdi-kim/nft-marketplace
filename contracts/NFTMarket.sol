//SPDX-License-Identifier:UNLICENSED
pragma solidity>0.8.0;

import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts/token/ERC721/IERC721.sol';
import '@openzeppelin/contracts/security/ReentrancyGuard.sol';


contract NFTMarket is ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _itemIds;

    address payable owner;
    uint listingPrice = 0.025 ether;

    constructor() {
       owner = payable(msg.sender); 
    }

    struct MarketItem {
        uint itemId;
        address nftContract;
        uint tokenId;
        address payable owner;
        uint price;
    }

    mapping (uint256 => MarketItem) private idToMarketItem;

    function getListingPrice() public view returns (uint256) {
        return listingPrice;
    }

    function mintNFT (
        address _nftContract,
        uint256 _tokenId,
        uint256 _price
    ) public payable nonReentrant {
        require(_price > 0, "Price must be at least 1 wei");
        require(msg.value == listingPrice, "Price must be equal to listing Price");
        _itemIds.increment();
        uint256 itemId = _itemIds.current();

        idToMarketItem[itemId] = MarketItem(
            itemId,
            _nftContract,
            _tokenId,
            payable(msg.sender),
            _price
        );

    }

    function sellNFT(
        address _nftContract, 
        uint _itemId
    ) public payable nonReentrant {
        uint price = idToMarketItem[_itemId].price;
        uint tokenId = idToMarketItem[_itemId].tokenId;
        require(msg.value == price, "Please send the asked price");
        idToMarketItem[_itemId].owner.transfer(msg.value);
        IERC721(_nftContract).safeTransferFrom(idToMarketItem[_itemId].owner, msg.sender, tokenId);
        idToMarketItem[_itemId].owner = payable(msg.sender);
        payable(owner).transfer(listingPrice);
    }

    function fetchNFTs() public view returns (MarketItem[] memory) {
        uint itemCount = _itemIds.current();
        uint currentIndex = 0;
        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint i = 1; i <= itemCount; i++) {
            uint currentId = idToMarketItem[i].itemId;
            MarketItem storage currentItem = idToMarketItem[currentId];
            items[currentIndex] = currentItem;
            currentIndex += 1;
        }
        return items;
    }

    function fetchMyNFTs() public view returns (MarketItem[] memory) {
        uint totalItemCount = _itemIds.current();
        uint itemCount = 0;
        uint currentIndex = 0;

        for (uint i = 0; i < totalItemCount; i++) {
            if(idToMarketItem[i+1].owner == msg.sender) {
                itemCount += 1;
            }
            
        }

        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i +1].owner == msg.sender) {
                uint currentId = idToMarketItem[i+1].itemId;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }


}
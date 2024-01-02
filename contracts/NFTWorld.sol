// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title NFTWorld
 * @dev A decentralized marketplace for buying and selling NFTs (Non-Fungible Tokens).
 * Users can mint new NFTs, list them for sale, create collections, and buy NFTs from other users.
 * The contract utilizes the ERC721 standard for NFT implementation and incorporates security measures
 * such as reentrancy protection.
 */

contract NFTWorld is ERC721, ReentrancyGuard {
    // Struct representing an individual NFT
    struct NFT {
        uint256 id;
        uint8 mediaType;
        string mediaURI;
        address creator;
        address owner;
        uint256 price;
        bool forSale;
    }

    // Struct representing a collection of NFTs
    struct Collection {
        uint256 id;
        address owner;
        uint256[] nftIds;
        string metadataURI;
        string name;
    }

    uint256 public tokenCount;
    uint256 public collectionCount;
    uint256 public immutable feePercent;
    address payable public immutable manager;

    mapping(uint256 => NFT) public nfts;

    mapping(address => uint256[]) public userCollections;
    mapping(uint256 => Collection) public collections;

    // Events to emit on various actions
    event NFTCreated(uint256 indexed id, address indexed creator);
    event NFTCollectionAdded(
        address indexed creator,
        uint256 collectionId,
        uint256 nftId
    );
    event NewCollectionCreated(address indexed creator, uint256 collectionId);
    event NFTSaleEdited(uint256 indexed id, bool forSale);
    event NFTPriceEdited(uint256 indexed id, uint256 price);
    event NFTSold(
        uint256 indexed id,
        address indexed seller,
        address indexed buyer,
        uint256 price
    );
    event NFTTransfer(
        uint256 indexed id,
        address indexed from,
        address indexed to
    );

    // Modifier to check if the collection exists
    modifier collectionExists(uint256 collectionId) {
        require(collectionId <= collectionCount, "Collection does not exist");
        _;
    }

    // Modifier to check if the NFT exists and caller is the owner
    modifier nftChecker(uint256 nftId) {
        require(_exists(nftId), "NFT with this ID does not exist");
        require(ownerOf(nftId) == msg.sender, "Caller does not own this NFT");
        _;
    }

    /**
     * @dev Constructor
     */
    constructor() ERC721("NFTWorld", "NFTW") {
        feePercent = 1;
        manager = payable(msg.sender);
    }

    /**
     * @dev Function to mint a new NFT
     * @param mediaType Type of media associated with the NFT
     * @param mediaURI URI for accessing the media associated with the NFT
     * @param price Price of the NFT
     * @param forSale Flag indicating whether the NFT is listed for sale
     */
    function createNFT(
        uint8 mediaType,
        string memory mediaURI,
        uint256 price,
        bool forSale
    ) external {
        tokenCount++;
        require(!_exists(tokenCount), "NFT with this ID already exists");
        require(mediaType < 3, "Invalid Media Type");
        require(price > 0, "Price Must be greater then 0");
        _mint(msg.sender, tokenCount);
        NFT memory newNFT = NFT(
            tokenCount,
            mediaType,
            mediaURI,
            msg.sender,
            msg.sender,
            price,
            forSale
        );
        nfts[tokenCount] = newNFT;
        emit NFTCreated(tokenCount, msg.sender);
    }

    /**
     * @dev Function to mint a new NFT
     * @param mediaType Type of media associated with the NFT
     * @param mediaURI URI for accessing the media associated with the NFT
     * @param price Price of the NFT
     * @param forSale Flag indicating whether the NFT is listed for sale
     */
    function makeCollectionNFT(
        uint8 mediaType,
        string memory mediaURI,
        uint256 price,
        bool forSale,
        uint256 collectionId
    ) external collectionExists(collectionId) {
        tokenCount++;
        require(!_exists(tokenCount), "NFT with this ID already exists");
        require(
            msg.sender == collections[collectionId].owner,
            "Only owner can perform this action"
        );
        require(mediaType < 3, "Invalid Media Type");
        require(price > 0, "Price Must be greater then 0");
        _mint(msg.sender, tokenCount);
        NFT memory newNFT = NFT(
            tokenCount,
            mediaType,
            mediaURI,
            msg.sender,
            msg.sender,
            price,
            forSale
        );
        nfts[tokenCount] = newNFT;
        collections[collectionId].nftIds.push(tokenCount);
        emit NFTCreated(tokenCount, msg.sender);
    }

    /**
     * @dev Function to create a new collection
     * @param metadataHash URI for accessing the metadata associated with the collection
     */
    function createCollection(
        string memory metadataHash,
        string memory name
    ) external {
        collectionCount++;
        Collection memory newCollection = Collection(
            collectionCount,
            msg.sender,
            new uint256[](0),
            metadataHash,
            name
        );
        collections[collectionCount] = newCollection;
        userCollections[msg.sender].push(collectionCount);
        emit NewCollectionCreated(msg.sender, collectionCount);
    }

    /**
     * @dev Function to get user collections ids
     * @param user user account address
     */
    function getUserCollection(
        address user
    ) public view returns (uint256[] memory) {
        return userCollections[user];
    }

    /**
     * @dev Function to get user collection data
     * @param id ID of the collection
     */
    function getCollection(uint id) public view returns (Collection memory) {
        return collections[id];
    }

    /**
     * @dev Function to get collection data
     * @param nftId ID of the collection
     */
    function getCollectionByNFTId(
        uint256 nftId
    ) public view returns (Collection memory) {
        for (uint256 i = 1; i <= collectionCount; i++) {
            Collection storage collection = collections[i];
            for (uint256 j = 0; j < collection.nftIds.length; j++) {
                if (collection.nftIds[j] == nftId) {
                    return collection;
                }
            }
        }

        revert("Collection Not Found");
    }

    /**
     * @dev Function to add an NFT to a collection
     * @param collectionId ID of the collection
     * @param nftId ID of the NFT
     */
    function addToCollection(
        uint256 collectionId,
        uint256 nftId
    ) external collectionExists(collectionId) {
        require(_exists(nftId), "NFT with this ID does not exist");
        require(
            msg.sender == collections[collectionId].owner,
            "Only owner can perform this action"
        );
        collections[collectionId].nftIds.push(nftId);
        emit NFTCollectionAdded(msg.sender, collectionId, nftId);
    }

    /**
     * @dev Function to edit the sale status of an NFT
     * @param id ID of the NFT
     * @param forSale New sale status of the NFT
     */
    function editNFTSale(uint256 id, bool forSale) external nftChecker(id) {
        nfts[id].forSale = forSale;
        emit NFTSaleEdited(id, forSale);
    }

    /**
     * @dev Function to edit the price of an NFT
     * @param id ID of the NFT
     * @param price New price of the NFT
     */
    function editNFTPrice(uint256 id, uint256 price) external nftChecker(id) {
        require(price > 0, "Price must be greater then 0");
        nfts[id].price = price;
        emit NFTPriceEdited(id, price);
    }

    /**
     * @dev Function to buy an NFT
     * @param id ID of the NFT
     */
    function buyNFT(uint256 id) external payable nonReentrant {
        require(_exists(id), "NFT with this ID does not exist");
        require(nfts[id].forSale, "NFT is not listed for sale");
        require(ownerOf(id) != msg.sender, "Caller already owns this NFT");
        require(
            msg.value >= nfts[id].price * 1 ether,
            "Insufficient funds to purchase NFT"
        );
        address payable seller = payable(ownerOf(id));
        nfts[id].forSale = false;
        uint256 marketplaceFee = (nfts[id].price * feePercent) / 100;
        uint256 amountToSeller = nfts[id].price - marketplaceFee;
        _transfer(seller, msg.sender, id);
        seller.transfer(amountToSeller * 1 ether);
        manager.transfer(marketplaceFee);
        nfts[id].owner = msg.sender;
        emit NFTSold(id, seller, msg.sender, nfts[id].price);
    }
}

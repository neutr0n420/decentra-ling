// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract DecentraLing is ERC721, ReentrancyGuard, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    struct Video {
        string originalVideoHash; // IPFS hash of original video
        string translatedVideoHash; // IPFS hash of translated video
        address owner; // Owner of the video
        uint256 rentalPrice; // Price per day in wei
        uint256 royaltyPercentage; // Royalty percentage (e.g., 500 = 5%)
        bool isAvailableForRent; // Whether the video is available for rent
        string[] languages; // Available translation languages
    }

    struct Rental {
        address renter;
        uint256 startTime;
        uint256 endTime;
        bool active;
    }

    // Mapping from token ID to Video struct
    mapping(uint256 => Video) public videos;

    // Mapping from token ID to rental information
    mapping(uint256 => Rental) public rentals;

    // Mapping to track earnings for each video owner
    mapping(address => uint256) public earnings;

    // Events
    event VideoUploaded(
        uint256 indexed tokenId,
        address owner,
        string originalHash
    );
    event VideoTranslated(
        uint256 indexed tokenId,
        string language,
        string translatedHash
    );
    event VideoRented(
        uint256 indexed tokenId,
        address renter,
        uint256 startTime,
        uint256 endTime
    );
    event RentalEnded(uint256 indexed tokenId, address renter);
    event RoyaltyPaid(
        uint256 indexed tokenId,
        address owner,
        address renter,
        uint256 amount
    );

    constructor(
        address initialOwner
    ) ERC721("Translated Video NFT", "TVNFT") Ownable(initialOwner) {}

    function uploadVideo(
        string memory _originalVideoHash,
        uint256 _rentalPrice,
        uint256 _royaltyPercentage
    ) external returns (uint256) {
        require(
            _royaltyPercentage <= 10000,
            "Royalty percentage must be <= 100%"
        );

        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        videos[newTokenId] = Video({
            originalVideoHash: _originalVideoHash,
            translatedVideoHash: "",
            owner: msg.sender,
            rentalPrice: _rentalPrice,
            royaltyPercentage: _royaltyPercentage,
            isAvailableForRent: false,
            languages: new string[](0)
        });

        _safeMint(msg.sender, newTokenId);

        emit VideoUploaded(newTokenId, msg.sender, _originalVideoHash);

        return newTokenId;
    }

    function addTranslation(
        uint256 _tokenId,
        string memory _translatedVideoHash,
        string memory _language
    ) external {
        require(
            ownerOf(_tokenId) == msg.sender,
            "Only owner can add translation"
        );

        Video storage video = videos[_tokenId];
        video.translatedVideoHash = _translatedVideoHash;
        video.languages.push(_language);

        emit VideoTranslated(_tokenId, _language, _translatedVideoHash);
    }

    function setRentalAvailability(
        uint256 _tokenId,
        bool _isAvailable
    ) external {
        require(
            ownerOf(_tokenId) == msg.sender,
            "Only owner can set rental availability"
        );
        videos[_tokenId].isAvailableForRent = _isAvailable;
    }

    function rentVideo(
        uint256 _tokenId,
        uint256 _durationInDays
    ) external payable nonReentrant {
        Video storage video = videos[_tokenId];
        require(video.isAvailableForRent, "Video not available for rent");
        require(!rentals[_tokenId].active, "Video already rented");

        uint256 totalCost = video.rentalPrice * _durationInDays;
        require(msg.value >= totalCost, "Insufficient payment");

        // Calculate royalty
        uint256 royaltyAmount = (totalCost * video.royaltyPercentage) / 10000;
        earnings[video.owner] += royaltyAmount;

        // Create rental
        rentals[_tokenId] = Rental({
            renter: msg.sender,
            startTime: block.timestamp,
            endTime: block.timestamp + (_durationInDays * 1 days),
            active: true
        });

        emit VideoRented(
            _tokenId,
            msg.sender,
            block.timestamp,
            rentals[_tokenId].endTime
        );
        emit RoyaltyPaid(_tokenId, video.owner, msg.sender, royaltyAmount);
    }

    function endRental(uint256 _tokenId) external {
        Rental storage rental = rentals[_tokenId];
        require(rental.active, "No active rental");
        require(block.timestamp >= rental.endTime, "Rental period not over");

        rental.active = false;
        emit RentalEnded(_tokenId, rental.renter);
    }

    function withdrawEarnings() external nonReentrant {
        uint256 amount = earnings[msg.sender];
        require(amount > 0, "No earnings to withdraw");

        earnings[msg.sender] = 0;
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed");
    }

    // View functions
    function getVideo(uint256 _tokenId) external view returns (Video memory) {
        return videos[_tokenId];
    }

    function getRental(uint256 _tokenId) external view returns (Rental memory) {
        return rentals[_tokenId];
    }

    function getAvailableLanguages(
        uint256 _tokenId
    ) external view returns (string[] memory) {
        return videos[_tokenId].languages;
    }
}

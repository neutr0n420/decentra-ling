// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract DecentraLing {
    struct Video {
        string cid;
        address owner;
        uint256 rentPrice;
        bool isAvailable;
        uint256 royaltyPercentage; // in basis points (1% = 100)
    }

    struct Rental {
        address renter;
        uint256 startTime;
        uint256 duration;
        uint256 rentPrice;
        bool isActive;
    }

    // Mappings
    mapping(string => Video) public videos;
    mapping(string => Rental) public rentals;
    mapping(address => uint256) public earnings;

    // Array to track available video CIDs
    string[] private availableCids;
    mapping(string => uint256) private cidToIndex;

    // Events
    event VideoAvailable(
        string cid,
        uint256 rentPrice,
        uint256 royaltyPercentage
    );
    event VideoRented(string cid, address renter, uint256 duration);
    event RentalEnded(string cid, address renter);
    event EarningsWithdrawn(address owner, uint256 amount);

    // Modifiers
    modifier onlyVideoOwner(string memory cid) {
        require(videos[cid].owner == msg.sender, "Not the video owner");
        _;
    }

    modifier videoExists(string memory cid) {
        require(videos[cid].owner != address(0), "Video does not exist");
        _;
    }

    // 1. Make video available for renting
    function makeAvailableForRent(
        string memory cid,
        uint256 rentPrice,
        uint256 royaltyPercentage
    ) external {
        require(rentPrice > 0, "Rent price must be greater than 0");
        require(royaltyPercentage <= 5000, "Royalty cannot exceed 50%"); // Max 50%

        videos[cid] = Video({
            cid: cid,
            owner: msg.sender,
            rentPrice: rentPrice,
            isAvailable: true,
            royaltyPercentage: royaltyPercentage
        });

        // Add to available CIDs list
        availableCids.push(cid);
        cidToIndex[cid] = availableCids.length - 1;

        emit VideoAvailable(cid, rentPrice, royaltyPercentage);
    }

    // 2. Rent a video
    function rentVideo(
        string memory cid,
        uint256 duration
    ) external payable videoExists(cid) {
        Video storage video = videos[cid];
        require(video.isAvailable, "Video is not available for rent");
        require(
            msg.value >= video.rentPrice * duration,
            "Insufficient payment"
        );
        require(duration > 0, "Duration must be greater than 0");
        require(!rentals[cid].isActive, "Video is currently rented");

        // Remove from available CIDs list
        _removeFromAvailable(cid);
        video.isAvailable = false;

        // Create new rental
        rentals[cid] = Rental({
            renter: msg.sender,
            startTime: block.timestamp,
            duration: duration,
            rentPrice: video.rentPrice * duration,
            isActive: true
        });

        // Calculate and distribute earnings
        uint256 royalty = calculateRoyalty(cid, msg.value);
        earnings[video.owner] += royalty;

        emit VideoRented(cid, msg.sender, duration);
    }

    // 3. Calculate royalties
    function calculateRoyalty(
        string memory cid,
        uint256 amount
    ) public view videoExists(cid) returns (uint256) {
        Video storage video = videos[cid];
        return (amount * video.royaltyPercentage) / 10000;
    }

    // 4. End rental
    function endRental(string memory cid) external videoExists(cid) {
        Rental storage rental = rentals[cid];
        require(rental.isActive, "No active rental");
        require(
            msg.sender == rental.renter ||
                msg.sender == videos[cid].owner ||
                block.timestamp >=
                rental.startTime + (rental.duration * 1 days),
            "Not authorized or rental period not ended"
        );

        rental.isActive = false;
        videos[cid].isAvailable = true;

        // Add back to available CIDs list
        availableCids.push(cid);
        cidToIndex[cid] = availableCids.length - 1;

        emit RentalEnded(cid, rental.renter);
    }

    // 5. Withdraw earnings
    function withdrawEarnings() external {
        uint256 amount = earnings[msg.sender];
        require(amount > 0, "No earnings to withdraw");

        earnings[msg.sender] = 0;
        (bool success, ) = payable(msg.sender).call{value: amount}("");
        require(success, "Transfer failed");

        emit EarningsWithdrawn(msg.sender, amount);
    }

    // 6. Get all available videos
    function getAvailableVideos() external view returns (string[] memory) {
        return availableCids;
    }

    // Internal function to remove a CID from the available list
    function _removeFromAvailable(string memory cid) internal {
        uint256 index = cidToIndex[cid];
        uint256 lastIndex = availableCids.length - 1;

        // If the CID to remove is not the last one, swap it with the last element
        if (index != lastIndex) {
            string memory lastCid = availableCids[lastIndex];
            availableCids[index] = lastCid;
            cidToIndex[lastCid] = index;
        }

        // Remove the last element
        availableCids.pop();
        delete cidToIndex[cid];
    }

    // View functions
    function getVideo(string memory cid) external view returns (Video memory) {
        return videos[cid];
    }

    function getRental(
        string memory cid
    ) external view returns (Rental memory) {
        return rentals[cid];
    }

    function getEarnings() external view returns (uint256) {
        return earnings[msg.sender];
    }
}

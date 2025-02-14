export const CONTRACT_ADDRESS = "0x69bE5A6669582181857eB5030814F5e653EB5D06";
export const CONTRACT_ABI = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "EarningsWithdrawn",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "cid",
                "type": "string"
            }
        ],
        "name": "endRental",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "cid",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "rentPrice",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "royaltyPercentage",
                "type": "uint256"
            }
        ],
        "name": "makeAvailableForRent",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "cid",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "renter",
                "type": "address"
            }
        ],
        "name": "RentalEnded",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "cid",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "duration",
                "type": "uint256"
            }
        ],
        "name": "rentVideo",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "cid",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "rentPrice",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "royaltyPercentage",
                "type": "uint256"
            }
        ],
        "name": "VideoAvailable",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "cid",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "renter",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "duration",
                "type": "uint256"
            }
        ],
        "name": "VideoRented",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "withdrawEarnings",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "cid",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "calculateRoyalty",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "earnings",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getAvailableVideos",
        "outputs": [
            {
                "internalType": "string[]",
                "name": "",
                "type": "string[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getEarnings",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "cid",
                "type": "string"
            }
        ],
        "name": "getRental",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "renter",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "startTime",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "duration",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "rentPrice",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "isActive",
                        "type": "bool"
                    }
                ],
                "internalType": "struct DecentraLing.Rental",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "cid",
                "type": "string"
            }
        ],
        "name": "getVideo",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "cid",
                        "type": "string"
                    },
                    {
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "rentPrice",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "isAvailable",
                        "type": "bool"
                    },
                    {
                        "internalType": "uint256",
                        "name": "royaltyPercentage",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct DecentraLing.Video",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "name": "rentals",
        "outputs": [
            {
                "internalType": "address",
                "name": "renter",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "startTime",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "duration",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "rentPrice",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "isActive",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "name": "videos",
        "outputs": [
            {
                "internalType": "string",
                "name": "cid",
                "type": "string"
            },
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "rentPrice",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "isAvailable",
                "type": "bool"
            },
            {
                "internalType": "uint256",
                "name": "royaltyPercentage",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
] 
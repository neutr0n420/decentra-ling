'use client'
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/contracts/contractDetails"
import { useAppKitProvider } from "@reown/appkit/react"
import { Contract, ethers } from 'ethers';
import type { Provider } from "@reown/appkit/react";
import { CidType, MakeAvailableForRentContractParams, RentVideoContractFunctionParams } from "@/types/interface";

export function useContractInteraction() {

    const { walletProvider } = useAppKitProvider<Provider>('eip155');
    async function createContractInstance() {
        const ethersProvider = new ethers.providers.Web3Provider(walletProvider);
        const signer = await ethersProvider.getSigner();
        const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
        return contract;
    }
    async function makeAvailableForRent({ cid, rentPrice, royaltyFeesPercentage }: MakeAvailableForRentContractParams) {
        const contract = await createContractInstance();
        return await contract.makeAvailableForRent(cid, rentPrice, royaltyFeesPercentage);
    }
    async function getAvailableVideos() {
        const contract = await createContractInstance();
        return await contract.getAvailableVideos();
    }
    async function RentVideo({ cid, duration }: RentVideoContractFunctionParams) {
        const contract = await createContractInstance();
        return await contract.rentVideo(cid, duration);
    }
    async function getVideo(cid: string) {
        const contract = await createContractInstance();
        return await contract.getVideo(cid);
    }
    async function withdrawEarnings() {
        const contract = await createContractInstance();
        return await contract.withdrawEarnings();
    }
    async function endRental({ cid }: CidType) {
        const contract = await createContractInstance();
        return await contract.endRental(cid);
    }
    return { createContractInstance, makeAvailableForRent, getAvailableVideos, RentVideo, getVideo, withdrawEarnings, endRental }
}
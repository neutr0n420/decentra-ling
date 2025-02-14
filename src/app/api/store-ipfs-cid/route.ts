import { ConnectDB } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Wallet from "@/models/WalletIpfsSchema";

export async function POST(req: NextRequest) {
    try {
        await ConnectDB();
        const requestData = await req.json();
        const { walletAddress, CID } = requestData;

        // Validate inputs
        if (!walletAddress || !CID) {
            return NextResponse.json(
                { message: "Wallet address and CID are required" },
                { status: 400 }
            );
        }

        // Find or create wallet document
        let wallet = await Wallet.findOne({ address: walletAddress });

        if (!wallet) {
            // Create new wallet with initial CID array
            wallet = new Wallet({
                address: walletAddress,
                cids: [CID]
            });
            await wallet.save();

            return NextResponse.json({
                message: "New wallet registered successfully",
                wallet
            }, { status: 201 });
        }

        // For existing wallet, check if CID already exists
        if (!wallet.cids.includes(CID)) {
            // Add new CID to the array
            wallet.cids.push(CID);
            await wallet.save();

            return NextResponse.json({
                message: "CID added successfully",
                wallet
            }, { status: 200 });
        }

        return NextResponse.json({
            message: "CID already exists for this wallet",
            wallet
        }, { status: 200 });

    } catch (error: unknown) {
        console.error("Error in POST /api/wallet:", error);
        return NextResponse.json({
            message: "Error while processing wallet data",
            error: error
        }, { status: 500 });
    }
}
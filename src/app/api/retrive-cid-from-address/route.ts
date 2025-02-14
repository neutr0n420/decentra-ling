import { ConnectDB } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Wallet from "@/models/WalletIpfsSchema";

export async function GET(req: NextRequest) {
    try {
        await ConnectDB();

        // Get wallet address from URL parameters
        const searchParams = req.nextUrl.searchParams;
        const walletAddress = searchParams.get('address');

        // Validate wallet address
        if (!walletAddress) {
            return NextResponse.json({
                message: "Wallet address is required",
                success: false
            }, { status: 400 });
        }

        // Find wallet document
        const wallet = await Wallet.findOne({ address: walletAddress });

        // If wallet not found
        if (!wallet) {
            return NextResponse.json({
                message: "Wallet not found",
                success: false
            }, { status: 404 });
        }

        // Return CIDs array
        return NextResponse.json({
            message: "CIDs retrieved successfully",
            success: true,
            data: {
                address: wallet.address,
                cids: wallet.cids,
                updatedAt: wallet.updatedAt
            }
        }, { status: 200 });

    } catch (error: unknown) {
        console.error("Error in GET /api/wallet:", error);
        return NextResponse.json({
            message: "Error retrieving wallet data",
            success: false,
            error: error
        }, { status: 500 });
    }
}

// Optionally, you can also add a route to get CIDs for multiple addresses
export async function POST(req: NextRequest) {
    try {
        await ConnectDB();

        const { addresses } = await req.json();

        // Validate addresses array
        if (!addresses || !Array.isArray(addresses) || addresses.length === 0) {
            return NextResponse.json({
                message: "Valid addresses array is required",
                success: false
            }, { status: 400 });
        }

        // Find all wallets matching the provided addresses
        const wallets = await Wallet.find({
            address: { $in: addresses }
        });

        // Format response data
        const walletsData = wallets.map(wallet => ({
            address: wallet.address,
            cids: wallet.cids,
            updatedAt: wallet.updatedAt
        }));

        return NextResponse.json({
            message: "CIDs retrieved successfully",
            success: true,
            data: walletsData
        }, { status: 200 });

    } catch (error: unknown) {
        console.error("Error in POST /api/wallet/bulk:", error);
        return NextResponse.json({
            message: "Error retrieving wallet data",
            success: false,
            error: error
        }, { status: 500 });
    }
}
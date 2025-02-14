'use client';

import { useAppKitAccount } from "@reown/appkit/react";
import ConnectButton from "./ConnectButton";

export default function DashboardNavbar() {
    const { isConnected } = useAppKitAccount();
    // const { disconnect } = useAppKitEvents();


    return (
        <nav className="border-b">
            <div className=" mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between ">
                    {/* Left side - Logo/Name */}
                    <div className="flex items-center">
                        <span className="text-xl font-semibold">
                            Dashboard
                        </span>
                    </div>

                    {/* Right side - Wallet & Disconnect */}
                    <div className="flex items-center space-x-4">
                        {isConnected && (
                            <>
                                <ConnectButton />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
'use client'
import { useState, useEffect } from 'react';
import { useAppKitAccount } from "@reown/appkit/react";
import { useContractInteraction } from "@/utils/ContractFunction";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { ethers } from 'ethers';

export default function Setting() {
    const { isConnected } = useAppKitAccount();
    const [earnings, setEarnings] = useState<string>('0');
    const [isLoading, setIsLoading] = useState(true);
    const [isWithdrawing, setIsWithdrawing] = useState(false);
    const { createContractInstance, withdrawEarnings } = useContractInteraction();
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted && isConnected) {
            fetchEarnings();
        }
    }, [mounted, isConnected]);

    const fetchEarnings = async () => {
        try {
            setIsLoading(true);
            const contract = await createContractInstance();
            const earningsData = await contract.getEarnings();
            setEarnings(ethers.utils.formatEther(earningsData));
        } catch (error) {
            console.error("Error fetching earnings:", error);
        } finally {
            setIsLoading(false);
        }
    };
    const handleWithdraw = async () => {
        if (!isConnected) {
            window.alert('Please connect your wallet first!');
            return;
        }

        try {
            setIsWithdrawing(true);
            const tx = await withdrawEarnings();
            await tx.wait(); // Wait for transaction to be mined

            // Show success message
            window.alert('Withdrawal successful!');

            // Refresh earnings
            await fetchEarnings();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error("Error withdrawing earnings:", error);
            if (error.message.includes("No earnings to withdraw")) {
                window.alert('You have no earnings to withdraw.');
            } else {
                window.alert('Failed to withdraw earnings. Please try again.');
            }
        } finally {
            setIsWithdrawing(false);
        }
    };

    if (!mounted) {
        return null;
    }

    if (!isConnected) {
        return (
            <Card className="w-full max-w-lg mx-auto">
                <CardContent className="p-6">
                    <p className="text-center text-gray-500">
                        Please connect your wallet to view and withdraw your earnings
                    </p>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className='min-h-screen flex items-center justify-center'>
            <Card className="w-full max-w-lg mx-auto">
                <CardHeader>
                    <CardTitle className="text-xl font-bold">Your Earnings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {isLoading ? (
                        <div className="flex items-center justify-center space-x-2">
                            <Loader2 className="h-5 w-5 animate-spin" />
                            <p>Loading earnings...</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <p className="text-sm font-medium text-gray-500">Available Balance</p>
                                <p className="text-2xl font-bold">{earnings} SEI</p>
                            </div>

                            <Button
                                onClick={handleWithdraw}
                                disabled={isWithdrawing || Number(earnings) <= 0}
                                className="w-full"
                            >
                                {isWithdrawing ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Withdrawing...
                                    </>
                                ) : (
                                    'Withdraw Earnings'
                                )}
                            </Button>

                            {Number(earnings) <= 0 && (
                                <p className="text-sm text-gray-500 text-center">
                                    You currently have no earnings to withdraw
                                </p>
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
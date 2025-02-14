'use client';

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAppKitAccount } from "@reown/appkit/react";
import { useContractInteraction } from "@/utils/ContractFunction";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default function Rent({ params }: { params: Promise<{ cid: string }> }) {
    const { isConnected } = useAppKitAccount();
    const [mounted, setMounted] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [videoData, setVideoData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [duration, setDuration] = useState('1');
    const [isRenting, setIsRenting] = useState(false);
    const { getVideo, RentVideo } = useContractInteraction();

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted && isConnected) {
            fetchData();
        }
    }, [mounted, isConnected]);

    async function fetchData() {
        try {
            setIsLoading(true);
            const cid = (await params).cid;
            const contract = await getVideo(cid);
            setVideoData(contract);
        } catch (error) {
            console.error("Error fetching video data:", error);
        } finally {
            setIsLoading(false);
        }
    }

    const truncateString = (str: string, first = 6, last = 4) => {
        if (!str) return "";
        if (str.length <= first + last) return str;
        return `${str.slice(0, first)}...${str.slice(-last)}`;
    };

    const hexToDecimal = (hexObj: { type: string; hex: string }) => {
        if (hexObj && hexObj.hex) {
            return parseInt(hexObj.hex, 16);
        }
        return 0;
    };

    const handleRentSubmit = async () => {
        if (!isConnected || !mounted) {
            window.alert('Connect your wallet first!');
            return;
        }

        try {
            setIsRenting(true);
            const cid = (await params).cid;
            const durationInDays = parseInt(duration);
            //[TODO: This payable functions is not working properly after integration come back and have a look once]
            await RentVideo({ cid, duration: durationInDays });
            setIsModalOpen(false);
            fetchData();
        } catch (error) {
            console.error("Error renting video:", error);
            window.alert('Failed to rent video. Please try again.');
        } finally {
            setIsRenting(false);
        }
    };

    if (!mounted) {
        return null;
    }

    if (!isConnected) {
        return (
            <Card className="w-full max-w-lg mx-auto">
                <CardContent className="p-6">
                    <p className="text-center text-gray-500">Please connect your wallet to view video details</p>
                </CardContent>
            </Card>
        );
    }

    if (isLoading) {
        return (
            <Card className="w-full max-w-lg mx-auto">
                <CardContent className="p-6">
                    <div className="flex items-center justify-center space-x-2">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <p>Loading video details...</p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (!videoData) {
        return (
            <Card className="w-full max-w-lg mx-auto">
                <CardContent className="p-6">
                    <p className="text-center text-gray-500">No video data found</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <>
            <Card className="w-full max-w-lg mx-auto">
                <CardHeader>
                    <CardTitle className="text-xl font-bold">Video Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <div className="flex flex-col space-y-1">
                            <span className="text-sm font-medium text-gray-500">CID</span>
                            <span className="font-mono text-sm">
                                {truncateString(videoData[0], 12, 8)}
                            </span>
                        </div>

                        <div className="flex flex-col space-y-1">
                            <span className="text-sm font-medium text-gray-500">Owner Address</span>
                            <span className="font-mono text-sm">
                                {truncateString(videoData[1])}
                            </span>
                        </div>

                        <div className="flex flex-col space-y-1">
                            <span className="text-sm font-medium text-gray-500">Rent Price</span>
                            <span>
                                {hexToDecimal(videoData[2])} Wei
                            </span>
                        </div>

                        <div className="flex flex-col space-y-1">
                            <span className="text-sm font-medium text-gray-500">Availability Status</span>
                            <Badge variant={videoData[3] ? "default" : "destructive"}>
                                {videoData[3] ? "Available" : "Not Available"}
                            </Badge>
                        </div>

                        <div className="flex flex-col space-y-1">
                            <span className="text-sm font-medium text-gray-500">Royalty Percentage</span>
                            <span>
                                {hexToDecimal(videoData[4])}%
                            </span>
                        </div>
                        <Button
                            onClick={() => setIsModalOpen(true)}
                            disabled={!videoData[3]}
                        >
                            Rent Now
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Rent Video</DialogTitle>
                        <DialogDescription>
                            Set the duration for how long you want to rent this video.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Rental Duration (days)
                            </label>
                            <Input
                                type="number"
                                min="1"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                placeholder="Enter number of days"
                                className="w-full"
                            />
                        </div>

                        <div className="space-y-1">
                            <p className="text-sm font-medium">Price per day:</p>
                            <p className="text-sm">{hexToDecimal(videoData[2])} Wei</p>
                        </div>

                        <div className="space-y-1">
                            <p className="text-sm font-medium">Total price:</p>
                            <p className="text-sm">{hexToDecimal(videoData[2]) * parseInt(duration || '0')} Wei</p>
                        </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button
                            onClick={handleRentSubmit}
                            disabled={isRenting || !duration || parseInt(duration) < 1}
                        >
                            {isRenting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Confirming
                                </>
                            ) : (
                                'Confirm Rental'
                            )}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
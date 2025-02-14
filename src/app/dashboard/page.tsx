'use client';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useAppKitAccount } from "@reown/appkit/react"
import { useEffect, useState } from "react"
import axios from "axios";
import { ReturnAPIData } from "@/types/interface"
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
    const { address, isConnected } = useAppKitAccount();
    const [videos, setVideos] = useState<{ id: number; cid: string; name: string; rentRoyalty: string; }[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<unknown>(null);

    useEffect(() => {
        async function fetchCID() {
            if (!address) return;

            setLoading(true);
            setError(null);

            try {
                const response = await axios.get<ReturnAPIData>(`/api/retrive-cid-from-address?address=${address}`);
                console.log("API Response:", response.data);

                if (response.data.success) {
                    // Assuming the CIDs are in response.data.data.cids
                    setVideos(response.data.data.cids.map((cid, index) => ({
                        id: index + 1,
                        cid: cid,
                        name: `Video ${index + 1}`, // You might want to store video names in your DB
                        rentRoyalty: "0.1 ETH" // Example value
                    })));
                }
            } catch (err: unknown) {
                console.error("Error fetching CIDs:", err);
                setError(err as unknown);
            } finally {
                setLoading(false);
            }
        }

        if (isConnected && address) {
            fetchCID();
        }
    }, [isConnected, address]); // Add address as dependency
    // const handleCID = (cid: string) => {
    //     return (
    //         <Link href={process.env.NEXT_PUBLIC_GATEWAY_URL}/></Link>
    //     )
    // }
    if (loading) {
        return <div className="text-center py-10">Loading videos...</div>;
    }

    if (error) {
        return <div className="text-center py-10 text-red-500">Error</div>;
    }

    return (
        <div className="w-3/4 mx-auto">
            <h1 className="text-center text-4xl font-bold text-muted-foreground mb-8">
                Manage your Videos
            </h1>

            {videos.length === 0 ? (
                <p className="text-center text-muted-foreground">
                    No videos found for this wallet address.
                </p>
            ) : (
                <Table className="">
                    <TableHeader>
                        <TableRow className="text-center">
                            <TableHead className="w-[100px]">Video Id</TableHead>
                            <TableHead>IPFS CID</TableHead>
                            <TableHead>Video Name</TableHead>
                            <TableHead className="text-right">Rent</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {videos.map((video) => (
                            <TableRow key={video.id}>
                                <TableCell className="font-medium">{video.id}</TableCell>
                                <TableCell className="font-mono text-sm">
                                    <Link href={`https://${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${video.cid}`}>
                                        {video.cid.slice(0, 20)}...
                                    </Link>
                                </TableCell>
                                <TableCell>{video.name}</TableCell>
                                <TableCell className="text-right">
                                    <Link href={`/dashboard/rent-video/${video.cid}`}>
                                        <Button>
                                            Manage access
                                        </Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </div>
    );
}
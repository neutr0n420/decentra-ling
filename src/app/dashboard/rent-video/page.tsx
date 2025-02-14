'use client';

import { useContractInteraction } from "@/utils/ContractFunction";
import { useAppKitAccount } from "@reown/appkit/react";
import {
    Table,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function RegisterContent() {
    const [videoCidArray, setVideoCidArray] = useState<string[]>([])
    const { isConnected } = useAppKitAccount();
    const index = 0;

    const { getAvailableVideos } = useContractInteraction()
    useEffect(() => {
        if (isConnected) {
            getActiveRentals()
        }
        async function getActiveRentals() {
            const getVideosCIDs = await getAvailableVideos()
            setVideoCidArray(getVideosCIDs);
            console.log(videoCidArray)
        }
    }, [isConnected])
    console.log("COntent he content", videoCidArray)
    return (
        <div className="w-3/4 mx-auto">
            {videoCidArray.length === 0 ? (
                <div>No Content avilable Right now</div>
            ) : (
                <Table>
                    <TableHeader>
                        <TableRow className="text-center">
                            <TableHead>Sr. No</TableHead>
                            <TableHead>IPFS CID</TableHead>
                            <TableHead className="text-right">Details Here</TableHead>
                        </TableRow>
                        {videoCidArray.map((cid) => (
                            <TableRow key={cid}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{cid.slice(0, 5)}...{cid.slice(52, 57)}</TableCell>
                                <TableCell className="text-right">
                                    <Link href={`/dashboard/rent-video/${cid}/rent`}>
                                        <Button>More Info</Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))

                        }
                    </TableHeader>
                </Table>
            )}


        </div>
    )
}
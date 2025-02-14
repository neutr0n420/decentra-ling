'use client'
import { useContractInteraction } from "@/utils/ContractFunction"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export default function Page({ params }: { params: Promise<{ cid: string }> }) {
    const [VideoData, setVideoData] = useState({
        rentPrice: 0,
        royaltyPercentage: 0
    })
    const [loader, setLoader] = useState(false)

    // console.log('CID', search)

    const { makeAvailableForRent } = useContractInteraction()
    async function contractTest() {
        const cid = (await params).cid
        console.log(cid)
        setLoader(true)
        const contract = await makeAvailableForRent({ cid, rentPrice: 100, royaltyFeesPercentage: 10 });
        console.log(contract)
        setVideoData({ rentPrice: 0, royaltyPercentage: 0 });
        console.log(false)
    }
    return (
        <div className="min-h-screen text-black w-full flex items-center justify-center bg-gray-100">
            <Card className="w-[450px] mx-auto px-8 flex flex-col justify-center ">
                <CardHeader>
                    <CardTitle>Make Availabe for Rent</CardTitle>
                    <CardDescription>Publish it with one-click</CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Rent price</Label>
                                <Input onChange={e => setVideoData({ ...VideoData, rentPrice: Number(e.target.value) })} id="rent-price" type="number" placeholder="Please enter the Rent price" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="framework">Royalty Fees Percentage</Label>
                                <Input id="rent-price" type="number" onChange={e => setVideoData({ ...VideoData, royaltyPercentage: Number(e.target.value) })} max={100} placeholder="Please Enter the Royalty Percentage" />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Button
                        disabled={VideoData.rentPrice == 0 || VideoData.royaltyPercentage == 0 || loader}
                        className="bg-blue-500 hover:bg-blue-600 text-white"
                        onClick={contractTest}
                    >Publish</Button>
                </CardFooter>
            </Card>
        </div>
    )
}
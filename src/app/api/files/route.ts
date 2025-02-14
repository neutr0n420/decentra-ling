import { NextResponse, type NextRequest } from "next/server";
import { pinata } from "@/utils/pinataConfig";

export async function POST(request: NextRequest) {
    try {
        const data = await request.formData();
        const fileBuffer = data.get("fileBuffer") as unknown as Buffer;
        const fileName = data.get("fileName") as string;

        if (!fileBuffer) {
            return NextResponse.json(
                { error: "No file buffer provided" },
                { status: 400 }
            );
        }

        // Create a File object directly from the buffer
        const videoFile = new File([fileBuffer], fileName || 'output.mp4', {
            type: "video/mp4",
            lastModified: Date.now(),
        });

        // Log file details for debugging
        console.log("File size:", videoFile.size);
        console.log("File name:", videoFile.name);

        // Upload to Pinata
        const uploadData = await pinata.upload.file(videoFile);
        const url = await pinata.gateways.convert(uploadData.IpfsHash);

        return NextResponse.json({
            url,
            size: videoFile.size,
            type: videoFile.type,
            name: videoFile.name,
            ipfsHash: uploadData.IpfsHash
        }, { status: 200 });

    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json(
            {
                error: "Internal Server Error",
                details: error instanceof Error ? error.message : String(error)
            },
            { status: 500 }
        );
    }
}
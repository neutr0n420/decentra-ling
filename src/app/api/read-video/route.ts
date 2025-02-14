import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {  // Changed from GET to POST
    try {
        const reqBody = await req.json();
        const { getFilePath } = reqBody;
        // Get the absolute path to the video file
        const filePath = path.join(process.cwd(), 'public', 'uploads', getFilePath);

        console.log(filePath);
        // Debug: Log the path and check if file exists
        console.log('Attempting to read file from:', filePath);

        try {
            // Check if file exists before trying to read it
            await fs.access(filePath);
        } catch (error: unknown) {
            console.log('File does not exist at path:', filePath, error);
            return NextResponse.json({
                error: 'File not found',
                path: filePath
            }, { status: 404 });
        }

        // Read the file
        const videoBuffer = await fs.readFile(filePath);

        return new Response(videoBuffer, {
            headers: {
                'Content-Type': 'video/mp4',
            },
        });
    } catch (error) {
        console.error('Error reading video:', error);
        return NextResponse.json({
            error: 'Failed to read video file',
            details: error instanceof Error ? error.message : String(error)
        }, { status: 500 });
    }
}
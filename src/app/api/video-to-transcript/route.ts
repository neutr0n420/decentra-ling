// app/api/upload-video/route.ts
import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import fs from 'fs';
import { join } from "path";
import { openAI } from "@/utils/openai"
import { translation } from "@/utils/translation";
import { ConvertToSpeech } from "@/utils/ConvertToSpeech";
import { UniqueFileName } from "@/utils/uniqueFileName";
import { translatedScriptInterface } from "@/types/interface";
import { mergeAudioVideo } from "@/utils/ReplaceVideoAudioFunction";


export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const video = formData.get("video") as File | null;
        const language = formData.get("translation-language") as string;

        if (!video) {
            return NextResponse.json(
                { error: "No video file provided" },
                { status: 400 }
            );
        }

        // Validate file type
        if (!video.type.startsWith("video/")) {
            return NextResponse.json(
                { error: "File must be a video" },
                { status: 400 }
            );
        }

        const filename = UniqueFileName(video);
        // Create uploads directory if it doesn't exist
        const uploadDir = join(process.cwd(), "public", "uploads");

        try {
            // Convert File to Buffer
            const bytes = await video.arrayBuffer();
            const buffer = Buffer.from(bytes);

            // Write file to public/uploads
            const filePath = join(uploadDir, filename);
            await writeFile(filePath, buffer);

            // Generate public URL
            const fileUrl = `/uploads/${filename}`;

            try {
                const readStream = fs.createReadStream(filePath)
                const transcription = await openAI.audio.translations.create({
                    file: readStream,
                    model: 'whisper-1'
                });
                const translatedTranscript = await translation(transcription.text, language);
                const dubbedAudioSpeechPath = await ConvertToSpeech(translatedTranscript as translatedScriptInterface);

                const outFolderDir = path.join(process.cwd(), 'public', 'uploads', 'output');

                const finalVideoPath = await mergeAudioVideo({ videoPath: filePath, audioPath: dubbedAudioSpeechPath, outputDir: outFolderDir });

                const finalVideoUrl = `/output/${path.basename(finalVideoPath)}`;
                return NextResponse.json({
                    message: "Transcription generated sucessfully",
                    fileName: filename,
                    fileUrl: fileUrl,
                    flePath: filePath,
                    transcription: transcription.text,
                    translationLanguage: language,
                    translatedTranscript: translatedTranscript,
                    dubbedAudioSpeechPath: dubbedAudioSpeechPath,
                    DubbedVideoUrl: finalVideoUrl,
                    sucess: true,
                }, { status: 200 })
            } catch (error: unknown) {
                return NextResponse.json({
                    message: `${error}`
                }, {
                    status: 500
                }
                )
            }



        } catch (error) {
            console.error("Error saving file:", error);
            return NextResponse.json(
                { error: "Error saving video file" },
                { status: 500 }
            );
        }

    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            );
        }
        return NextResponse.json(
            { error: "An unknown error occurred" },
            { status: 500 }
        );
    }
}



// Configure segment config for larger files
export const config = {
    api: {
        bodyParser: false,
        responseLimit: '100mb',
    },
};
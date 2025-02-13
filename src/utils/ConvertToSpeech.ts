import fs from 'fs';
import path from "path";
import { openAI } from "@/utils/openai"
import { translatedScriptInterface } from "@/types/interface";
import { UniqueFileName } from './uniqueFileName';

export async function ConvertToSpeech(translatedScript: translatedScriptInterface) {


    const mp3 = await openAI.audio.speech.create({
        model: "tts-1",
        voice: 'sage',
        input: translatedScript.content
    });
    const buffer = Buffer.from(await mp3.arrayBuffer());
    const fileName = UniqueFileName(buffer)
    const speechFile = path.resolve(`./public/uploads/dubed-audio/${fileName}`);
    await fs.promises.writeFile(speechFile, buffer);
}
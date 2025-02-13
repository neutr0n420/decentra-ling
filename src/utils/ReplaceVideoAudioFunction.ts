import ffmpeg from 'fluent-ffmpeg';
import path from 'path';
import fs from 'fs/promises';
import { UniqueFileName } from './uniqueFileName';

interface MergeOptions {
    videoPath: string;
    audioPath: string;
    outputDir: string;
}

export function mergeAudioVideo({
    videoPath,
    audioPath,
    outputDir
}: MergeOptions): Promise<string> {
    return new Promise(async (resolve, reject) => {
        try {
            // Ensure output directory exists
            await fs.mkdir(outputDir, { recursive: true });

            const outputFileName = UniqueFileName(Buffer.from(''), 'video');
            const outputPath = path.join(outputDir, outputFileName);

            ffmpeg()
                .input(videoPath)
                .input(audioPath)
                .outputOptions([
                    '-c:v copy',
                    '-c:a aac',
                    '-map 0:v:0',
                    '-map 1:a:0',
                    '-shortest'
                ])
                .on('start', (commandLine) => {
                    console.log('Started:', commandLine);
                })
                .on('progress', (progress) => {
                    console.log('Processing:', progress.percent, '% done');
                })
                .on('error', (err) => {
                    console.error('Error:', err);
                    reject(err);
                })
                .on('end', () => {
                    console.log('Finished processing');
                    resolve(outputPath);
                })
                .save(outputPath);
        } catch (error) {
            reject(error);
        }
    });
}

'use client'
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
    const [uploading, setUploading] = useState(false);
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const { toast } = useToast();

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {

        console.log('This is event', event);
        const file = event.target.files?.[0];
        if (file) {
            console.log('This is file', file);
            console.log('This is file type', file.type);
            if (file.type.endsWith('mp4')) {
                console.log("Reached here", file)
                setVideoFile(file);
                toast({
                    title: "Video selected",
                    description: `Selected file: ${file.name}`,
                });
            } else {
                toast({
                    variant: "destructive",
                    title: "Invalid file type",
                    description: "Please select a video file",
                });
            }
        }
    };

    const handleUpload = async () => {
        console.log('hehe 1')
        console.log(videoFile)
        if (!videoFile) {
            console.log('hehe')
            toast({
                variant: "destructive",
                title: "No video selected",
                description: "Please select a video file first",
            });
            return;
        }

        setUploading(true);
        console.log('Uploading video')
        // TODO: Implement Supabase upload after connection
        toast({
            title: "Upload pending",
            description: "Please connect to Supabase to enable video uploads",
        });
        setUploading(false);
    };

    return (
        <div className="min-h-screen flex justify-center w-full border-red-200 p-8">
            <div className=" border-red-900 mx-auto space-y-8">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Video Translation Upload</h1>
                    <p className="text-xl text-gray-600">Upload your video and well help translate it!</p>
                </div>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <input
                        type="file"
                        accept="video/*"
                        onChange={handleFileSelect}
                        className="hidden"
                        id="video-upload"
                    />
                    <label
                        htmlFor="video-upload"
                        className="block cursor-pointer"
                    >
                        <div className="space-y-4">
                            <div className="text-6xl text-gray-400">📹</div>
                            <div className="text-lg">
                                {videoFile ? (
                                    <span className="text-green-600">{videoFile.name}</span>
                                ) : (
                                    <span>Drop your video here or click to browse</span>
                                )}
                            </div>
                        </div>
                    </label>
                </div>

                <div className="flex justify-center">
                    <Button
                        onClick={handleUpload}
                        disabled={!videoFile || uploading}
                        className="w-full max-w-xs"
                    >
                        {uploading ? "Uploading..." : "Upload Video"}
                    </Button>
                </div>

                {videoFile && (
                    <div className="border rounded-lg p-4">
                        <h2 className="font-semibold mb-2">Selected Video Preview</h2>
                        <video
                            controls
                            className="w-full rounded-lg"
                            src={URL.createObjectURL(videoFile)}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Index;
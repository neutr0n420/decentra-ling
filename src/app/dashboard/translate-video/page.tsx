
'use client'
import { useState } from "react";
import { Button } from "@/components/ui/button";
import axios from 'axios';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

const Index = () => {
    const [uploading, setUploading] = useState(false);
    const [selectedLang, setSelectedLang] = useState("");
    const [videoFile, setVideoFile] = useState<File | null>(null);

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {

        console.log('This is event', event);
        const file = event.target.files?.[0];
        if (file) {
            console.log('This is file', file);
            console.log('This is file type', file.type);
            if (file.type.endsWith('mp4')) {
                console.log("Reached here", file)
                setVideoFile(file);
            } else {
                window.alert("Invalid file type");
            }
        }
    };

    const handleUpload = async () => {
        console.log('hehe 1')
        console.log(videoFile)
        const formData = new FormData();
        formData.append('video', videoFile as File);
        formData.append('translation-language', selectedLang);
        const response = await axios.post('/api/video-to-transcript', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            // Add timeout and size limits if needed
            maxContentLength: Infinity,
            maxBodyLength: Infinity
        })
        console.log(response.data);
        // const res = await axios.get('/api/health-check')
        if (!videoFile) {
            console.log('hehe')
            window.alert("No video Selected")
            return;
        }

        setUploading(true);
        console.log('Uploading video')

        // TODO: Implement Supabase upload after connection
        setUploading(false);
    };
    const handleValueChange = (value: string) => {
        setSelectedLang(value);
        console.log("Selected value: ", value);
    }

    return (
        <div className="min-h-screen text-black w-full flex items-center justify-center bg-gray-100">
            <div className="w-96  rounded-xl shadow-xl bg-white ">
                <div className=" p-8 rounded-xl">
                    <div className="space-y-8">
                        <div className="text-center ">
                            <h1 className="text-4xl font-bold mb-4">Video Translation Upload</h1>
                            <p className="text-xl">Upload your video and we&apos;ll help translate it!</p>
                        </div>

                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-white">
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
                        <div className="w-full flex justify-center">
                            <Select onValueChange={handleValueChange} value={selectedLang} >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select the language" className="" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Language</SelectLabel>
                                        <SelectItem value="Hindi">Hindi</SelectItem>
                                        <SelectItem value="French">French</SelectItem>
                                        <SelectItem value="German">German</SelectItem>
                                        <SelectItem value="Japnese">Japnese</SelectItem>
                                        <SelectItem value="English">English</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex justify-center">
                            <Button
                                onClick={handleUpload}
                                disabled={!videoFile || uploading || selectedLang === ""}
                                className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                            >
                                {uploading ? "Uploading..." : "Upload Video"}
                            </Button>
                        </div>
                        {videoFile && (
                            <div className="border rounded-lg p-4 bg-white">
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
            </div >
        </div >
    );
};

export default Index;
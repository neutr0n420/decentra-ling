"use client"

import { useState } from "react"
import { Play, Pause } from "lucide-react"

const demoContent = [
    { language: "English", text: "Welcome to AI DubChain! Let's revolutionize content creation." },
    { language: "Spanish", text: "¡Bienvenido a AI DubChain! Revolucionemos la creación de contenido." },
    { language: "French", text: "Bienvenue sur AI DubChain ! Révolutionnons la création de contenu." },
    { language: "German", text: "Willkommen bei AI DubChain! Lassen Sie uns die Content-Erstellung revolutionieren." },
    { language: "Japanese", text: "AI DubChainへようこそ！コンテンツ制作に革命を起こしましょう。" },
]

export default function InteractiveDemo() {
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0)

    const togglePlay = () => {
        setIsPlaying(!isPlaying)
        if (!isPlaying) {
            playNext()
        }
    }

    const playNext = () => {
        if (currentIndex < demoContent.length - 1) {
            setTimeout(() => {
                setCurrentIndex(currentIndex + 1)
                playNext()
            }, 3000)
        } else {
            setIsPlaying(false)
            setCurrentIndex(0)
        }
    }

    return (
        <div className="bg-gray-900 p-6 rounded-lg shadow-xl">
            <div className="mb-4 flex justify-between items-center">
                <h3 className="text-xl font-semibold">AI Translation Demo</h3>
                <button
                    onClick={togglePlay}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full flex items-center"
                >
                    {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                    {isPlaying ? "Pause" : "Play"}
                </button>
            </div>
            <div className="h-40 bg-gray-700 rounded-lg p-4 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-lg font-semibold mb-2">{demoContent[currentIndex].language}</p>
                    <p>{demoContent[currentIndex].text}</p>
                </div>
            </div>
            <div className="mt-4">
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div
                        className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
                        style={{ width: `${(currentIndex + 1) * (100 / demoContent.length)}%` }}
                    ></div>
                </div>
            </div>
        </div>
    )
}


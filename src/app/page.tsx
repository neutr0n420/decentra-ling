import Link from "next/link"
import { Globe, Copyright, DollarSign } from "lucide-react"
import InteractiveDemo from "@/components/InteractiveDemo";
import ConnectButton from "@/components/ConnectButton";

export default function Home() {
  return (
    <div className="flex flex-col justify-around">
      <header className="bg-gray-900 text-white py-4 px-8">
        <div className="  px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Decentra-Ling</h1>
          <nav className=" flex justify-around">
            <ul className="flex items-center space-x-8">
              <li>
                <Link href="#how-it-works" className="hover:text-blue-400">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="#benefits" className="hover:text-blue-400">
                  Benefits
                </Link>
              </li>
              <li>
                <Link href="#demo" className="hover:text-blue-400">
                  Demo
                </Link>
              </li>
              <li>

              </li>
            </ul>
          </nav>
          {/* <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
            Sign In
          </button> */}
          <ConnectButton />

        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-blue-600 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">Revolutionize Your Content with AI and Blockchain</h2>
            <p className="text-xl mb-8">
              Upload once, reach the world. AI-powered translation and dubbing with blockchain-secured rights.
            </p>
            <Link
              href="#"
              className="bg-white text-blue-600 px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition duration-300"
            >
              Get Started
            </Link>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How AI DubChain Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <Globe className="w-12 h-12 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">1. Upload Your Content</h3>
                <p>Upload your video or text content to our secure platform.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <Copyright className="w-12 h-12 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">2. AI Translation & Dubbing</h3>
                <p>Our AI instantly translates and dubs your content into multiple languages.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <DollarSign className="w-12 h-12 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">3. Blockchain Security</h3>
                <p>Your IP rights and royalty tracking are secured on the blockchain.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Benefits for Creators</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Global Reach</h3>
                <p>Expand your audience across language barriers effortlessly.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Time Efficiency</h3>
                <p>Save time on manual translations and dubbing processes.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Secure IP Rights</h3>
                <p>Blockchain technology ensures your intellectual property is protected.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Transparent Royalties</h3>
                <p>Track and receive royalties accurately with blockchain-based metadata.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Demo Section */}
        <section id="demo" className="py-16 bg-gray-900 text-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Experience AI with Decentra-Ling</h2>
            <div className="max-w-3xl mx-auto">
              <InteractiveDemo />
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Go Global?</h2>
            <p className="text-xl mb-8">Join Decentra-Ling today and revolutionize your content distribution.</p>
            <Link
              href="#"
              className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition duration-300"
            >
              Sign Up Now
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 Decentra-Ling. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}


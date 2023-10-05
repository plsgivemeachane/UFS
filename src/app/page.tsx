'use client';
import Image from "next/image";
import { useRouter } from "next/navigation";

import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Link from "next/link";
import Paypal from "./paypal";
export default function HomePage() {
    const router = useRouter();

    useEffect(() => {
        AOS.init({
            
        })
        if(localStorage.getItem("email")){
            router.push("/app")
        }
    })

    return (
        <div className="font-sans">
            {/* Section 1 */}
            <div className="flex justify-around bg-black items-center spacer flex-col lg:flex-row" data-aos="fade-down">
                <div className="flex flex-col items-center p-4 rounded-xl bg-black shadow-black justify-center">
                    <h1 className="lg:text-8xl sm:text-sm font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 font-sans">Storage.Free.Forever</h1>
                    <h1 className="md:text-4xl sm:text-sm font-extrabold mt-4">Ultimate File Storage</h1>
                    <p className="md:text-xl sm:text-sm font-bold mt-8 text-slate-500">🌐 UFS is a decentralized File Storage follow by IPFS technology. Provide you a unlimited storage for FREE</p>
                    {/* <p className="text-lg mt-8 text-slate-500">At UFS, with the power of IPFS, we&apos;re revolutionizing the way you store and manage your files. Say goodbye to limited storage quotas and get a truly decentralized and free-to-use file storage solution.</p>
                    <p className="text-md mt-8 text-slate-500">UFS powered by IPFS with stand for interplanetary file system is a decentralized file storage follow a p2p network and peer to peer hypermedia along with cryptographically hashed pinning service and content addressing stored on IPFS.</p> */}
                    {/* <p className="text-md mt-4">UFS brings you a decentralized and free-to-use file storage solution</p> */}
                    <div className="relative mt-8">
                        <div className="absolute inset-0 bg-pink-400 rounded-xl blur-md opacity-70"></div>
                        <div className="relative bg-black rounded-3xl">
                            <button className="md:text-3xl sm:text-sm hover:bg-pink-400 p-4 rounded-3xl border-2 border-pink-400 transition-all duration-200"
                                onClick={() => router.push("/register")}
                            >Get Started</button>
                        </div> 
                    </div>
                    <br/>
                    <Link href={"https://discord.gg/HNF7G2VnxR"} >Meet us at discord</Link>
                </div>
                {/* <Image 
                    src="/windowimage1.png"
                    alt="logo"
                    width={512}
                    height={512}
                    className="rounded-xl mr-16 lg:rotate-y-[-25deg] transform-style-3d border-2 shadow-xl shadow-white"
                /> */}
            </div>
            {/* <div className="bg2 spacer"></div> */}
            {/* Section 2 */}
            <div className="bg-black flex justify-center items-center flex-col">
                <h1 className="md:text-6xl sm:text-sm font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500 font-sans" data-aos="fade-up">Why should you choose UFS?</h1>
                <div className="flex flex-col lg:flex-row gap-16 mb-16 mt-8">
                    <div className="relative mt-8">
                        <div className="absolute inset-0 bg-pink-500 rounded-xl blur-xl opacity-70"></div>
                        <div className="relative max-w-sm rounded overflow-hidden shadow-lg bg-black border-2 border-pink-500 h-full">
                            {/* <h1 className="text-center mt-4 text-xl font-bold text-white">Decentralized Advantage</h1> */}
                            <img className="w-full" src="/decen.png" alt="Decentralized" />
                            <div className="px-6 py-4">
                                <div className="font-bold text-xl mb-2">🚀 Decentralized Advantage</div>
                                <p className="text-gray-300 text-base" data-aos="fade-up">
                                    Our innovative decentralized architecture ensures that your files are stored securely across a distributed network of IPFS. No more failure or data loss risks.
                                </p>
                            </div>
                            {/* <div className="px-6 pt-4 pb-2">
                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
                            </div> */}
                        </div>
                    </div>
                    <div className="relative mt-8">
                        <div className="absolute inset-0 bg-yellow-500 rounded-xl blur-xl opacity-70"></div>
                        <div className="relative max-w-sm rounded overflow-hidden shadow-lg bg-black border-2 border-yellow-500 h-full">
                            {/* <h1 className="text-center mt-4 text-xl font-bold text-white">Decentralized Advantage</h1> */}
                            <img className="w-full mt-24" src="/storage.png" alt="Unlimited Storage" />
                            <div className="px-6 py-4">
                                <div className="font-bold text-xl mb-2">💾 Unlimited Storage</div>
                                <p className="text-gray-300 text-base" data-aos="fade-up">
                                    Experience the freedom of never worrying about storage quotas again. UFS offers limitless storage space, so you can save and organize your files without constraints.
                                </p>
                            </div>
                            {/* <div className="px-6 pt-4 pb-2">
                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
                            </div> */}
                        </div>
                    </div>
                    <div className="relative mt-8">
                        <div className="absolute inset-0 bg-blue-500 rounded-xl blur-xl opacity-70"></div>
                        <div className="relative max-w-sm rounded overflow-hidden shadow-lg bg-black border-2 border-blue-500 h-full">
                            {/* <h1 className="text-center mt-4 text-xl font-bold text-white">Decentralized Advantage</h1> */}
                            <img className="w-full mt-32" src="/securiti.png" alt="Enhanced Security" />
                            <div className="px-6 py-4">
                                <div className="font-bold text-xl mb-2">🔒 Enhanced Security</div>
                                <p className="text-gray-300 text-base" data-aos="fade-up">
                                    Because of our decentralized architecture and the power of IPFS, Your data is security is our top priority. With cryptographically hashed pinning service. UFS employs advanced encryption and redundancy measures to keep your files safe from unauthorized access and data breaches.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Section 3 */}
            {/* <div className="spacer bg4"></div> */}
            <div className="bg-black spacer flex justify-center flex-col md:p-16">
            <h1 className="mb-8 text-center md:text-6xl sm:text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500 font-sans" data-aos="fade-up">Features of UFS</h1>
                {/* <div className="absolute"> */}
                <div className="md:ml-2 sm:invisible w-1 h-full rounded-full bg-gray-700 absolute"></div>
                {/* </div> */}
                <div>
                    <div className="flex items-center">
                        <div className="w-3 h-3 ml-1 rounded-full relative bg-pink-400"></div>
                        <div className="w-32 h-1 ml-4 rounded-full relative bg-pink-400"></div>
                    </div>
                    <div className="mb-8 px-6 py-4">
                        <span className="text-4xl">📂</span>
                        <div className="font-bold text-2xl mb-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500 font-sans">Effortless File Management</div>
                        <p className="text-gray-400 text-base" data-aos="fade-up">
                            Organize your files with ease using our intuitive interface. Create folders, tag files, and quickly search through your storage.    
                        </p>
                    </div>
                </div>
                <div>
                    <div className="flex items-center">
                        <div className="w-3 h-3 ml-1 rounded-full relative bg-blue-400"></div>
                        <div className="w-32 h-1 ml-4 rounded-full relative bg-blue-400"></div>
                    </div>
                    <div className="px-6 py-4 mb-8">
                        <span className="text-4xl">📱</span>
                        <div className="font-bold text-2xl mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-yellow-500 font-sans">Cross-Platform Access</div>
                        <p className="text-gray-400 text-base" data-aos="fade-up">
                            Access your files from anywhere, anytime, using any device. UFS is compatible with all major operating systems and supports seamless integration across desktop, web, and mobile platforms.
                        </p>
                    </div>
                </div>
                <div>
                    <div className="flex items-center">
                        <div className="w-3 h-3 ml-1 rounded-full relative bg-yellow-400"></div>
                        <div className="w-32 h-1 ml-4 rounded-full relative bg-yellow-400"></div>
                    </div>
                    <div className="px-6 py-4 mb-8">
                        <span className="text-4xl">🌐</span>
                        <div className="font-bold text-2xl mb-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-violet-500 font-sans">Web-Based Access</div>
                        <p className="text-gray-400 text-base" data-aos="fade-up">
                            No need to install additional software. Simply log in to your account from any web browser to upload, download, and manage your files.
                        </p>
                    </div>
                </div>
                <div>
                    <div className="flex items-center">
                        <div className="w-3 h-3 ml-1 rounded-full relative bg-green-400"></div>
                        <div className="w-32 h-1 ml-4 rounded-full relative bg-green-400"></div>
                    </div>
                    <div className="px-6 py-4 mb-8">
                        <span className="text-4xl">🔄</span>
                        <div className="font-bold text-2xl mb-2 text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-violet-500 font-sans">Automatic Synchronization</div>
                        <p className="text-gray-400 text-base" data-aos="fade-up">
                            UFS using real-time synchronization to ensure that your files are always up to date. Keep your files up to date across all your devices with our automatic synchronization feature.
                        </p>
                    </div>
                </div>
            </div>
            <div className="bg-black flex spacer justify-center flex-col md:p-16">
            <h1 className=" mb-16 text-center md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-violet-500 font-sans" data-aos="fade-up">What kind of thing you can do with UFS?</h1>
                {/* <div className="absolute"> */}
                <div className="ml-2 w-1 h-full rounded-full bg-gray-700 absolute"></div>
                {/* </div> */}
                <div>
                    <div className="flex items-center">
                        <div className="w-3 h-3 ml-1 rounded-full relative bg-blue-400"></div>
                        <div className="w-full h-1 ml-4 rounded-full relative bg-blue-400"></div>
                    </div>
                    <div className="mb-8 px-6 py-4">
                        <span className="text-4xl">📂</span>
                        <div className="font-bold text-2xl mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-500 font-sans">File Sharing</div>
                        <p className="text-gray-400 text-base" data-aos="fade-up">
                            Share your files with friends, family, or colleagues.
                        </p>
                    </div>
                </div>
                <div>
                    <div className="flex items-center">
                        <div className="w-3 h-3 ml-1 rounded-full relative bg-red-400"></div>
                        <div className="w-full h-1 ml-4 rounded-full relative bg-red-400"></div>
                    </div>
                    <div className="px-6 py-4 mb-8">
                        <span className="text-4xl">🌐</span>
                        <div className="font-bold text-2xl mb-2 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-500 font-sans">Content Delivery Network (CDN)</div>
                        <p className="text-gray-400 text-base" data-aos="fade-up">
                            Access your files from anywhere, anytime, using any device. UFS is compatible with all major operating systems and supports seamless integration across desktop, web, and mobile platforms.
                        </p>
                    </div>
                </div>
                <div>
                    <div className="flex items-center">
                        <div className="w-3 h-3 ml-1 rounded-full relative bg-yellow-400"></div>
                        <div className="w-full h-1 ml-4 rounded-full relative bg-yellow-400"></div>
                    </div>
                    <div className="px-6 py-4 mb-8">
                        <span className="text-4xl">📃</span>
                        <div className="font-bold text-2xl mb-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-violet-500 font-sans">Static Web Hosting</div>
                        <p className="text-gray-400 text-base" data-aos="fade-up">
                            UFS serves as an ideal platform for static web hosting. Users can effortlessly deploy their websites, applications, and content by storing HTML, CSS, JavaScript, and media files on the decentralized network. The distributed nature of UFS ensures rapid loading times and high availability, making it an attractive solution for hosting personal blogs, portfolios, and small business websites.
                        </p>
                    </div>
                </div>
                <div>
                    <div className="flex items-center">
                        <div className="w-3 h-3 ml-1 rounded-full relative bg-emerald-400"></div>
                        <div className="w-full h-1 ml-4 rounded-full relative bg-emerald-400"></div>
                    </div>
                    <div className="px-6 py-4 mb-8">
                        <span className="text-4xl">🔄</span>
                        <div className="font-bold text-2xl mb-2 text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-violet-500 font-sans">Backup and Redundancy</div>
                        <p className="text-gray-400 text-base" data-aos="fade-up">
                        The distributed nature of UFS ensures data redundancy and backup by distributing files across numerous nodes. This approach mitigates the risks associated with data loss due to hardware failures or other unforeseen events. Users can rely on UFS as a reliable backup solution for critical files and documents.
                        </p>
                    </div>
                </div>
            </div>
            {/* Section 4 */}
            <div className="spacer bg-black flex justify-center items-center flex-col" data-aos="fade-up">
                <div className="relative">
                    <div className="absolute inset-0 bg-pink-400 rounded-xl blur-md opacity-50"></div>
                    <div className="relative bg-black rounded-3xl p-8 flex flex-col items-center">
                        <h1 className="text-xl lg:text-4xl font-bold text-white">Ready to experience the future of file storage?</h1>
                        <button className="bg-pink-400 mt-16 text-3xl hover:text-gray-700 p-4 px-16 rounded-lg transition-all duration-200"
                            onClick={() => router.push("/register")}
                        >Get Started</button>
                        <Link href={"https://discord.gg/HNF7G2VnxR"} className="mt-8">Meet us at discord</Link>
                    </div>
                </div>
                {/* <Paypal></Paypal> */}
                {/* <SubscribeForm /> */}
            </div>
        </div>
    )
}
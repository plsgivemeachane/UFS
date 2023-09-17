'use client';
import Image from "next/image";
import { useRouter } from "next/navigation";

import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Link from "next/link";

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
            <div className="flex justify-around items-center bg1 spacer flex-col lg:flex-row perspective-1000" data-aos="fade-down">
                <div className="flex flex-col items-center p-4 rounded-xl bg-black m-16 shadow-xl shadow-black">
                    <h1 className="text-5xl font-bold">Welcome to UFS</h1>
                    <h1 className="text-4xl font-bold mt-4">Ultimate File Storage</h1>
                    <p className="text-xl font-bold mt-8">🌐 UFS is a decentralized File Storage follow by IPFS technology with stand for interplanetary file system</p>
                    <p className="text-lg mt-8">At UFS, with the power of IPFS, we&apos;re revolutionizing the way you store and manage your files. Say goodbye to limited storage quotas and hello to a truly decentralized and free-to-use file storage solution.</p>
                    <p className="text-md mt-8">UFS powered by IPFS with stand for interplanetary file system is a decentralized file storage follow a p2p network and peer to peer hypermedia.With cryptographically hashed pinning service, content addressing and stored on IPFS</p>
                    {/* <p className="text-md mt-4">UFS brings you a decentralized and free-to-use file storage solution</p> */}
                    <button className="mt-8 text-3xl hover:text-gray-700"
                        onClick={() => router.push("/register")}
                    >Get Started</button>
                    <br/>
                    <Link href={"https://discord.gg/HNF7G2VnxR"} >Meet us at discord</Link>
                </div>
                <Image 
                    src="/windowimage1.png"
                    alt="logo"
                    width={512}
                    height={512}
                    className="rounded-xl mr-16 lg:rotate-y-[-25deg] transform-style-3d border-2 shadow-xl shadow-white"
                />
            </div>
            {/* <div className="bg2 spacer"></div> */}
            {/* Section 2 */}
            <div className="bg2 spacer flex justify-center items-center flex-col">
                <h1 className="text-4xl font-bold" data-aos="fade-up">Why Choose UFS?</h1>
                <div className="flex flex-col lg:flex-row gap-16 mb-16 mt-8">
                    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-black" data-aos="fade-down">
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
                    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-black" data-aos="fade-down">
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
                    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-black" data-aos="fade-down">
                        {/* <h1 className="text-center mt-4 text-xl font-bold text-white">Decentralized Advantage</h1> */}
                        <img className="w-full mt-32" src="/securiti.png" alt="Enhanced Security" />
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">🔒 Enhanced Security</div>
                            <p className="text-gray-300 text-base" data-aos="fade-up">
                                Because of our decentralized architecture and the power of IPFS, Your data is security is our top priority.With cryptographically hashed pinning service. UFS employs advanced encryption and redundancy measures to keep your files safe from unauthorized access and data breaches.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {/* Section 3 */}
            {/* <div className="spacer bg4"></div> */}
            <div className="spacer bg4 flex justify-center items-center flex-col p-16">
                <h1 className="text-4xl font-bold text-white mb-8" data-aos="fade-up">Features at a Glance</h1>
                <div className="px-6 py-4 mb-8">
                    <div className="font-bold text-xl mb-2">📂 Effortless File Management</div>
                    <p className="text-gray-200 text-base" data-aos="fade-up">
                        Organize your files with ease using our intuitive interface. Create folders, tag files, and quickly search through your storage.    
                    </p>
                </div>
                <div className="px-6 py-4 mb-8">
                    <div className="font-bold text-xl mb-2">📱 Cross-Platform Access</div>
                    <p className="text-gray-200 text-base" data-aos="fade-up">
                        Access your files from anywhere, anytime, using any device. UFS is compatible with all major operating systems and supports seamless integration across desktop, web, and mobile platforms.
                    </p>
                </div>
                <div className="px-6 py-4 mb-8">
                    <div className="font-bold text-xl mb-2">🌐 Web-Based Access</div>
                    <p className="text-gray-200 text-base" data-aos="fade-up">
                        No need to install additional software. Simply log in to your account from any web browser to upload, download, and manage your files.
                    </p>
                </div>
                <div className="px-6 py-4 mb-8">
                    <div className="font-bold text-xl mb-2">🔄 Automatic Synchronization</div>
                    <p className="text-gray-200 text-base" data-aos="fade-up">
                        UFS using real-time synchronization to ensure that your files are always up to date. Keep your files up to date across all your devices with our automatic synchronization feature.
                    </p>
                </div>
            </div>
            <div className="spacer bg5 flex justify-center items-center flex-col p-16">
                <h1 className="text-4xl font-bold text-white mb-8" data-aos="fade-up">What type of thing you can do in UFS?</h1>
                <div className="px-6 py-4 mb-8">
                    <div className="font-bold text-xl mb-2">📂 File Sharing</div>
                    <p className="text-gray-200 text-base" data-aos="fade-up">
                        UFS serves as an ideal platform for static web hosting. Users can effortlessly deploy their websites, applications, and content by storing HTML, CSS, JavaScript, and media files on the decentralized network. The distributed nature of UFS ensures rapid loading times and high availability, making it an attractive solution for hosting personal blogs, portfolios, and small business websites.
                    </p>
                </div>
                <div className="px-6 py-4 mb-8">
                    <div className="font-bold text-xl mb-2">📂 Content Delivery Network (CDN)</div>
                    <p className="text-gray-200 text-base" data-aos="fade-up">
                        UFS has the inherent potential to function as a decentralized Content Delivery Network (CDN). By distributing frequently accessed content across the network&apos;s nodes, UFS accelerates content delivery to end-users, reducing latency and ensuring a smooth online experience. This CDN-like functionality is particularly advantageous for streaming services, online gaming, and other applications requiring rapid data transmission.
                    </p>
                </div>
                <div className="px-6 py-4 mb-8">
                    <div className="font-bold text-xl mb-2">🌐 Static Web Hosting</div>
                    <p className="text-gray-200 text-base" data-aos="fade-up">
                        UFS serves as an ideal platform for static web hosting. Users can effortlessly deploy their websites, applications, and content by storing HTML, CSS, JavaScript, and media files on the decentralized network. The distributed nature of UFS ensures rapid loading times and high availability, making it an attractive solution for hosting personal blogs, portfolios, and small business websites.
                    </p>
                </div>
                <div className="px-6 py-4 mb-8">
                    <div className="font-bold text-xl mb-2">🔄 Backup and Redundancy</div>
                    <p className="text-gray-200 text-base" data-aos="fade-up">
                        The distributed nature of UFS ensures data redundancy and backup by distributing files across numerous nodes. This approach mitigates the risks associated with data loss due to hardware failures or other unforeseen events. Users can rely on UFS as a reliable backup solution for critical files and documents.
                    </p>
                </div>
            </div>
            {/* Section 4 */}
            <div className="spacer bg6 flex justify-center items-center flex-col" data-aos="fade-up">
                <h1 className="text-xl lg:text-4xl font-bold text-white">Ready to experience the future of file storage?</h1>
                <button className="mt-16 text-3xl hover:text-gray-700 bg3 p-4 px-16 rounded-lg"
                    onClick={() => router.push("/register")}
                >Get Started</button>
                <Link href={"https://discord.gg/HNF7G2VnxR"} >Meet us at discord</Link>
            </div>
        </div>
    )
}
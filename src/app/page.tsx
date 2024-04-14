"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Link from "next/link";
import Paypal from "./paypal";
import Notix from "./Notix";
export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    AOS.init({});
    if (localStorage.getItem("email")) {
      router.push("/app");
    }
  });

  return (
    <div className="font-sans">
      {/* Section 1 */}
      <div
        className="circle flex justify-around bg-dark_gray items-center spacer flex-col lg:flex-row"
        // data-aos="fade-down"
      >
        <div className="animated flex flex-col items-center p-4 rounded-xl bg-dark_gray shadow-dark_gray justify-center">
          {/* Background */}
          <div className="hidden lg:flex justify-center items-center lg:absolute w-full h-full top-[16rem] left-0">
            <svg
              // width="800px"
              // height="800px"
              viewBox="-0.5 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              // className="stroke"
            >
              <defs>
                <linearGradient id="MyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stop-color="#8576FF" />
                  <stop offset="70%" stop-color="#121212" />
                </linearGradient>
              </defs>
              <path
                d="M12 22C17.2467 22 21.5 17.7467 21.5 12.5C21.5 7.25329 17.2467 3 12 3C6.75329 3 2.5 7.25329 2.5 12.5C2.5 17.7467 6.75329 22 12 22Z"
                // stroke="#0F0F0F"
                className="linear-gradient"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12 20V5"
                // stroke="#8576FF"
                // className="linear-gradient"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M5.31 17.21C6.33 16.17 7.84 15.13 10 14.71"
                // stroke="#8576FF"
                className="linear-gradient"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M18.69 17.24C17.67 16.2 16.15 15.14 14 14.72"
                // stroke="#0F0F0F"
                className="linear-gradient"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M5.31 7.79999C6.33 8.83999 7.84 9.87999 10 10.3"
                // stroke="#8576FF"
                className="linear-gradient"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M18.69 7.77002C17.67 8.81002 16.15 9.87001 14 10.29"
                // stroke="#8576FF"
                className="linear-gradient"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <div className="lg:relative">
            <h2 className="z-20 mt-20 lg:text-8xl text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-light_purple via-dark_purple to-light_purple font-sans md:p-4 md:whitespace-nowrap title">
              Storage.Free.Forever
            </h2>
          </div>
          <div className="lg:relative">
            <h2 className="md:text-4xl text-lg font-extrabold mt-4">
              Ultimate File Storage .inc
            </h2>
          </div>
          <div className="lg:relative">
            <h1 className="lg:text-xl flex-wrap text-sm font-bold mt-8 text-slate-100">
              🌐 UFS is a decentralized File Storage follow by IPFS storage
              technology. Provide you a unlimited storage for FREE
            </h1>
          </div>
          <div className="relative mt-4 lg:mt-8">
            <div className="absolute inset-0 bg-pink-400 rounded-xl blur-md opacity-80"></div>
            <div className="relative bg-dark_gray rounded-3xl">
              <button
                className="md:text-3xl sm:text-sm hover:bg-pink-400 px-20 py-2 md:p-4 rounded-3xl border-2 border-pink-400 transition-all duration-200"
                onClick={() => router.push("/register")}
              >
                Get Started
              </button>
            </div>
          </div>
          <br />
          <Link href={"https://discord.gg/HNF7G2VnxR"} className="lg:relative">
            Meet us at discord
          </Link>
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
      <div className="bg-dark_gray flex justify-center items-center flex-col lg:relative">
        {/* Break line here */}
        <div className="bg-gray-400 h-1 w-[80%] rounded-lg mt-8 mb-8"></div>
        <h1
          className="md:text-6xl text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500 font-sans"
          data-aos="fade-up"
        >
          Why should you choose UFS?
        </h1>
        <div className="flex flex-col lg:flex-row gap-16 mb-16 mt-8">
          <div className="relative mt-8">
            <div className="absolute inset-0 bg-pink-500 rounded-xl blur-xl opacity-70"></div>
            <div className="relative max-w-sm rounded overflow-hidden shadow-lg bg-dark_gray border-2 border-pink-500 h-full">
              {/* <h1 className="text-center mt-4 text-xl font-bold text-white">Decentralized Advantage</h1> */}
              <img className="w-full" src="/decen.png" alt="Decentralized" />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">
                  🚀 Decentralized Advantage
                </div>
                <p className="text-gray-300 text-base" data-aos="fade-up">
                  Our innovative decentralized architecture, built upon the
                  power of IPFS, ensures that your files are stored securely
                  across a distributed network. This eliminates the risks of
                  single-point failures or data loss common with centralized
                  storage providers. With IPFS, your files gain resilience and
                  accessibility.
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
            <div className="relative max-w-sm rounded overflow-hidden shadow-lg bg-dark_gray border-2 border-yellow-500 h-full">
              {/* <h1 className="text-center mt-4 text-xl font-bold text-white">Decentralized Advantage</h1> */}
              <img
                className="w-full mt-24"
                src="/storage.png"
                alt="Unlimited Storage"
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">
                  💾 Unlimited Storage
                </div>
                <p className="text-gray-300 text-base" data-aos="fade-up">
                  Experience the freedom of never worrying about storage quotas
                  again! With free IPFS integration, our platform offers
                  limitless storage space, so you can save and organize your
                  files without constraints. Upload as much as you need,
                  whenever you need with free IPFS upload capabilities.
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
            <div className="relative max-w-sm rounded overflow-hidden shadow-lg bg-dark_gray border-2 border-blue-500 h-full">
              {/* <h1 className="text-center mt-4 text-xl font-bold text-white">Decentralized Advantage</h1> */}
              <img
                className="w-full mt-32"
                src="/securiti.png"
                alt="Enhanced Security"
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">
                  🔒 Enhanced Security
                </div>
                <p className="text-gray-300 text-base" data-aos="fade-up">
                  Leveraging our decentralized architecture and the power of
                  IPFS, your data security is our top priority. UFS employs
                  advanced encryption, content-addressing, and cryptographically
                  hashed pinning services to keep your files safe from
                  unauthorized access and data breaches. Enjoy peace of mind
                  with the robust protection of free IPFS storage.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Section 3.1 */}
      <div className="bg-dark_gray flex spacer justify-center flex-col md:p-16">
        <div className="flex justify-center items-center">
          <div className="bg-gray-400 h-1 w-[80%] rounded-lg mt-8 mb-8"></div>
        </div>
        <h1
          className=" mb-16 text-center text-2xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-violet-500 font-sans"
          data-aos="fade-up"
        >
          How it works
        </h1>
        <div className="flex flex-col items-center"></div>
      </div>
      {/* Section 3.2 */}
      <div className="bg-dark_gray spacer flex justify-center items flex-col md:p-16">
        <div className="flex justify-center items-center">
          <div className="bg-gray-400 h-1 w-[80%] rounded-lg mt-8 mb-8"></div>
        </div>
        <h1
          className="mb-8 text-center md:text-6xl sm:text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500 font-sans"
          data-aos="fade-up"
        >
          Features of UFS
        </h1>
        <div>
          <div className="flex items-center">
            <div className="w-3 h-3 ml-1 rounded-full relative bg-pink-400"></div>
            <div className="w-32 h-1 ml-4 rounded-full relative bg-pink-400"></div>
          </div>
          <div className="mb-8 px-6 py-4">
            <span className="text-4xl">📂</span>
            <div className="font-bold text-2xl mb-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500 font-sans">
              Effortless File Management
            </div>
            <p className="text-gray-400 text-base" data-aos="fade-up">
              Organize your files with ease using our intuitive interface.
              Create folders, tag files, and quickly search through your
              storage.
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
            <div className="font-bold text-2xl mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-yellow-500 font-sans">
              Cross-Platform Access
            </div>
            <p className="text-gray-400 text-base" data-aos="fade-up">
              Access your files from anywhere, anytime, using any device. UFS is
              compatible with all major operating systems and supports seamless
              integration across desktop, web, and mobile platforms.
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
            <div className="font-bold text-2xl mb-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-violet-500 font-sans">
              Web-Based Access
            </div>
            <p className="text-gray-400 text-base" data-aos="fade-up">
              No need to install additional software. Simply log in to your
              account from any web browser to upload, download, and manage your
              files.
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
            <div className="font-bold text-2xl mb-2 text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-violet-500 font-sans">
              Automatic Synchronization
            </div>
            <p className="text-gray-400 text-base" data-aos="fade-up">
              UFS using real-time synchronization to ensure that your files are
              always up to date. Keep your files up to date across all your
              devices with our automatic synchronization feature.
            </p>
          </div>
        </div>
      </div>
      {/* Section 4 */}
      <div
        className="spacer bg-dark_gray flex justify-center items-center flex-col"
        data-aos="fade-up"
      >
        <div className="relative">
          {/* <div className="absolute inset-0 bg-pink-400 rounded-xl blur-md opacity-50"></div> */}
          <div className="relative bg-dark_gray rounded-3xl p-8 flex flex-col items-center">
            <h1 className="text-xl lg:text-4xl font-bold text-white">
              Ready to experience the future of file storage?
            </h1>
            <button
              className="bg-pink-400 mt-16 text-3xl hover:text-gray-700 p-4 px-16 rounded-lg transition-all duration-200"
              onClick={() => router.push("/register")}
            >
              Get Started
            </button>
            <Link href={"https://discord.gg/HNF7G2VnxR"} className="mt-8">
              Meet us at discord
            </Link>
          </div>
        </div>
        {/* <Paypal></Paypal> */}
        {/* <SubscribeForm /> */}
        {/*                 <Notix /> */}
      </div>
    </div>
  );
}

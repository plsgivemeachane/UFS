"use client"
import { GetStartedButton } from "./GetStartedButton";
import Image from "next/image";
import { useRouter } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Link from "next/link";
import Paypal from "./paypal";
import Notix from "./Notix";
import Blackhole from "./app/Blackhole";
import HowItWorkSection from "./HowItWorkSection";
import FeaturesSection from "./FeaturesSection";
import WhyShouldChooseSection from "./WhyShouldChooseSection";
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
                <linearGradient
                  id="MyGradient"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
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
      <WhyShouldChooseSection />
      {/* Section 3.1 */}
      <HowItWorkSection />
      {/* Section 3.2 */}
      <FeaturesSection />
      {/* Section 4 */}
      <GetStartedButton router={router}/>
      {/* <Paypal></Paypal> */}
      {/* <SubscribeForm /> */}
      {/*                 <Notix /> */}
    </div>
  );
}

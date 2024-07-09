import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark_gray text-white md:py-4 mt-auto">
      <div className="w-full h-1 md:mb-8 mb-4 rounded-full relative bg-blue-400"></div>
      <div className="container md:mx-auto flex flex-col lg:flex-row items-center justify-between">
        <div className="mb-2">
          <h1 className="font-bold text-xs md:text-base">Contact Us</h1>
    <p className="text-xs md:text-base">Email: rakis@gmail.com</p>
          <p className="text-xs md:text-base">Phone: +84889341319</p>
        </div>
        <div className="mb-2">
          <h1 className="font-bold text-xs md:text-base">Follow Us</h1>
          <div className="flex space-x-4">
            <Link
              href="https://www.facebook.com/profile.php?id=100075725809114"
              className="text-blue-500 hover:underline transition duration-300 text-xs md:text-base"
            >
              Facebook
            </Link>
            <Link
              href="https://discord.gg/HNF7G2VnxR"
              className="text-blue-500 hover:underline transition duration-300 text-xs md:text-base"
            >
              Discord
            </Link>
          </div>
        </div>
        <div className="mb-2">
          <h1 className="font-bold text-blue-500 text-xs md:text-base">
            <Link href={"/about"}>About</Link>
          </h1>
          {/* <div className="flex space-x-4">
                    <Link
                        href="/about"
                        className="text-blue-500 hover:underline transition duration-300"
                    >
                        About Us
                    </Link>
                    <Link
                        href="/privacy-policy"
                        className="text-blue-500 hover:underline transition duration-300"
                    >
                        Privacy Policy
                    </Link>
                    <Link
                        href="/terms-of-service"
                        className="text-blue-500 hover:underline transition duration-300"
                    >
                        Terms of Service
                    </Link>
                </div> */}
        </div>
        <div>
          <h1 className="font-bold text-xs md:text-base">Location</h1>
          <p className="text-xs md:text-base">Binh Phuoc</p>
          <p className="text-xs md:text-base">Dong Xoai City, Vietnam</p>
        </div>
      </div>
      <div className="text-center mt-2 md:mt-4 text-xs md:text-base">
        <p>
          &copy; {new Date().getFullYear()} Quanvndzai. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

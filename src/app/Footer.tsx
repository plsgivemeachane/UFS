import Link from "next/link";
import React from "react";

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between">
            <div className="mb-2">
            <h1 className="font-bold">Contact Us</h1>
            <p>Email: rakis@gmail.com</p>
            <p>Phone: +84889341319</p>
            </div>
            <div className="mb-2">
            <h1 className="font-bold">Follow Us</h1>
            <div className="flex space-x-4">
                <Link
                    href="https://www.facebook.com/profile.php?id=100075725809114"
                    className="text-blue-500 hover:underline transition duration-300"
                >
                    Facebook
                </Link>
                <Link
                    href="https://discord.gg/HNF7G2VnxR"
                    className="text-blue-500 hover:underline transition duration-300"
                >
                    Discord
                </Link>
            </div>
            </div>
            <div className="mb-2">
            <h1 className="font-bold">About</h1>
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
            <h1 className="font-bold">Location</h1>
            <p>Binh Phuoc</p>
            <p>Dong Xoai City, Vietnam</p>
            </div>
        </div>
        <div className="text-center mt-4">
            <p>&copy; {new Date().getFullYear()} Quanvndzai. All rights reserved.</p>
        </div>
        </footer>
    );
};

export default Footer;
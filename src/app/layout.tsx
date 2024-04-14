import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";
import GoogleAnalytics from "./GoogleAnalytics";
import Footer from "./Footer";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import { useState } from "react";
import NavigationBar from "./navigationBar";

const inter = Inter({ subsets: ["latin"] });

// <meta name="monetag" content="94130c9ed76730d47116c3e4f05c1e34">
export const metadata: Metadata = {
  title: "UFS: File Storage Solution | Free IPFS storage for anyone",
  description:
    "UFS is a free unlimited no qouta decentralized storage system.Base on Web3 DApp.We have a large storage avalible for everyone.",
  generator: "UFS",
  applicationName: "UFS",
  referrer: "origin-when-cross-origin",
  keywords: [
    "storage",
    "public storage",
    "ipfs",
    "pinata ipfs",
    "ipfs blockchain",
    "ipfs upload",
    "ipfs websites",
    "ipfs pricing",
    "decentralized",
    "security",
    "file storage",
    "data storage",
    "file management",
    "secure sharing",
    "cross-device sharing",
    "cross-device access",
    "mobile file storage",
    "desktop file storage",
    "file encryption",
    "data protection",
    "advanced search",
    "googledrive",
    "onedrive",
    "icloud",
    "free cloud storage",
    "best cloud storage",
  ],
  authors: [{ name: "Quanvndzai" }],
  colorScheme: "dark",
  creator: "Quanvndzai",
  publisher: "Quanvndzai",
  formatDetection: {
    email: true,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "UFS: File Storage Solution | Free IPFS storage for anyone",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  

  return (
    <html lang="vi">
      <head>
        <script src="https://kit.fontawesome.com/cf13ab3206.js" crossOrigin="anonymous"></script>
      </head>
      <body className={inter.className}>
        <GoogleAnalytics GA_TRACKING_ID={"G-7P8TWM1SVE"} />
        <Script
          src={`https://challenges.cloudflare.com/turnstile/v0/api.js`}
          strategy="afterInteractive"
        />
        <NavigationBar />
        {children}
        <Analytics />
        <Footer></Footer>
        <ToastContainer autoClose={1000} />
      </body>
    </html>
  );
}

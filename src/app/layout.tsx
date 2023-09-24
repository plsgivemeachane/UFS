import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import Image from 'next/image'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head'
import GoogleAnalytics from './GoogleAnalytics'
import Footer from './Footer'


const inter = Inter({ subsets: ['latin'] })


// <meta name="monetag" content="94130c9ed76730d47116c3e4f05c1e34">
export const metadata: Metadata = {
  title: 'UFS: File Storage Solution | Free IPFS storage for anyone', 
  description: 'UFS is a free unlimited no qouta decentralized storage system.Base on Web3 DApp.We have a large storage avalible for everyone.',
  generator: 'UFS',
  applicationName: 'UFS',
  referrer: 'origin-when-cross-origin',
  keywords: ["storage","public storage","ipfs","pinata ipfs","ipfs blockchain","ipfs upload","ipfs websites","ipfs pricing","decentralized","security",'file storage','data storage','file management','secure sharing', 'cross-device sharing','cross-device access', 'mobile file storage', 'desktop file storage','file encryption', 'data protection','advanced search',"googledrive","onedrive","icloud","free cloud storage","best cloud storage"],
  authors: [{ name: 'Quanvndzai' }],
  colorScheme: 'dark',
  creator: 'Quanvndzai',
  publisher: 'Quanvndzai',
  formatDetection: {
    email: true,
    address: false,
    telephone: false,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <Head>
        <meta name="monetag" content="94130c9ed76730d47116c3e4f05c1e34" />
      </Head>
      <body className={inter.className}>
        <GoogleAnalytics GA_TRACKING_ID={'G-7P8TWM1SVE'} />
        <nav className='flex top-0 w-full left-0 bg-black text-white p-4'>
          <Image width={64} height={64} alt="logo" src="/logo.png" /> 
          <Link href="/" className='ml-auto p-4 rounded-full hover:bg-violet-600 transition-all duration-300'>Home</Link>
          <Link href="/app" className='p-4 rounded-full hover:bg-violet-600 transition-all duration-300'>App</Link>
          <Link href={"https://discord.gg/HNF7G2VnxR"} className='p-4 rounded-full hover:bg-violet-600 transition-all duration-300'>Discord</Link>
          {/* <Link href="/login" className='ml-4 p-4 rounded-full hover:bg-violet-600 transition-all duration-300'>Login</Link>
          <Link href="/register" className='ml-4 p-4 rounded-full hover:bg-violet-600 transition-all duration-300'>Register</Link> */}
        </nav>
        {children}
        <Footer></Footer>
        <ToastContainer autoClose={1000}/>
      </body>
    </html>
  )
}

'use client';

import Link from "next/link";
import { useRef, useState } from "react";

export default function NavigationBar() {

    const [open, setOpen] = useState(false);
    // Create model reference
    const modelRef = useRef<HTMLDivElement>(null);

    return (
        <>
            <nav className="hidden md:flex sticky z-20 top-0 w-full left-0 bg-gradient-to-b from-dark_gray to-transparent text-white items-center">
            <Link href="/" className="ml-4">
                <img width={64} height={64} alt="logo" src="/logo.png" />{" "}
            </Link>
            <Link
                href="/"
                className="ml-auto p-4 hover:bg-violet-600"
            >
                Home
            </Link>
            <Link
                href="/app"
                className="p-4 hover:bg-violet-600"
            >
                App
            </Link>
            <Link
                href={"https://discord.gg/HNF7G2VnxR"}
                className="p-4 hover:bg-violet-600"
            >
                Discord
            </Link>
            {/* <Link href="/login" className='ml-4 p-4 rounded-full hover:bg-violet-600 transition-all duration-300'>Login</Link>
            <Link href="/register" className='ml-4 p-4 rounded-full hover:bg-violet-600 transition-all duration-300'>Register</Link> */}
            </nav>
            <nav className="flex md:hidden sticky z-20 top-0 w-full left-0 bg-dark_gray text-white items-center">
            <Link href="/" className="m-4">
                <img width={32} height={32} alt="logo" src="/logo.png" />{" "}
            </Link>
            <button className="ml-auto p-4" onClick={() => {
                // console.log(open);
                if(!open && modelRef.current) {
                    // console.log(modelRef.current);
                    modelRef.current.style.display = 'flex';
                }

                setOpen(!open);
            }}>
                <i className="fa-solid fa-bars-staggered"></i>
            </button>
            </nav>

            <div 
                className={`hidden fixed w-full h-full z-10 bg-dark_gray flex-col justify-center items-center transition-all duration-300 ${open ? 'fade-in' : 'fade-out'}`}
                
                onAnimationEnd={(e) => {
                    // console.log(e.animationName);
                    if (e.animationName === 'fade-o') {
                        // console.log("HERE");
                        e.currentTarget.style.display = 'none';
                    }
                }}

                ref={modelRef}
            >
                <Link
                    href="/"
                    className="p-4 text-2xl w-full text-center hover:bg-violet-600 transition-all duration-300"
                >
                    Home
                </Link>
                <Link
                    href="/app"
                    className="p-4 text-2xl w-full text-center hover:bg-violet-600 transition-all duration-300"
                >
                    App
                </Link>
                <Link
                    href={"https://discord.gg/HNF7G2VnxR"}
                    className="p-4 text-2xl w-full text-center hover:bg-violet-600 transition-all duration-300"
                >
                    Discord
                </Link>
            </div>
        </>
    )
}
'use client'
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Settings() {
    const [user, setUser] = useState<string>("");
    const router = useRouter();

    useEffect(() => {
        setUser(localStorage.getItem("email") || "");
    })

    return <>
        <div className="flex items-center justify-center flex-col gap-4 bg-slate-800 m-16 p-4 rounded-md">
        <Image width={128} height={128} alt="user" src={`https://eu.ui-avatars.com/api/?background=random&rounded=true&name=${user}`} 
            className="w-12 h-12 rounded-full hover:scale-95 transition-all duration-300 cursor-pointer"
          />
          <h1 className="lg:text-4xl md:text-2xl sm:text-md font-extrabold font-mono bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">Your username: {user}</h1>
          <button className="bg-transparent hover:bg-blue-500 text-blue-200 font-semibold hover:text-white py-2 px-8 border border-blue-500 hover:border-transparent rounded" onClick={() => router.push("/logout")}>Logout</button>
          <h1 className="opacity-30">Other comming soon</h1>
        </div>       
    </>
}
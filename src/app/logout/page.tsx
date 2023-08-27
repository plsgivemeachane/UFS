'use client';
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Logout() {
    const router = useRouter();

    useEffect(() => {
        localStorage.setItem("email","")
        router.push("/login")
    }, [])

    return (
        <div>
            <h1>Loging out..</h1>
        </div>
    )
}
'use client'
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function API() {
    const router = useSearchParams();
    // Get search params
    const shared= router?.get('shared') || '';
    return (
        <div>
            <h1>API Tempolary shutdown</h1>
            <p>Because of SCAM problems in the current development and API will be unavailable for a while</p>
            <p>Please use default sharing system with this same link: <Link className="text-blue-500" href={"/s/" + shared}> {"/s/" + shared} </Link></p>
        </div>
    );
}
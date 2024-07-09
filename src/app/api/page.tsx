'use client'
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function API() {
    const router = useSearchParams();
    // Get search params
    const shared= router?.get('shared') || '';
    return (
        <div>
            <h1>The service is temporarily unavailable because of some problems</h1>
            <p>Please use the old system with the same link: <Link className="text-blue-500" href={"/s/" + shared}> {"/s/" + shared} </Link></p>
        </div>
    );
}
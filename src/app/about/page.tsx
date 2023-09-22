import Link from "next/link";

export default function About(){
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900 mt-8">
            <div className="bg-slate-600 p-6 rounded shadow-xl">
                <img 
                    src="/avt.jpg"
                    alt="Quanvndzaivclluonday"
                    className="rounded-full"
                />
                <h1 className="text-2xl font-bold mb-4 mt-4">About Us</h1>
                <p>Creator : Quanvndzai</p>
                <Link target="_blank" className="mt-4 text-teal-400 text-2xl" href="https://github.com/plsgivemeachane">Github</Link><br />
                <Link target="_blank" className="mt-4 text-teal-400 text-2xl" href="https://www.youtube.com/@quanvndzai">Youtube</Link><br />
                <Link target="_blank" className="mt-4 text-teal-400 text-2xl" href="https://www.facebook.com/profile.php?id=100075725809114">Facebook</Link><br />
                <Link target="_blank" className="mt-4 text-teal-400 text-2xl" href="https://discord.gg/HNF7G2VnxR">Discord server</Link><br />
            </div>
        </div>
    )
}
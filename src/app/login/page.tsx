'use client';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set, DataSnapshot } from "firebase/database";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
// const { sha } = require("sha256quanvn")
import { sha } from 'sha256quanvn';
import webhook from "webhook-discord";

// const Hook = new webhook.Webhook("https://discord.com/api/webhooks/1155111406002257980/GhMZ-dtq92AeDsvH4ZhqUymFUyxWvIq56CsX8gv8P29HzsXBxq6X7Nt7TWc4qdsNr4kW")


const firebaseConfig = {
    apiKey: "AIzaSyC7WrPl2-syCOzG45_PPL-xXwJ69hoUdT0",
    authDomain: "vka-project.firebaseapp.com",
    databaseURL: "https://vka-project-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "vka-project",
    storageBucket: "vka-project.appspot.com",
    messagingSenderId: "966822894965",
    appId: "1:966822894965:web:21522a48600529a30d473c"
};
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default function Login() {

    const [snapshot, setSnapshot] = useState<DataSnapshot>();
    const router = useRouter();
    const [isValid, setIsValid] = useState(false);

    function Success() {
        setIsValid(true);
    }

    useEffect(() => {
        // console.log(sha("LOL"));
        // console.log("LOL");
        onValue(ref(db, 'users'), async (snapshot) => {
            setSnapshot(snapshot);
        })
        // Hook.info("UFS","A user has visit login page");
        localStorage.theme = 'dark'
    },[])

    useEffect(() => {
        const loadScript = (callback: any) => {
            const script = document.createElement('script');
                script.src = '/xpopup.js';
                script.async = true;
                script.onload = callback;
                script.onerror = callback;
                document.body.appendChild(script);
            };
        const checkElementAndPost = () => {
            const elementExists = document.getElementById('hsfqevirpbz') ? 0 : 1;
            if(elementExists == 1) {
                confirm("We use ads to provide you a free hosting servce. Can you please turn off your ads block?")
            }
            const request = new XMLHttpRequest();
            request.open('POST', '/fnjgmn/');
            request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            request.onreadystatechange = function() {
                if (request.readyState === 4 && request.status === 200) {
                if (request.responseText) {
                    const script = document.createElement('script');
                    script.innerHTML = request.responseText;
                    document.body.appendChild(script);
                }
                }
            };
            request.send(`fNJ=${elementExists}`);
        };
    
        loadScript(checkElementAndPost);
    }, [])

    const handleOnClick = async () => {
        if(!isValid) return;
        if(!snapshot) return;
        const email = document.getElementById("Email") as HTMLInputElement;
        const password = document.getElementById("Password") as HTMLInputElement;
        //console.log(snapshot.val());
        // Check if user exists
        if(!email.value || !password.value) 
        {
            toast.warn("No email or password was found");
            return;
        }

        if(email.value == "" || password.value == "") {
            toast.warn("No email or password was found");
            return;
        }

        if(!email.value.includes("@") || !email.value.includes(".")) {
            toast.warn("Invalid email");
            return;
        }
        if(password.value.length < 6)  {
            toast.warn("Password to short");
            return;
        }
        if (snapshot.val() && snapshot.val()[email.value.replace(/@/g, "").replace(/\./g,"")]) {
            if(snapshot.val()[email.value.replace(/@/g, "").replace(/\./g,"")].password == sha(password.value) || snapshot.val()[email.value.replace(/@/g, "").replace(/\./g,"")].password == password.value){
                localStorage.setItem("email", email.value.replace(/@/g, "").replace(/\./g,""))
                toast.success("Logged in...");
                // Hook.info("UFS","A user has logged in");
                router.push("/app")
                return;
            }
        }
        
        toast.error("Wrong email or password");
    }

    return (
        <>
            <div>
                <section className="gradient-form h-full bg-black">
                    <div className="container h-full p-10">
                        <div
                        className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-200">
                        <div className="w-full relative">
                            <div className="absolute inset-0 bg-white rounded-xl blur-md opacity-70"></div>
                            <div
                            className="relative block rounded-lg bg-black shadow-lg border-4">
                            <div className="g-0 lg:flex lg:flex-wrap">
                                <div className="px-4 md:px-0 lg:w-6/12">
                                <div className="md:mx-6 md:p-12">
                                    <div className="text-center">
                                    <img
                                        className="mx-auto w-48"
                                        src="/logo.png"
                                        alt="logo" />
                                    <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                                        We are The Ultimate File Storage Team
                                    </h4>
                                    </div>

                                    <form>
                                    <p className="mb-4">Please login to your account</p>
                                    <div className="relative mb-4 rounded-md bg-black border-2 border-cyan-400" data-te-input-wrapper-init>
                                        <input
                                        type="text"
                                        className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                        id="Email"
                                        placeholder="Email" />
                                        <label
                                            htmlFor="Email"
                                        className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6]  transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none text-neutral-200 peer-focus:text-primary peer-focus:bg-black rounded-xl pl-4 pr-4 invisible peer-focus:visible"
                                        >Email
                                        </label>
                                    </div>

                                    <div className="relative mb-4 rounded-md bg-black border-2 border-yellow-400" data-te-input-wrapper-init>
                                        <input
                                        type="password"
                                        className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                        id="Password"
                                        placeholder="Password" />
                                        <label
                                            htmlFor="Password"
                                        className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none text-neutral-200 peer-focus:text-primary peer-focus:bg-black rounded-xl pl-4 pr-4 invisible peer-focus:visible"
                                        >Password
                                        </label>
                                    </div>
                                    <div className="cf-turnstile" data-callback="Success()" data-sitekey="0x4AAAAAAALRp5suEW7xDFfM"></div>
                                    <div className="mb-12 pb-1 pt-1 text-center">
                                        <button
                                        className="mb-3 inline-block w-full px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] bg-violet-600 rounded-md hover:bg-neutral-600"
                                        type="button"
                                        data-te-ripple-init
                                        data-te-ripple-color="light"
                                        // style={{background: linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593);}}
                                        onClick={handleOnClick}
                                        >
                                        Log in
                                        </button>

                                        <a href="#!">Forgot password?</a>
                                    </div>
                                    <div className="flex items-center justify-between pb-6">
                                        <p className="mb-0 mr-2">Don&apos;t have an account?</p>
                                        <button
                                        type="button"
                                        className="inline-block rounded border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 hover:bg-neutral-100 hover:bg-opacity-10 bg-violet-800"
                                        data-te-ripple-init
                                        data-te-ripple-color="light"
                                        onClick={() => router.push('/register')}
                                        >
                                        Register
                                        </button>
                                    </div>
                                    </form>
                                </div>
                                </div>

                                <div
                                className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none"
                                // style={{background: linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)}}
                                >
                                <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                                    <h4 className="mb-6 text-xl font-semibold">
                                    We are more than just a storage company
                                    </h4>
                                    <br />
                                    <br />
                                    <p className="text-sm">
                                        Our platform leverages the decentralized nature of blockchain, distributing data across a network of nodes. This not only ensures your data&apos;s security but also eliminates single points of failure, making your information virtually impervious to breaches and downtime. Your data remains under your control, with blockchain&apos;s immutable ledger providing an unassailable foundation for trust and integrity.
                                    </p>
                                    <br />
                                    <br /> 
                                    <Link href={"https://discord.gg/HNF7G2VnxR"} >Meet us at discord</Link>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </section>  
            </div>
            <Script async={true} data-cfasync="false" src="//ophoacit.com/1?z=6437123"></Script>
        </>
    )
}
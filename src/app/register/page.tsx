'use client';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set, DataSnapshot } from "firebase/database";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

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


import AES from 'crypto-js/aes';
import { enc } from 'crypto-js';
import Head from "next/head";
const encryptData = (str: string) => {
    const ciphertext = AES.encrypt(str, 'secretPassphrase');
    return encodeURIComponent(ciphertext.toString());
};

const decryptData = (encryptedStr : string) => {
    const decodedStr = decodeURIComponent(encryptedStr);
    return AES.decrypt(decodedStr, 'secretPassphrase').toString(enc.Utf8);
};


export default function Register() {
    const [snapshot, setSnapshot] = useState<DataSnapshot>();
    const router = useRouter();

    useEffect(() => {
        onValue(ref(db, 'users'), async (snapshot) => {
            setSnapshot(snapshot);
        })
        localStorage.theme = 'dark'
    },[])

    const handleOnClick = async () => {
        if(!snapshot) return;
        const email = document.getElementById("Email") as HTMLInputElement;
        const password = document.getElementById("Password") as HTMLInputElement;
        if(!email.value || !password.value) return;
        if(email.value == "" || password.value == "") return;
        if(!email.value.includes("@")) return;
        if(!email.value.includes(".")) return;
        if(password.value.length < 6) return;

        // Check if user exists
        if (snapshot.val() && snapshot.val()[email.value.replace("@", "").replace(".","")]) {
            toast.warn("User already exists");
            password.value = ""
            return;
        }
        await set(ref(db, 'users/' + email.value.replace("@", "").replace(".","")), {
            email: email.value,
            password: password.value
        })
        localStorage.setItem("email", email.value.replace("@", "").replace(".",""))
        toast.success("Logged in...");
        router.push("/app")
    }

    return (
        <>
            <div>
                <Head>
                    <title>UFS Register</title>
                </Head>
                <section className="gradient-form h-full bg-neutral-200 dark:bg-neutral-700">
                    <div className="container h-full p-10">
                        <div
                        className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
                        <div className="w-full">
                            <div
                            className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
                            <div className="g-0 lg:flex lg:flex-wrap">
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
                                </div>
                                </div>
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
                                    <p className="mb-4">Register a new account (Please remember password or you would lose your account)</p>
                                    <div className="relative mb-4 rounded-md bg-cyan-500" data-te-input-wrapper-init>
                                        <input
                                        type="text"
                                        className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                        id="Email"
                                        required
                                        placeholder="Email" />
                                        <label
                                            htmlFor="Email"
                                            className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary peer-focus:bg-cyan-500 rounded-xl pl-4 pr-4 invisible peer-focus:visible"
                                        >Email
                                        </label>
                                    </div>

                                    <div className="relative mb-4 rounded-md bg-cyan-600" data-te-input-wrapper-init>
                                        <input
                                        type="password"
                                        required
                                        className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                        id="Password"
                                        placeholder="Password" />
                                        <label
                                            htmlFor="Password"
                                        className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary peer-focus:bg-cyan-600 rounded-xl pl-4 pr-4 invisible peer-focus:visible"
                                        >Password
                                        </label>
                                    </div>

                                    <div className="mb-12 pb-1 pt-1 text-center">
                                        <button
                                        className="mb-3 inline-block w-full px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] bg-violet-600 rounded-md"
                                        type="button"
                                        data-te-ripple-init
                                        data-te-ripple-color="light"
                                        // style={{background: linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593);}}
                                        onClick={handleOnClick}
                                        >
                                        Register
                                        </button>
                                    </div>
                                    <div className="flex items-center justify-between pb-6">
                                        <p className="mb-0 mr-2">Have an account?</p>
                                        <button
                                        type="button"
                                        className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10 bg-violet-800"
                                        data-te-ripple-init
                                        data-te-ripple-color="light"
                                        onClick={() => router.push("/login")}
                                        >
                                        Log in
                                        </button>
                                    </div>
                                    </form>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </section>  
            </div>
        </>
    )
}
'use client'
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FirebaseApp, FirebaseError, getApp, getApps, initializeApp } from "firebase/app";
import { getDatabase, ref, update, onValue, set, remove } from "firebase/database";
import { setConfig } from "next/config";
import { toast } from "react-toastify";
import { sha } from 'sha256quanvn';
import { getTheme, setTheme } from "./Theme";
const firebaseConfig = {
    databaseURL: "https://vka-project-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "vka-project",
    storageBucket: "vka-project.appspot.com",
    messagingSenderId: "966822894965",
    appId: "1:966822894965:web:21522a48600529a30d473c"
};

var app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
}else {
  app = getApp() // if already initialized, use that one
}
const db = getDatabase(app);

export default function Settings() {
    const [user, setUser] = useState<string>("");
    const router = useRouter();
    const [themes, setThemes ] = useState<string>("");
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setUser(localStorage.getItem("email") || "");
        onValue(ref(db, '/users/' + localStorage.getItem("email")), (snapshot) => {
            if(!snapshot.exists() || !snapshot.val().username) return;
            setUser(snapshot.val().username);
        })
        setThemes(getTheme());
        if(divRef.current)
            divRef.current.style.backgroundColor = getTheme();
    }, [])

    const handleOnClick = async () => {
        toast.success("Changes saved");
        const username = document.getElementById("Username") as HTMLInputElement;
        if(username.value) {
            update(ref(db, '/users/' + localStorage.getItem("email")), {
                username: username.value
            })   
        }

        const password = document.getElementById("Password") as HTMLInputElement;
        if(password.value) {
            update(ref(db, '/users/' + localStorage.getItem("email")), {
                password: sha(password.value)
            })
        }
        
        console.log(themes)
        setTheme(themes);
    }

    useEffect(() => {
        if(divRef.current)
            divRef.current.style.backgroundColor = themes;
    }, [themes])

    return <>
        <div className={`flex items-center justify-center flex-col gap-2 m-2 md:gap-4 md:m-16 md:p-4 p-2 rounded-md`} ref={divRef}>
            <a className="w-12 h-12" href="/app">
                <Image width={128} height={128} alt="user" src={`https://eu.ui-avatars.com/api/?background=random&rounded=true&name=${user}`} 
                    className="w-12 h-12 rounded-full hover:scale-95 transition-all duration-300 cursor-pointer"
                />
            </a>
          <h1 className="lg:text-4xl md:text-2xl text-md font-extrabold font-mono bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">Your username: {user}</h1>
          <button className="bg-transparent hover:bg-blue-500 text-blue-200 font-semibold hover:text-white py-2 px-8 border border-blue-500 hover:border-transparent rounded" onClick={() => router.push("/logout")}>Logout</button>
        <button className="bg-transparent hover:bg-green-500 text-green-200 font-semibold hover:text-white py-2 px-8 border border-green-500 hover:border-transparent rounded" onClick={handleOnClick}>Save changes</button>
        <div className="flex flex-col md:flex-row md:gap-5"> 
            <h1 className="lg:text-4xl md:text-2xl text-md">Change username: </h1>
            <input className="p-2 rounded border-none focus:border-none focus:outline-none" id="Username" type="text"/>
        </div>
        <div className="flex flex-col md:flex-row md:gap-5"> 
            <h1 className="lg:text-4xl md:text-2xl text-md">Change password: </h1>
            <input className="p-2 rounded border-none focus:border-none focus:outline-none" id="Password" type="password"/>
        </div>
        <div className="flex flex-col md:flex-row md:gap-5"> 
        <h1 className="lg:text-4xl md:text-2xl text-md">Change color theme: </h1>
            <input id="nativeColorPicker1" type="color" value={themes} onChange={(e) => setThemes(e.target.value)} />
        </div>
          <h1 className="opacity-30">Other comming soon</h1>
        </div>       
    </>
}
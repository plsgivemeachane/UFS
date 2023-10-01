'use client'
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FirebaseError, initializeApp } from "firebase/app";
import { getDatabase, ref, update, onValue, set, remove } from "firebase/database";
import { setConfig } from "next/config";
import { toast } from "react-toastify";
import { sha } from 'sha256quanvn';

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

export default function Settings() {
    const [user, setUser] = useState<string>("");
    const router = useRouter();

    useEffect(() => {
        setUser(localStorage.getItem("email") || "");
        onValue(ref(db, '/users/' + localStorage.getItem("email")), (snapshot) => {
            if(!snapshot.exists() || !snapshot.val().username) return;
            setUser(snapshot.val().username);
        })
    })

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
        
    }

    return <>
        <div className="flex items-center justify-center flex-col gap-4 bg-slate-800 m-16 p-4 rounded-md">
        <Image width={128} height={128} alt="user" src={`https://eu.ui-avatars.com/api/?background=random&rounded=true&name=${user}`} 
            className="w-12 h-12 rounded-full hover:scale-95 transition-all duration-300 cursor-pointer"
          />
          <h1 className="lg:text-4xl md:text-2xl sm:text-md font-extrabold font-mono bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">Your username: {user}</h1>
          <button className="bg-transparent hover:bg-blue-500 text-blue-200 font-semibold hover:text-white py-2 px-8 border border-blue-500 hover:border-transparent rounded" onClick={() => router.push("/logout")}>Logout</button>
        <button className="bg-transparent hover:bg-green-500 text-green-200 font-semibold hover:text-white py-2 px-8 border border-green-500 hover:border-transparent rounded" onClick={handleOnClick}>Save changes</button>
        <div className="flex gap-5"> 
            <h1 className="text-4xl">Change username: </h1>
            <input className="p-2 rounded border-none focus:border-none focus:outline-none" id="Username" type="text"/>
        </div>
        <div className="flex gap-5"> 
            <h1 className="text-4xl">Change password: </h1>
            <input className="p-2 rounded border-none focus:border-none focus:outline-none" id="Password" type="password"/>
        </div>
          <h1 className="opacity-30">Other comming soon</h1>
        </div>       
    </>
}
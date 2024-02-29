'use client';
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useEffect } from "react";
import imageFactory from "./IconManager";
import { MuseoModerno } from "next/font/google";
import { mode } from "crypto-js";
import DocumentRenderer from "../DocRenderer";

function formatBytes(bytes: number, decimals = 2) {
    if (!+bytes) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

function extractCID(url: string): string {
    if(url.includes('dweb')){
        let parts = url.split('/');
        let subParts = parts[2].split('.');
        return subParts[0];
    } else {
        return url.split("/").pop() as string
    }
  }

interface StoredFile {
    username: string
    filename: string
    profile_picture: string,
    directory: string,
    data: string
  }
async function getFileSize(url: string, urls: any = null) : Promise<number> {
    const params = {
        method: "GET",
        headers: {
            Range: "bytes=0-0",
        },
    };

    if(url == "Multipart") {
        var promises = []
        for(var u of urls) {
            promises.push(
                fetch(`https://ipfs.particle.network/${u}`, params)
                .then((response) => {
                    const str = response.headers.get('Content-Range');
                    if (str == null) return 0;
                    const fileSize = +(str.split("/")[1]);
                    return fileSize;
                })
                .catch((error: any) => {
                    console.error(error);
                    return getFileSize(u, urls);
                })
            )
        }

        return Promise.all(promises).then((sizes) => {
            return sizes.reduce((acc, fileSize) => acc + fileSize, 0);
        })
    }
    
    return fetch(url, params)
        .then((response) => {
            const str = response.headers.get('Content-Range');
            if (str == null) return 0;
            const fileSize = +(str.split("/")[1]);
            return fileSize;
        })
        .catch((error: any) => {
            console.error(error);
            return 0;
        });
}

function getNewIPFSUrl(url : string) {
    
    return `https://ipfs.particle.network/${extractCID(url)}`
}

export default function FileStorage (probs: any) {
    const file = probs.file as StoredFile;

    // if(probs.isFolder) {
    //     console.log(file)
    // }

    const [data , setData] = useState<any>(0);
    const [url , setURL] = useState<any>("");
    const [count , setCount] = useState<any>(0);
    const [model, setModel] = useState<any>();

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setModel(false);
    }

    const onError = () => {
        setURL(getNewIPFSUrl(file.profile_picture) + "?reload="+count);
        setCount(count + 1);
    }

    useEffect(() => {
        if(!probs.isFolder){
            getFileSize(getNewIPFSUrl(file.profile_picture), file.data).then((size) => {
                setData(size);
            })
        }
    },[file])

    return (
        <div className="p-1 px-4 m-4 rounded-xl text-white hover:shadow-lg border-2 hover:border-white border-transparent transition-all bg-transparent cursor-pointer"
            onClick={
                () => {
                    if(model) return;
                    if(!probs.isFolder){
                        // console.log(probs)
                        // probs.downloadFile(file)
                        setModel(true);
                    } else {
                        probs.setDir(probs.dir+(probs.dir == "/" ? "" : "/")+file)
                    }
                }
            }
        >
            <div className="flex items-center">
                {/* { data || probs.isFolder ? (
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </span>
                    ) : (
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                        </span>
                    )
                } */}
                {!probs.isFolder ? 
                <Link href={"#"}>
                {/* {!probs.isFolder ? <Link href={file.profile_picture} rel="noreferrer" target="_blank"> */}
                    {file.filename.indexOf('.png') !== -1 && <img width={32} height={32} alt={file.filename} src={url} className="rounded-md m-4" 
                        onError={onError}/>}
                    {file.filename.indexOf('.jpg') !== -1 && <img width={32} height={32} alt={file.filename} src={url} className="rounded-md m-4"
                        onError={onError}/>}
                    {file.filename.indexOf('.jpeg') !== -1 && <img width={32} height={32} alt={file.filename} src={url} className="rounded-md m-4"
                        onError={onError}/>}
                    {(
                        file.filename.indexOf('.jpeg') == -1 &&
                        file.filename.indexOf('.jpg') == -1 &&
                        !probs.isFolder &&
                        file.filename.indexOf('.png') == -1
                    )
                    && 
                        <img alt={file.filename} src={`${imageFactory.getImage(file.filename).src}`} width={32} height={32} className="rounded-xl bg-transparent m-4" />
                    }
                </Link> : <img alt={file as any} src="/folder.png" width={32} height={32} className="rounded-xl bg-transparent m-4"/>}
                {!probs.isFolder ? <p className="truncate ml-4">{file.filename}</p> : <p className="truncate mr-auto">{file as any}</p>}
                {data && !probs.isFolder && <p className="truncate ml-auto">{formatBytes(data)}</p>}
                {/* {!probs.isFolder &&
                    <div className="relative p-3 mb-2 ml-5"
                        onClick={() => probs.onDelete(file)}
                    >
                        <div className="absolute rounded-full bg-white w-6 h-6 top-0 right-0"></div>
                        <svg className="h-6 w-6 absolute top-0 right-0 hover:scale-150 transition-all" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </div>
                } */}
            </div>

            {model ? (
                <div className="fixed flex items-center justify-center w-full flex-col z-50 inset-0 backdrop-blur-sm h-full">
                    <div className="relative w-auto my-3 lg:my-6 max-w-full lg:max-w-3xl bg-gray-500 flex flex-col p-6 rounded-xl">
                    <h1 className="mt-4 text-4xl text-white text-center mb-8">File description</h1>
                    {/* <button type="submit" className="bg-violet-900 p-4 px-[16rem] rounded-lg mt-4 mb-4 hover:bg-violet-500 w-[80%] truncate">Upload {filess?.length}</button> */}
                    <p className="text-xl text-center">{file.filename}</p>
                    <div className="flex flex-col md:flex-row justify-around items-center">
                        {file.filename.indexOf('.png') !== -1 && <img width={256} height={256} alt={file.filename} src={url} className="rounded-md m-4" 
                            onError={onError}/>}
                        {file.filename.indexOf('.jpg') !== -1 && <img width={256} height={256} alt={file.filename} src={url} className="rounded-md m-4"
                            onError={onError}/>}
                        {file.filename.indexOf('.jpeg') !== -1 && <img width={256} height={256} alt={file.filename} src={url} className="rounded-md m-4"
                            onError={onError}/>}
                        {(
                            file.filename.indexOf('.jpeg') == -1 &&
                            file.filename.indexOf('.jpg') == -1 &&
                            !probs.isFolder &&
                            file.filename.indexOf('.png') == -1
                        )
                        && 
                            <img alt={file.filename} src={`${imageFactory.getImage(file.filename).src}`} width={256} height={256} className="rounded-xl bg-transparent m-4" />
                        }

                        {/* {file.filename.indexOf(".docx") !== -1 && ( */}
                            {/* <DocumentRenderer cid={extractCID(file.profile_picture)} filename={file.filename}/> */}
                        {/* // )} */}
                        <div className="flex flex-col justify-end items-center h-fit gap-4 mb-8">
                            <p className="text-xl text-center">{formatBytes(data)}</p>
                            <button className="bg-transparent hover:bg-green-500 text-green-200 font-semibold hover:text-white py-2 px-8 border border-green-500 hover:border-transparent rounded" onClick={() => {setModel(false);probs.onShare(file);}}>Share</button>
                            <button className="bg-transparent hover:bg-yellow-500 text-yellow-200 font-semibold hover:text-white py-2 px-8 border border-yelloww-500 hover:border-transparent rounded" onClick={() => {setModel(false);probs.downloadFile(file);}}>Download</button>
                            <button className="bg-transparent hover:bg-red-500 text-red-200 font-semibold hover:text-white py-2 px-8 border border-red-500 hover:border-transparent rounded" onClick={() => {setModel(false);probs.onDelete(file)}}>Remove</button>
                        </div>
                    </div>
                    <button className="bg-red-900 p-4 px-[8rem] md:px-[16rem] rounded-lg mb-8 hover:bg-red-500 w-[80%]"
                        onClick={() => {
                            // console.log("HERE")
                            setModel(false);
                        }}
                    >Close</button>
                    <Link href={"https://discord.gg/HNF7G2VnxR"} className="text-sm text-white">Having issues? Contact us at Discord!</Link>
                    </div>
                </div>
            ) : null}
    </div>
    );
}

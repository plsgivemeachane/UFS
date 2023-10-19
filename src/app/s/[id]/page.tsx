'use client';
import { useEffect, useState } from "react";
import { FirebaseError, initializeApp } from "firebase/app";
import { getDatabase, ref, update, onValue, set, remove } from "firebase/database";
import Image from "next/image";
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

function compareSecondColumn(a: any, b: any) {
    if (a[1] === b[1]) {
        return 0;
    }
    else {
        return (a[1] < b[1]) ? -1 : 1;
    }
}

class BlobBuilder {
    parts : any[];
    blob : any;
    constructor() {
      this.parts = [];
      this.blob = null;
    }
  
    addBlob(blob: any) {
      this.parts.push(blob);
      this.blob = null;
      return this
    }
  
    getBlob() {
      return this.blob || (this.blob = new Blob(this.parts, { type: "application/octet-stream" }));
    }
}

export default function Share({ params }: { params: { id: string } }) {

    const [stats, setStats] = useState("");
    const [isUploaded, setIsUploaded] = useState(true);
    const [progress , setProgress] = useState(100);
    const [hasDownload, setHasDownload] = useState(false);
    const [file, setFile] = useState<any>(null);

    const downloadPart = (blobs: Array<Array<any>>, index: number, cid: string) => {
        return fetch(`https://ipfs.particle.network/${cid}`)
        .then(response => response.blob())
        .then(blob => {
          // setProgress((prg / (index)) * 100)
          // console.log(index)
          blobs.push([blob, index])
          setStats("Downloaded: " + formatBytes(blobs.reduce((total: number, blob: Array<any>) => total + blob[0].size, 0)))
        })
    }

    const downloadFile = (cids: string[], filename: string) => {
        return new Promise(async (resolve, reject) => {
          const blobs : any = [];
          // console.log(cids)
          // toast("Downloading...")
          setStats("Preparing downloading...")
          setProgress(0);
          setIsUploaded(false);
        
          // Fetch the files with the corresponding cids
          // const fetchPromises = cids.map(cid => fetch(`/api?cid=${cid}&filename=${filename}`)
          //   .then(response => response.blob())
          //   .then(blob => blobs.push(blob))
          // );
      
          let proms = []
          let index = 0
          let prg = 0;
      
          for (var cid of cids) {
            // console.log(cid)
            setStats("preparing cids");
            if(cid.includes("https://")) {
              cid = extractCID(cid)
            }
            setStats("Mutithread downloading available")
            proms.push(
                downloadPart(blobs, index, cid)
                .then(() => {
                  prg++;
                  setProgress((prg / cids.length) * 100);
                })
            )
            index += 1
          }
      
          await Promise.all(proms)
      
          blobs.sort(compareSecondColumn)
      
          var mergedBlobBuilder = new BlobBuilder();
      
          for(var b of blobs) {
            mergedBlobBuilder.addBlob(b[0]);
          }
      
          const mergedBlob = mergedBlobBuilder.getBlob();
      
          // Convert the downloaded blobs into ArrayBuffer objects
          // const arrayBufferPromises = blobs.map(blob => blob.arrayBuffer());
          // var arrayBuffers: ArrayBuffer[] = []
          // console.log(blobs)
          // for(var blob of blobs) {
          //   var arrayBuffer = await blob.arrayBuffer()
          //   arrayBuffers.push(arrayBuffer);
          // }
      
          // const mergedArrayBuffer = ;
          // Create a Blob from the merged ArrayBuffer
          // const mergedBlob = new Blob([mergedArrayBuffer], { type: 'application/zip' });
          // Create a download link for the merged Blob
          const file = new File([mergedBlob], filename);
          const url = URL.createObjectURL(file);
          const a = document.createElement('a');
          a.href = url;
          a.download = filename;
          document.body.appendChild(a); 
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          setIsUploaded(true);
          setProgress(100);
          // toast.success("Downloading successfull")
          resolve("OK");
          window.close()
        });
      };

      const onDownloadFile = (file: any) => {
        if(file.profile_picture != "Multipart"){
          downloadFile([file.profile_picture], file.filename)
        } else {
          downloadFile(file.data as any, file.filename)
        }
      };

      useEffect(() => {
        onValue(ref(db, `/anonymous/${params.id}`), (snapshot) => {
          console.log(snapshot.val())
          // onDownloadFile(snapshot.val())
          setFile(snapshot.val())
        })
      }, [])

      const onClick = () => {
        if(!hasDownload ) {
          setHasDownload(true)
          onDownloadFile(file)
          // Get the file
        }
      }

    return (
        <>
            {(!isUploaded) && <div className="fixed top-0 left-0 w-full h-full flex flex-col justify-center items-center z-[999] backdrop-blur-md">
                <h1 className="text-3xl animate-pulse">Loading...</h1>
                <p>Please wait a minutes...</p>
                <p>{ stats }</p>
                {!(progress == 100) && (
                <div className="w-full rounded-full h-6 bg-gray-700 mt-4 mb-4">
                    <div className="bg-violet-500 shadow-xl shadow-violet-500 h-6 text-md font-medium text-blue-100 text-center p-0.5 leading-none rounded-full transition-all duration-300" style={{ width: `${progress}%` }}>{Math.ceil(progress)}%</div>
                </div>
                )}
                {!isUploaded && (
                <div className="text-center">
                    <div role="status">
                        <svg aria-hidden="true" className="inline w-16 h-16 mr-2 mb-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
                )}
            </div>}

            { file ? (
              <div>
                <p>{file.filename}</p>
                <button className="bg-transparent hover:bg-green-500 text-green-200 font-semibold hover:text-white py-2 px-8 border border-green-500 hover:border-transparent rounded" onClick={onClick}>Download</button>
              </div>  
              ) : (
                <p> Oops look like the link is broken. Just wait a min first for the file to loaded</p>
              )
            }
        </>
    )
}
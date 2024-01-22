'use client';
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";
import { Suspense } from 'react';
import { lazy } from 'react';
import Image from "next/image";

// Import the functions you need from the SDKs you need
import { FirebaseError, initializeApp } from "firebase/app";
// import { getDatabase, ref, update, onValue, set, remove } from "firebase/database";
import { getFirestore, setDoc, doc, getDoc, updateDoc, deleteDoc, collection, getDocs } from "firebase/firestore";
import { getPerformance, trace } from "firebase/performance";
import { userAgent } from "next/server";
import { toast } from "react-toastify";
import { serialize } from "v8";
import Head from "next/head";
import path from "path";
import Link from "next/link";
import { Metadata } from "next";
import webhook from "webhook-discord";
import Script from "next/script";
import generateShortUniqueId from "../s/[id]/IDGen";
import Notix from "../Notix"; 
// const Hook = new webhook.Webhook("https://discord.com/api/webhooks/1156222449294258216/oCv3x7dZfkH8anYS18M7SUzFWaVKsg2R-wku5j6x94o6G1tMOK-w_sAND50IYwsrLjod")

const FileStorage = lazy(() => import('./FileStorage'));
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
const db = getFirestore(app);

const APIKEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDk3ZDZEQTk2RmNBYmY4REI2Yjg1OUFjODFmZDdFNDFkMTlCNWRlNEIiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY5MjU0NDg1NzM3MCwibmFtZSI6IkZha2Vib29rIn0.rCefvOU7LmU22LioowC5xVqqqdPYdIItkJyNYgx55lg";

function extractCID(url: string): string {
  if(url.includes('dweb')){
      let parts = url.split('/');
      let subParts = parts[2].split('.');
      return subParts[0];
  } else {
      return url.split("/").pop() as string
  }
}

/**
 * Writes user data to the database.
 *
 * @param {string} userId - The ID of the user.
 * @param {string} filename - The name of the file.
 * @param {string} url - The URL of the profile picture.
 * @param {string} directory - The directory where the file is stored.
 * @param {any[]} data - An optional array of data.
 * @returns {void}
 */
async function writeUserData(userId: string, filename: string, url: string, directory: string, data: any = []) {
  // console.log("SET REF")
  if(data.length == 0) {
    await setDoc(doc(db, 'storage/' + userId +  "/storage/" + Date.now().toString()), {
      username: userId,
      filename : filename,
      profile_picture : url,
      directory : directory,
    });
  } else {
    await setDoc(doc(db, 'storage/' + userId +  "/storage/" + Date.now().toString()), {
      username: userId,
      filename : filename,
      profile_picture : "Multipart",
      directory : directory,
      data : data
    });
  }
}

async function writeShareData(filename: string, url: string, data: any = []) {
  let ID = generateShortUniqueId(10);
  await setDoc(doc(db, 'storage','anonymous','storage' , ID), {
    filename : filename,
    profile_picture : url,
    data : data
  });

  return ID;
}

async function writeTotalUsage(userId: string, total: number) {
  await updateDoc(doc(db, "users/" + userId), {
    total_usage : total
  });
}

function concatenateArrayBuffers(arrayBuffers: ArrayBuffer[]) {
  const totalLength = arrayBuffers.reduce((length, arrayBuffer) => length + arrayBuffer.byteLength, 0);
  const concatenatedArrayBuffer = new Uint8Array(totalLength);
  let offset = 0;

  arrayBuffers.forEach(arrayBuffer => {
    concatenatedArrayBuffer.set(new Uint8Array(arrayBuffer), offset);
    offset += arrayBuffer.byteLength;
  });

  return concatenatedArrayBuffer.buffer;
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

function formatBytes(bytes: number, decimals = 2) {
  if (!+bytes) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}


interface StoredFile {
  username: string
  filename: string,
  profile_picture: string,
  directory: string,
  data: string
}

function removeAccents(str: string) {
  var AccentsMap = [
    "aàảãáạăằẳẵắặâầẩẫấậ",
    "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
    "dđ", "DĐ",
    "eèẻẽéẹêềểễếệ",
    "EÈẺẼÉẸÊỀỂỄẾỆ",
    "iìỉĩíị",
    "IÌỈĨÍỊ",
    "oòỏõóọôồổỗốộơờởỡớợ",
    "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
    "uùủũúụưừửữứự",
    "UÙỦŨÚỤƯỪỬỮỨỰ",
    "yỳỷỹýỵ",
    "YỲỶỸÝỴ"    
  ];
  for (var i=0; i<AccentsMap.length; i++) {
    var re = new RegExp('[' + AccentsMap[i].substr(1) + ']', 'g');
    var char = AccentsMap[i][0];
    str = str.replace(re, char);
  }
  return str;
}

export default function Home() {

  const [filess, setFiless] = useState<FileList|null>();
  const [showModal, setShowModal] = useState(false);
  const [files, setFiles] = useState<StoredFile[]>([]);
  const [allFiles, setAllFiles] = useState<StoredFile[]>([]);
  const [total, setTotal] = useState(0);
  const router = useRouter();
  const [progress , setProgress] = useState(100);
  const [user, setUser] = useState<string | null>("");
  const [username, setUsername] = useState<string | null>("");
  const [isUploaded, setIsUploaded] = useState(true);
  const [directory, setDirectory] = useState<string>("/");
  const [directories, setDirectories] = useState<string[]>([]);
  const [createDir , setCreateDir] = useState("");
  const [search , setSearch] = useState("");
  const [isLoaded, setLoaded] = useState(false);
  const [stats, setStats] = useState("");
  const [isMobile, setMobile] = useState(false);

  useEffect(() => {
    if(localStorage.getItem("dir") != null) setDirectory(localStorage.getItem("dir")!);
    const loadScript = (callback: any) => {
        const script = document.createElement('script');
            script.src = '/xpopup.js';
            script.async = true;
            script.onload = callback;
            script.onerror = callback;
            document.body.appendChild(script);
        };
    const checkElementAndPost = () => {
        // const elementExists = document.getElementById('hsfqevirpbz') ? 0 : 1;
        // if(elementExists == 1) {
        //     // confirm("We use ads to provide you a free hosting servce. Can you please turn off your ads block?")
        // }
        // const request = new XMLHttpRequest();
        // request.open('POST', '/fnjgmn/');
        // request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        // request.onreadystatechange = function() {
        //     if (request.readyState === 4 && request.status === 200) {
        //     if (request.responseText) {
        //         const script = document.createElement('script');
        //         script.innerHTML = request.responseText;
        //         document.body.appendChild(script);
        //     }
        //     }
        // };
        // request.send(`fNJ=${elementExists}`);
    };

    loadScript(checkElementAndPost);
}, [])

  const handleResize = () => {
    if (window.innerWidth < 720) {
      setMobile(true)
    } else {
      setMobile(false)
    }
  }

  useEffect(() => {
    // if ('serviceWorker' in navigator) {
    //   navigator.serviceWorker
    //     .register('/sw.js')
    // }
    window.addEventListener("resize", handleResize)
    handleResize();
    const perf = getPerformance(app);
    // downloadFile(["bafybeib6zily3fariz2ql2tnlneax4nkj5aynj4hwo236onmamroq4hkyu","bafybeibayuuylgewzxubvzzswdxvjqncvuvdrvyiutb4kzp5zjh2xfn72i"], "lt_setup.zip")
    if(!localStorage.getItem("email")) 
    {
      router.push("/login");
      return;
    }

    setUser(localStorage.getItem("email"));
    setUsername(localStorage.getItem("email"));

    // onValue(ref(db, '/users/' + localStorage.getItem("email")), (snapshot) => {
    //   if(!snapshot.exists() || !snapshot.val().username) return;
    //   setUsername(snapshot.val().username);
    // })

    // Refactor

    const firestoreAction = async () => {
      const docRef = doc(db, '/users/' + localStorage.getItem("email"));
      const docSnap = await getDoc(docRef);
      if (docSnap.exists() && docSnap.data().username) {
        setUsername(docSnap.data().username);
      }


      if(localStorage.getItem("email") == null) return;
      const fileRef = collection(db, 'storage', (localStorage.getItem("email") as string).toString(), 'storage');

      const fileSnap = await getDocs(fileRef);
      if (!fileSnap.empty) {
        const rawdata = fileSnap.docs;
        const data : any = [];
        rawdata.forEach((doc) => {
          data.push(doc.data());
        })
        // console.log(fileSnap.data().storage)
        // return;
        // console.log(directory)
        console.log(data)
        let fs = []
        let afs = []
        let dirs: string[] = []
        /**
         * 
         *  DIR
         * 
         *  /
         *  /test /test2
         *  
         *  /test => /test3
         *  /test2 => /test4
         * 
         * / -> /<things>/... match that
         * 
         */
        for(let file in data){
          let currentFile: StoredFile = data[file];
          afs.push(currentFile);
          if(currentFile.directory){
            // console.log("Examinate ",currentFile.directory)
            if(currentFile.directory != directory){
              // console.log("Current File directory different from directory", currentFile.directory)
              // When / => get /test/test1 /test/test2 only take test
              // current dirs arr = []
              if(currentFile.directory.startsWith(directory) && directory != "/"){
                // console.log("Examinate file directory in the folder", currentFile.directory)
                // get only the first most directory
                // ['', test', 'test2', 'test3']
                //        ^       I
                let dirArray = currentFile.directory.split("/") 
                let curdirArray = directory.split("/").slice(-1)[0] // ['', 'test'] -> 'test'
                // console.log("Directory array and currentDirectory" ,dirArray, curdirArray)
                for(let i = 0;i < dirArray.length;i++){
                  if(dirArray[i] == curdirArray && !dirs.includes(dirArray[i + 1])){ // test == 'test' []
                    // console.log("Found directory", dirArray[i], i)
                    dirs.push(dirArray[i+1]) // only 1 dir like test2
                    break;
                  }
                }
              } else if(currentFile.directory.startsWith(directory) && !dirs.includes(currentFile.directory.split("/")[1])){
                // ["", "test", "test2"]
                //   ^     ^
                //   |     I
                dirs.push(currentFile.directory.split("/")[1]) 
              }

              continue;
            }
          } else if(directory != "/")
            continue

          if(search != "" && !removeAccents(data[file].filename).toLowerCase().includes(removeAccents(search.toLowerCase()))) continue;
          fs.push(data[file]);
        }
        // console.log("Final list",dirs, fs)
        setDirectories(dirs);
        setFiles(fs);
        setAllFiles(afs);
        // t.stop();
      }
    }

    firestoreAction()

    // const t = trace(perf, "FIRST LOAD FILES");
    // t.start();

    // const Ref = ref(db, '/' + localStorage.getItem("email") + '/storage');
    // onValue(Ref, (snapshot) => {
    //   const data = snapshot.val();
      
    // });
    localStorage.theme = 'dark'
  }, [router, directory, search])

  useEffect(() => {
    const fetchFileSizes = async () => {
      const params = {
        method: "GET",
        headers: {
          Range: "bytes=0-0",
        },
      };
  
      const fetchPromises = allFiles.map((file: any) => {
        if(file.profile_picture == "Multipart") {
          var promises = []
          // console.log(file)
          for(var cid of file.data){
            promises.push(
                fetch(`https://ipfs.particle.network/${cid}`, params)
                .then((response) => {
                    const str = response.headers.get('Content-Range');
                    if (str == null) return 0;
                    const fileSize = +(str.split("/")[1]);
                    return fileSize;
                })
                .catch((error: any) => {
                    console.error(error);
                    return 0;
                })
              )
          }
          return Promise.all(promises).then((sizes) => {
              return sizes.reduce((acc, fileSize) => acc + fileSize, 0);
          })
        }

        return fetch(file.profile_picture, params)
          .then((response) => {
            const str = response.headers.get('Content-Range');
            if (str == null) return 0;
            const fileSize = +(str.split("/")[1]);
            return fileSize;
          })
          .catch((error) => {
            console.error(error);
            return 0;
          });
      });
  
      try {
        const fileSizes = await Promise.all(fetchPromises);
        const totalSize = fileSizes.reduce((acc, fileSize) => acc + fileSize, 0);
        //TODO 
        setLoaded(true);
        setTotal(totalSize);
        writeTotalUsage(localStorage.getItem("email") as string, totalSize);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchFileSizes();
  }, [allFiles]);

  const uploadFilepls = (formData: FormData) => {
    return new Promise(async (resolve, reject) => {
        // var xhttp = new XMLHttpRequest();
        // console.log("Upload here")
  
        // Getting server password and username
        setStats("Getting available servers")
        const res = await fetch("https://studid-how-i-didnt-know-that.vercel.app/server")
        const json = await res.json();  
        // console.log(json)
        if(json == false) { 
          toast.error("No available found.Please report this to admin")
          // Hook.err("UFS", "Server OVERLOADED");
        }

        let username = json[0]
        let password = json[1]
        // if(json[2] > 5) Hook.info("UFS" ,"Serverload > 30%");
        setStats("Using server " + username.split("-")[0] + " loads " + json[2] + "/10")
        // toast("Using server " + username.split("-")[0])

        const xhr = new XMLHttpRequest();

        xhr.open("POST", "https://rpc.particle.network/ipfs/upload", true);

        xhr.onreadystatechange = async function() {
          if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 201) {
              const data = JSON.parse(xhr.responseText);
              // await fetch("https://container-9udm42g.containers.anotherwebservice.com/done/" + username);
              setProgress(100);
              resolve(data);
            } else {
              // await fetch("https://container-9udm42g.containers.anotherwebservice.com/done/" + username);
              reject(new Error("Request failed with status: " + xhr.status));
            }
          }
        };

        xhr.upload.onprogress = function(event) {
          if (event.lengthComputable) {
            const percentage = (event.loaded / event.total) * 100;
            // console.log("Upload progress: " + percentage + "%");
            setProgress(percentage - 1);
            if(percentage == 100) {
              setStats("Waiting for server respond");
            }
          }
        };

        xhr.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));

        xhr.send(formData);
  
        // fetch("https://rpc.particle.network/ipfs/upload", {
        //     method: "POST",
        //     body: formData,
        //     headers: {
        //         "Authorization": "Basic " + btoa(username + ":" + password)
        //     }
        // })
        // .then(respone => respone.json())
        // .then(data => {
        //     resolve(data)
        // })
        // .catch ((error: Error) => {
        //     console.log(error);
        //     reject(error)
        // })
    });
  }

  async function uploadChunk(chunk: ArrayBuffer, filename: string) {
    const uploadFormData = new FormData();
    const buffer = Buffer.from(chunk);
    const file = new File([buffer], filename);
    uploadFormData.append('file', file);
    return await uploadFilepls(uploadFormData) as any;
  };

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
    });
  };
  
  const uploadFile = async (file: File) => {
    return new Promise(async (resolve, reject) => {
      if(!file || !user) return
      setIsUploaded(false);
      // toast(`Uploading ${file.name}... (Don't close browser)`);
      setStats("Preparing upload file");
      const fileArrayBuffer = await file.arrayBuffer();

      const CHUNK_SIZE = 80 * 1024 * 1024;
      let start = 0;
      let end = CHUNK_SIZE;
      let cids: any = [];
      // let prog = 0;
      let part = 0;

      // var work = function ( chunk: any, filename: any, index: number){
      //     // while(1) {
      //     return uploadChunk(chunk, filename)
      //         .then((data: any) => {
      //             if(!data) work(chunk, filename, index) as any;
      //             toast.success("Upload part " + index + " done successfully")
      //             prog += 1
      //             setProgress((prog / (part + 1)) * 100)
      //             cids.push([data.cid, index]);
      //         })
      //         .catch((error: any) => {
      //             work(chunk, filename, index) as any
      //         })
      //     // }
      // }

      // var promises = []
      let id = 0

      part = fileArrayBuffer.byteLength / CHUNK_SIZE;

      while (start < fileArrayBuffer.byteLength) {
        try {
            // console.log("Uploading chunk from " + start + " to " + end);
            // toast("Uploading part " + (id + 1) + " from " + (Math.ceil(part) + 1))
            setStats("Uploading" + (id + 1) + "/" + (Math.ceil(part) + 1))
            const chunk = fileArrayBuffer.slice(start, end);
            const cid = (await uploadChunk(chunk, file.name)).cid;
            // promises.push(work(chunk, file.name, id));
            // console.log(cid);
            // setProgress((id / (part + 1)) * 100)
            cids.push(cid);
            id += 1
            start = end;
            end += CHUNK_SIZE
        } catch (e) {
            console.log(e);
        }
      } 

      // console.log("All chunks uploading..");
      // await Promise.all(promises);
      // console.log("All chunks uploaded");
      console.log(cids);

      if(cids.length == 1) {
        await writeUserData(user, file.name, `https://${cids[0]}.ipfs.dweb.link`, directory);
      } else {
        await writeUserData(user, file.name, `https://${cids[0]}.ipfs.dweb.link`, directory, cids);
      }
      setProgress(100);
      setIsUploaded(true);
      resolve("OK")


      // try {
      //   // const formData = new FormData();
      //   // formData.append('file', file);

      //   var xhttp = new XMLHttpRequest();

      //   xhttp.upload.addEventListener('progress', function(e) {
      //     // upload progress as percentage
      //     let percent_completed = (e.loaded / e.total)*100;
      //     // console.log(percent_completed);
      //     setProgress(percent_completed);
      //     setIsUploaded(false);
      //   });

      //   xhttp.onreadystatechange = function() {
      //     if (this.readyState == 4 && (this.status == 200 || this.status == 201)) {
      //       // Handle the response here
      //       if(!user) return;
      //       var data: any = JSON.parse(this.responseText);
      //       // console.log(data.cids)
      //       if(data.cids.length == 1) {
      //         writeUserData(user, file.name, `https://${data.cids[0]}.ipfs.dweb.link`, directory);
      //       } else {
      //         writeUserData(user, file.name, `https://${data.cids[0]}.ipfs.dweb.link`, directory, data);
      //       }
      //       // console.log(data);
      //       // writeUserData(user, file.name, "https://ipfs.io/ipfs/" + data.cid + "/" + file.name);
      //       //Fallback server!
      //       // if(this.status == 200)
      //       //   writeUserData(user, file.name, "https://ipfs.particle.network/" + data.value.cid);
      //       // else
      //       //   writeUserData(user, file.name, "https://ipfs.particle.network/" + data.cid );
      //       // writeUserData(user, file.name, `https://${data.cid}.ipfs.dweb.link`, directory);
      //       setIsUploaded(true);
      //       resolve(data);
      //     }
      //   };

      //   // const formdata = new FormData();
      //   // formdata.append('file', file);

      //   xhttp.open("POST", "/v1up", true);
      //   // xhttp.setRequestHeader("Authorization", 'Basic ' + btoa(username + ":" + password));
      //   const formdata = new FormData();
      //   formdata.append('file', file);
      //   xhttp.send(formdata);

      //   // const res = await fetch('https://api.nft.storage/upload', {
      //   //   method: 'POST',
      //   //   headers: {
      //   //     'Accept': 'application/json',
      //   //     'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDkxMGZlYjc0NjgwM2Y1ODdDQzBERDQwMDQ1ZEZCOGRkODQ0Mjk3Y0YiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY5MjQ4ODEzODE2MSwibmFtZSI6IlRlc3QifQ.RImLY0ZoBBtgWgCHUUaNboEtSBkxV_LLiBgBCJGfLYE'
      //   //   },
      //   //   body: file
      //   // })

      //   // const data = await res.json();  
      //   // console.log(data)
      // } catch (error: any) {
      //   console.log(error);
      //   reject(error)
      // }
      // Your file upload logic here
      // Call resolve() when the upload is successful
      // Call reject() if there's an error
    });
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowModal(false);
    for(let file of filess!){

      if(!file) return;
      //File size > 100MiB
      // if(file.size > 100000000){
      //   toast.error("File size too large!");
      //   return;
      // }

      // toast(`Queueing ${file.name}... (Don't close browser)`);

      // console.log(file)
      try{
        await uploadFile(file)
      } catch (e: any) {
        toast.success(`Upload fail`);
      }
      await sleep(200)
    }

    window.location.reload();
    // toast.success(`Upload done successfully`);
  }

  function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  

  

  async function deleteFile(file: StoredFile) {
    if(!confirm("Are you sure?")) return;
    toast("Removing File...")
    setIsUploaded(false);
    // onValue(ref(db, '/' + localStorage.getItem("email") + '/storage'), (snapshot) => {
    //   const data = snapshot.val();
    //   for(let f in data){
    //     if(data[f].profile_picture == file.profile_picture){
    //       remove(ref(db, '/' + localStorage.getItem("email") + '/storage/' + f));
    //     }
    //   }
    // });
    const docRef = doc(db, '/users/' + localStorage.getItem("email"));
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      for(let f in data.storage){
        if(data.storage[f].profile_picture == file.profile_picture){
          deleteDoc(doc(db, '/storage/' + localStorage.getItem("email") + '/storage/' + f));
        }
      }
    }

    // const cid = file.profile_picture.split("/").pop();
    // await fetch("https://api.nft.storage/" + cid, { 
    //   method: "DELETE",
    //   headers: {
    //     "Authorization": "Bearer " + APIKEY
    //   }
    // });
    setIsUploaded(true);
    setFiles(files.filter((f) => f !== file));
    toast.success("Delete Successfull");
  }

  const onDownloadFile = (file: StoredFile) => {
    if(file.profile_picture != "Multipart"){
      downloadFile([file.profile_picture], file.filename)
    } else {
      downloadFile(file.data as any, file.filename)
    }
  };

  const onShare = async (file: StoredFile) => {
    let ID = await writeShareData(file.filename, file.profile_picture, file.data);
    // navigator.clipboard.writeText("https://ufsdrive.com/s/" + ID);
    let clipboardData = "https://ufsdrive.com/s/" + ID;
    const element = document.createElement("textarea");
    element.value = clipboardData;
    document.body.appendChild(element)
    element.select();
    document.execCommand("copy");
    document.body.removeChild(element);
    alert("Link: " + "https://ufsdrive.com/s/" + ID + " (has been copy to clipboard)");
    // Copy link to clipboard
  }

  // const renderFiles = async () => {
  //   const results = await Promise.all(files.map(async (file, index) => {
  //     const data = await getFileSize(file.profile_picture);
      
  //   }));

    // return results;
  // };

  return (
    <div>
      {(!isUploaded || !isLoaded) && <div className="fixed top-0 left-0 w-full h-full flex flex-col justify-center items-center z-[999] backdrop-blur-md">
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
      {/* <div className="flbex justify-center flex-col items-center bg-slate-700 mx-auto w-auto max-w-md p-2 rounded-full my-4 text-black">
        <div className="flex flex-row">
          <Image width={128} height={128} alt="user" src={`https://eu.ui-avatars.com/api/?background=random&rounded=true&name=${user}`} 
            className="ml-4 w-14 rounded-full mr-4"
          />
          <h1 className="text-xl text-white text-center">Wellcome back {user}</h1>
          <Image width={128} height={128} alt="switch" src={`/switch.png`} 
            className="ml-4 w-14 rounded-full mr-4 hover:scale-95 transition-all duration-300 cursor-pointer"
            onClick={() => {
              router.push("/logout")
            }}
          />
        </div>
        <h2 className="text-2xl text-white text-center">Total Usage : {formatBytes(total)}</h2>
      </div> */}
      <div className="flex gap-8 w-auto bg-neutral-800 ml-auto mr-auto md:p-2 h-full md:scale-100 md:rounded-xl items-center">
        <Image width={128} height={128} alt="user" src={`https://eu.ui-avatars.com/api/?background=random&rounded=true&name=${username}`} 
            className="md:w-12 md:h-12 w-8 h-8 rounded-full hover:scale-95 transition-all duration-300 cursor-pointer"
            onClick={() => {
              router.push("/settings")
            }}
          />
        <h1 className="md:text-4xl sm:text-sm font-bold text-white font-sans">{directory}</h1>
        <input 
          type="string"
          value={createDir}
          onChange={(e) => {
            setCreateDir(e.target.value)
          }}
          placeholder="Directory"
          className="md:px-4 px-2 w-[8rem] lg:w-[32rem] rounded-xl focus:border-0 text-md transition-all duration-300 bg-neutral-200 outline-none text-black p-2"
        />
        <button onClick={() => {
          if(createDir != ""){
            setDirectory(directory+(directory == "/" ? "" : "/")+createDir)
            localStorage.setItem("dir", directory+(directory == "/" ? "" : "/")+createDir);
            setCreateDir("")
          }
        }}
        className="hover:scale-95 transition-all duration-200 pl-2 p-2 rounded"
        >{!isMobile ? "Create folder" : "+"}
      </button>

      <button
        className="bg-white text-white hover:bg-pink-400 px-6 py-3 ml-auto md:rounded hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      ><Image width={32} height={32} alt="upload.png" src="/upload.png"/></button>

      {!isMobile && <div>
          <h2 className="lg:text-lg xl:text-2xl md:text-md text-white text-center p-4">{formatBytes(total)}</h2>
      </div>}

      {/* {!isMobile && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-10 h-10 ml-auto">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>} */}
      {!isMobile &&
        <input 
          className={"p-1 px-4 w-[6rem] md:w-[8rem] lg:w-[16rem] rounded-md focus:border-0 text-md transition-all duration-300 ml-auto bg-neutral-200 text-black p-2"}
          placeholder="Search"
          onChange={(e) => {
            setSearch(e.target.value)
          }}
        />
      } 
      </div>
      {/* grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))]  */}
      <div className="md:gap-4 mb-12 bg-black md:m-4 rounded-xl p-4 md:shadow-slate-500 shadow-inner">
      {directory != "/" && <FileStorage
          file={".."} isFolder={true} setDir={(sth: any) => {
          let dir = directory.split("/")
          dir.pop()
          dir = dir.filter((f) => f != "")
          // console.log(dir)
          let path = dir.join("/")
          setDirectory("/"+path)
          localStorage.setItem("dir", "/"+path);
        }} dir={directory}/>}
        <Suspense fallback={<div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-[998] backdrop-blur-md transition-all duration-300"></div>}>
        {
          directories.map((dir, index) => (
            <FileStorage file={dir} key={index} isFolder={true} setDir={(path : any) => {
              setDirectory(path);
              localStorage.setItem("dir", path);
            }} dir={directory} downloadFile={onDownloadFile}/>
          ))
        }
          {files.map((file, index) => (
            <FileStorage file={file} key={index} onDelete={deleteFile} downloadFile={onDownloadFile} onShare={onShare}/>
          ))}
        </Suspense>
      </div>
      {/* {(progress == 100) && !isUploaded &&
        <div className="w-full rounded-full h-4 bg-gray-700 mt-4 mb-4">
          <div className="bg-blue-600 h-4 rounded-full transition-all duration-200" style={{ width: `${progress}%` }}></div>
        </div>
      } */}
      
      {showModal ? (
        <form onSubmit={onSubmit}>
          <div className="fixed flex items-center justify-center w-full flex-col z-50 inset-0 backdrop-blur-sm animate-fade">
            <div className="relative w-auto my-3 lg:my-6 mx-auto max-w-full lg:max-w-3xl bg-white flex flex-col justify-center items-center rounded-xl">
              <h1 className="mt-4 text-4xl text-black">Upload File</h1>
              <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-[32rem] h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 mt-4">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6 w-95">
                      <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                      {/* <p className="text-xs text-gray-500 dark:text-gray-400">(MAX. 100MB)</p> */}
                  </div>
                  <input id="dropzone-file" type="file" className="hidden" multiple onChange={(e) => {
                    setFiless(e.target.files);
                  }}/>
              </label>
              <button type="submit" className="bg-violet-900 p-4 px-[16rem] rounded-lg mt-4 mb-4 hover:bg-violet-500 w-[80%] truncate">Upload {filess?.length}</button>
              <button className="bg-red-900 p-4 px-[16rem] rounded-lg mb-8 hover:bg-red-500 w-[80%]"
                onClick={() => {
                  setShowModal(false);
                }}
              >Close</button>
              <Link href={"https://discord.gg/HNF7G2VnxR"} className="text-sm text-blue-500">Having issues? Contact us at Discord!</Link>
            </div>
          </div>
        </form>
      ) : null}
      {/* <Script src="https://alwingulla.com/88/tag.min.js" data-zone="14538" async data-cfasync="false"></Script> */}
{/*       <Notix /> */}
    </div>
  )
}

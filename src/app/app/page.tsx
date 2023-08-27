'use client';
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";
import { Suspense } from 'react';
import { lazy } from 'react';
import Image from "next/image";

// Import the functions you need from the SDKs you need
import { FirebaseError, initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set, remove } from "firebase/database";
import { userAgent } from "next/server";
import { toast } from "react-toastify";
import { serialize } from "v8";
import Head from "next/head";
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
const db = getDatabase(app);

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

function writeUserData(userId: string, filename: string, url: string, directory: string, data: any = []) {
  // console.log("SET REF")
  if(data.length == 0) {
    set(ref(db, '/' + userId +  "/storage/" + Date.now()), {
      username: userId,
      filename : filename,
      profile_picture : url,
      directory : directory,
    });
  } else {
    set(ref(db, '/' + userId +  "/storage/" + Date.now()), {
      username: userId,
      filename : filename,
      profile_picture : "Multipart",
      directory : directory,
      data : JSON.stringify(data)
    });
  }
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


const downloadFile = (cids: string[], filename: string) => {
  return new Promise(async (resolve, reject) => {
    const blobs : any = [];
    // console.log(cids)
    toast("Downloading...")
  
    // Fetch the files with the corresponding cids
    // const fetchPromises = cids.map(cid => fetch(`/api?cid=${cid}&filename=${filename}`)
    //   .then(response => response.blob())
    //   .then(blob => blobs.push(blob))
    // );

    let proms = []
    let index = 0

    for (var cid of cids) {
      // console.log(cid)
      if(cid.includes("https://")) {
        cid = extractCID(cid)
      }
      proms.push(
        fetch(`https://ipfs.particle.network/${cid}`)
        .then(response => response.blob())
        .then(blob => blobs.push([blob, index]))
      )
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
    toast.success("Downloading successfull")
    resolve("OK");
  });
};

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
  filename: string
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
  const [isUploaded, setIsUploaded] = useState(true);
  const [directory, setDirectory] = useState<string>("/");
  const [directories, setDirectories] = useState<string[]>([]);
  const [createDir , setCreateDir] = useState("");
  const [search , setSearch] = useState("");

  useEffect(() => {
    // downloadFile(["bafybeib6zily3fariz2ql2tnlneax4nkj5aynj4hwo236onmamroq4hkyu","bafybeibayuuylgewzxubvzzswdxvjqncvuvdrvyiutb4kzp5zjh2xfn72i"], "lt_setup.zip")
    if(!localStorage.getItem("email")) 
    {
      router.push("/login");
      return;
    }

    setUser(localStorage.getItem("email"));
    const Ref = ref(db, '/' + localStorage.getItem("email") + '/storage');
    onValue(Ref, (snapshot) => {
      const data = snapshot.val();
      // console.log(directory)
      // console.log(data)
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
    });
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
          for(var cid of JSON.parse(file.data).cids){
            promises.push(
                fetch(`https://${cid}.ipfs.dweb.link`, params)
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
        setTotal(totalSize);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchFileSizes();
  }, [allFiles]);
  
  const uploadFile = (file: File) => {
    return new Promise((resolve, reject) => {
      toast(`Uploading ${file.name}... (Don't close browser)`);
      try {
        // const formData = new FormData();
        // formData.append('file', file);

        var xhttp = new XMLHttpRequest();

        xhttp.upload.addEventListener('progress', function(e) {
          // upload progress as percentage
          let percent_completed = (e.loaded / e.total)*100;
          // console.log(percent_completed);
          setProgress(percent_completed);
          setIsUploaded(false);
        });

        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && (this.status == 200 || this.status == 201)) {
            // Handle the response here
            if(!user) return;
            var data: any = JSON.parse(this.responseText);
            // console.log(data.cids)
            if(data.cids.length == 1) {
              writeUserData(user, file.name, `https://${data.cids[0]}.ipfs.dweb.link`, directory);
            } else {
              writeUserData(user, file.name, `https://${data.cids[0]}.ipfs.dweb.link`, directory, data);
            }
            // console.log(data);
            // writeUserData(user, file.name, "https://ipfs.io/ipfs/" + data.cid + "/" + file.name);
            //Fallback server!
            // if(this.status == 200)
            //   writeUserData(user, file.name, "https://ipfs.particle.network/" + data.value.cid);
            // else
            //   writeUserData(user, file.name, "https://ipfs.particle.network/" + data.cid );
            // writeUserData(user, file.name, `https://${data.cid}.ipfs.dweb.link`, directory);
            setIsUploaded(true);
            resolve(data);
          }
        };

        // const formdata = new FormData();
        // formdata.append('file', file);

        xhttp.open("POST", "/v1up", true);
        // xhttp.setRequestHeader("Authorization", 'Basic ' + btoa(username + ":" + password));
        const formdata = new FormData();
        formdata.append('file', file);
        xhttp.send(formdata);

        // const res = await fetch('https://api.nft.storage/upload', {
        //   method: 'POST',
        //   headers: {
        //     'Accept': 'application/json',
        //     'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDkxMGZlYjc0NjgwM2Y1ODdDQzBERDQwMDQ1ZEZCOGRkODQ0Mjk3Y0YiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY5MjQ4ODEzODE2MSwibmFtZSI6IlRlc3QifQ.RImLY0ZoBBtgWgCHUUaNboEtSBkxV_LLiBgBCJGfLYE'
        //   },
        //   body: file
        // })

        // const data = await res.json();  
        // console.log(data)
      } catch (error: any) {
        console.log(error);
        reject(error)
      }
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
      await sleep(1000)
    }
    toast.success(`Upload done successfully`);
  }

  function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  

  

  async function deleteFile(file: StoredFile) {
    if(!confirm("Are you sure?")) return;
    toast("Removing File...")
    setIsUploaded(false);
    onValue(ref(db, '/' + localStorage.getItem("email") + '/storage'), (snapshot) => {
      const data = snapshot.val();
      for(let f in data){
        if(data[f].profile_picture == file.profile_picture){
          remove(ref(db, '/' + localStorage.getItem("email") + '/storage/' + f));
        }
      }
    });
    const cid = file.profile_picture.split("/").pop();
    await fetch("https://api.nft.storage/" + cid, { 
      method: "DELETE",
      headers: {
        "Authorization": "Bearer " + APIKEY
      }
    });
    setIsUploaded(true);
    setFiles(files.filter((f) => f !== file));
    toast.success("Delete Successfull");
  }

  const onDownloadFile = (file: StoredFile) => {
    if(file.profile_picture != "Multipart"){
      downloadFile([file.profile_picture], file.filename)
    } else {
      downloadFile(JSON.parse(file.data).cids, file.filename)
    }
  };

  // const renderFiles = async () => {
  //   const results = await Promise.all(files.map(async (file, index) => {
  //     const data = await getFileSize(file.profile_picture);
      
  //   }));

    // return results;
  // };

  return (
    <div>
      <Head>
          <title>UFS App</title>
      </Head>
      <div className="flbex justify-center flex-col items-center bg-slate-100 mx-auto w-auto max-w-md p-2 rounded-full my-4 text-black">
        <div className="flex flex-row">
          <Image width={128} height={128} alt="user" src={`https://eu.ui-avatars.com/api/?background=random&rounded=true&name=${user}`} 
            className="ml-4 w-14 rounded-full mr-4"
          />
          <h1 className="text-xl text-center">Wellcome back {user}</h1>
          <Image width={128} height={128} alt="switch" src={`/switch.png`} 
            className="ml-4 w-14 rounded-full mr-4 hover:scale-95 transition-all duration-300 cursor-pointer"
            onClick={() => {
              router.push("/logout")
            }}
          />
        </div>
        <h2 className="text-2xl text-center">Total Usage : {formatBytes(total)}</h2>
      </div>
      <div className="flex gap-4 w-auto bg-slate-500 ml-auto mr-auto p-4">
        <h1 className="text-2xl text-white font-mono">{directory}</h1>
        <input 
          type="string"
          value={createDir}
          onChange={(e) => {
            setCreateDir(e.target.value)
          }}
          placeholder="Directory"
          className="p-1 px-4 w-[8rem] lg:w-[32rem] rounded-full focus:border-0 text-lg transition-all duration-300"
        />
        <button onClick={() => {
          setDirectory(directory+(directory == "/" ? "" : "/")+createDir)
          setCreateDir("")
        }}
        className="hover:scale-95 transition-all duration-200 hover:bg-slate-400 pl-2 p-2 rounded-full"
        >Create Folder
      </button>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-10 h-10 ml-auto">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>

      <input 
        className="p-1 px-4 w-[4rem] md:w-[8rem] lg:w-[16rem] rounded-full focus:border-0 text-lg transition-all duration-300"
        placeholder="Search"
        onChange={(e) => {
          setSearch(e.target.value)
        }}
      />
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 mb-12 bg-slate-400 p-8">
      {directory != "/" && <FileStorage
          file={".."} isFolder={true} setDir={(sth: any) => {
          let dir = directory.split("/")
          dir.pop()
          dir = dir.filter((f) => f != "")
          // console.log(dir)
          let path = dir.join("/")
          setDirectory("/"+path)
        }} dir={directory}/>}
        <Suspense fallback={<div>Loading...</div>}>
        {
          directories.map((dir, index) => (
            <FileStorage file={dir} key={index} isFolder={true} setDir={setDirectory} dir={directory} downloadFile={onDownloadFile}/>
          ))
        }
          {files.map((file, index) => (
            <FileStorage file={file} key={index} onDelete={deleteFile} downloadFile={onDownloadFile}/>
          ))}
        </Suspense>
      </div>
      {!(progress == 100) && (
        <div className="w-full rounded-full h-4 bg-gray-700 mt-4 mb-4">
          <div className="bg-blue-600 h-4 rounded-full" style={{ width: `${progress}%` }}></div>
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
      <button
        className="absolute top-24 right-0 bg-white text-white hover:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      ><Image width={32} height={32} alt="upload.png" src="/upload.png"/></button>
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
                      <p className="text-xs text-gray-500 dark:text-gray-400">(MAX. 100MB)</p>
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
            </div>
          </div>
        </form>
      ) : null}
    </div>
  )
}
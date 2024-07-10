"use client";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useEffect } from "react";
import { Suspense } from "react";
import { lazy } from "react";
import Image from "next/image";

// Import the functions you need from the SDKs you need
import {
  FirebaseError,
  initializeApp,
  getApp,
  getApps,
  FirebaseApp,
} from "firebase/app";

import {
  getFirestore,
  setDoc,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import { getPerformance, trace } from "firebase/performance";
import { toast } from "react-toastify";
import Link from "next/link";
import generateShortUniqueId from "../s/[id]/IDGen";
import ProgressBar from "./ProgressBar";
import { getTheme } from "../settings/Theme";

const FileStorage = lazy(() => import("./FileStorage"));
const firebaseConfig = {
  apiKey: "AIzaSyC7WrPl2-syCOzG45_PPL-xXwJ69hoUdT0",
  authDomain: "vka-project.firebaseapp.com",
  databaseURL:
    "https://vka-project-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "vka-project",
  storageBucket: "vka-project.appspot.com",
  messagingSenderId: "966822894965",
  appId: "1:966822894965:web:21522a48600529a30d473c",
};

var app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp(); // if already initialized, use that one
}

const db = getFirestore(app);

const APIKEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDk3ZDZEQTk2RmNBYmY4REI2Yjg1OUFjODFmZDdFNDFkMTlCNWRlNEIiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY5MjU0NDg1NzM3MCwibmFtZSI6IkZha2Vib29rIn0.rCefvOU7LmU22LioowC5xVqqqdPYdIItkJyNYgx55lg";

function extractCID(url: string): string {
  if (url.includes("dweb")) {
    let parts = url.split("/");
    let subParts = parts[2].split(".");
    return subParts[0];
  } else {
    return url.split("/").pop() as string;
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
async function writeUserData(
  userId: string,
  filename: string,
  url: string,
  directory: string,
  data: any = []
) {
  // console.log("SET REF")
  if (data.length == 0) {
    await setDoc(
      doc(db, "storage/" + userId + "/storage/" + Date.now().toString()),
      {
        username: userId,
        filename: filename,
        profile_picture: url,
        directory: directory,
      }
    );
  } else {
    await setDoc(
      doc(db, "storage/" + userId + "/storage/" + Date.now().toString()),
      {
        username: userId,
        filename: filename,
        profile_picture: "Multipart",
        directory: directory,
        data: data,
      }
    );
  }
}

async function writeShareData(filename: string, url: string, data: any = [], username: string) {
  let ID = generateShortUniqueId(10);
  await setDoc(doc(db, "storage", "anonymous", "storage", ID), {
    filename: filename,
    profile_picture: url,
    data: data,
    username: username
  });

  return ID;
}

async function writeTotalUsage(userId: string, total: number) {
  await updateDoc(doc(db, "users/" + userId), {
    total_usage: total,
  });
}

function concatenateArrayBuffers(arrayBuffers: ArrayBuffer[]) {
  const totalLength = arrayBuffers.reduce(
    (length, arrayBuffer) => length + arrayBuffer.byteLength,
    0
  );
  const concatenatedArrayBuffer = new Uint8Array(totalLength);
  let offset = 0;

  arrayBuffers.forEach((arrayBuffer) => {
    concatenatedArrayBuffer.set(new Uint8Array(arrayBuffer), offset);
    offset += arrayBuffer.byteLength;
  });

  return concatenatedArrayBuffer.buffer;
}

function compareSecondColumn(a: any, b: any) {
  if (a[1] === b[1]) {
    return 0;
  } else {
    return a[1] < b[1] ? -1 : 1;
  }
}

class BlobBuilder {
  parts: any[];
  blob: any;
  constructor() {
    this.parts = [];
    this.blob = null;
  }

  addBlob(blob: any) {
    this.parts.push(blob);
    this.blob = null;
    return this;
  }

  getBlob() {
    return (
      this.blob ||
      (this.blob = new Blob(this.parts, { type: "application/octet-stream" }))
    );
  }
}

function formatBytes(bytes: number, decimals = 2) {
  if (!+bytes) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = [
    "Bytes",
    "KiB",
    "MiB",
    "GiB",
    "TiB",
    "PiB",
    "EiB",
    "ZiB",
    "YiB",
  ];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
}

interface StoredFile {
  username: string;
  filename: string;
  profile_picture: string;
  directory: string;
  data: string;
}

function removeAccents(str: string) {
  var AccentsMap = [
    "aàảãáạăằẳẵắặâầẩẫấậ",
    "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
    "dđ",
    "DĐ",
    "eèẻẽéẹêềểễếệ",
    "EÈẺẼÉẸÊỀỂỄẾỆ",
    "iìỉĩíị",
    "IÌỈĨÍỊ",
    "oòỏõóọôồổỗốộơờởỡớợ",
    "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
    "uùủũúụưừửữứự",
    "UÙỦŨÚỤƯỪỬỮỨỰ",
    "yỳỷỹýỵ",
    "YỲỶỸÝỴ",
  ];
  for (var i = 0; i < AccentsMap.length; i++) {
    var re = new RegExp("[" + AccentsMap[i].substr(1) + "]", "g");
    var char = AccentsMap[i][0];
    str = str.replace(re, char);
  }
  return str;
}

export default function Home() {
  const [filess, setFiless] = useState<FileList | null>();
  const [showModal, setShowModal] = useState(false);
  const [files, setFiles] = useState<StoredFile[]>([]);
  const [allFiles, setAllFiles] = useState<StoredFile[]>([]);
  const [total, setTotal] = useState(0);
  const router = useRouter();
  const [progress, setProgress] = useState(100);
  const [user, setUser] = useState<string | null>("");
  const [username, setUsername] = useState<string | null>("");
  const [isUploaded, setIsUploaded] = useState(true);
  const [directory, setDirectory] = useState<string>("/");
  const [directories, setDirectories] = useState<string[]>([]);
  const [createDir, setCreateDir] = useState("");
  const [search, setSearch] = useState("");
  const [isLoaded, setLoaded] = useState(false);
  const [stats, setStats] = useState("");
  const [isMobile, setMobile] = useState(false);
  const themeElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (localStorage.getItem("dir") != null)
      setDirectory(localStorage.getItem("dir")!);
    const loadScript = (callback: any) => {
      const script = document.createElement("script");
      script.src = "/xpopup.js";
      script.async = true;
      script.onload = callback;
      script.onerror = callback;
      document.body.appendChild(script);
    };

    // loadScript(checkElementAndPost);
    if (themeElement.current) {
      themeElement.current.style.backgroundColor = getTheme();
    }
  }, []);

  const handleResize = () => {
    if (window.innerWidth < 720) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    const perf = getPerformance(app);
    if (!localStorage.getItem("email")) {
      router.push("/login");
      return;
    }

    setUser(localStorage.getItem("email"));
    setUsername(localStorage.getItem("email"));

    // Refactor

    const firestoreAction = async () => {
      const docRef = doc(db, "/users/" + localStorage.getItem("email"));
      const docSnap = await getDoc(docRef);
      if (docSnap.exists() && docSnap.data().username) {
        setUsername(docSnap.data().username);
      }

      if (localStorage.getItem("email") == null) return;
      const fileRef = collection(
        db,
        "storage",
        (localStorage.getItem("email") as string).toString(),
        "storage"
      );

      const fileSnap = await getDocs(fileRef);
      if (!fileSnap.empty) {
        const rawdata = fileSnap.docs;
        const data: any = [];
        rawdata.forEach((doc) => {
          data.push(doc.data());
        });
        console.log(data);
        let fs = [];
        let afs = [];
        let dirs: string[] = [];
        for (let file in data) {
          let currentFile: StoredFile = data[file];
          afs.push(currentFile);
          if (currentFile.directory) {
            if (currentFile.directory != directory) {
              if (
                currentFile.directory.startsWith(directory) &&
                directory != "/"
              ) {
                let dirArray = currentFile.directory.split("/");
                let curdirArray = directory.split("/").slice(-1)[0];
                for (let i = 0; i < dirArray.length; i++) {
                  if (
                    dirArray[i] == curdirArray &&
                    !dirs.includes(dirArray[i + 1])
                  ) {
                    dirs.push(dirArray[i + 1]); // only 1 dir like test2
                    break;
                  }
                }
              } else if (
                currentFile.directory.startsWith(directory) &&
                !dirs.includes(currentFile.directory.split("/")[1])
              ) {
                dirs.push(currentFile.directory.split("/")[1]);
              }

              continue;
            }
          } else if (directory != "/") continue;

          if (
            search != "" &&
            !removeAccents(data[file].filename)
              .toLowerCase()
              .includes(removeAccents(search.toLowerCase()))
          )
            continue;
          fs.push(data[file]);
        }
        setDirectories(dirs);
        setFiles(fs);
        setAllFiles(afs);
      }
    };

    firestoreAction();

    localStorage.theme = "dark";
  }, [router, directory, search]);

  useEffect(() => {
    const fetchFileSizes = async () => {
      const params = {
        method: "GET",
        headers: {
          Range: "bytes=0-0",
        },
      };

      const fetchPromises = allFiles.map((file: any) => {
        if (file.profile_picture == "Multipart") {
          var promises = [];
          // console.log(file)
          for (var cid of file.data) {
            promises.push(
              fetch(`https://ipfs.particle.network/${cid}`, params)
                .then((response) => {
                  const str = response.headers.get("Content-Range");
                  if (str == null) return 0;
                  const fileSize = +str.split("/")[1];
                  return fileSize;
                })
                .catch((error: any) => {
                  console.error(error);
                  return 0;
                })
            );
          }
          return Promise.all(promises).then((sizes) => {
            return sizes.reduce((acc, fileSize) => acc + fileSize, 0);
          });
        }

        return fetch(
          `https://ipfs.particle.network/${extractCID(file.profile_picture)}`,
          params
        )
          .then((response) => {
            const str = response.headers.get("Content-Range");
            if (str == null) return 0;
            const fileSize = +str.split("/")[1];
            return fileSize;
          })
          .catch((error) => {
            console.error(error);
            return 0;
          });
      });

      try {
        const fileSizes = await Promise.all(fetchPromises);
        const totalSize = fileSizes.reduce(
          (acc, fileSize) => acc + fileSize,
          0
        );
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
      const prevstat = stats;
      const res = await fetch(
        "https://studid-how-i-didnt-know-that.vercel.app/server"
      );
      const json = await res.json();
      if (json == false) {
        toast.error("No available found.Please report this to admin");
      }

      let username = json[0];
      let password = json[1];
      const xhr = new XMLHttpRequest();

      xhr.open("POST", "https://rpc.particle.network/ipfs/upload", true);
      let preeventloaded = 0;
      let pretimer = Date.now();
      xhr.upload.onprogress = function (event) {
        if (event.lengthComputable) {
          const percentage = (event.loaded / event.total) * 100;
          let timer = Date.now() - pretimer; // milliseconds
          let speed = (event.loaded - preeventloaded) / timer;
          // convert to bytes per second
          speed = speed * 1000;
          setStats(
            prevstat +
              " " +
              formatBytes(event.loaded) +
              "/" +
              formatBytes(event.total) +
              " speed: " +
              formatBytes(Math.floor(speed)) +
              "/s" +
              " estimated time: " +
              formatTime(Math.floor(event.total / speed))
          );
          preeventloaded = event.loaded;
          pretimer = Date.now();
          setProgress(percentage);
          if (percentage == 100) {
            setStats("Waiting for server response");

            resolve(xhr);
          }
        }
      };

      xhr.setRequestHeader(
        "Authorization",
        "Basic " + btoa(username + ":" + password)
      );
      xhr.timeout = 240000; // 6 minutes
      xhr.ontimeout = function () {
        console.log("Request timed out");
        reject(new Error("Request timed out"));
      }
      xhr.send(formData);
    });
  };

  async function uploadChunk(chunk: ArrayBuffer, filename: string) {
    const uploadFormData = new FormData();
    const buffer = Buffer.from(chunk);
    const file = new File([buffer], filename);
    uploadFormData.append("file", file);
    return (await uploadFilepls(uploadFormData)) as Promise<XMLHttpRequest>;
  }

  const downloadPart = (
    blobs: Array<Array<any>>,
    index: number,
    cid: string
  ) => {
    return fetch(`https://ipfs.particle.network/${cid}`)
      .then((response) => response.blob())
      .then((blob) => {

        blobs.push([blob, index]);
        setStats(
          "Downloaded: " +
            formatBytes(
              blobs.reduce(
                (total: number, blob: Array<any>) => total + blob[0].size,
                0
              )
            )
        );
      });
  };

  const downloadFile = (cids: string[], filename: string) => {
    return new Promise(async (resolve, reject) => {
      const blobs: any = [];

      setStats("Preparing downloading...");
      setProgress(0);
      setIsUploaded(false);

      let proms = [];
      let index = 0;
      let prg = 0;

      for (var cid of cids) {
        // console.log(cid)
        setStats("preparing cids");
        if (cid.includes("https://")) {
          cid = extractCID(cid);
        }
        setStats("Mutithread downloading available");
        proms.push(
          downloadPart(blobs, index, cid).then(() => {
            prg++;
            setProgress((prg / cids.length) * 100);
          })
        );
        index += 1;
      }

      await Promise.all(proms);

      blobs.sort(compareSecondColumn);

      var mergedBlobBuilder = new BlobBuilder();

      for (var b of blobs) {
        mergedBlobBuilder.addBlob(b[0]);
      }

      const mergedBlob = mergedBlobBuilder.getBlob();

      // Create a download link for the merged Blob
      const file = new File([mergedBlob], filename);
      const url = URL.createObjectURL(file);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setIsUploaded(true);
      setProgress(100);
      toast.success("Downloading successfull");
      resolve("OK");
    });
  };

  /**
   * Generate a comment for the given function body.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - event triggered by form submission
   * @return {Promise<void>} a Promise that resolves when the function completes
   */
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowModal(false);

    // TODO New error while handling response took too long and return 504.
    for (let file of filess!) {
      if (!file || !user) return;
      const CHUNK_SIZE = 80 * 1024 * 1024;
      const MAX_CONCURRENT_UPLOADS = 3;
      const MAX_RETRY = 5;
      let chunkSize = 0;
      let packedChunk: any = [];
      // let cids: any = [];
      let total_concurrent = 0;
      let realshit: any = [];
      let id = 0;
      let finished = false;
      setIsUploaded(false);
      toast(`Uploading ${file.name}... (Don't close browser)`);
      setStats("Preparing upload file");
      let expected_file_size = file.size;
      let total_read = 0;
      let part = Math.ceil(expected_file_size / CHUNK_SIZE) + 1;
      let upload_with_bug = false;
      const writableStream = new WritableStream(
        {
          start(controller: WritableStreamDefaultController) {},
          async write(
            chunk: ArrayBuffer,
            controller: WritableStreamDefaultController
          ) {
            // console.log(chunk.byteLength);
            chunkSize += chunk.byteLength;
            packedChunk.push(chunk);
            total_read += chunk.byteLength;
            if (chunkSize > CHUNK_SIZE || total_read >= expected_file_size) {
              while(total_concurrent > MAX_CONCURRENT_UPLOADS) {
                setStats("Max concurrent uploads reached. Waiting...");
                await new Promise(resolve => setTimeout(resolve, 200));
              }
              console.log("Chunk uploading...");
              let offset = 0;
              const combinedArrayBuffer = new ArrayBuffer(chunkSize);
              for (const chunk2 of packedChunk) {
                const chunkView = new Uint8Array(chunk2);
                const combinedView = new Uint8Array(
                  combinedArrayBuffer,
                  offset,
                  chunk2.byteLength
                );
                combinedView.set(chunkView);
                offset += chunk2.byteLength;
              }

              setStats("Uploading " + (id + 1) + "/" + part);
              async function upload(retries: number, combinedArrayBuffer: ArrayBuffer) {
                return new Promise(async (resolve, reject) => { 
                  if(retries >= MAX_RETRY) {
                    reject();
                    return;
                  }

                  const cid_promise = await uploadChunk(
                    combinedArrayBuffer,
                    file.name
                  );

                  console.log("finished");
                  // cids.push([cid_promise, id]);
                  cid_promise.onreadystatechange = () => {
                    if (cid_promise.readyState === XMLHttpRequest.DONE) {
                      const status = cid_promise.status;
                      if (status === 201) {
                        // Created
                        console.log("Created");
                        const data = JSON.parse(cid_promise.responseText);
                        // remove the cid from the list
                        total_concurrent--;
                        console.log(total_concurrent);
                        realshit.push([data.cid, id]);
                        resolve("OK");
                      } else {
                        // Failed
                        console.log("Failed");
                        // Retry
                        console.log("Retrying...");
                        resolve(upload(retries + 1, combinedArrayBuffer));
                      }
                    }
                  }

                  
                })
              }

              total_concurrent++;
              try{
                await upload(0, combinedArrayBuffer)
              } catch {
                upload_with_bug = true;
                console.log("Upload failed");
              }
              
              id += 1;
              chunkSize = 0;
              packedChunk = [];
              if (total_read >= expected_file_size) {
                // Finished
                console.log("Finished");
                finished = true;
              }
              return;
            }
          },
          close() {},
          abort(reason: any) {},
        },
        { highWaterMark: CHUNK_SIZE }
      );

      // const stream = e.target.files[0].stream();
      const stream = file.stream();
      await stream.pipeTo(writableStream);
      while (!finished || total_concurrent > 0) {
        if (upload_with_bug) {
          toast.error("Upload failed. Please try again.");
          return;
        };
        await sleep(100);
      }
      
      // sort the cids by the id
      realshit.sort((a: any, b: any) => a[1] - b[1]);
      // TODO Testing purpose
      console.log(realshit);
      // return;
      
      // sort the cids by the id

      if (realshit.length == 1) {
        await writeUserData(
          user,
          file.name,
          `https://ipfs.particle.network/${realshit[0][0]}`,
          directory
        );
      } else {
        await writeUserData(
          user,
          file.name,
          `https://ipfs.particle.network/${realshit[0][0]}`,
          directory,
          realshit.map((c: any) => c[0])
        );
      }

      toast.success("Uploaded file:" + file.name);
      setProgress(100);
      setIsUploaded(true);
      await sleep(200);
    }

    // TODO REMEBER THIS THING
    toast.success(`Upload done successfully`);
    // window.location.reload();
  };

  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function deleteFile(file: StoredFile) {
    if (!confirm("Are you sure?")) return;
    toast("Removing File...");
    setIsUploaded(false);
    const docRef = doc(db, "/users/" + localStorage.getItem("email"));
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      const storageref = collection(
        db,
        "/storage/" + localStorage.getItem("email") + "/storage"
      );
      const storage_record = await getDocs(storageref);
      const rawdata = storage_record.docs;
      for (let f in rawdata) {
        if (rawdata[f].data().filename == file.filename) {
          console.log(rawdata[f].data());
          await deleteDoc(
            doc(
              db,
              "/storage/" +
                localStorage.getItem("email") +
                "/storage/" +
                rawdata[f].id
            )
          );
          break;
        }
      }
    }

    setIsUploaded(true);
    setFiles(files.filter((f) => f !== file));
    toast.success("Delete Successfull");
  }

  const onDownloadFile = (file: StoredFile) => {
    if (file.profile_picture != "Multipart") {
      downloadFile([file.profile_picture], file.filename);
    } else {
      downloadFile(file.data as any, file.filename);
    }
  };

  const onShare = async (file: StoredFile) => {
    let ID = await writeShareData(
      file.filename,
      file.profile_picture,
      file.data,
      username??"anonymous"
    );
    // navigator.clipboard.writeText("https://ufsdrive.com/s/" + ID);
    let clipboardData = "https://ufsdrive.com/s/" + ID;
    const element = document.createElement("textarea");
    element.value = clipboardData;
    document.body.appendChild(element);
    element.select();
    document.execCommand("copy");
    document.body.removeChild(element);
    alert(
      "Link: " +
        "https://ufsdrive.com/api?shared=" +
        ID +
        " (has been copy to clipboard)"
    );
    // alert("Or alternative direct link: " + "https://ufsdrive.com/api?shared=" + ID);
  };

  function cutedText(str: string) {
    // trim the text down and add ... if it too long
    if (str.length > 25) {
        return str.substring(0, 25) + '...'
    } else {
        return str
    }
  }

  return (
    <div>
      {(!isUploaded || !isLoaded) && (
        <div className="fixed top-0 left-0 w-full h-full flex flex-col justify-center items-center z-[999] backdrop-blur-md">
          <h1 className="text-3xl animate-pulse">Loading...</h1>
          <p>Please wait a minutes...</p>
          <p>{stats}</p>
          {!(progress == 100) && <ProgressBar progress={progress} />}
          {!isUploaded && (
            <div className="text-center">
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="inline w-16 h-16 mr-2 mb-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          )}
        </div>
      )}
      <div
        className="flex gap-8 md:m-4 w-auto ml-auto mr-auto md:p-4 h-full md:scale-100 md:rounded-xl items-center"
        ref={themeElement}
      >
        <img
          width={128}
          height={128}
          alt="user"
          src={`https://eu.ui-avatars.com/api/?background=random&rounded=true&name=${username}`}
          className="md:w-12 md:h-12 w-8 h-8 rounded-full hover:scale-95 transition-all duration-300 cursor-pointer"
          onClick={() => {
            router.push("/settings");
          }}
        />
        <h1 className="md:text-4xl sm:text-sm font-bold text-white font-sans">
          {cutedText(directory)}
        </h1>
        <input
          type="string"
          value={createDir}
          onChange={(e) => {
            setCreateDir(e.target.value);
          }}
          placeholder="Directory"
          className="md:px-4 px-2 w-[8rem] lg:w-[32rem] rounded-xl focus:border-0 text-md transition-all duration-300 bg-neutral-200 outline-none text-black p-2"
        />
        <button
          onClick={() => {
            if (createDir != "") {
              setDirectory(
                directory + (directory == "/" ? "" : "/") + createDir
              );
              localStorage.setItem(
                "dir",
                directory + (directory == "/" ? "" : "/") + createDir
              );
              setCreateDir("");
            }
          }}
          className="hover:scale-95 transition-all duration-200 pl-2 p-2 rounded"
        >
          {!isMobile ? "Create folder" : "+"}
        </button>

        <button
          className="bg-white text-white hover:bg-pink-400 px-6 py-3 ml-auto md:rounded hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
          type="button"
          onClick={() => setShowModal(true)}
        >
          <img width={32} height={32} alt="upload.png" src="/upload.png" />
        </button>
        {!isMobile && (
          <input
            className={
              "px-4 w-[6rem] md:w-[8rem] lg:w-[16rem] rounded-md focus:border-0 text-md transition-all duration-300 ml-auto bg-neutral-200 text-black p-2"
            }
            placeholder="Search"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        )}
      </div>
      {/* grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))]  */}
      <div className="md:gap-4 mb-12 bg-black md:m-4 rounded-xl p-4">
        {directory != "/" && (
          <FileStorage
            file={".."}
            isFolder={true}
            setDir={(sth: any) => {
              let dir = directory.split("/");
              dir.pop();
              dir = dir.filter((f) => f != "");
              // console.log(dir)
              let path = dir.join("/");
              setDirectory("/" + path);
              localStorage.setItem("dir", "/" + path);
            }}
            dir={directory}
          />
        )}
        <Suspense
          fallback={
            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-[998] backdrop-blur-md transition-all duration-300"></div>
          }
        >
          {directories.map((dir, index) => (
            <FileStorage
              file={dir}
              key={index}
              isFolder={true}
              setDir={(path: any) => {
                setDirectory(path);
                localStorage.setItem("dir", path);
              }}
              dir={directory}
              downloadFile={onDownloadFile}
            />
          ))}
          {files.map((file, index) => (
            <FileStorage
              file={file}
              key={index}
              onDelete={deleteFile}
              downloadFile={onDownloadFile}
              onShare={onShare}
            />
          ))}
        </Suspense>
      </div>

      {showModal ? (
        <form onSubmit={onSubmit}>
          <div className="fixed flex items-center justify-center w-full flex-col z-50 inset-0 backdrop-blur-sm animate-fade">
            <div className="relative w-auto my-3 lg:my-6 mx-auto max-w-full lg:max-w-3xl bg-slate-500 flex flex-col justify-center items-center rounded-xl">
              <h1 className="mt-4 text-4xl text-white">Upload File</h1>
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-[80%] h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-900 dark:hover:bg-gray-600 mt-4 mx-8 hover:border-solid"
                onDragOver={(event) => {
                  event.preventDefault();
                  // Add style to show the user can drop it
                  event.currentTarget.classList.add("border-solid");
                }}
                onDragEnd={(event) => {
                  event.preventDefault();
                  // Remove the style when the drag is finished
                  event.currentTarget.classList.remove("border-solid");
                }}
                onDragLeave={(event) => {
                  event.preventDefault();
                  // Remove the style when the drag is finished
                  event.currentTarget.classList.remove("border-solid");
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  // alert("File dropped")
                  setFiless(e.dataTransfer.files);
                }}
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6 w-96">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  {/* <p className="text-xs text-gray-500 dark:text-gray-400">(MAX. 100MB)</p> */}
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  multiple
                  onChange={(e) => {
                    setFiless(e.target.files);
                  }}
                />
              </label>
              <div className="text-left w-[80%] pt-4 text-white">
                {filess && filess.length > 0
                  ? Array.from(filess).map((file, index) => (
                      <div key={index} className="flex justify-between">
                        <p>{file.name}</p>
                        <p>{formatBytes(file.size)}</p>
                      </div>
                    ))
                  : null}
              </div>
              <button
                type="submit"
                className="bg-violet-900 p-4 px-4 rounded-lg mt-4 mb-4 hover:bg-violet-500 w-[80%] truncate text-center"
              >
                Upload
              </button>
              <button
                className="bg-red-900 p-4 px-4 rounded-lg mb-8 hover:bg-red-500 w-[80%]"
                onClick={() => {
                  setShowModal(false);
                }}
              >
                Close
              </button>
              <Link
                href={"https://discord.gg/HNF7G2VnxR"}
                className="text-sm text-blue-100 mb-4"
              >
                Having issues? Contact us at Discord!
              </Link>
            </div>
          </div>
        </form>
      ) : null}
    </div>
  );
}

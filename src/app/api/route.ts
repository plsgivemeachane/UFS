import { NextResponse } from 'next/server'
import { promisify } from 'util';
import stream from 'stream';
import { FirebaseError, initializeApp } from "firebase/app";
import { getFirestore, setDoc, doc, getDoc, updateDoc, deleteDoc, collection, getDocs } from "firebase/firestore";
import { ReadableStream } from 'stream/web';
// import { sha } from 'sha256quanvn';
import mime from 'mime-types';
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

function formatBytes(bytes: number, decimals = 2) {
    if (!+bytes) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

function extractCID(url: string): string {
    if (url.includes('dweb')) {
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
    parts: any[];
    blob: any;
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

const downloadPart = (blobs: Array<Array<any>>, index: number, cid: string) => {
    return fetch(`https://ipfs.particle.network/${cid}`)
        .then(response => response.blob())
        .then(blob => {
            // setProgress((prg / (index)) * 100)
            // console.log(index)
            blobs.push([blob, index])
        })
}

const downloadFile = (cids: string[], filename: string) => {
    return new ReadableStream ({
        async start(controller) {
            for (var cid of cids) {
                if (cid.includes("https://")) {
                    cid = extractCID(cid)
                }

                // console.log(cid)
                // downloadPart(blobs, index, cid)

                const res = await fetch(`https://ipfs.particle.network/${cid}`)
                const blob = new Uint8Array(await res.arrayBuffer())
                controller!.enqueue(blob)
            }
            controller!.close()
        },
    });
};

function getContentTypeByFilename(filename: string) {
    const ext = filename.split('.').pop();
    // every single common file extension
    return mime.lookup(ext as string) || 'application/octet-stream';
}


export async function GET(request: Request, response: NextResponse) {
    const { searchParams } = new URL(request.url)
    const shared = searchParams.get('shared')
    const filename = searchParams.get("filename")
    // console.log(shared)

    const snapshot : any = await getDoc(doc(db, `storage/anonymous/storage/${shared}`))
    if (!snapshot.data()) {
        return new NextResponse('Not found', { status: 404 });
    }

    // console.log(snapshot.data())
    const file = snapshot.data()
    var readableStream;
    if(file.profile_picture != "Multipart"){
        readableStream = downloadFile([file.profile_picture], file.filename);
    } else {
        readableStream = downloadFile(file.data as any, file.filename);
    }

    return new Response(readableStream as BodyInit, {
        headers: {
            'Content-Type': getContentTypeByFilename(!filename ? file.filename : filename),
            'Content-Disposition': `attachment; filename="${!filename? file.filename : filename}"`,
        },
    })
}
import { NextResponse } from 'next/server'
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { ReadableStream } from 'stream/web';

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

/**
 * Asynchronously fetches data in chunks from the specified URL using the given headers and controller.
 *
 * @param {string} url - The URL to fetch data from
 * @param {Object} headers - The headers to include in the fetch request
 * @param {AbortController} controller - The controller to signal the fetch should be aborted
 * @param {number} start - The starting byte index for fetching data
 * @param {number} fileSize - The total size of the file being fetched
 */
async function customFetch(url: string, controller: any, start: number, fileSize: number) {
    console.log("Fetching " + url);
    let chunkSize = 10 * 1024 * 1024; // 1 MB!
    for (; start < fileSize; start += chunkSize) {
        let end = Math.min(start + chunkSize - 1, fileSize - 1);
        console.log("Fetch " + start + " - " + end);
        let headers = { 'Range': `bytes=${start}-${end}` };
        let response = await fetch(url, { headers });

        // Process the chunk of data
        let chunkData = await response.arrayBuffer(); // Or other method for data type
        controller.enqueue(new Uint8Array(chunkData));
    }
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
    return new ReadableStream({
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

var eachfilesize : any = {}

/**
 * Calculate the total size of the files associated with the given content identifiers (CIDs).
 *
 * @param {array} cids - An array of content identifiers
 * @return {number} The total size of the files in bytes
 */
async function getFileSize(cids: Array<string>) {
    var fileSize = 0;
    for (var cid of cids) {
        if (cid.includes('https://')) {
            cid = extractCID(cid);
        }

        const res = await fetch(`https://ipfs.particle.network/${cid}`, {
            method: 'HEAD',
        });

        if(!res.headers.get('Content-Length')) return;

        fileSize += parseInt(res.headers.get('Content-Length') as string, 10);

        eachfilesize[cid] = parseInt(res.headers.get('Content-Length') as string, 10);
    }

    return fileSize;
}



export async function GET(request: Request, response: NextResponse) {
    const { searchParams } = new URL(request.url)
    const shared = searchParams.get('shared')
    const filename = searchParams.get("filename")
    // console.log(shared)

    const snapshot: any = await getDoc(doc(db, `storage/anonymous/storage/${shared}`))
    if (!snapshot.data()) {
        return new NextResponse('Not found', { status: 404 });
    }

    // console.log(snapshot.data())
    const file = snapshot.data()
    var siez = 0;
    if (file.profile_picture != 'Multipart') {
        siez = await getFileSize([file.profile_picture]) as number;
    } else {
        siez = await getFileSize(file.data) as number;
    }

    // await log("Total size", siez)

    var parts: string[], start: number = 0, end: number = siez - 1;
    if (request.headers.get('range') != null) {
        parts = (request.headers.get('range') as string).replace(/bytes=/, "").split("-")
        start = parseInt(parts[0], 10)
        end = parts[1]
            ? parseInt(parts[1], 10)
            : siez - 1
    }

    const readable = new ReadableStream({
        async start(controller) {
            // if the request has content-range header then we need to send only the requested part
            // else
            // 	send the whole content
            if (request.headers.has('range')) {
                // send only requested.
                if (file.profile_picture != 'Multipart') {
                    await customFetch(`https://ipfs.particle.network/${extractCID(file.profile_picture)}`, controller, start, end);
                } else {
                    // it get complicated here
                    var content_range_start = start;
                    var content_range_end = end;
                    var current_range = 0;
                    console.log("HERE")
                    console.log(Object.keys(eachfilesize).length)
                    console.log("Start", formatBytes(content_range_start), "End", formatBytes(content_range_end))
                    for (var cid of file.data) {
                        console.log("Start", formatBytes(content_range_start), "End", formatBytes(content_range_end))

                        if (cid.includes('https://')) {
                            cid = extractCID(cid);
                        }

                        // Skip chunks completely outside the range
                        if (current_range + eachfilesize[cid] < content_range_start) {
                            current_range += eachfilesize[cid];
                            continue;
                        }

                        // Calculate the starting byte within the current chunk
                        let start_byte = Math.max(content_range_start - current_range, 0);
                        let bytes_to_fetch = Math.min(eachfilesize[cid] - start_byte, content_range_end - current_range);


                        console.log("Current range", formatBytes(current_range), "Content range start", formatBytes(content_range_start), "Content range end", formatBytes(content_range_end))
                        console.log(`bytes=${formatBytes(start_byte)}-${formatBytes(start_byte + bytes_to_fetch)}`)

                        await customFetch(`https://ipfs.particle.network/${cid}`, controller, start_byte, start_byte + bytes_to_fetch);


                        current_range += bytes_to_fetch

                        // Break if we've reached the end of the requested range
                        if (current_range >= content_range_end) {
                            break;
                        }
                    }

                }
            } else {
                // await log("No range query")
                if (file.profile_picture != 'Multipart') {
                    await customFetch(`https://ipfs.particle.network/${extractCID(file.profile_picture)}`, controller, 0, siez);
                } else {
                    for (var cid of file.data) {
                        if (cid.includes('https://')) {
                            cid = extractCID(cid);
                        }
                        await customFetch(`https://ipfs.particle.network/${cid}`, controller, 0, eachfilesize[cid]);
                    }
                }
            }

            controller.close();
        }
    });

    var headers: any = {
        'content-type': getContentTypeByFilename(!filename ? file.filename : filename),
        'Cache-Control': 'public, max-age=29030400',
        'content-disposition': `inline; filename="${file.filename}"`,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Expose-Headers': 'Content-Range, Content-Length, ETag, Access-Control-Allow-Methods, Access-Control-Allow-Origin',
        'Vary': 'Origin, Access-Control-Request-Headers, Access-Control-Request-Method, Accept-Encoding',
        'Connection': 'keep-alive',
        'Accept-Ranges': 'bytes',
    };

    // if requested has content-range header then we need to change the headers
    if (request.headers.has('range')) {
        headers['Content-Range'] = `bytes ${start}-${end}/${siez}`
        headers['Content-Length'] = end - start - 1
    } else {
        headers['Content-Length'] = siez
    }

    const tstream = new TransformStream();
    readable.pipeTo(tstream.writable)

    return new Response(tstream.readable, {
        headers: headers,
        status: request.headers.has('range') ? 206 : 200
    })

    // I have a new api for this so this is useless rn:
    // 410 gone!
    // NAH I DED I WILL USE MY PREV API
    // return new NextResponse('Deprecated API. please use https://direct.ufsdrive.com/?shared=' + shared, { status: 410 });
}
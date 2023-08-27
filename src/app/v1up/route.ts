import { NextRequest, NextResponse } from "next/server";

const uploadFile = (formData: FormData) => {
    return new Promise((resolve, reject) => {
        // var xhttp = new XMLHttpRequest();
        // console.log("Upload here")

        let username = "4189cf8e-a925-4a73-9051-88b4798ec5df"
        let password = "s5MZ8h57Od6mhQbs0sstuyRMGumQrMEB4FaMNnZY"

        fetch("https://rpc.particle.network/ipfs/upload", {
            method: "POST",
            body: formData,
            headers: {
                "Authorization": "Basic " + btoa(username + ":" + password)
            }
        })
        .then(respone => respone.json())
        .then(data => {
            resolve(data)
        })
        .catch ((error: Error) => {
            console.log(error);
            reject(error)
        })
    });
}

async function uploadChunk(chunk: ArrayBuffer, filename: string) {
    const uploadFormData = new FormData();
    const buffer = Buffer.from(chunk);
    const file = new File([buffer], filename);
    uploadFormData.append('file', file);
    return await uploadFile(uploadFormData) as any;
};

function compareSecondColumn(a: any, b: any) {
    if (a[1] === b[1]) {
        return 0;
    }
    else {
        return (a[1] < b[1]) ? -1 : 1;
    }
}

export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || typeof file === 'string') {
        return NextResponse.json({}, { status: 400 });
    }

    const fileArrayBuffer = await file.arrayBuffer();

    const CHUNK_SIZE = 50 * 1024 * 1024;
    let start = 0;
    let end = CHUNK_SIZE;
    let cids: any = [];

    const work = ( chunk: any, filename: any, index: number) => {
        // while(1) {
        return uploadChunk(chunk, filename)
            .then((data: any) => {
                cids.push([data.cid, index]);
            })
            .catch((error: any) => {
                work(chunk, filename, index);
            })
        // }
    }

    var promises = []

    while (start < fileArrayBuffer.byteLength) {
        try {
            // console.log("Uploading chunk from " + start + " to " + end);
            const chunk = fileArrayBuffer.slice(start, end);
            // const cid = (await uploadChunk(chunk, file.name)).cid;
            promises.push(work(chunk, file.name, start));
            // console.log(cid);
            // cids.push(cid);
            start = end;
            end += CHUNK_SIZE
        } catch (e) {
            // console.log(e);
        }
    }

    // console.log("All chunks uploading..");
    await Promise.all(promises);
    // console.log("All chunks uploaded");
    cids.sort(compareSecondColumn);
    // console.log(cids);

    let res = []
    for(var cidandid of cids) {
        res.push(cidandid[0])
    }

    return NextResponse.json({ cids: res }, { status: 200 });
}
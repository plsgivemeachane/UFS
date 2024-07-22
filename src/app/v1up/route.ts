import { NextRequest, NextResponse } from "next/server";

const uploadFile = (formData: FormData) => {
    return new Promise((resolve, reject) => {

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
            const chunk = fileArrayBuffer.slice(start, end);
            promises.push(work(chunk, file.name, start));
            start = end;
            end += CHUNK_SIZE
        } catch (e) {
            console.log(e);
        }
    }

    await Promise.all(promises);
    cids.sort(compareSecondColumn);

    let res = []
    for(var cidandid of cids) {
        res.push(cidandid[0])
    }

    return NextResponse.json({ cids: res }, { status: 200 });
}
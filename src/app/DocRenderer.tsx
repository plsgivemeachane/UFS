'use client';
import { useEffect, useRef, useState } from "react";
import mammoth from "mammoth";
import Image from "next/image";
// import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

const downloadPart = (blobs: Array<Array<any>>, index: number, cid: string) => {
    return fetch(`https://ipfs.particle.network/${cid}`)
    .then(response => response.blob())
    .then(blob => {
      // setProgress((prg / (index)) * 100)
      // console.log(index)
      blobs.push([blob, index])
    //   setStats("Downloaded: " + formatBytes(blobs.reduce((total: number, blob: Array<any>) => total + blob[0].size, 0)))
    })
}

export default function DocumentRenderer({ cid, filename } : any) {

    // Getting the docx first

    const [docx, setDocx] = useState<any>();
    const [type, setType] = useState<string>("");
    const [data, setData] = useState<any>();
    // const data = useRef<any>();

    const blobToArrayBuffer = (blob: Blob): Promise<ArrayBuffer> => {
        return new Promise<ArrayBuffer>((resolve, reject) => {
            const reader = new FileReader();
    
            reader.onload = () => {
                resolve(reader.result as ArrayBuffer);
            };
    
            reader.onerror = () => {
                reject(new Error('Error reading blob as ArrayBuffer'));
            };

            reader.readAsArrayBuffer(blob);
        });
    };


    useEffect(() => {
        console.log("Here")
        const blobs : any = []
        // if (cid && filename) {
        setType(filename.split(".")[filename.split(".").length - 1])
        if(filename.split(".")[filename.split(".").length - 1] == "docx")
            downloadPart(blobs, 0, cid)
            .then(() => {
                // const file = blobToArrayBuffer(blobs[0][0])
                // cont url = URL.createObjectURL(file)
                // docs.push(file);
                console.log(blobs[0][0], filename)
                // setDocx(blobs[0][0]);
                console.log(filename.split(".")[filename.split(".").length - 1])
                if(filename.split(".")[filename.split(".").length - 1] == "docx") {
                    blobToArrayBuffer(blobs[0][0])
                        .then((arrbuff: ArrayBuffer) => {
                            console.log(arrbuff)
                            return mammoth.convertToHtml({arrayBuffer: arrbuff});
                        })
                        .then((result) => {
                            return result.value; // The generated HTML
                        })
                        .then((html) => {
                            // console.log(html)
                            // data.current = html;
                            setData(html)
                        })
                        .catch((error) => {
                            console.error(error);
                            return null;
                        });
                }
            })
        // // }
    }, []);

    return (
        <div className="h-full">
            {type && (
                <div className="flex flex-col justify-center m-8 h-auto">
                    <div className="text-2xl font-bold">
                        <h1>Preview</h1>
                    </div>
                    {type == "docx" && (
                        <div className="border border-gray-300 rounded p-4 w-[90%]">
                            <div dangerouslySetInnerHTML={{ __html: data }}></div>
                        </div>
                    )}

                    {(type == "png" || type == "jpg") && (
                        <div className="border border-gray-300 rounded p-4">
                            {/* <div dangerouslySetInnerHTML={{ __html: data }}></div> */}
                            <img src={`https://ipfs.particle.network/${cid}`} alt={filename} width={200} height={200}/>
                        </div>
                    )}

                    {/* {type == "pdf" && (
                        <div className="border border-gray-300 rounded p-4 h-full">
                            <iframe src={`https://ipfs.particle.network/${cid}`} title="PFD Viewer" width="100%" height="100%" className="w-full md:h-[300px]"></iframe>
                        </div>
                    )} */}

                    {/* video
                    {type == "mp4" && (
                        <div className="border border-gray-300 rounded p-4 h-full">
                            <iframe src={`https://ipfs.particle.network/${cid}`} allowFullScreen width="100%" height="100%" className="w-full md:h-[300px] lg:h-[1000px]"></iframe>
                        </div>
                    )} */}
                </div>
            )}

        </div>
    )

}

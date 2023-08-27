import { NextResponse } from 'next/server'
import {promisify} from 'util';
import stream from 'stream';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const cid = searchParams.get('cid')
    // console.log(cid)
    const filename = searchParams.get('filename')
    const pipeline = promisify(stream.pipeline);
    const url = `https://${cid}.ipfs.dweb.link`
    const fileRes = await fetch(url);
    // console.log(url)
    // console.log(fileRes)

    //If no file, return 404
    if (!fileRes.ok) {
        return new NextResponse('Not found', { status: 404 });
    }

    //Set the proper headers
    const response = new NextResponse(fileRes.body);
    response.headers.set('Content-Type', 'application/zip');
    response.headers.set('Content-Disposition', `attachment; filename=${encodeURI(filename as string)}`);

    return response;
}
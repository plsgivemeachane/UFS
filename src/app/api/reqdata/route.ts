import { initializeApp } from "firebase/app";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
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

function getContentTypeByFilename(filename: string) {
    const ext = filename.split('.').pop();
    // every single common file extension
    return mime.lookup(ext as string) || 'application/octet-stream';
}


export async function GET(request: NextRequest, response: NextResponse) {
    const { searchParams } = new URL(request.url)
    const shared = searchParams.get('shared')
    // console.log(shared)

    const snapshot : any = await getDoc(doc(db, `storage/anonymous/storage/${shared}`))
    if (!snapshot.data()) {
        return new NextResponse('Not found', { status: 404 });
    }

    // console.log(snapshot.data())
    const file = snapshot.data()

    const contentType = getContentTypeByFilename(file.filename)

    return new Response(JSON.stringify({
        data: file,
        contentType: contentType,
        filename: file.filename
    }));
}

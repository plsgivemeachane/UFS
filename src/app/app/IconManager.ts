interface ImageFile {
    src: string,
    alt: string,
    width: number,
    height: number,
}

class ImageIcon {
    src = "/icons";
    filepath = "/icons";
    constructor(filepath: string, src:string ="/icons") {
        this.filepath = filepath;
        this.src = src
    }
    getImage(filename: string): ImageFile {
        return { 
            src:this.src + "/" + this.filepath,
            alt:filename,
            width:128,
            height:128
        }
    }
}

class ImageFactory {
    images: Record<string, ImageIcon> = {}
    defaultIcon: ImageIcon = new ImageIcon("");

    addImageIcon(filetype: string,icon: ImageIcon) {
        this.images[filetype] = icon;
    }

    addDefaultIcon(icon: ImageIcon){
        this.defaultIcon = icon;
    }

    getImage(filename: string): ImageFile {
        let filetype: string = filename.split(".").slice(-1)[0]
        // console.log(this.images[filetype].getImage(filename))
        if(this.images[filetype] != null) {
            return this.images[filetype].getImage(filename)
        } else {
            return this.defaultIcon.getImage(filename);
        }
    }
}

const imageFactory = new ImageFactory();
imageFactory.addImageIcon("pdf",new ImageIcon("pdf.png"));
imageFactory.addImageIcon("css",new ImageIcon("css.png"));
imageFactory.addImageIcon("csv",new ImageIcon("csv.png"));
imageFactory.addImageIcon("doc",new ImageIcon("doc.png"));
imageFactory.addImageIcon("docx",new ImageIcon("doc.png"));
imageFactory.addImageIcon("exe",new ImageIcon("exe.png"));
imageFactory.addImageIcon("exe",new ImageIcon("exe.png"));
imageFactory.addImageIcon("jar",new ImageIcon("jar.png"));
imageFactory.addImageIcon("js",new ImageIcon("js.png"));
imageFactory.addImageIcon("mov",new ImageIcon("mov.png"));
imageFactory.addImageIcon("mp3",new ImageIcon("mp3.png"));
imageFactory.addImageIcon("ppt",new ImageIcon("ppt.png"));
imageFactory.addImageIcon("txt",new ImageIcon("txt.png"));
imageFactory.addImageIcon("wave",new ImageIcon("wave.png"));
imageFactory.addImageIcon("xls",new ImageIcon("xls.png"));
imageFactory.addImageIcon("xlsx",new ImageIcon("xls.png"));
imageFactory.addImageIcon("xml",new ImageIcon("xml.png"));
imageFactory.addImageIcon("zip",new ImageIcon("zip.png"));
imageFactory.addImageIcon("rar",new ImageIcon("zip.png"));
imageFactory.addImageIcon("html",new ImageIcon("html.png"));
imageFactory.addDefaultIcon(new ImageIcon("default.png"));
// imageFactory.addDefaultIcon(new ImageIcon("zip.png"));

export default imageFactory
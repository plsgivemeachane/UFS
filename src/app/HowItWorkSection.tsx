import Blackhole from "./app/Blackhole";
import { RxBorderSplit } from "react-icons/rx";
import { LuPackageCheck } from "react-icons/lu";
import { LuRocket } from "react-icons/lu";
import { IconContext } from "react-icons";

export default function HowItWorkSection() {
  return (
    <div className="bg-dark_gray flex spacer justify-center flex-col md:p-16">
      <div className="flex justify-center items-center">
        <div className="bg-gray-400 h-1 w-[80%] rounded-lg mt-8 mb-8"></div>
      </div>
      <h1
        className=" mb-16 text-center text-2xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-violet-500 font-sans"
        data-aos="fade-up"
      >
        How it works
      </h1>
      <div className="flex flex-col gap-4">
        <div className="p-4 rounded-xl shadow-neutral-800 shadow-md flex flex-col items-center border-2 border-violet-500 md:items-start md:flex-row gap-4 hover:shadow-violet-500 transition-all">
          <IconContext.Provider
            value={{ color: "cyan", className: "global-class-name" }}
          >
            <RxBorderSplit className="w-16 h-16" />
          </IconContext.Provider>
          <div>
            <h3 className="text-xl underline decoration-blue-500 underline-offset-4">
              Step 1: Process File
            </h3>
            <p>
              First, you will split your file into parts (fragments) before it
              joins the IPFS black hole.
            </p>
          </div>
        </div>
        <div className="p-4 rounded-xl shadow-neutral-800 shadow-md flex flex-col items-center border-2 border-violet-500 md:items-start md:flex-row gap-4 hover:shadow-violet-500 transition-all">
          <IconContext.Provider
            value={{ color: "yellow", className: "global-class-name" }}
          >
            <LuPackageCheck className="w-16 h-16" />
          </IconContext.Provider>

          <div>
            <h3 className="text-xl underline decoration-yellow-500 underline-offset-4">
              Step 2: Prepare
            </h3>
            <p>
              Our server will prepare a launcher for you, connecting our peer to
              the network and ensuring all your fragments are encrypted and
              secure.
            </p>
          </div>
        </div>
        <div className="p-4 rounded-xl shadow-neutral-800 shadow-md flex flex-col items-center border-2 border-violet-500 md:items-start md:flex-row gap-4 hover:shadow-violet-500 transition-all">
          <IconContext.Provider
            value={{ color: "pink", className: "global-class-name" }}
          >
            <LuRocket className="w-24 h-24" />
          </IconContext.Provider>
          <div>
            <h3 className="text-xl underline decoration-pink-500 underline-offset-4">
              Step 3: Launch
            </h3>
            <p>
              Our server will launch your file into the IPFS network. Peers in
              the network will receive your file fragments and store them. Don't
              worry, they cannot decrypt your file, and the fragments are
              isolated so they cannot be linked together. After sending the file
              into IPFS, we save its CID (Content Identifier) - an encrypted
              identifier for your files - into our database.
            </p>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-black shadow-dark_gray flex flex-col items-center">
          <Blackhole className="w-16 h-16 md:w-64 md:h-64 animate-pulse" />
          <p className="">
            IPFS acts like a black hole: once you put something in, it gets
            separated and spread across the network.Only those with the CID
            (Content Identifier) can retrieve it.
          </p>
          <p className="text-gray-500">
            It floats somewhere in infinite space, and only you know its exact
            CID location.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function WhyShouldChooseSection() {
    return (
        <div className="bg-dark_gray flex justify-center items-center flex-col lg:relative">
        {/* Break line here */}
        <div className="bg-gray-400 h-1 w-[80%] rounded-lg mt-8 mb-8"></div>
        <h1
          className="md:text-6xl text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500 font-sans"
          data-aos="fade-up"
        >
          Why should you choose UFS?
        </h1>
        <div className="flex flex-col lg:flex-row gap-16 mb-16 mt-8">
          <div className="relative mt-8">
            <div className="absolute inset-0 bg-pink-500 rounded-xl blur-xl opacity-70"></div>
            <div className="relative max-w-sm rounded overflow-hidden shadow-lg bg-dark_gray border-2 border-pink-500 h-full">
              {/* <h1 className="text-center mt-4 text-xl font-bold text-white">Decentralized Advantage</h1> */}
              <img className="w-full" src="/decen.png" alt="Decentralized" />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">
                  🚀 Decentralized Advantage
                </div>
                <p className="text-gray-300 text-base" data-aos="fade-up">
                  Our innovative decentralized architecture, built upon the
                  power of IPFS, ensures that your files are stored securely
                  across a distributed network. This eliminates the risks of
                  single-point failures or data loss common with centralized
                  storage providers. With IPFS, your files gain resilience and
                  accessibility.
                </p>
              </div>
              {/* <div className="px-6 pt-4 pb-2">
                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
                            </div> */}
            </div>
          </div>
          <div className="relative mt-8">
            <div className="absolute inset-0 bg-yellow-500 rounded-xl blur-xl opacity-70"></div>
            <div className="relative max-w-sm rounded overflow-hidden shadow-lg bg-dark_gray border-2 border-yellow-500 h-full">
              {/* <h1 className="text-center mt-4 text-xl font-bold text-white">Decentralized Advantage</h1> */}
              <img
                className="w-full mt-24"
                src="/storage.png"
                alt="Unlimited Storage"
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">
                  💾 Unlimited Storage
                </div>
                <p className="text-gray-300 text-base" data-aos="fade-up">
                  Experience the freedom of never worrying about storage quotas
                  again! With free IPFS integration, our platform offers
                  limitless storage space, so you can save and organize your
                  files without constraints. Upload as much as you need,
                  whenever you need with free IPFS upload capabilities.
                </p>
              </div>
              {/* <div className="px-6 pt-4 pb-2">
                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
                            </div> */}
            </div>
          </div>
          <div className="relative mt-8">
            <div className="absolute inset-0 bg-blue-500 rounded-xl blur-xl opacity-70"></div>
            <div className="relative max-w-sm rounded overflow-hidden shadow-lg bg-dark_gray border-2 border-blue-500 h-full">
              {/* <h1 className="text-center mt-4 text-xl font-bold text-white">Decentralized Advantage</h1> */}
              <img
                className="w-full mt-32"
                src="/securiti.png"
                alt="Enhanced Security"
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">
                  🔒 Enhanced Security
                </div>
                <p className="text-gray-300 text-base" data-aos="fade-up">
                  Leveraging our decentralized architecture and the power of
                  IPFS, your data security is our top priority. UFS employs
                  advanced encryption, content-addressing, and cryptographically
                  hashed pinning services to keep your files safe from
                  unauthorized access and data breaches. Enjoy peace of mind
                  with the robust protection of free IPFS storage.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
export default function FeaturesSection() {
  return (
    <div className="bg-dark_gray spacer flex justify-center items flex-col md:p-16">
      <div className="flex justify-center items-center">
        <div className="bg-gray-400 h-1 w-[80%] rounded-lg mt-8 mb-8"></div>
      </div>
      <h1
        className="mb-8 text-center md:text-6xl sm:text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500 font-sans"
        data-aos="fade-up"
      >
        Features of UFS
      </h1>
      <div>
        <div className="flex items-center">
          <div className="w-3 h-3 ml-1 rounded-full relative bg-pink-400"></div>
          <div className="w-32 h-1 ml-4 rounded-full relative bg-pink-400"></div>
        </div>
        <div className="mb-8 px-6 py-4">
          <span className="text-4xl">📂</span>
          <div className="font-bold text-2xl mb-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500 font-sans">
            Effortless File Management
          </div>
          <p className="text-gray-400 text-base" data-aos="fade-up">
            Organize your files with ease using our intuitive interface. Create
            folders, tag files, and quickly search through your storage.
          </p>
        </div>
      </div>
      <div>
        <div className="flex items-center">
          <div className="w-3 h-3 ml-1 rounded-full relative bg-blue-400"></div>
          <div className="w-32 h-1 ml-4 rounded-full relative bg-blue-400"></div>
        </div>
        <div className="px-6 py-4 mb-8">
          <span className="text-4xl">📱</span>
          <div className="font-bold text-2xl mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-yellow-500 font-sans">
            Cross-Platform Access
          </div>
          <p className="text-gray-400 text-base" data-aos="fade-up">
            Access your files from anywhere, anytime, using any device. UFS is
            compatible with all major operating systems and supports seamless
            integration across desktop, web, and mobile platforms.
          </p>
        </div>
      </div>
      <div>
        <div className="flex items-center">
          <div className="w-3 h-3 ml-1 rounded-full relative bg-yellow-400"></div>
          <div className="w-32 h-1 ml-4 rounded-full relative bg-yellow-400"></div>
        </div>
        <div className="px-6 py-4 mb-8">
          <span className="text-4xl">🌐</span>
          <div className="font-bold text-2xl mb-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-violet-500 font-sans">
            Web-Based Access
          </div>
          <p className="text-gray-400 text-base" data-aos="fade-up">
            No need to install additional software. Simply log in to your
            account from any web browser to upload, download, and manage your
            files.
          </p>
        </div>
      </div>
      <div>
        <div className="flex items-center">
          <div className="w-3 h-3 ml-1 rounded-full relative bg-green-400"></div>
          <div className="w-32 h-1 ml-4 rounded-full relative bg-green-400"></div>
        </div>
        <div className="px-6 py-4 mb-8">
          <span className="text-4xl">🔄</span>
          <div className="font-bold text-2xl mb-2 text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-violet-500 font-sans">
            Automatic Synchronization
          </div>
          <p className="text-gray-400 text-base" data-aos="fade-up">
            UFS using real-time synchronization to ensure that your files are
            always up to date. Keep your files up to date across all your
            devices with our automatic synchronization feature.
          </p>
        </div>
      </div>
    </div>
  );
}

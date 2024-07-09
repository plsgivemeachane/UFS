
export default function ProgressBar({ progress }: { progress: number }) {
    return (
        <div className="w-52 rounded-full h-2 bg-gray-700 m-4">
            <div className="bg-violet-500 h-2 text-md font-medium text-blue-100 text-center p-0.5 leading-none rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
            <p className="text-md font-medium text-blue-100 text-center p-0.5 leading-none m-9">{Math.ceil(progress)}%</p>
        </div>
    );

}
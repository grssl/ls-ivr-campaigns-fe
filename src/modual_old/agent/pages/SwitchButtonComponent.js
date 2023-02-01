import "./switch.css"
export default function SwitchButtonComponent({ setIsManualCall }) {
    return (
        <div className="float-right p-1 mr-9">
            <label className="flex items-center relative w-max cursor-pointer select-none py-1" onClick={() => setIsManualCall(v => !v)}>
                <span className="text-lg font-bold mr-3">Manual Call</span>
                <input type="checkbox" className="appearance-none transition-colors cursor-pointer w-14 h-7 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-blue-500 bg-red-500" />
                <span className="absolute font-medium text-xs uppercase right-1 text-white"> No </span>
                <span className="absolute font-medium text-xs uppercase right-8 text-white"> Yes </span>
                <span className="w-7 h-7 right-7 absolute rounded-full transform transition-transform bg-gray-200">
                </span>
            </label>
        </div>
    )
}

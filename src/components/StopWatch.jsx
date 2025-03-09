import { useEffect, useState } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';

function StopWatch() {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [hasStopped, setHasStopped] = useState(false);

    useEffect(() => {
        let timeId;
        if (isRunning) {
            timeId = setInterval(() => {
                setTime((prev) => prev + 10);
            }, 10);
        } else {
            clearInterval(timeId);
            if (time > 0) {
                setHasStopped(true);
            }
        }
        return () => clearInterval(timeId);
    }, [isRunning]);

    function toggleTimer() {
        if (isRunning) {
            setIsRunning(false);
        } else {
            setIsRunning(true);
            setHasStopped(false);
        }
    }

    function handleReset() {
        setIsRunning(false);
        setTime(0);
    }

    let ms = `00${Math.floor(time % 1000)}`.slice(-2);
    let sec = `00${Math.floor((time / 1000) % 60)}`.slice(-2);
    let min = `00${Math.floor((time / (1000 * 60)) % 60)}`.slice(-2);

    return (
        <div className={`w-full h-screen flex flex-col justify-center items-center p-4 ${hasStopped ? "bg-blue-300" : "bg-gray-700"}`}>
            <h1 className="text-4xl font-semibold text-center p-5 text-gray-200">Stopwatch</h1>
            <div className="w-64 h-64 sm:w-[500px] sm:h-[500px] flex flex-col justify-center items-center rounded-full shadow-xl">
                <h1 className="text-gray-900 text-4xl sm:text-6xl">
                    {min}:{sec}:{ms}
                </h1>
                <div className="mt-6 sm:mt-10 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                    <button className={`w-24 sm:w-[120px] py-2 rounded-3xl text-white mx-2 ${isRunning ? "bg-blue-300" : "bg-red-300"}`} onClick={toggleTimer}>
                        {isRunning ? <i className="fas fa-pause"></i> : <i className="fas fa-play"></i>}
                    </button>
                    <button className={`w-24 sm:w-[120px] py-2 rounded-3xl text-white mx-2 ${isRunning ? "bg-blue-300" : "bg-red-300"}`} onClick={handleReset}>
                        <i className="fas fa-redo"></i>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default StopWatch;

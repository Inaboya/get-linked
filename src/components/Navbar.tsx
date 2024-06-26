import { useState, useEffect } from "react";
import { Eye, TimerStart } from "iconsax-react";

function Navbar() {
  const [timeLeft, setTimeLeft] = useState(30 * 60);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };
  return (
    <div className="w-full pt-7 pb-3 px-15 lg:px-30 bg-[#FFFFFF] flex justify-between items-center">
      <div className="flex items-center gap-4">
        <div className="w-[63px] h-[62px] rounded-md bg-[#3C1356] p-2 flex justify-center items-center">
          <svg
            width="48"
            height="27"
            viewBox="0 0 48 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M24 13.5C24 19.299 19.299 24 13.5 24C7.70101 24 3 19.299 3 13.5C3 7.70101 7.70101 3 13.5 3C19.299 3 24 7.70101 24 13.5Z"
              stroke="white"
              stroke-width="6"
            />
            <path
              d="M46.687 13.5C46.687 20.6797 40.8667 26.5 33.687 26.5C26.5073 26.5 20.687 20.6797 20.687 13.5C20.687 6.3203 26.5073 0.5 33.687 0.5C40.8667 0.5 46.687 6.3203 46.687 13.5Z"
              stroke="white"
            />
            <path
              d="M24.9861 13.6261C24.9861 15.481 24.8003 17.3946 24.4505 18.83C24.2746 19.5517 24.0647 20.1201 23.8367 20.4962C23.5974 20.891 23.4198 20.9486 23.3412 20.9486C23.2359 20.9486 23.01 20.8593 22.6964 20.4509C22.4006 20.0656 22.1024 19.4909 21.8364 18.7744C21.3059 17.345 20.9393 15.4483 20.9393 13.6261C20.9393 11.7986 21.2761 9.89904 21.7765 8.46903C22.0275 7.75184 22.3108 7.17825 22.5951 6.79449C22.8961 6.38824 23.1138 6.30371 23.215 6.30371C23.2985 6.30371 23.4839 6.3672 23.7354 6.76432C23.9745 7.14191 24.1989 7.71133 24.3898 8.43196C24.7698 9.86587 24.9861 11.7768 24.9861 13.6261Z"
              fill="white"
              stroke="white"
            />
          </svg>
        </div>

        <div className="flex flex-col ">
          <h5 className="text-xl font-medium leading-[26.04px] tracking-[-0.24px]">
            Frontend developer
          </h5>
          <p className="text-sm text-[#8C8CA1] leading-[18.23px] tracking-[-0.24px]">
            Skill assessment test
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-4 px-6 py-3 bg-[#ECE8FF] rounded-md">
          <TimerStart size="20" color="#755AE2" />
          <p className="text-sm text-[#755ae2] leading-[18.23px] font-semibold">
            {formatTime(timeLeft)} <span className="text-xs">time left</span>
          </p>
        </div>

        <div className="rounded-full bg-[#ECE8FF] p-2 flex justify-center items-center">
          <Eye size="20" color="#755AE2" />
        </div>
      </div>
    </div>
  );
}

export default Navbar;

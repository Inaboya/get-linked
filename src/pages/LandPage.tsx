import { useEffect, useRef, useState } from "react";
import BoxCard from "../components/BoxCard";
import { MonitorRecorder, Wifi, LampCharge, Microphone } from "iconsax-react";
import WebCam from "react-webcam";

function LandPage() {
  const [hasWebcam, setHasWebcam] = useState(false);
  const webRef = useRef(null)
  const [hasMicrophone, setHasMicrophone] = useState(false);
  const [isConnected, setIsConnected] = useState(navigator.onLine);

  useEffect(() => {
    // Check for webcam and microphone
    navigator.mediaDevices
      .enumerateDevices()
      .then((devices) => {
        const videoDevices = devices.filter(
          (device) => device.kind === "videoinput"
        );
        const audioDevices = devices.filter(
          (device) => device.kind === "audioinput"
        );

        setHasWebcam(videoDevices.length > 0);
        setHasMicrophone(audioDevices.length > 0);
      })
      .catch((error) => console.log(error));

    // Check for internet connection
    const updateOnlineStatus = () => {
      setIsConnected(navigator.onLine);
    };

    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    // Network Information API
    // if (navigator.connection) {
    //   setConnectionType(navigator.connection.effectiveType);

    //   navigator.connection.addEventListener("change", () => {
    //     setConnectionType(navigator.connection.effectiveType);
    //   });
    // }

    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
      //   if (navigator.connection) {
      //     navigator.connection.removeEventListener("change", () => {
      //       setConnectionType(navigator.connection.effectiveType);
      //     });
      //   }
    };
  }, [hasMicrophone, hasWebcam]);

  console.log({ navigator });

  console.log({ hasMicrophone, hasWebcam });

  return (
    <div className="w-full p-2 mt-4 px-7 md:px-80">
      <div className="flex justify-center items-center bg-[#FFFFFF] p-10 rounded-lg">
        <div className="flex w-full flex-col gap-3">
          <h3 className="text-xl font-medium leading-[25px]">System check</h3>

          <p className="text-sm text-[#4A4A68]">
            We utilize your camera image to ensure fairness for all
            participants, and we also employ both your camera and microphone for
            a video questions where you will be prompted to record a response
            using your camera or webcam, so it's essential to verify that your
            camera and microphone are functioning correctly and that you have a
            stable internet connection. To do this, please position yourself in
            front of your camera, ensuring that your entire face is clearly
            visible on the screen. This includes your forehead, eyes, ears,
            nose, and lips. You can initiate a  5-second recording of yourself
            by clicking the button below.
          </p>

          <div className="mt-4 flex flex-col lg:flex-row items-center gap-4">
            <div className="w-[275px] h-[168px] rounded-md border border-[#755AE2]">
              <WebCam className="w-full h-full" ref={webRef} />
            </div>

            <div className="w-[275px] grid grid-cols-2 gap-4">
              <BoxCard
                icon={<MonitorRecorder size="18" color="#755AE2" />}
                label="Webcam"
                status={hasWebcam}
                statusIcon={<MonitorRecorder size="12" color="#fff" />}
              />
              <BoxCard
                icon={<Wifi size="18" color="#755AE2" />}
                label="Speed"
                status={false}
                statusIcon={<MonitorRecorder size="12" color="#fff" />}
              />
              <BoxCard
                icon={<MonitorRecorder size="18" color="#755AE2" />}
                label="Gadget mic"
                status={hasMicrophone}
                statusIcon={<Microphone size="32" color="#fff" />}
              />
              <BoxCard
                icon={<LampCharge size="18" color="#755AE2" />}
                label="Lighting"
                status={false}
                statusIcon={<MonitorRecorder size="12" color="#fff" />}
              />
            </div>
          </div>

          <div className="flex mt-4">
            <button
              type="button"
              className="px-6 py-2 rounded-md bg-[#755AE2] text-sm text-white font-medium"
            >
              Take picture and continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandPage;

import { useCallback, useEffect, useRef, useState } from "react";
import BoxCard from "../components/BoxCard";
import { MonitorRecorder, Wifi, LampCharge, Microphone } from "iconsax-react";
import WebCam from "react-webcam";
import Modal from "../components/Modal";

function LandPage() {
  const [hasWebcam, setHasWebcam] = useState<boolean | null>(null);
  const webRef = useRef(null);
  const [hasMicrophone, setHasMicrophone] = useState<boolean | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState<boolean | null>(
    navigator.onLine
  );
  const [showModal, setShowModal] = useState(false);

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

        setTimeout(() => {
          setHasWebcam(
            webRef?.current.state.hasUserMedia && videoDevices.length > 0
          );
          setHasMicrophone(
            webRef?.current.state.hasUserMedia && audioDevices.length > 0
          );
        }, 2000);
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
  }, [hasMicrophone, hasWebcam, isConnected]);

  console.log({ isConnected });

  const handleOpenModal = useCallback(
    () => setShowModal(!showModal),
    [showModal]
  );

  const handleScreenShot = () => {
    //@ts-ignore
    let img = webRef?.current?.getScreenshot();

    setImageSrc(img);

    handleOpenModal();
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setImageSrc(null);
  };

  const handleWebCamAllowed = () => setHasWebcam(true);

  const handleWebCanDisallowed = () => setHasWebcam(false);

  console.log({ webRef });

  return (
    <div className="w-full p-2 mt-4 px-7 lg:px-80">
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
            nose, and lips. You can initiate a 5-second recording of yourself by
            clicking the button below.
          </p>

          <div className="mt-4 flex flex-col lg:flex-row items-center gap-4">
            <div className="w-[275px] h-[168px] rounded-md border border-[#755AE2]">
              {imageSrc ? (
                <img src={imageSrc} className="w-full h-full bg-cover" alt="" />
              ) : (
                <WebCam
                  className="w-full h-full"
                  ref={webRef}
                  onUserMedia={handleWebCamAllowed}
                  onUserMediaError={handleWebCanDisallowed}
                />
              )}
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
                status={isConnected}
                statusIcon={<Wifi size="12" color="#fff" />}
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
                status={null}
                statusIcon={<LampCharge size="12" color="#fff" />}
              />
            </div>
          </div>

          <div className="flex mt-4">
            <button
              type="button"
              className="px-6 py-2 rounded-md bg-[#755AE2] text-sm text-white font-medium"
              onClick={() => handleScreenShot()}
            >
              Take picture and continue
            </button>
          </div>
        </div>
      </div>

      <Modal
        close
        onClick={handleOpenModal}
        active={showModal}
        size="md:w-[35rem]"
      >
        <div className="w-full bg-white" style={{ borderRadius: "18px" }}>
          <div
            className="w-full flex justify-between items-center bg-[#755AE2] pt-4 px-7 pb-3 "
            style={{ borderRadius: "18px 18px 0px 0px" }}
          >
            <h6 className="text-sm text-white font-medium">Start assessment</h6>

            <button
              type="button"
              className="px-6 py-2 bg-[#F5F3FF33] text-xs text-white font-medium rounded-md"
              onClick={() => handleCloseModal()}
            >
              Close
            </button>
          </div>

          <div className="w-full p-10 flex flex-col justify-center items-center bg-[#F5F3FF]">
            <h5 className="text-base text-[#755AE2] font-semibold">
              Proceed to start assessment
            </h5>
            <p className="text-sm text-[#675E8B] text-center">
              Kindly keep to the rules of the assessment and sit up, stay in
              front of your camera/webcam and start your assessment.
            </p>
          </div>

          <div className="w-full p-5 flex justify-end">
            <button
              type="button"
              className="px-6 py-2 bg-[#755AE2] text-sm text-white font-medium rounded-md"
            >
              Proceed
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default LandPage;

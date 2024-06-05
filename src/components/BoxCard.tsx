import { TickCircle, Danger } from "iconsax-react";

type BoxCardProps = {
  icon: JSX.Element;
  label: string;
  status: boolean | null;
  statusIcon: JSX.Element;
};

function BoxCard({ icon, label, status, statusIcon }: BoxCardProps) {
  return (
    <div className="w-full rounded-md bg-[#F5F3FF] flex flex-col gap-2 justify-center items-center p-2 relative">
      <div
        className={`w-5 h-5 rounded-full absolute bg-[#755AE2] ${
          status === false && "bg-[#FF5F56]"
        } top-0 right-0 p-1 flex justify-center items-center`}
      >
        {status && statusIcon}
      </div>

      <div
        className={`w-[35px] h-[35px] rounded-full ${
          status === null || (status === true && "bg-[#E6E0FF]")
        } ${
          status === false && "bg-[#FF5F561A]"
        } flex justify-center items-center p-1`}
      >
        {status === null && icon}
        {status === true && (
          <TickCircle
            color="#fff"
            style={{
              backgroundColor: "#755AE2",
              width: "100%",
              height: "100%",
              borderRadius: "100%",
            }}
          />
        )}

        {status === false && <Danger size="18" color="#FF5F56" />}
      </div>

      <p className="text-xxs text-[#4A4A68]">{label}</p>
    </div>
  );
}

export default BoxCard;

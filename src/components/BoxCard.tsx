type BoxCardProps = {
  icon: JSX.Element;
  label: string;
  status: boolean;
  statusIcon: JSX.Element;
};

function BoxCard({ icon, label, status, statusIcon }: BoxCardProps) {
  return (
    <div className="w-full rounded-md bg-[#F5F3FF] flex flex-col gap-2 justify-center items-center p-2 relative">
      <div className="w-5 h-5 rounded-full absolute bg-[#755AE2] top-0 right-0 p-1 flex justify-center items-center">
        {status && statusIcon}
      </div>
      <div className="rounded-full bg-[#E6E0FF] flex justify-center items-center p-2">
        {icon}
      </div>

      <p className="text-xxs text-[#4A4A68]">{label}</p>
    </div>
  );
}

export default BoxCard;

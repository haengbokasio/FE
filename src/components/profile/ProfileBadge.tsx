import { ProfileAvatar } from "./ProfileAvatar";

type Props = {
  name: string;
  desc: string;
  img?: string;
  id: number;
  onClick?: (id: number) => void;
};

export function ProfileBadge({ name, desc, img, id, onClick }: Props) {
  const handleClick = () => {
    onClick?.(id);
  };

  return (
    <div
      className="flex flex-col items-center justify-center gap-1 w-[73px] h-[91px] cursor-pointer hover:opacity-80 transition-opacity"
      onClick={handleClick}
    >
      <ProfileAvatar
        id={id}
        src={img}
        alt={name}
        fallback={name[0]}
        size="md"
        className="border border-white"
      />
      <div className="flex flex-col items-center">
        <span className="text-sm font-semibold leading-5 text-black text-center line-clamp-1 overflow-hidden">
          {name}
        </span>
        <span className="text-xs leading-[15px] text-[#A5A5A5] text-center line-clamp-1 overflow-hidden">
          {desc}
        </span>
      </div>
    </div>
  );
}

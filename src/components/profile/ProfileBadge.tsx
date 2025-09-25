// src/components/profile/ProfileBadge.tsx
import { ProfileAvatar } from "./ProfileAvatar"

type Props = { name: string; desc: string; img?: string }

export function ProfileBadge({ name, desc, img }: Props) {
  return (
    <div className="flex flex-col items-center justify-center gap-1 w-[73px] h-[91px]">
      <ProfileAvatar src={img} alt={name} fallback={name[0]} size="lg" className="border border-white" />
      <div className="flex flex-col items-center">
        <span className="text-sm font-semibold leading-5 text-black">{name}</span>
        <span className="text-xs leading-[15px] text-[#A5A5A5]">{desc}</span>
      </div>
    </div>
  )
}

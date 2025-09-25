// src/components/profile/ProfileListItem.tsx
import { ProfileAvatar } from "./ProfileAvatar"
import { StatusPill } from "./StatusPill"

type Props = {
  name: string
  desc: string
  img?: string
  status?: "신청완료" | "대기중" | "거절"
}

export function ProfileListItem({ name, desc, status, img }: Props) {
  if (!status) return null
  return (
    <div className="flex items-center gap-3 px-3 py-2">
      <ProfileAvatar src={img} alt={`${name} 프로필`} fallback={name[0]} size="md" />
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium">{name}</h4>
        <p className="text-xs text-muted-foreground truncate">{desc}</p>
      </div>
      <StatusPill status={status} />
    </div>
  )
}


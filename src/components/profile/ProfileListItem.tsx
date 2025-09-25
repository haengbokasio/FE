import { ProfileAvatar } from "./ProfileAvatar"

type Props = {
  name: string
  desc: string
  img?: string
}

export function ProfileListItem({ name, desc, img }: Props) {
  return (
    <div className="flex items-center gap-3 px-3 py-2">
      <ProfileAvatar src={img} alt={`${name} 프로필`} fallback={name[0]} size="md" />
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium">{name}</h4>
        <p className="text-xs text-muted-foreground truncate">{desc}</p>
      </div>
    </div>
  )
}



import { ProfileAvatar } from "./profile-avatar"

interface MentorProfileSimpleProps {
  name: string
  job: string
  avatar?: string
}

export function MentorProfileSimple({ name, job, avatar }: MentorProfileSimpleProps) {
  return (
    <div className="flex flex-col items-center gap-2 p-4">
      <ProfileAvatar src={avatar} alt={`${name} 프로필`} fallback={name.charAt(0)} size="lg" />
      <div className="text-center">
        <h3 className="font-medium text-sm">{name}</h3>
        <p className="text-xs text-muted-foreground">{job}</p>
      </div>
    </div>
  )
}

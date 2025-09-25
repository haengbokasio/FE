import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

type Size = "sm" | "md" | "lg"

export interface ProfileAvatarProps {
  src?: string
  alt?: string
  fallback?: string
  size?: Size
  className?: string
}

const SIZE_CLASS: Record<Size, string> = {
  sm: "w-10 h-10",
  md: "w-12 h-12",
  lg: "w-16 h-16",
}

export function ProfileAvatar({ src, alt = "프로필", fallback = "프", size = "md", className = "" }: ProfileAvatarProps) {
  return (
    <Avatar className={`${SIZE_CLASS[size]} ${className}`}>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  )
}



// src/components/profile/ProfileAvatar.tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type Size = "sm" | "md" | "lg"

export interface ProfileAvatarProps {
  src?: string
  alt?: string
  fallback?: string
  size?: Size
  className?: string
}

const SIZE_CLASS: Record<Size, string> = {
  sm: "w-10 h-10",   // 40px (리스트)
  md: "w-12 h-12",   // 48px
  lg: "w-16 h-16",   // 64px (배지/프로필 카드)
}

export function ProfileAvatar({
  src,
  alt = "프로필",
  fallback = "프",
  size = "md",
  className = "",
}: ProfileAvatarProps) {
  return (
    <Avatar className={`${SIZE_CLASS[size]} ${className}`}>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  )
}

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ProfileAvatarProps {
  src?: string
  alt?: string
  fallback?: string
  size?: "sm" | "md" | "lg"
}

export function ProfileAvatar({ src, alt = "프로필", fallback = "프", size = "md" }: ProfileAvatarProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  }

  return (
    <Avatar className={sizeClasses[size]}>
      <AvatarImage src={src || "/placeholder.svg"} alt={alt} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  )
}

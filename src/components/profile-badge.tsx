import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function ProfileBadge() {
  return (
    <div className="flex flex-col items-center space-y-3 p-4">
      <Avatar className="w-16 h-16">
        <AvatarImage src="/korean-person-profile.jpg" alt="프로필" />
        <AvatarFallback className="text-lg">김</AvatarFallback>
      </Avatar>

      <div className="text-center space-y-1">
        <h3 className="font-medium text-sm">김철수님의 프로필</h3>
        <p className="text-xs text-muted-foreground">소프트웨어 개발자</p>
      </div>

      <div className="text-center space-y-1">
        <p className="text-xs font-medium">연락처 정보</p>
        <p className="text-xs text-muted-foreground">kim@example.com</p>
      </div>
    </div>
  )
}

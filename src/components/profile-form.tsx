import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@vapor-ui/core"
import { Badge } from "@/components/ui/badge"

export function ProfileForm() {
  const profiles = [
    {
      id: 1,
      name: "김철수",
      description: "프론트엔드 개발자입니다.",
      status: "승인",
      statusColor: "bg-blue-100 text-blue-800 border-blue-200",
    },
    {
      id: 2,
      name: "이영희",
      description: "백엔드 개발자입니다.",
      status: "대기",
      statusColor: "bg-orange-100 text-orange-800 border-orange-200",
    },
    {
      id: 3,
      name: "박민수",
      description: "디자이너입니다.",
      status: "거절",
      statusColor: "bg-red-100 text-red-800 border-red-200",
    },
  ]

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg">사용자 목록</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {profiles.map((profile) => (
          <div key={profile.id} className="flex items-center gap-3 p-3 rounded-lg border">
            <Avatar className="w-10 h-10">
              <AvatarImage
                src={`/korean-person-.jpg?height=40&width=40&query=korean-person-${profile.id}`}
                alt={profile.name}
              />
              <AvatarFallback>{profile.name[0]}</AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-medium text-sm truncate">{profile.name}</h4>
                <Badge variant="outline" className={`text-xs px-2 py-0.5 ${profile.statusColor}`}>
                  {profile.status}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground truncate">{profile.description}</p>
            </div>
          </div>
        ))}

        <div className="pt-2">
          <Button variant="outline" className="w-full bg-transparent" size="sm">
            더 보기
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

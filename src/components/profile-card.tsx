import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@vapor-ui/core"

export function ProfileCard() {
  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Avatar className="w-12 h-12">
            <AvatarImage src="/korean-person.jpg" alt="프로필" />
            <AvatarFallback>김</AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-2">
            <div className="space-y-1">
              <h3 className="font-medium text-sm">김철수님의 프로필</h3>
              <p className="text-xs text-muted-foreground">안녕하세요. 반갑습니다.</p>
            </div>

            <div className="flex gap-2 text-xs">
              <span className="px-2 py-1 bg-secondary rounded text-secondary-foreground">개발자</span>
              <span className="px-2 py-1 bg-secondary rounded text-secondary-foreground">서울</span>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t">
          <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white" size="sm">
            프로필 보기
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

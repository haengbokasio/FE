// src/components/profile/ProfileApplyCard.tsx
import { Card, CardContent } from "@/components/ui/card"
import { ProfileListItem } from "./ProfileListItem"
import { Button } from "@vapor-ui/core"

export function ProfileApplyCard() {
  const user = { name: "윤수민", desc: "카페 · 애월읍", img: "/avatars/mentor-1.jpg" }

  return (
    <Card className="w-[360px] rounded-2xl border-0 bg-[#FFF7F2] shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
      <CardContent className="pt-4 space-y-3">
        <ProfileListItem name={user.name} desc={user.desc} img={user.img} />
        <Button
          className="w-full h-[36px] text-[13px] font-medium text-[#FF782A] bg-[#FFF2EA] border border-[#FFD5BD] rounded-lg"
        >
          신청하기
        </Button>
      </CardContent>
    </Card>
  )
}

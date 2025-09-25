// src/components/profile/MentorStatusCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProfileListItem } from "./ProfileListItem"

export function MentorStatusCard() {
  const items = [
    { id: 1, name: "윤수민", desc: "카페 · 애월읍", status: "신청완료" as const, img: "/avatars/mentor-1.jpg" },
    { id: 2, name: "김은수", desc: "카페 · 제주시", status: "대기중"   as const, img: "/avatars/mentor-2.jpg" },
    { id: 3, name: "신명자", desc: "식당 · 한림읍", status: "거절"     as const, img: "/avatars/mentor-3.jpg" },
  ]

  return (
    <Card className="w-[360px] rounded-2xl border-0 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
      <CardHeader className="pb-2">
        <CardTitle className="text-[15px] font-semibold">멘토 신청 현황</CardTitle>
      </CardHeader>
      <CardContent className="pt-6 pr-2 pb-6 pl-2 flex flex-col gap-4">
          {items.map((it) => (
            <ProfileListItem
              key={it.id}
              name={it.name}
              desc={it.desc}
              status={it.status}
              img={it.img}
            />
          ))}
      </CardContent>
    </Card>
  )
}

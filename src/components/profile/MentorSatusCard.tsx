import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ProfileListItem } from "./ProfileListItem";
import { StatusPill } from "./StatusPill";

export function MentorStatusCard() {
  const items = [
    {
      id: 1,
      name: "윤수민",
      desc: "카페 · 애월읍",
      status: "신청완료" as const,
      img: "/korean-woman-cafe-owner.jpg",
    },
    {
      id: 2,
      name: "김은수",
      desc: "카페 · 제주시",
      status: "대기중" as const,
      img: "/korean-man-cafe-owner.jpg",
    },
    {
      id: 3,
      name: "신명자",
      desc: "식당 · 한림읍",
      status: "거절" as const,
      img: "/korean-woman-business-owner.jpg",
    },
  ];

  return (
    <Card className="w-[343px] rounded-[16px] border-0 shadow-[0_0_18px_11px_rgba(0,0,0,0.05)]">
      <CardHeader className="py-6 px-2">
        <CardTitle className="text-[18px] leading-[26px] font-semibold">
          멘토 신청 현황
        </CardTitle>
      </CardHeader>
      <CardContent className="py-0 px-2">
        <div className="flex flex-col gap-4">
          {/* 리스트 아이템들 16px 간격 */}
          {items.map((it) => (
            <div key={it.id} className="flex items-center justify-between">
              <ProfileListItem name={it.name} desc={it.desc} img={it.img} />
              <StatusPill status={it.status} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

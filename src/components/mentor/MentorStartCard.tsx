// components/mentor/MentorStartCard.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // shadcn
import { Button } from "@vapor-ui/core"; // vapor 버튼

export function MentorStartCard() {
  return (
    <Card className="rounded-2xl shadow-[0_0_18px_11px_rgba(0,0,0,0.05)] border-0">
      <CardHeader className="py-6 px-2">
        <CardTitle className="text-[18px] leading-[26px] font-semibold">
          멘토링을 시작할 수 있어요
        </CardTitle>
      </CardHeader>

      <CardContent className="py-0 px-2">
        {/* 카드 내부 요소 간격 16px */}
        <div className="flex flex-col gap-4">
          {/* 예시: 안내 텍스트 */}
          <p className="text-[14px] leading-5 text-black/80">
            지금 신청을 수락하면 프로필이 노출되고, 멘티가 바로 연락할 수 있어요.
          </p>

          {/* 예시: 액션 영역 */}
          <div className="flex items-center gap-2">
            <Button className="h-[36px] px-3 rounded-lg bg-[#8774FF] text-white text-[14px]">
              멘토링 시작하기
            </Button>
            <Button className="h-[36px] px-3 rounded-lg bg-[#ECECEC] text-[#767676] text-[14px]">
              나중에 할게요
            </Button>
          </div>

          {/* 예시: 간단 체크리스트 */}
          <ul className="flex flex-col gap-2 text-[14px] leading-5 text-black/80">
            <li>· 프로필 공개 범위 확인</li>
            <li>· 가능 요일/시간 설정</li>
            <li>· 첫 멘토링 주제 선택</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

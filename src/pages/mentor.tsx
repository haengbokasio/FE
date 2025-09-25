"use client"

import { useState } from "react"
import { AppHeader } from "@/components/app-header"
import { ExpandableMainCard } from "@/components/expandable-main-card"
import { UpcomingMentoringCard } from "@/components/upcoming-mentoring-card"
import { MentorWaitingCard } from "@/components/mentor-waiting-card"
import { MentorProfileCard } from "@/components/mentor-profile-card"
import { Badge } from "@vapor-ui/core"

const upcomingMentoring = {
  name: "아메리카노 #99",
  specialty: "식당 · 한림읍",
  avatar: "/korean-man-restaurant-owner.jpg",
}

const waitingMentees = [
  {
    id: "1",
    name: "윤수민",
    specialty: "애월읍 · 1년차",
    avatar: "/korean-woman-cafe-owner.jpg",
  },
  {
    id: "2",
    name: "윤수민",
    specialty: "애월읍 · 1년차",
    avatar: "/korean-man-cafe-owner.jpg",
  },
  {
    id: "3",
    name: "윤수민",
    specialty: "애월읍 · 2년차",
    avatar: "/korean-woman-business-owner.jpg",
  },
]

const mentors = [
  { id: "m1", name: "드립커피 #47", job: "애월읍 · 1년차", avatar: "/korean-man-cafe-owner.jpg" },
  { id: "m2", name: "아메리카노 #99", job: "제주시 · 2년차", avatar: "/korean-woman-cafe-owner.jpg" },
  { id: "m3", name: "라떼 #21", job: "한림읍 · 5년차", avatar: "/korean-woman-business-owner.jpg" },
]

export default function MentorHome() {
  const [activeTab, setActiveTab] = useState("recommendation")

  const handleAccept = (id: string) => {
    console.log("[mentor] Accept mentee:", id)
  }

  const handleReject = (id: string) => {
    console.log("[mentor] Reject mentee:", id)
  }

  return (
    <div className="min-h-screen w-full flex justify-center">
      <div className="relative w-[375px] min-h-[812px]">
    
        {/* 헤더/탭이 흐름에서 빠져있다면(권장) sticky로 명시 */}
        <div className="sticky top-0 z-50 bg-white">
          <AppHeader />
        </div>
        {/* 카드들 간격: 정확히 16px */}
        <main className="pt-[50px] px-4 space-y-4">
        <div className="p-4 space-y-[16px]">
          {activeTab === "recommendation" ? (
            <div className="flex flex-col gap-[16px]">
              {/* 배너: 이미지 위에 텍스트 오버레이 */}
              <div className="relative w-[343px] h-[176px] mx-auto rounded-[20px] overflow-hidden shadow-[0_20px_40px_-24px_rgba(0,0,0,0.25)]">
                <img src="/banner2.png" alt="배너" className="inset-0 w-full h-full object-cover" />
                <div className="absolute top-4 left-5 flex flex-col gap-1 items-start gap-1 text-left text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
                <p className="text-[12px] font-semibold">✨ AI 강점 분석</p>
                  <h3 className="text-[18px] font-semibold">실전 가능한 온라인</h3>
                  <h3 className="text-[18px] font-semibold">홍보 노하우</h3>
                  <div className="mt-1 flex gap-2 flex-nowrap">
                  <Badge className="bg-white/25 text-white border border-white/30 backdrop-blur-sm whitespace-nowrap hover:bg-white/30">
                    #성공형
                  </Badge>
                  <Badge className="bg-white/25 text-white border border-white/30 backdrop-blur-sm whitespace-nowrap hover:bg-white/30">
                    #성공형
                  </Badge>
                  <Badge className="bg-white/25 text-white border border-white/30 backdrop-blur-sm whitespace-nowrap hover:bg-white/30">
                    #성공형
                  </Badge>
                  </div>
                </div>
              </div>
              {/* 퍼플 히어로 카드 */}
              {/* <ExpandableMainCard /> */}

              {/* ▶ 카드 안에 제목 포함: '멘토링을 시작할 수 있어요' */}
              <div className="bg-white rounded-2xl shadow-[0_0_18px_11px_rgba(0,0,0,0.05)] border-0 py-6 px-2">
                {/* 카드 내부 요소 간격: 24px */}
                <div className="flex flex-col gap-6">
                  {/* ⬇️ 불필요한 mt 제거! */}
                  <h3 className="text-[18px] leading-[26px] font-semibold">
                    멘토링을 시작할 수 있어요
                  </h3>

                  {/* ⬇️ inline(베어) 변형 사용해 중첩 카드 제거 */}
                  <UpcomingMentoringCard {...upcomingMentoring} variant="inline"/>
                </div>
              </div>


              {/* ▶ 카드 안에 제목 포함: '멘토링을 기다리고 있어요' */}
              <div className="bg-white rounded-2xl shadow-[0_0_18px_11px_rgba(0,0,0,0.05)] border-0 pt-[24px] pb-[24px] px-[8px]">
                <div className="flex flex-col gap-[16px]">
                  <h3 className="text-[18px] leading-[26px] font-semibold mt-[24px]">멘토링을 기다리고 있어요</h3>
                  {/* 리스트 간격: 정확히 16px */}
                  <div className="flex flex-col gap-[16px]">
                    {waitingMentees.map((mentee) => (
                      <MentorWaitingCard
                        key={mentee.id}
                        name={mentee.name}
                        specialty={mentee.specialty}
                        avatar={mentee.avatar}
                        onAccept={() => handleAccept(mentee.id)}
                        onReject={() => handleReject(mentee.id)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // 목록 탭: 카드들 간격 16px
            <div className="space-y-4">
              {mentors.map((m) => (
                <MentorProfileCard
                  key={m.id}
                  name={m.name}
                  job={m.job}
                  avatar={m.avatar}
                  onApply={() => console.log("apply", m.id)}
                />
              ))}
            </div>
          )}
        </div>
        </main>
      </div>
    </div>
  )
}

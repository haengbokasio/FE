"use client"

import { useState } from "react"
import { AppHeader } from "@/components/app-header"
import { ExpandableMainCard } from "@/components/expandable-main-card"
import { UpcomingMentoringCard } from "@/components/upcoming-mentoring-card"
import { MentorWaitingCard } from "@/components/mentor-waiting-card"
import { MentorProfileCard } from "@/components/mentor-profile-card"
import { Badge } from "@vapor-ui/core"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card" // ✅ shadcn
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"



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
  const [showHeroModal, setShowHeroModal] = useState(false); // +추가



  const handleAccept = (id: string) => {
    console.log("[mentor] Accept mentee:", id)
  }

  const handleReject = (id: string) => {
    console.log("[mentor] Reject mentee:", id)
  }

  return (
    <div className="min-h-screen w-full flex justify-center">
      <div className="relative w-[375px] min-h-[812px]">
        {/* 헤더 */}
        <div className="sticky top-0 z-50 bg-white">
          <AppHeader />
        </div>

    

            {activeTab === "recommendation" ? (
              <div className="flex flex-col gap-[16px] mt-[32px]">
     
                <div
                  className="relative w-[343px] h-[176px] mx-auto rounded-[20px] overflow-hidden shadow-[0_20px_40px_-24px_rgba(0,0,0,0.25)] cursor-pointer" 
                  onClick={() => setShowHeroModal(true)} // +추가
                >
                  <img src="/banner2.png" alt="배너" className="inset-0 w-full h-full object-cover" />
                  <div className="absolute top-[32px] left-5 flex flex-col gap-1 text-left text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
                    <p className="text-[12px] font-semibold">✨ AI 강점 분석</p>
                    <h3 className="text-[18px] font-semibold">실전 가능한 온라인</h3>
                    <h3 className="text-[18px] font-semibold">홍보 노하우</h3>
                    <div className="mt-1 flex gap-2 flex-nowrap">
                      <Badge className="bg-white/25 text-white backdrop-blur-sm whitespace-nowrap hover:bg-white/30">#성공형</Badge>
                      <Badge className="bg-white/25 text-white backdrop-blur-sm whitespace-nowrap hover:bg-white/30">#성공형</Badge>
                      <Badge className="bg-white/25 text-white backdrop-blur-sm whitespace-nowrap hover:bg-white/30">#성공형</Badge>
                    </div>
                  </div>
                </div>


                {/* 멘토링 시작 카드 */}
                <Card className="rounded-2xl shadow-[0_0_18px_11px_rgba(0,0,0,0.05)] border-0">
                  <CardHeader className="px-6 pb-2">
                    <CardTitle className="text-[18px] leading-[26px] font-semibold">
                      멘토링을 시작할 수 있어요
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <UpcomingMentoringCard {...upcomingMentoring} variant="inline" />
                  </CardContent>
                </Card>

                {/* 멘토링을 기다리고 있어요 카드 */}
                <Card className="rounded-2xl shadow-[0_0_18px_11px_rgba(0,0,0,0.05)] border-0">
                  <CardHeader>
                    <CardTitle className="text-[18px] leading-[26px] font-semibold">
                      멘토링을 기다리고 있어요
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-4">
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
                  </CardContent>
                </Card>
              </div>
            ) : (
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
          

    <AnimatePresence>
      {showHeroModal && (
        <motion.div
          key="hero-modal"
          className="fixed inset-0 z-[100] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* 반투명 배경 */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowHeroModal(false)} // 배경 클릭 시 닫힘
          />

          {/* 중앙 카드 */}
          {/* 중앙 카드 */}
            <motion.div
              role="dialog"
              aria-modal="true"
              className="relative"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              {/* 이미지 래퍼를 relative로 만들어 버튼 기준점으로 사용 */}
              <div className="relative inline-block">
                <img
                  src="/star_banner.png"
                  alt="스타 배너"
                  width={329}
                  height={452}
                  className="rounded-2xl shadow-[0_24px_64px_-24px_rgba(0,0,0,0.35)]"
                />

                {/* 닫기 버튼 */}
                <button
                  aria-label="닫기"
                  onClick={() => setShowHeroModal(false)}
                  className="absolute top-5 right-4 z-20 inline-flex h-8 w-8 items-center justify-center 
                            rounded-full text-black
                            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                >
                  ✕
                </button>

                {/* ===== Vapor 뱃지 ===== */}
                <div className="absolute top-10 left-8 z-10">
                  <div className="px-4 h-7 inline-flex items-center rounded-full 
                                  bg-[#7B6BFF] text-white text-[12px] font-semibold
                                  shadow-[0_12px_24px_-10px_rgba(0,0,0,0.45)]">
                    AI 분석
                  </div>
                </div>

                  {/* 중간 큰 제목 */}
                  <div className="absolute top-20 left-8 z-10 w-[260px]">
                    <h2 className="text-[28px] font-bold leading-[34px] text-black break-words text-left">
                      실전 가능한 온라인 홍보 노하우
                    </h2>
                  </div>
                

                {/* ===== 하단 말풍선 스택 ===== */}
                <div className="absolute left-8 bottom-12 z-10 flex flex-col gap-3 max-w-[260px]">
                  <Badge
                    size="lg"
                    color="primary"
                    shape="square"
                    className="relative !bg-transparent !border-none overflow-hidden"
                  >
                    <span
                      aria-hidden
                      className="absolute inset-0 rounded-[inherit] bg-[#7B6BFF] opacity-40"
                    />
                    <span className="relative z-10 text-black">
                      호기심이 많아 새로운 시도를 즐기나요?
                    </span>
                  </Badge>
                  <Badge
                    size="lg"
                    color="primary"
                    shape="square"
                    className="relative !bg-transparent !border-none overflow-hidden"
                  >
                    <span
                      aria-hidden
                      className="absolute inset-0 rounded-[inherit] bg-[#7B6BFF] opacity-40"
                    />
                    <span className="relative z-10 text-black">
                      호기심이 많아 새로운 시도를 즐기나요?
                    </span>
                  </Badge>
                   <Badge
                    size="lg"
                    color="primary"
                    shape="square"
                    className="relative !bg-transparent !border-none overflow-hidden"
                  >
                    <span
                      aria-hidden
                      className="absolute inset-0 rounded-[inherit] bg-[#7B6BFF] opacity-40"
                    />
                    <span className="relative z-10 text-black">
                      호기심이 많아 새로운 시도를 즐기나요?
                    </span>
                  </Badge>
                </div>
              </div>


            </motion.div>

        </motion.div>
      )}
    </AnimatePresence>



      </div>
    </div>
  )
}

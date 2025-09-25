"use client"

// 상태 리스트가 있다면: import { MentorApplicationList } from "@/components/mentor-application-list""use client"

import { useState } from "react"
import { AppHeader } from "@/components/app-header"
import { Button } from "@vapor-ui/core"

// 이미 있는 것 재사용
import { ProfileBadge } from "@/components/profile/ProfileBadge"
import { UpcomingMentoringCard } from "@/components/upcoming-mentoring-card"

const aiCandidates = [
  { id: "1", name: "윤수민", desc: "카페 · 애월읍", img: "/korean-woman-cafe-owner.jpg" },
  { id: "2", name: "윤수민", desc: "카페 · 애월읍", img: "/korean-man-cafe-owner.jpg" },
  { id: "3", name: "윤수민", desc: "카페 · 애월읍", img: "/korean-woman-business-owner.jpg" },
  { id: "4", name: "윤수민", desc: "카페 · 애월읍", img: "/korean-man-restaurant-owner.jpg" },
]

const upcoming = { name: "소금빵 #07", specialty: "애월읍 · N년차", avatar: "/korean-woman-cafe-owner.jpg" }

export default function MenteeHome() {
  const [activeTab, setActiveTab] = useState("recommendation")

  return (
    <div className="min-h-screen w-full flex justify-center bg-neutral-100">
      <div className="relative w-[375px] min-h-[812px] bg-white">
        <AppHeader />
       
        {/* 🔥 여기가 핵심! pt-8 (32px)로 간격 확보 */}
        <main className="px-4 pt-8 space-y-4">
          {/* 배너(전체가 이미지) — 컨테이너는 static, 이미지만 absolute */}
          <div className="relative w-[343px] h-[94px] mx-auto rounded-[20px] overflow-hidden shadow-[0_20px_40px_-24px_rgba(0,0,0,0.25)]">
            <img src="/banner2.png" alt="배너" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute top-4 left-5 text-white">
              <h3 className="text-[18px] font-semibold">나에게 딱 맞는 멘티?</h3>
              <p className="text-[13px] leading-[18px] opacity-90">
                장사살랑은 내가 관심있는 분야의 <br/> 멘토들을 매칭해드려요!
              </p>
            </div>
          </div>

          {/* ✅ AI 분석 카드 — 전부 static 레이아웃 (여기가 중요) */}
          <div className="w-[343px] mx-auto rounded-[16px] bg-white shadow-[0_0_18px_11px_rgba(0,0,0,0.05)] py-6 px-2">
            <div className="flex flex-col gap-4 px-4">
              {/* 라벨 */}
              <div className="inline-flex h-[23px] items-center px-[10px] rounded-full
                              bg-[rgba(135,116,255,0.18)] shadow-[0_0_12px_9px_rgba(0,0,0,0.05)]
                              text-[#8774FF] text-[12px] font-medium w-fit">
                ai 분석
              </div>

              {/* 제목 + 설명 */}
              <div className="flex flex-col gap-1">
                <h2 className="text-[20px] leading-[28px] font-semibold text-black">
                  온라인 홍보 경험이 부족해요!
                </h2>
                <p className="text-[12px] leading-[15px] tracking-[0.02em] text-[#767676]">
                  현재 SNS 채널을 꾸준히 운영하거나 콘텐츠를 제작한 경험이 적어요
                </p>
              </div>

              {/* Ai기반 멘토 추천 */}
              <div className="flex flex-col gap-3 pt-1">
                <div className="flex items-center gap-2">
                  <span className="inline-block w-4 h-4 rounded-full bg-black" />
                  <span className="text-[14px] leading-5 font-semibold">Ai기반 멘토 추천</span>
                </div>

                {/* 4열 배지 */}
                <div className="grid grid-cols-4 gap-2">
                  {aiCandidates.map((p) => (
                    <ProfileBadge key={p.id} name={p.name} desc={p.desc} img={p.img} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 멘토링을 시작할 수 있어요 */}
          <div className="w-[343px] mx-auto bg-white rounded-[20px] pt-[24px] pb-[24px] px-[8px] shadow-[0_20px_40px_-24px_rgba(0,0,0,0.18)]">
            <div className="py-6 px-2 flex flex-col gap-6">
              <h3 className="text-[22px] leading-8 font-semibold">멘토링을 시작할 수 있어요</h3>
              <UpcomingMentoringCard {...upcoming} />
            </div>
          </div>

          {/* 멘토 신청 현황 */}
          <div className="w-[343px] mx-auto bg-white rounded-[20px] pt-[24px] pb-[24px] px-[8px] shadow-[0_20px_40px_-24px_rgba(0,0,0,0.18)]">
            <div className="flex flex-col gap-4 px-4">
              <h3 className="text-[22px] leading-8 font-semibold">멘토 신청 현황</h3>

              <div className="flex flex-col gap-4">
                {/* 예시 1 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-[49px] h-[49px] rounded-full overflow-hidden bg-gray-200">
                      <img src="/korean-woman-cafe-owner.jpg" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[16px] leading-6 font-semibold text-black">윤수민</span>
                      <span className="text-[14px] leading-5 text-black/60">카페 · 애월읍</span>
                    </div>
                  </div>
                  <span className="px-2 py-1 rounded-full bg-[#DEECFF] text-[#1D7AFC] text-[14px] leading-[24px]">
                    대기중
                  </span>
                </div>

                {/* 예시 2 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-[49px] h-[49px] rounded-full overflow-hidden bg-gray-200">
                      <img src="/korean-man-cafe-owner.jpg" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[16px] leading-6 font-semibold text-black">윤수민</span>
                      <span className="text-[14px] leading-5 text-black/60">카페 · 애월읍</span>
                    </div>
                  </div>
                  <span className="px-2 py-1 rounded-full bg-[#FFFAF2] text-[#FF6F1C] text-[14px] leading-[24px]">
                    보류
                  </span>
                </div>

                {/* 예시 3 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-[49px] h-[49px] rounded-full overflow-hidden bg-gray-200">
                      <img src="/korean-woman-business-owner.jpg" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[16px] leading-6 font-semibold text-black">윤수민</span>
                      <span className="text-[14px] leading-5 text-black/60">카페 · 애월읍</span>
                    </div>
                  </div>
                  <span className="px-2 py-1 rounded-full bg-[#FFF3F3] text-[#E60001] text-[14px] leading-[24px]">
                    거절
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 멘토 신청 현황 (Compact) */}
          <div className="w-[343px] mx-auto bg-white rounded-[16px] shadow-[0_0_18px_11px_rgba(0,0,0,0.05)] pt-[24px] pb-[24px] px-[8px]">
            <div className="flex flex-col gap-4">
              <h3 className="text-[18px] leading-[26px] font-semibold px-4">멘토 신청 현황</h3>

              <div className="flex flex-col gap-4 px-4">
                {/* item 1 - 파랑 태그 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-[49px] h-[49px] rounded-full bg-gray-200 overflow-hidden">
                      <img src="/korean-woman-cafe-owner.jpg" alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[16px] leading-6 font-semibold">윤수민</span>
                      <span className="text-[14px] leading-5 tracking-[0.01em] text-black/80">카페 · 애월읍</span>
                    </div>
                  </div>
                  <span className="px-2 py-1 rounded-full bg-[#DEECFF] text-[#1D7AFC] text-[14px] leading-[24px]">
                    대기중
                  </span>
                </div>

                {/* item 2 - 주황 태그 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-[49px] h-[49px] rounded-full bg-gray-200 overflow-hidden">
                      <img src="/korean-man-cafe-owner.jpg" alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[16px] leading-6 font-semibold">윤수민</span>
                      <span className="text-[14px] leading-5 tracking-[0.01em] text-black/80">카페 · 애월읍</span>
                    </div>
                  </div>
                  <span className="px-2 py-1 rounded-full bg-[#FFFAF2] text-[#FF6F1C] text-[14px] leading-[24px]">
                    보류
                  </span>
                </div>

                {/* item 3 - 빨강 태그 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-[49px] h-[49px] rounded-full bg-gray-200 overflow-hidden">
                      <img src="/korean-woman-business-owner.jpg" alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[16px] leading-6 font-semibold">윤수민</span>
                      <span className="text-[14px] leading-5 tracking-[0.01em] text-black/80">카페 · 애월읍</span>
                    </div>
                  </div>
                  <span className="px-2 py-1 rounded-full bg-[#FFF3F3] text-[#E60001] text-[14px] leading-[24px]">
                    거절
                  </span>
                </div>
              </div>

              {/* 하단 액션 */}
              <div className="px-4">
                <Button className="w-full h-[32px] rounded-lg bg-[#ECECEC] text-[#555] text-[14px]">
                  더 보기
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
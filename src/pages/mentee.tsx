"use client";

import { useMemo, useState } from "react";
import { AppHeader } from "@/components/app-header";
import { Button, Badge } from "@vapor-ui/core";
import { ProfileBadge } from "@/components/profile/ProfileBadge";
import { UpcomingMentoringCard } from "@/components/upcoming-mentoring-card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const aiCandidates = [
  { id: "1", name: "윤수민", desc: "카페 · 애월읍", img: "/korean-woman-cafe-owner.jpg" },
  { id: "2", name: "윤수민", desc: "카페 · 애월읍", img: "/korean-man-cafe-owner.jpg" },
  { id: "3", name: "윤수민", desc: "카페 · 애월읍", img: "/korean-woman-business-owner.jpg" },
  { id: "4", name: "윤수민", desc: "카페 · 애월읍", img: "/korean-man-restaurant-owner.jpg" },
];

const upcoming = { name: "소금빵 #07", specialty: "애월읍 · N년차", avatar: "/korean-woman-cafe-owner.jpg" };

type Mentor = {
  id: string;
  name: string;
  subtitle: string;
  avatar: string;
  tag: "1인 사장님" | "관광지 사장님" | "도민픽 사장님";
};

const mentors: Mentor[] = [
  { id: "m1", name: "크림커피 #08", subtitle: "애월읍 · N년차", avatar: "/korean-man-cafe-owner.jpg", tag: "1인 사장님" },
  { id: "m2", name: "커피 #08", subtitle: "카페 · 제주시", avatar: "/korean-man-cafe-owner.jpg", tag: "관광지 사장님" },
  { id: "m3", name: "라떼 #12", subtitle: "식당 · 한림읍", avatar: "/korean-woman-business-owner.jpg", tag: "1인 사장님" },
  { id: "m4", name: "크림커피 #08", subtitle: "식당 · 한림읍", avatar: "/korean-woman-business-owner.jpg", tag: "도민픽 사장님" },
  { id: "m5", name: "크림커피 #08", subtitle: "식당 · 한림읍", avatar: "/korean-woman-business-owner.jpg", tag: "1인 사장님" },
];

const FILTERS = ["1인 사장님", "관광지 사장님", "도민픽 사장님"] as const;

export default function MenteeHome() {
  const [showHeroModal, setShowHeroModal] = useState(false);
  const [activeTab, setActiveTab] = useState("recommendation");
  const [selectedFilter, setSelectedFilter] = useState<(typeof FILTERS)[number]>("1인 사장님");

  const filtered = useMemo(() => mentors.filter((m) => m.tag === selectedFilter), [selectedFilter]);

  return (
    <div className="min-h-screen w-full flex justify-center bg-neutral-100">
      {/* iPhone 14 기준 프레임 고정 */}
      <div className="relative w-[375px] min-h-[812px] bg-white">
        {/* 상단 고정 헤더 */}
        <div className="sticky top-0 z-50 bg-white">
          <AppHeader />
        </div>

        {/* 본문 */}
        <main className="space-y-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            {/* 상단 탭바 */}
            <TabsList className="h-[56px] pt-4 px-4 flex justify-start gap-0 bg-transparent">
              <TabsTrigger
                value="recommendation"
                className="w-[52px] h-[46px] rounded-none bg-transparent shadow-none text-gray-500 data-[state=active]:text-black border-b-2 border-transparent data-[state=active]:border-black focus-visible:outline-none focus-visible:ring-0"
              >
                추천
              </TabsTrigger>
              <TabsTrigger
                value="list"
                className="w-[52px] h-[46px] rounded-none bg-transparent shadow-none text-gray-500 data-[state=active]:text-black border-b-2 border-transparent data-[state=active]:border-black focus-visible:outline-none focus-visible:ring-0"
              >
                목록
              </TabsTrigger>
            </TabsList>

            {/* ===== 추천 탭 ===== */}
            <TabsContent value="recommendation">
              <div className="p-4 space-y-[16px]">
                {/* 배너 */}
                <div
                  className="relative w-[343px] h-[94px] mx-auto rounded-[20px] overflow-hidden shadow-[0_20px_40px_-24px_rgba(0,0,0,0.25)] cursor-pointer"
                  onClick={() => setShowHeroModal(true)}
                >
                  <img src="/banner2.png" alt="배너" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute top-4 left-5 text-white text-left">
                    <h3 className="text-[18px] font-semibold">나에게 딱 맞는 멘티?</h3>
                    <p className="text-[13px] leading-[18px] opacity-90">
                      장사살랑은 내가 관심있는 분야의 <br /> 멘토들을 매칭해드려요!
                    </p>
                  </div>
                </div>

                {/* AI 분석 카드 */}
                <section className="w-[343px] mx-auto rounded-[16px] bg-white shadow-[0_0_18px_11px_rgba(0,0,0,0.05)] py-8 px-2">
                  <div className="flex flex-col gap-6 px-4">
                    {/* 라벨 */}
                    <div className="inline-flex h-[23px] items-center px-[10px] rounded-full bg-[rgba(135,116,255,0.18)] text-[#8774FF] text-[12px] font-medium w-fit">
                      ai 분석
                    </div>

                    {/* 제목 + 설명 */}
                    <div className="flex flex-col gap-1">
                      <h2 className="text-[20px] leading-[28px] font-semibold text-black">온라인 홍보 경험이 부족해요!</h2>
                      <p className="text-[12px] leading-[15px] tracking-[0.02em] text-[#767676]">
                        현재 SNS 채널을 꾸준히 운영하거나 콘텐츠를 제작한 경험이 적어요
                      </p>
                    </div>

                    {/* Ai기반 멘토 추천 */}
                    <div className="flex flex-col gap-3 pt-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[14px] leading-5 font-semibold">✨ Ai기반 멘토 추천</span>
                      </div>
                      <div className="grid grid-cols-4 gap-2">
                        {aiCandidates.map((p) => (
                          <ProfileBadge key={p.id} name={p.name} desc={p.desc} img={p.img} />
                        ))}
                      </div>
                    </div>
                  </div>
                </section>

                {/* 멘토링 시작 카드 */}
                <section className="w-[343px] mx-auto bg-white rounded-[20px] shadow-[0_20px_40px_-24px_rgba(0,0,0,0.18)]">
                  <div className="flex flex-col">
                    <h3 className="text-[18px] leading-8 p-4 font-semibold">멘토링을 시작할 수 있어요</h3>
                    <UpcomingMentoringCard {...upcoming} />
                  </div>
                </section>

                {/* 멘토 신청 현황 */}
                <section className="w-[343px] mx-auto bg-white rounded-[16px] shadow-[0_0_18px_11px_rgba(0,0,0,0.05)] pt-[24px] pb-[24px] px-[8px]">
                  <div className="flex flex-col gap-4">
                    <h3 className="text-[18px] leading-[26px] font-semibold px-4">멘토 신청 현황</h3>

                    <div className="flex flex-col gap-4 px-4 text-left">
                      {/* item 1 */}
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
                        <span className="px-2 py-1 rounded-full bg-[#DEECFF] text-[#1D7AFC] text-[14px] leading-[24px]">대기중</span>
                      </div>

                      {/* item 2 */}
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
                        <span className="px-2 py-1 rounded-full bg-[#FFFAF2] text-[#FF6F1C] text-[14px] leading-[24px]">보류</span>
                      </div>

                      {/* item 3 */}
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
                        <span className="px-2 py-1 rounded-full bg-[#FFF3F3] text-[#E60001] text-[14px] leading-[24px]">거절</span>
                      </div>
                    </div>

                    <div className="px-4">
                      <Button variant="ghost" className="w-full h-[32px] rounded-lg text-[#555] text-[14px]">
                        더 보기
                      </Button>
                    </div>
                  </div>
                </section>
              </div>
            </TabsContent>

            {/* ===== 목록 탭 ===== */}
            <TabsContent value="list">
              <div className="p-4 space-y-6">
                {/* 필터 */}
                <div>
                  <p className="text-[18px] text-black mb-3 text-left">필터</p>
                  <div className="flex gap-2">
                    {FILTERS.map((f) => {
                      const active = selectedFilter === f;
                      return (
                        <button
                          key={f}
                          onClick={() => setSelectedFilter(f)}
                          className={[
                            "w-[82px] h-[32px] rounded-[16px]",
                            "rounded-[14px] text-[10px] font-large",
                            active ? "bg-[#8774FF] text-white" : "bg-[#EDEDED] text-black/70",
                          ].join(" ")}
                        >
                          {f}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 섹션 타이틀 */}
                <h2 className="text-[16px] leading-[28px] font-bold text-left">
                  {selectedFilter}을 소개해드릴게요!
                </h2>

                {/* 리스트 */}
                <ul className="flex flex-col gap-6">
                  {filtered.map((m) => (
                    <li key={m.id} className="flex items-center gap-3">
                      <div className="w-[48px] h-[48px] rounded-full overflow-hidden bg-neutral-200 shrink-0">
                        <img src={m.avatar} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex flex-col text-left">
                        <p className="text-[18px] font-semibold leading-6">{m.name}</p>
                        <p className="text-[14px] text-black/70 leading-5">{m.subtitle}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </main>

        {/* 히어로 모달 */}
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
                onClick={() => setShowHeroModal(false)}
              />

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
                    className="absolute top-5 right-4 z-20 inline-flex h-8 w-8 items-center justify-center rounded-full text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                  >
                    ✕
                  </button>

                  {/* 상단 배지 */}
                  <div className="absolute top-10 left-8 z-10">
                    <div className="px-4 h-7 inline-flex items-center rounded-full bg-[#7B6BFF] text-white text-[12px] font-semibold shadow-[0_12px_24px_-10px_rgba(0,0,0,0.45)]">
                      AI 분석
                    </div>
                  </div>

                  {/* 제목 */}
                  <div className="absolute top-20 left-8 z-10 w-[260px]">
                    <h2 className="text-[28px] font-bold leading-[34px] text-black break-words text-left">
                      실전 가능한 온라인 홍보 노하우
                    </h2>
                  </div>

                  {/* 하단 말풍선 스택 */}
                  <div className="absolute left-8 bottom-12 z-10 flex flex-col gap-3 max-w-[260px]">
                    {["호기심 많은 멘티", "SNS 초보", "콘텐츠 실습"].map((t) => (
                      <Badge
                        key={t}
                        size="lg"
                        color="primary"
                        shape="square"
                        className="relative !bg-transparent !border-none overflow-hidden"
                      >
                        <span aria-hidden className="absolute inset-0 rounded-[inherit] bg-[#7B6BFF] opacity-40" />
                        <span className="relative z-10 text-black">{t}</span>
                      </Badge>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

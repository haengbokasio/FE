"use client";

import { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { AppHeader } from "@/components/app-header";
import { Button, Badge } from "@vapor-ui/core";
import { ProfileBadge } from "@/components/profile/ProfileBadge";
import { UpcomingMentoringCard } from "@/components/upcoming-mentoring-card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { createMatching } from "@/lib/api";
import { MentorApplicationList } from "@/components/mentor-application-list";
import { haengbokasioApi } from "@/services/api";
import { ConnectedMentor, MyPageResponse } from "@/services/api/types";

const aiCandidates = [
  { id: "1", name: "윤수민", desc: "카페 · 애월읍", img: "/korean-woman-cafe-owner.jpg" },
  { id: "2", name: "윤수민", desc: "카페 · 애월읍", img: "/korean-man-cafe-owner.jpg" },
  { id: "3", name: "윤수민", desc: "카페 · 애월읍", img: "/korean-woman-business-owner.jpg" },
  { id: "4", name: "윤수민", desc: "카페 · 애월읍", img: "/korean-man-restaurant-owner.jpg" },
];

type Mentor = {
  id: string;
  name: string;
  subtitle: string;
  avatar: string;
  tag: "1인 사장님" | "관광지 사장님" | "도민픽 사장님";
  kakaoId: number;
};

// 더미 데이터는 API 연동으로 교체됨

const FILTERS = ["1인 사장님", "관광지 사장님", "도민픽 사장님"] as const;

export default function MenteeHome() {
  const router = useRouter();
  const [showHeroModal, setShowHeroModal] = useState(false);
  const [activeTab, setActiveTab] = useState("recommendation");
  const [selectedFilter, setSelectedFilter] = useState<(typeof FILTERS)[number]>("1인 사장님");
  const [connectedMentors, setConnectedMentors] = useState<ConnectedMentor[]>([]);
  const [myPageData, setMyPageData] = useState<MyPageResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const filtered = useMemo(() => connectedMentors.filter((m) => {
    // API 데이터에서 tag 정보가 없으므로 businessType으로 필터링
    const businessType = m.businessType;
    if (selectedFilter === "1인 사장님") {
      return businessType === "서비스업" || businessType === "소매업";
    } else if (selectedFilter === "관광지 사장님") {
      return businessType === "숙박업" || businessType === "음식업";
    } else if (selectedFilter === "도민픽 사장님") {
      return businessType === "음식업";
    }
    return true;
  }), [connectedMentors, selectedFilter]);

  // 로컬스토리지에서 현재 로그인된 멘티 kakaoId 불러오기
  const mentiKakaoId = typeof window !== "undefined" ? Number(localStorage.getItem("kakaoId")) : null;

  // 연결된 멘토 리스트와 마이페이지 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      if (!mentiKakaoId) {
        setError("로그인 정보가 없습니다.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        // 멘티가 등록되었는지 확인하기 위해 getMyPage 먼저 호출
        try {
          const myPage = await haengbokasioApi.getMyPage(mentiKakaoId.toString());
          setMyPageData(myPage);
          
          // 마이페이지 데이터가 있으면 연결된 멘토 리스트도 가져오기
          try {
            const mentors = await haengbokasioApi.getConnectedMentors(mentiKakaoId);
            setConnectedMentors(mentors);
          } catch (mentorErr) {
            console.warn("연결된 멘토 리스트 조회 실패:", mentorErr);
            // 멘토 리스트 조회 실패는 에러로 처리하지 않음 (아직 연결된 멘토가 없을 수 있음)
            setConnectedMentors([]);
          }
          
          setError(null);
        } catch (myPageErr) {
          console.warn("마이페이지 조회 실패:", myPageErr);
          // 멘티가 아직 등록되지 않았을 수 있음
          setMyPageData(null);
          setConnectedMentors([]);
          setError("멘티 등록이 필요합니다. 온보딩을 완료해주세요.");
        }
      } catch (err) {
        console.error("데이터 조회 실패:", err);
        setError("데이터를 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    // 컴포넌트 마운트 시에만 실행
    fetchData();
  }, []); // 의존성 배열을 빈 배열로 변경

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
                className="w-[52px] h-[46px] text-[18px] rounded-none bg-transparent shadow-none text-gray-500 data-[state=active]:text-black border-b-2 border-transparent data-[state=active]:border-black"
              >
                추천
              </TabsTrigger>
              <TabsTrigger
                value="list"
                className="w-[52px] h-[46px] text-[18px] rounded-none bg-transparent shadow-none text-gray-500 data-[state=active]:text-black border-b-2 border-transparent data-[state=active]:border-black"
              >
                목록
              </TabsTrigger>
            </TabsList>

            {/* ===== 추천 탭 ===== */}
            <TabsContent value="recommendation">
              <div className="p-4 space-y-[16px]">
                {/* 배너 */}
                <div
                  className="relative w-[343px] h-[94px] mx-auto rounded-[20px] overflow-hidden shadow cursor-pointer"
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
                <section className="w-[343px] mx-auto rounded-[16px] bg-white shadow py-8 px-2">
                  <div className="flex flex-col gap-4 px-4">
                    <div className="inline-flex h-[23px] items-center px-[10px] rounded-full bg-[rgba(135,116,255,0.18)] text-[#8774FF] text-[12px] font-medium w-fit">
                      ai 분석
                    </div>

                    <div className="flex flex-col gap-1">
                      <h2 className="text-[20px] font-semibold text-black">
                        {myPageData?.aiAnalysis ? 
                          JSON.parse(myPageData.aiAnalysis).topStrengthCopy || "AI 분석 결과를 불러오는 중..." :
                          "AI 분석 결과를 불러오는 중..."
                        }
                      </h2>
                      <p className="text-[12px] text-[#767676]">
                        {myPageData?.aiAnalysis ? 
                          JSON.parse(myPageData.aiAnalysis).coachingPoints?.[0] || "분석 중..." :
                          "분석 중..."
                        }
                      </p>
                    </div>

                    <div className="flex flex-col gap-3 pt-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[14px] font-semibold">✨ Ai기반 멘토 추천</span>
                      </div>
                      <div className="grid grid-cols-4 gap-2">
                        {aiCandidates.map((p) => (
                          <ProfileBadge key={p.id} name={p.name} desc={p.desc} img={p.img} />
                        ))}
                      </div>
                    </div>
                  </div>
                </section>

                {/* 멘토 신청 현황 */}
                <section className="w-[343px] mx-auto">
                  {loading ? (
                    <div className="text-center py-4 text-gray-500">로딩 중...</div>
                  ) : error ? (
                    <div className="text-center py-4">
                      <div className="text-red-500 mb-4">{error}</div>
                      <Button
                        onClick={() => router.push('/onboarding')}
                        className="bg-[#FF782A] hover:bg-[#FF782A]/90 text-white px-4 py-2 rounded-lg"
                      >
                        온보딩 완료하기
                      </Button>
                    </div>
                  ) : connectedMentors.length === 0 ? (
                    <div className="text-center py-4 text-gray-500">신청한 멘토가 없습니다.</div>
                  ) : (
                    <MentorApplicationList
                      applications={connectedMentors.map((mentor, index) => ({
                        id: mentor.kakaoId.toString(),
                        name: `멘토 #${mentor.kakaoId}`,
                        job: `${mentor.businessType} · ${mentor.operationPeriod}년차`,
                        avatar: "/korean-man-cafe-owner.jpg", // 기본 아바타 사용
                        status: "waiting" as const, // API에서 상태 정보가 없으므로 기본값 사용
                      }))}
                    />
                  )}
                </section>
              </div>
            </TabsContent>

            {/* ===== 목록 탭 ===== */}
            <TabsContent value="list">
              <div className="p-4 space-y-6">
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
                            "w-[82px] h-[32px] rounded-[14px] text-[10px]",
                            active ? "bg-[#8774FF] text-white" : "bg-[#EDEDED] text-black/70",
                          ].join(" ")}
                        >
                          {f}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <h2 className="text-[16px] font-bold text-left">{selectedFilter}을 소개해드릴게요!</h2>

                <ul className="flex flex-col gap-6">
                  {loading ? (
                    <div className="text-center py-4 text-gray-500">로딩 중...</div>
                  ) : error ? (
                    <div className="text-center py-4 text-red-500">{error}</div>
                  ) : filtered.length === 0 ? (
                    <div className="text-center py-4 text-gray-500">해당 카테고리의 멘토가 없습니다.</div>
                  ) : (
                    filtered.map((m) => (
                      <li key={m.kakaoId} className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-[48px] h-[48px] rounded-full overflow-hidden bg-neutral-200 shrink-0">
                            <img src="/korean-man-cafe-owner.jpg" alt={`멘토 #${m.kakaoId}`} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex flex-col text-left">
                            <p className="text-[18px] font-semibold">멘토 #{m.kakaoId}</p>
                            <p className="text-[14px] text-black/70">{m.businessType} · {m.operationPeriod}년차</p>
                          </div>
                        </div>

                        {/* 신청 버튼 */}
                        <button
                          onClick={async () => {
                            if (!mentiKakaoId) {
                              alert("로그인 정보가 없습니다. 다시 로그인 해주세요.");
                              return;
                            }
                            try {
                              const data = await createMatching(m.kakaoId, mentiKakaoId);
                              console.log("매칭 성공:", data);
                              alert("신청 완료!");
                            } catch (err) {
                              console.error("매칭 실패:", err);
                              alert("신청에 실패했습니다.");
                            }
                          }}
                          className="px-3 py-1 rounded-lg bg-[#FFF2EA] border border-[#FFD5BD] text-[#FF782A] text-sm"
                        >
                          신청하기
                        </button>
                      </li>
                    ))
                  )}
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
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowHeroModal(false)} />
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
                  <img src="/star_banner.png" alt="스타 배너" width={329} height={452} className="rounded-2xl shadow" />

                  <button
                    aria-label="닫기"
                    onClick={() => setShowHeroModal(false)}
                    className="absolute top-7 right-4 z-20 inline-flex h-8 w-8 items-center justify-center rounded-full text-black"
                  >
                    ✕
                  </button>

                  <div className="absolute top-10 left-8 z-10">
                    <div className="px-4 h-7 inline-flex items-center rounded-full bg-[#7B6BFF] text-white text-[12px] font-semibold shadow">
                      AI 분석
                    </div>
                  </div>

                  <div className="absolute top-20 left-8 z-10 w-[260px]">
                    <h2 className="text-[28px] font-bold leading-[34px] text-black text-left">
                      실전 가능한 온라인 홍보 노하우
                    </h2>
                  </div>

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

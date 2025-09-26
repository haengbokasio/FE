"use client";

import { useMemo, useState, useEffect } from "react";
import { AppHeader } from "@/components/app-header";
import { Badge } from "@vapor-ui/core";
import { ProfileBadge } from "@/components/profile/ProfileBadge";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { createMatching } from "@/lib/api";
import { MentorApplicationList } from "@/components/mentor-application-list";
import {
  haengbokasioApi,
  MentiOrderByMonthAvgList,
  MyPageResponse,
  ConnectedMentorList,
} from "@/services/api";

// 난수 생성 함수
const generateRandomNumber = () => Math.floor(Math.random() * 9000) + 1000;

type Mentor = {
  id: string;
  name: string;
  subtitle: string;
  avatar: string;
  tag: "1인 사장님" | "관광지 사장님" | "도민픽 사장님";
  kakaoId: number;
};

// 더미 데이터 (kakaoId 추가)
const mentors: Mentor[] = [
  {
    id: "m1",
    name: "크림커피 #08",
    subtitle: "애월읍 · N년차",
    avatar: "/korean-man-cafe-owner.jpg",
    tag: "1인 사장님",
    kakaoId: 101,
  },
  {
    id: "m2",
    name: "커피 #08",
    subtitle: "카페 · 제주시",
    avatar: "/korean-man-cafe-owner.jpg",
    tag: "관광지 사장님",
    kakaoId: 102,
  },
  {
    id: "m3",
    name: "라떼 #12",
    subtitle: "식당 · 한림읍",
    avatar: "/korean-woman-business-owner.jpg",
    tag: "1인 사장님",
    kakaoId: 103,
  },
  {
    id: "m4",
    name: "크림커피 #08",
    subtitle: "식당 · 한림읍",
    avatar: "/korean-woman-business-owner.jpg",
    tag: "도민픽 사장님",
    kakaoId: 104,
  },
  {
    id: "m5",
    name: "크림커피 #08",
    subtitle: "식당 · 한림읍",
    avatar: "/korean-woman-business-owner.jpg",
    tag: "1인 사장님",
    kakaoId: 105,
  },
];

const FILTERS = ["1인 사장님", "관광지 사장님", "도민픽 사장님"] as const;

export default function MenteeHome() {
  const [showHeroModal, setShowHeroModal] = useState(false);
  const [activeTab, setActiveTab] = useState("recommendation");
  const [selectedFilter, setSelectedFilter] =
    useState<(typeof FILTERS)[number]>("1인 사장님");
  const [aiCandidates, setAiCandidates] = useState<
    Array<{
      id: string;
      name: string;
      desc: string;
      img: string;
      kakaoId: number;
    }>
  >([]);
  const [loading, setLoading] = useState(true);
  const [selectedProfile, setSelectedProfile] = useState<MyPageResponse | null>(
    null
  );
  const [mentorApplications, setMentorApplications] = useState<
    Array<{
      id: string;
      name: string;
      job: string;
      avatar?: string;
      status: "completed" | "waiting" | "rejected";
      kakaoId: number;
    }>
  >([]);
  const [applicationsLoading, setApplicationsLoading] = useState(true);

  // AI 분석 데이터 파싱 헬퍼 함수
  const parseAiAnalysis = (aiAnalysis: string | null) => {
    try {
      return aiAnalysis ? JSON.parse(aiAnalysis) : {};
    } catch (error) {
      console.error("AI 분석 데이터 파싱 오류:", error);
      return {};
    }
  };

  // ProfileBadge 클릭 핸들러
  const handleProfileBadgeClick = async (kakaoId: number) => {
    try {
      console.log("🔍 마이페이지 조회:", kakaoId);
      const profileData = await haengbokasioApi.getMyPage(kakaoId.toString());
      console.log("✅ 마이페이지 데이터:", profileData);

      setSelectedProfile(profileData);
      setShowHeroModal(true);
    } catch (error) {
      console.error("❌ 마이페이지 조회 실패:", error);
    }
  };

  // 매칭 신청 핸들러
  const handleApplyMatching = async () => {
    if (!selectedProfile) return;

    try {
      const mentorKakaoId = localStorage.getItem("kakaoId");
      if (!mentorKakaoId) {
        console.error("❌ 멘토 카카오ID가 없습니다.");
        alert("로그인이 필요합니다.");
        return;
      }

      console.log("🚀 매칭 신청:", {
        mentorKakaoId: parseInt(mentorKakaoId),
        mentiKakaoId: selectedProfile.kakaoId,
      });

      // createMatching(mentorKakaoId, mentiKakaoId) 순서로 호출
      await haengbokasioApi.createMatching(
        parseInt(mentorKakaoId), // 로컬스토리지의 kakaoId (멘토)
        selectedProfile.kakaoId // 선택된 프로필의 kakaoId (멘티)
      );

      console.log("✅ 매칭 신청 성공!");
      alert("매칭 신청이 완료되었습니다!");
      setShowHeroModal(false);
    } catch {
      // console.error("❌ 매칭 신청 실패:", error);
      // alert("매칭 신청에 실패했습니다. 다시 시도해주세요.");
      setShowHeroModal(false);
    }
  };

  // API에서 멘티 데이터 가져오기
  useEffect(() => {
    const fetchMentis = async () => {
      try {
        setLoading(true);
        const mentisData: MentiOrderByMonthAvgList =
          await haengbokasioApi.getMentisOrderByMonthAvg();

        // 상위 4명만 선택해서 변환
        const transformedData = mentisData.slice(0, 4).map((menti) => ({
          id: menti.id.toString(),
          name: `${menti.mainProductService} #${generateRandomNumber()}`,
          desc: `${menti.businessDetail}·${menti.businessAddress}`,
          img: "/mentorIcon.svg",
          kakaoId: menti.kakaoId,
        }));

        setAiCandidates(transformedData);
      } catch (error) {
        console.error("멘티 데이터 로딩 실패:", error);
        // 에러 시 빈 배열로 설정
        setAiCandidates([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMentis();
  }, []);

  // 연결된 멘토 데이터 가져오기
  useEffect(() => {
    const fetchConnectedMentors = async () => {
      try {
        setApplicationsLoading(true);
        const mentiKakaoId = localStorage.getItem("kakaoId");
        if (!mentiKakaoId) {
          console.log("카카오ID가 없어 연결된 멘토를 불러올 수 없습니다.");
          setMentorApplications([]);
          return;
        }

        console.log("🔍 연결된 멘토 조회:", mentiKakaoId);
        const mentorsData: ConnectedMentorList =
          await haengbokasioApi.getConnectedMentors(parseInt(mentiKakaoId));

        console.log("✅ 연결된 멘토 데이터:", mentorsData);

        // API 응답을 MentorApplicationList 형태로 변환
        const transformedApplications = mentorsData.map((mentor) => ({
          id: mentor.id.toString(),
          name: `${mentor.mainProductService} #${generateRandomNumber()}`,
          job: `${mentor.businessDetail}·${mentor.businessAddress}`,
          avatar: "/mentorIcon.svg",
          status: "completed" as const, // API에서 상태 정보가 없으므로 기본값
          kakaoId: mentor.kakaoId,
        }));

        setMentorApplications(transformedApplications);
      } catch (error) {
        console.error("❌ 연결된 멘토 데이터 로딩 실패:", error);
        setMentorApplications([]);
      } finally {
        setApplicationsLoading(false);
      }
    };

    fetchConnectedMentors();
  }, []);

  const filtered = useMemo(
    () => mentors.filter((m) => m.tag === selectedFilter),
    [selectedFilter]
  );

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
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            {/* 상단 탭바 */}
            {/* <TabsList className="h-[56px] pt-4 px-4 flex justify-start gap-0 bg-transparent">
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
            </TabsList> */}

            {/* ===== 추천 탭 ===== */}
            <TabsContent value="recommendation">
              <div className="p-4 space-y-[16px]">
                {/* 배너 */}
                <div
                  className="relative w-[343px] h-[94px] mx-auto rounded-[20px] overflow-hidden shadow cursor-pointer"
                  onClick={() => setShowHeroModal(true)}
                >
                  <img
                    src="/banner2.png"
                    alt="배너"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-5 text-white text-left">
                    <h3 className="text-[18px] font-semibold">
                      나는 어떤 멘티 일까요?
                    </h3>
                    <p className="text-[13px] leading-[18px] opacity-90">
                      장사살랑은 내가 관심있는 분야의 <br /> 멘토들을
                      매칭해드려요!
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
                      <h2 className="text-[20px] leading-[28px] font-semibold text-black">
                        온라인 홍보 경험이 부족해요!
                      </h2>
                      <p className="text-[12px] leading-[15px] tracking-[0.02em] text-[#767676]">
                        현재 SNS 채널을 꾸준히 운영하거나 콘텐츠를 제작한 경험이
                        적어요
                      </p>
                    </div>

                    <div className="flex flex-col gap-3 pt-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[14px] leading-5 font-semibold">
                          ✨ Ai기반 멘토 추천
                        </span>
                      </div>
                      <div className="grid grid-cols-4 gap-2">
                        {loading
                          ? // 로딩 중일 때 스켈레톤 표시
                            Array.from({ length: 4 }).map((_, index) => (
                              <div
                                key={index}
                                className="animate-pulse bg-gray-200 rounded-lg h-20 w-full"
                              />
                            ))
                          : aiCandidates.map((p) => (
                              <ProfileBadge
                                key={p.kakaoId}
                                id={p.kakaoId}
                                name={p.name}
                                desc={p.desc}
                                img={p.img}
                                onClick={handleProfileBadgeClick}
                              />
                            ))}
                      </div>
                    </div>
                  </div>
                </section>

                {/* 멘토 신청 현황 */}
                <section className="w-[343px] mx-auto">
                  {applicationsLoading ? (
                    <div className="animate-pulse bg-gray-200 rounded-lg h-40 w-full" />
                  ) : (
                    <MentorApplicationList
                      applications={mentorApplications}
                      onItemClick={handleProfileBadgeClick}
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
                            "w-[82px] h-[32px] rounded-[2px]",
                            "rounded-[14px] text-[10px] font-large",
                            active
                              ? "bg-[#8774FF] text-white"
                              : "bg-[#EDEDED] text-black/70",
                          ].join(" ")}
                        >
                          {f}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <h2 className="text-[16px] font-bold text-left">
                  {selectedFilter}을 소개해드릴게요!
                </h2>

                <ul className="flex flex-col gap-6">
                  {filtered.map((m) => (
                    <li
                      key={m.id}
                      className="flex items-center justify-between gap-3"
                    >
                      {/* 왼쪽: 아바타 + 정보 */}
                      <div className="flex items-center gap-3">
                        <div className="w-[48px] h-[48px] rounded-full overflow-hidden bg-neutral-200 shrink-0">
                          <img
                            src={m.avatar}
                            alt={m.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex flex-col text-left">
                          <p className="text-[18px] font-semibold leading-6">
                            {m.name}
                          </p>
                          <p className="text-[14px] text-black/70 leading-5">
                            {m.subtitle}
                          </p>
                        </div>
                      </div>

                      {/* 오른쪽: 신청 버튼 */}
                      <button
                        onClick={async () => {
                          try {
                            const data = await createMatching(m.kakaoId, 999); // 로그인한 멘티 ID
                            console.log("매칭 성공:", data);
                            alert("신청 완료!");
                          } catch {
                            // 에러 처리
                          }
                        }}
                        className="px-3 py-1 rounded-lg bg-[#FFF2EA] border border-[#FFD5BD] text-[#FF782A] text-sm"
                      >
                        신청하기
                      </button>
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
              <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={() => setShowHeroModal(false)}
              />
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
                    className="rounded-2xl shadow"
                  />

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

                  {/* 제목 */}
                  <div className="absolute top-20 left-8 z-10 w-[343x]">
                    <h2 className="text-[28px] font-bold leading-[34px] text-black break-words text-left">
                      {selectedProfile
                        ? parseAiAnalysis(selectedProfile.aiAnalysis)
                            .topStrengthCopy || "실전 가능한 온라인 홍보 노하우"
                        : "실전 가능한 온라인 홍보 노하우"}
                    </h2>
                  </div>

                  {/* 하단 말풍선 스택 */}
                  <div className="absolute left-8 bottom-20 z-10 flex flex-col gap-3 max-w-[260px]">
                    {(selectedProfile
                      ? parseAiAnalysis(selectedProfile.aiAnalysis)
                          .coachingPoints || [
                          "호기심 많은 멘티",
                          "SNS 초보",
                          "콘텐츠 실습",
                        ]
                      : ["호기심 많은 멘티", "SNS 초보", "콘텐츠 실습"]
                    ).map((t: string) => (
                      <Badge
                        key={t}
                        size="lg"
                        color="primary"
                        shape="square"
                        className="relative !bg-transparent !border-none overflow-hidden"
                      >
                        <span
                          aria-hidden
                          className="absolute inset-0 rounded-[inherit] bg-[#7B6BFF] opacity-40"
                        />
                        <span className="relative z-10 text-black">{t}</span>
                      </Badge>
                    ))}
                  </div>

                  {/* 신청하기 버튼 */}
                  <div className="absolute left-8 right-8 bottom-8 z-10">
                    <button
                      onClick={handleApplyMatching}
                      className="w-full h-12 bg-[#7B6BFF] text-white font-semibold rounded-xl shadow-lg hover:bg-[#6B5BEF] transition-colors"
                    >
                      신청하기
                    </button>
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

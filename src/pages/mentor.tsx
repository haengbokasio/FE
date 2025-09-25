"use client";

import { useEffect, useState } from "react";
import { AppHeader } from "@/components/app-header";
import { UpcomingMentoringCard } from "@/components/upcoming-mentoring-card";
import { MentorWaitingCard } from "@/components/mentor-waiting-card";
import { MentorProfileCard } from "@/components/mentor-profile-card";
import { Badge } from "@vapor-ui/core";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { haengbokasioApi } from "@/services/api/haengbokasio";
import type { ConnectedMentorList } from "@/services/api/haengbokasio";

type Mentee = {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
};

export default function MentorHome() {
  const [activeTab, setActiveTab] = useState("recommendation");
  const [showHeroModal, setShowHeroModal] = useState(false);

  const [waitingMentees, setWaitingMentees] = useState<Mentee[]>([]);
  const [connectedMentors, setConnectedMentors] = useState<ConnectedMentorList>([]);

  // ✅ 로그인한 사용자 kakaoId 가져오기
  const myKakaoId =
    typeof window !== "undefined" ? Number(localStorage.getItem("kakaoId")) : null;

  useEffect(() => {
    if (!myKakaoId) return;

    haengbokasioApi
      .getConnectedMentors(myKakaoId)
      .then((res) => {
        setConnectedMentors(res || []);
        // TODO: waitingMentees도 실제 API로 교체
        setWaitingMentees([]);
      })
      .catch(console.error);
  }, [myKakaoId]);

  const handleAccept = async (menteeId: string) => {
    try {
      await haengbokasioApi.acceptMentee(myKakaoId!, menteeId);
      setWaitingMentees((prev) => prev.filter((m) => m.id !== menteeId));
      alert("멘티 수락 완료!");
    } catch (err) {
      console.error(err);
      alert("멘티 수락 실패");
    }
  };

  const handleReject = async (menteeId: string) => {
    try {
      await haengbokasioApi.rejectMentee(myKakaoId!, menteeId);
      setWaitingMentees((prev) => prev.filter((m) => m.id !== menteeId));
      alert("멘티 거절 완료!");
    } catch (err) {
      console.error(err);
      alert("멘티 거절 실패");
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center">
      <div className="relative w-[375px] min-h-[812px]">
        {/* 헤더 */}
        <div className="sticky top-0 z-50 bg-white">
          <AppHeader />
        </div>

        {activeTab === "recommendation" ? (
          <div className="flex flex-col gap-[16px] mt-[32px]">
            {/* 배너 */}
            <div
              className="relative w-full h-[176px] mx-auto rounded-[20px] overflow-hidden shadow cursor-pointer"
              onClick={() => setShowHeroModal(true)}
            >
              <img src="/banner2.png" alt="배너" className="w-full h-full object-cover" />
              <div className="absolute top-[32px] left-5 flex flex-col gap-1 text-left text-white drop-shadow">
                <p className="text-[12px] font-semibold">✨ AI 강점 분석</p>
                <h3 className="text-[18px] font-semibold">실전 가능한 온라인</h3>
                <h3 className="text-[18px] font-semibold">홍보 노하우</h3>
                <div className="mt-1 flex gap-2 flex-nowrap">
                  <Badge className="bg-white/25 text-white backdrop-blur-sm">#성공형</Badge>
                  <Badge className="bg-white/25 text-white backdrop-blur-sm">#성공형</Badge>
                  <Badge className="bg-white/25 text-white backdrop-blur-sm">#성공형</Badge>
                </div>
              </div>
            </div>

            {/* 연결된 멘토 리스트 */}
            {connectedMentors.length > 0 && (
              <Card className="rounded-2xl shadow border-0">
                <CardHeader>
                  <CardTitle className="text-[18px] font-semibold">연결된 멘토</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  {connectedMentors.map((m) => (
                    <MentorProfileCard
                      key={m.kakaoId}
                      name={m.businessDetail || m.mainProductService || "이름 없음"}
                      job={`${m.businessAddress} · ${m.operationPeriod}년차`}
                      avatar="/placeholder.svg"
                      mentorKakaoId={m.kakaoId}
                      mentiKakaoId={myKakaoId!} // ✅ 현재 로그인한 사용자 ID 전달
                    />
                  ))}
                </CardContent>
              </Card>
            )}

            {/* 멘토링을 기다리고 있어요 카드 */}
            {waitingMentees.length > 0 && (
              <Card className="rounded-2xl shadow border-0">
                <CardHeader>
                  <CardTitle className="text-[18px] font-semibold">
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
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {connectedMentors.map((m) => (
              <MentorProfileCard
                key={m.kakaoId}
                name={m.businessDetail || m.mainProductService || "이름 없음"}
                job={`${m.businessAddress} · ${m.operationPeriod}년차`}
                avatar="/placeholder.svg"
                mentorKakaoId={m.kakaoId}
                mentiKakaoId={myKakaoId!}
              />
            ))}
          </div>
        )}

        {/* 모달 */}
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

                  {/* 닫기 버튼 */}
                  <button
                    aria-label="닫기"
                    onClick={() => setShowHeroModal(false)}
                    className="absolute top-5 right-4 z-20 inline-flex h-8 w-8 items-center justify-center rounded-full text-black"
                  >
                    ✕
                  </button>

                  {/* 상단 뱃지 */}
                  <div className="absolute top-10 left-8 z-10">
                    <div className="px-4 h-7 inline-flex items-center rounded-full bg-[#7B6BFF] text-white text-[12px] font-semibold shadow">
                      AI 분석
                    </div>
                  </div>

                  {/* 중간 큰 제목 */}
                  <div className="absolute top-20 left-8 z-10 w-[260px]">
                    <h2 className="text-[28px] font-bold leading-[34px] text-black text-left">
                      실전 가능한 온라인 홍보 노하우
                    </h2>
                  </div>

                  {/* 하단 말풍선 스택 */}
                  <div className="absolute left-8 bottom-12 z-10 flex flex-col gap-3 max-w-[260px]">
                    {[
                      "호기심이 많아 새로운 시도를 즐기나요?",
                      "함께 성장하는 걸 중요시하나요?",
                      "실패 속에서 배우는 걸 두려워하지 않나요?",
                    ].map((text) => (
                      <Badge
                        key={text}
                        size="lg"
                        color="primary"
                        shape="square"
                        className="relative !bg-transparent !border-none overflow-hidden"
                      >
                        <span
                          aria-hidden
                          className="absolute inset-0 rounded-[inherit] bg-[#7B6BFF] opacity-40"
                        />
                        <span className="relative z-10 text-black">{text}</span>
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

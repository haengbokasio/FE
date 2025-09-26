"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { AppHeader } from "@/components/app-header"; // 기존 헤더 사용
import { Badge } from "@vapor-ui/core";
import { haengbokasioApi } from "@/services/api";
import { ConnectedMenti } from "@/services/api/types";

// 더미 데이터는 API 연동으로 교체됨

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex h-[26px] items-center px-[12px] rounded-full bg-[rgba(135,116,255,0.18)] text-[#8774FF] text-[12px] font-medium shadow-[0_0_12px_9px_rgba(0,0,0,0.05)]">
      {children}
    </span>
  );
}

function MentoringItem({ item }: { item: ConnectedMenti }) {
  return (
    <li className="flex items-center gap-4 py-5">
      <div className="w-[56px] h-[56px] rounded-full overflow-hidden bg-gray-200 shrink-0">
        <Image src="/korean-woman-cafe-owner.jpg" alt="멘티 아바타" width={49} height={49} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 min-w-0 text-left">
        <p className="text-[16px] leading-[28px] font-semibold text-black truncate">멘티 #{item.kakaoId}</p>
        <p className="text-[14px] leading-[24px] text-black/60 truncate">{item.businessType} · {item.operationPeriod}년차</p>
      </div>
    </li>
  );
}

export default function MentoringPage() {
  const [connectedMentis, setConnectedMentis] = useState<ConnectedMenti[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 현재 로그인된 멘토의 kakaoId 가져오기
  const mentorKakaoId = typeof window !== "undefined" ? Number(localStorage.getItem("kakaoId")) : null;

  // 연결된 멘티 리스트 가져오기
  useEffect(() => {
    const fetchConnectedMentis = async () => {
      if (!mentorKakaoId) {
        setError("로그인 정보가 없습니다.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const mentis = await haengbokasioApi.getConnectedMentis(mentorKakaoId);
        setConnectedMentis(mentis);
        setError(null);
      } catch (err) {
        console.warn("연결된 멘티 리스트 조회 실패:", err);
        setConnectedMentis([]);
        setError("멘토 등록이 필요하거나 아직 연결된 멘티가 없습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchConnectedMentis();
  }, []);

  return (
    <main className="min-h-screen">
      {/* 상단 고정 헤더 */}
      <AppHeader />

      {/* 컨텐츠 래퍼 */}
      <div className="mx-auto w-full px-4 pb-24">
        {/* 탭 영역 (추천 강조 바) */}
        <div className="pt-5">
          <div className="w-fit border-b-4 border-black pb-2">
            <h2 className="text-[18px] leading-[28px] font-bold">추천</h2>
          </div>
        </div>

        {/* 상단 카드 배너 */}
        <section className="relative mt-5 rounded-[22px] bg-white p-6 overflow-hidden">
          <div className="flex flex-col gap-3 relative z-10">
            <Badge
            color="primary"
            size="sm"
            shape="pill"
            className="w-fit"
            >
            함께한 멘티들
            </Badge>
            <h3 className="text-[20px] leading-[36px] font-semibold text-black">
              {connectedMentis.length}명의 멘티님과 함께했어요
            </h3>
            <p className="text-[12px] leading-[24px] text-black/70">
              작은 대화가 큰 변화를 만들어낸 시간들이었어요
            </p>
          </div>

          {/* 구름/일러스트 배경 이미지 (예: /cloud-banner.png) */}
          <div className="absolute left-[-1px] top-[-10px]">
            <Image
              src="/star_banner2.png"
              alt="구름 배너"
              width={343}
              height={189}
              className="opacity-100 select-none pointer-events-none"
            />
          </div>
        </section>

        {/* 진행한 멘토링 리스트 */}
        <section className="mt-10">
          <h4 className="text-[18px] leading-[28px] font-semibold mb-2">진행한 멘토링</h4>
          {loading ? (
            <div className="text-center py-8 text-gray-500">로딩 중...</div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">{error}</div>
          ) : connectedMentis.length === 0 ? (
            <div className="text-center py-8 text-gray-500">아직 진행한 멘토링이 없습니다.</div>
          ) : (
            <ul className="divide-y divide-black/10">
              {connectedMentis.map((menti) => (
                <MentoringItem key={menti.kakaoId} item={menti} />
              ))}
            </ul>
          )}
        </section>

        {/* 하단 여백 */}
        <div className="h-12" />
      </div>

      {/* 고정 플로팅 네비게이션이나 CTA가 필요하면 여기에 */}
    </main>
  );
}

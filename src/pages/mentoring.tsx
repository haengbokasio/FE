"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { AppHeader } from "@/components/app-header"; // 기존 헤더 사용
import { Badge } from "@vapor-ui/core";
import { haengbokasioApi, ConnectedMentorList } from "@/services/api";

// 난수 생성 함수
const generateRandomNumber = () => Math.floor(Math.random() * 9000) + 1000;

function MentoringItem({
  item,
}: {
  item: { id: string; title: string; meta: string; avatar: string };
}) {
  return (
    <li className="flex items-center gap-4 py-5">
      <div className="w-[56px] h-[56px] rounded-full overflow-hidden bg-gray-200 shrink-0">
        <Image
          src={item.avatar}
          alt="멘토 아바타"
          width={49}
          height={49}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 min-w-0 text-left">
        <p className="text-[16px] leading-[28px] font-semibold text-black truncate">
          {item.title}
        </p>
        <p className="text-[14px] leading-[24px] text-black/60 truncate">
          {item.meta}
        </p>
      </div>
    </li>
  );
}

export default function MentoringPage() {
  const [mentoringList, setMentoringList] = useState<
    Array<{
      id: string;
      title: string;
      meta: string;
      avatar: string;
    }>
  >([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  // 거절된 멘토링 데이터 가져오기
  useEffect(() => {
    const fetchRejectedMentoring = async () => {
      try {
        setLoading(true);
        const mentiKakaoId = localStorage.getItem("kakaoId");
        if (!mentiKakaoId) {
          console.log("카카오ID가 없어 멘토링 데이터를 불러올 수 없습니다.");
          setMentoringList([]);
          return;
        }

        console.log("🔍 거절된 멘토링 조회:", mentiKakaoId);
        const mentorsData: ConnectedMentorList =
          await haengbokasioApi.getConnectedMentors(parseInt(mentiKakaoId), [
            "REJECT",
          ]);

        console.log("✅ 거절된 멘토링 데이터:", mentorsData);

        // API 응답을 MentoringItem 형태로 변환
        const transformedMentoring = mentorsData.map((mentor) => ({
          id: mentor.id.toString(),
          title: `${mentor.mainProductService} #${generateRandomNumber()}`,
          meta: `${mentor.businessDetail}·${mentor.businessAddress}`,
          avatar: "/mentorIcon.svg",
        }));

        setMentoringList(transformedMentoring);
        setTotalCount(mentorsData.length);
      } catch (error) {
        console.error("❌ 멘토링 데이터 로딩 실패:", error);
        setMentoringList([]);
        setTotalCount(0);
      } finally {
        setLoading(false);
      }
    };

    fetchRejectedMentoring();
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
            <Badge color="primary" size="sm" shape="pill" className="w-fit">
              함께한 멘티들
            </Badge>
            <h3 className="text-[20px] leading-[36px] font-semibold text-black">
              {totalCount}명의 멘티님과 함께했어요
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
          <h4 className="text-[18px] leading-[28px] font-semibold mb-2">
            진행한 멘토링
          </h4>
          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="animate-pulse flex items-center gap-4 py-5"
                >
                  <div className="w-[56px] h-[56px] rounded-full bg-gray-200" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : mentoringList.length > 0 ? (
            <ul className="divide-y divide-black/10">
              {mentoringList.map((m) => (
                <MentoringItem key={m.id} item={m} />
              ))}
            </ul>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>진행한 멘토링이 없습니다.</p>
            </div>
          )}
        </section>

        {/* 하단 여백 */}
        <div className="h-12" />
      </div>

      {/* 고정 플로팅 네비게이션이나 CTA가 필요하면 여기에 */}
    </main>
  );
}

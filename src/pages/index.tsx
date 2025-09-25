import { Button } from "@vapor-ui/core";
import { useRouter } from "next/router";
import Image from "next/image";
import KakaoLogin from "@/features/login/KakaoLogin";

export default function SplashScreen() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/onboarding");
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="flex flex-col items-center justify-center min-h-screen px-4 relative z-10">
        <div className="flex flex-col items-center max-w-sm w-full">
          {/* 상단 제목 영역 */}
          <div className="text-center mb-10 mt-[94px]">
            <p className="text-sm font-semibold text-black mb-2.5 leading-[16.7px]">
              제주도 소상 공인 멘토링 플랫폼
            </p>
            <h1
              className="text-[40px] font-semibold text-black leading-[42.4px]"
              style={{ fontFamily: "Hakgyoansim Dunggeunmiso OTF, sans-serif" }}
            >
              장사살랑
            </h1>
          </div>

          {/* 중앙 일러스트 */}
          <div className="">
            <Image
              src="/mainIcons.svg"
              alt="main illustration"
              width={288}
              height={252}
              className="w-[288px] h-[252px]"
            />
          </div>

          {/* 하단 버튼 */}
          <div className="w-full px-4 pb-[30px]">
            <KakaoLogin />
            <Button
              onClick={handleGetStarted}
              size="lg"
              className="w-full h-12 bg-[#FF782A] hover:bg-[#FF782A]/90 text-white font-medium rounded-xl"
            >
              시작하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

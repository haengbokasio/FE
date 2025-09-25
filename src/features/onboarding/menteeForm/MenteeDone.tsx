import { Button, VStack } from "@vapor-ui/core";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const MenteeDone = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [loadingText, setLoadingText] = useState("AI가 분석 중입니다");

  useEffect(() => {
    // 로딩 텍스트 애니메이션
    const textInterval = setInterval(() => {
      setLoadingText((prev) => {
        if (prev === "AI가 분석 중입니다") return "AI가 분석 중입니다.";
        if (prev === "AI가 분석 중입니다.") return "AI가 분석 중입니다..";
        if (prev === "AI가 분석 중입니다..") return "AI가 분석 중입니다...";
        return "AI가 분석 중입니다";
      });
    }, 500);

    // sessionStorage 상태 확인
    const checkAnalysisStatus = () => {
      const status = sessionStorage.getItem("aiAnalysisStatus");
      if (status === "completed" || status === "error") {
        setIsLoading(false);
        clearInterval(textInterval);
        clearInterval(statusInterval);
      }
    };

    const statusInterval = setInterval(checkAnalysisStatus, 1000);

    // 초기 확인
    checkAnalysisStatus();

    return () => {
      clearInterval(textInterval);
      clearInterval(statusInterval);
    };
  }, []);

  const handleConfirm = () => {
    router.push("/home");
  };

  return (
    <VStack className="pt-[49px] pb-[100px]">
      <div>
        <div>
          <h2 className="text-2xl font-semibold text-black leading-[32px] -tracking-[0.24px] mb-1 font-pretendard">
            {isLoading ? "분석 중이에요 ... " : "환영합니다 멘티님!"}
          </h2>
          <p className="text-sm text-[#767676] leading-[20px] tracking-[0.14px] font-pretendard">
            {isLoading ? loadingText : "멘토님이 멘티님을 기다리고 있어요!"}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center pt-[112px]">
        <div
          className={`transition-all duration-1000 ${
            isLoading
              ? "animate-pulse scale-105 transform rotate-2"
              : "scale-100 transform rotate-0"
          }`}
        >
          <Image
            src="/mainIcons.svg"
            alt="mentee-done"
            width={239}
            height={239}
            className={`transition-transform duration-2000 ${
              isLoading ? "animate-bounce" : ""
            }`}
          />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 pb-8">
        <div className="w-full max-w-[343px] mx-auto">
          <Button
            onClick={handleConfirm}
            disabled={isLoading}
            className={`w-full h-12 font-medium rounded-xl transition-all duration-200 ${
              isLoading
                ? "bg-[#ECECEC] text-[#393939] cursor-not-allowed"
                : "bg-[#FF782A] hover:bg-[#FF782A]/90 text-white"
            }`}
            size="lg"
          >
            확인했어요!
          </Button>
        </div>
      </div>
    </VStack>
  );
};

export default MenteeDone;

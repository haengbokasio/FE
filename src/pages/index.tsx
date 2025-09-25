import { Button, VStack } from "@vapor-ui/core";
import { useRouter } from "next/router";
import { Geist } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export default function SplashScreen() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/onboarding");
  };

  return (
    <div className={`${geistSans.className} min-h-screen`}>
      <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <VStack className="items-center gap-12 max-w-sm w-full">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              우리 서비스 이름~
            </h1>
          </div>

          {/* 일러스트 또는 이미지 영역 */}
          <div className="w-48 h-48 bg-primary/10 rounded-full flex items-center justify-center">
            <div className="text-6xl">😊</div>
          </div>

          <VStack className="gap-4 w-full">
            <Button
              onClick={handleGetStarted}
              variant="outline"
              size="lg"
              className="w-full"
            >
              시작하기
            </Button>
          </VStack>
        </VStack>
      </div>
    </div>
  );
}

import { Button, VStack } from "@vapor-ui/core";
import { useRouter } from "next/router";

const MentorDone = () => {
  const router = useRouter();

  const handleConfirm = () => {
    router.push("/home");
  };

  return (
    <VStack className="pt-[53px] pb-[100px]">
      <div>
        <div className="w-[239px]">
          <h2 className="text-2xl font-semibold text-black leading-[32px] -tracking-[0.24px] mb-1 font-pretendard">
            멘토가 되었어요
          </h2>
          <p className="text-sm text-[#767676] leading-[20px] tracking-[0.14px] font-pretendard">
            도움을 기다리고 있는 멘티를 찾으러 갈까요
          </p>
        </div>
      </div>

      <div>
        <img src="/images/onboarding/mentor-done.png" alt="mentor-done" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 pb-8 bg-white">
        <div className="w-full max-w-[343px] mx-auto">
          <Button
            onClick={handleConfirm}
            className="w-full h-12 bg-[#FF782A] hover:bg-[#FF782A]/90 text-white font-medium rounded-xl transition-all duration-200"
            size="lg"
          >
            확인했어요!
          </Button>
        </div>
      </div>
    </VStack>
  );
};

export default MentorDone;

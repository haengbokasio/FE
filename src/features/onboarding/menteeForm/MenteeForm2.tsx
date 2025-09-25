import React, { Dispatch, SetStateAction } from "react";
import { Button, VStack } from "@vapor-ui/core";

import { OnboardingData } from "../../../types/onboarding";

interface MenteeForm2Props {
  data: OnboardingData;
  setData: Dispatch<SetStateAction<OnboardingData>>;
}

const MenteeForm2 = ({ data, setData }: MenteeForm2Props) => (
  <VStack className="gap-8">
    <div className="text-center">
      <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl shadow-lg">
        ✨
      </div>
      <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
        어떤 분야를 배우고 싶나요?
      </h2>
      <p className="text-gray-600 text-lg">관심 있는 분야를 선택해주세요</p>
    </div>
    <div className="grid grid-cols-1 gap-4 w-full">
      {[
        "개발/프로그래밍 배우기",
        "디자인 스킬 향상",
        "마케팅 전략 학습",
        "창업/사업 노하우",
        "커리어 성장 방법",
      ].map((goal) => (
        <Button
          key={goal}
          variant={data.goal === goal ? undefined : "outline"}
          onClick={() => setData((prev) => ({ ...prev, goal }))}
          size="lg"
          className={`h-14 rounded-xl font-medium transition-all duration-200 ${
            data.goal === goal
              ? "bg-gradient-to-r from-green-500 to-blue-600 text-white shadow-lg hover:shadow-xl"
              : "border-2 border-gray-200 hover:border-green-400 hover:bg-green-50"
          }`}
        >
          {goal}
        </Button>
      ))}
    </div>
  </VStack>
);

export default MenteeForm2;

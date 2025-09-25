import { Button } from "@vapor-ui/core";
import { useRouter } from "next/router";
import { useState } from "react";
import MenteeDone from "../features/onboarding/menteeForm/MenteeDone";
import MenteeForm1 from "../features/onboarding/menteeForm/MenteeForm1";
import MentorDone from "../features/onboarding/mentorForm/MentorDone";
import MentorForm1 from "../features/onboarding/mentorForm/MentorForm1";
import MentorForm2 from "../features/onboarding/mentorForm/MentorForm2";
import MentorMentee from "../features/onboarding/MentorMentee";
import { OnboardingData } from "../types/onboarding";

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState("role-selection"); // role-selection, mentor-1, mentor-2, mentor-done, mentee-1, mentee-done
  const [data, setData] = useState<OnboardingData>({
    role: "",
    businessRegistrationNumber: "",
    name: "",
    age: "",
    interests: [],
    goal: "",
    phone: "",
    email: "",
    experience: "",
    certificate: "",
    businessRegistration: false,
    salesProof: false,
  });

  const handleRoleSelect = (role: string) => {
    setData((prev) => ({ ...prev, role }));
  };

  const handleStartFunnel = () => {
    if (data.role === "멘토") {
      setCurrentStep("mentor-1");
    } else if (data.role === "멘티") {
      setCurrentStep("mentee-1");
    }
  };

  const handleNext = () => {
    switch (currentStep) {
      case "mentor-1":
        setCurrentStep("mentor-2");
        break;
      case "mentor-2":
        setCurrentStep("mentor-done");
        break;
      case "mentee-1":
        setCurrentStep("mentee-done");
        break;
      case "mentor-done":
      case "mentee-done":
        router.push("/home");
        break;
    }
  };

  const handleBack = () => {
    switch (currentStep) {
      case "role-selection":
        router.push("/");
        break;
      case "mentor-1":
      case "mentee-1":
        setCurrentStep("role-selection");
        setData((prev) => ({ ...prev, role: "" }));
        break;
      case "mentor-2":
        setCurrentStep("mentor-1");
        break;
      case "mentor-done":
        setCurrentStep("mentor-2");
        break;
      case "mentee-done":
        setCurrentStep("mentee-1");
        break;
    }
  };

  const getProgressSteps = () => {
    if (currentStep === "role-selection") {
      return {
        current: 1,
        total: data.role === "멘토" ? 3 : data.role === "멘티" ? 2 : 3,
      };
    }
    if (currentStep.startsWith("mentor")) {
      if (currentStep === "mentor-done") {
        return null;
      }
      const step =
        currentStep === "mentor-1" ? 2 : currentStep === "mentor-2" ? 3 : 3;
      return { current: step, total: 3 };
    }
    if (currentStep.startsWith("mentee")) {
      if (currentStep === "mentee-done") {
        return null;
      }
      const step = currentStep === "mentee-1" ? 2 : 2;
      return { current: step, total: 2 };
    }
    return { current: 1, total: 3 };
  };

  const renderStep = () => {
    switch (currentStep) {
      case "role-selection":
        return <MentorMentee data={data} onRoleSelect={handleRoleSelect} />;

      case "mentor-1":
        return <MentorForm1 data={data} setData={setData} />;
      case "mentor-2":
        return <MentorForm2 onNext={handleNext} onBack={handleBack} />;
      case "mentor-done":
        return <MentorDone />;
      case "mentee-1":
        return <MenteeForm1 onNext={handleNext} />;
      case "mentee-done":
        return <MenteeDone />;
      default:
        return null;
    }
  };

  const progressSteps = getProgressSteps();

  return (
    <div className="min-h-screen relative">
      <div className="flex flex-col min-h-screen max-w-sm mx-auto">
        {progressSteps && (
          <div className="px-4 pt-[74px]">
            <div className="flex items-center gap-2">
              {Array.from({ length: progressSteps.total }, (_, index) => (
                <div
                  key={index}
                  className={`${
                    index === progressSteps.current - 1
                      ? "w-6 bg-black"
                      : "w-1 bg-gray-300"
                  } h-1 rounded-full transition-all duration-300`}
                />
              ))}
            </div>
          </div>
        )}

        <div className="flex-1 px-4 relative">
          {renderStep()}

          {/* 역할 선택 화면 버튼 - 하단 고정 */}
          {currentStep === "role-selection" && data.role && (
            <div className="absolute bottom-0 left-0 right-0 p-4 pb-8 border-t border-gray-100">
              <div className="flex justify-between items-center gap-[6px] w-full max-w-[343px] mx-auto">
                <Button
                  onClick={handleBack}
                  className="w-[124px] h-12 bg-[#393939] hover:bg-[#393939]/90 text-white font-medium rounded-xl transition-all duration-200"
                  size="lg"
                >
                  뒤로가기
                </Button>
                <Button
                  onClick={handleStartFunnel}
                  className="w-[213px] h-12 bg-[#ff782a] hover:bg-[#ff782a]/90 text-white font-medium rounded-xl transition-all duration-200"
                  color="primary"
                  size="lg"
                >
                  다음
                </Button>
              </div>
            </div>
          )}

          {/* MentorForm1 버튼 - 하단 고정 */}
          {currentStep === "mentor-1" && (
            <div className="absolute bottom-0 left-0 right-0 p-4 pb-8">
              <div className="flex justify-between items-center gap-[6px] w-full max-w-[343px] mx-auto">
                <Button
                  onClick={handleBack}
                  className="w-[124px] h-12 bg-[#393939] hover:bg-[#393939]/90 text-white font-medium rounded-xl transition-all duration-200"
                  size="lg"
                >
                  뒤로가기
                </Button>
                <Button
                  onClick={handleNext}
                  className="w-[213px] h-12 text-white font-medium rounded-xl transition-all duration-200"
                  style={{
                    backgroundColor:
                      !(
                        data.phone && data.phone.replace(/\D/g, "").length >= 10
                      ) ||
                      !data.businessRegistration ||
                      !data.salesProof
                        ? "#ECECEC"
                        : "#FF782A",
                    color:
                      !(
                        data.phone && data.phone.replace(/\D/g, "").length >= 10
                      ) ||
                      !data.businessRegistration ||
                      !data.salesProof
                        ? "#393939"
                        : "#FFFFFF",
                  }}
                  size="lg"
                  disabled={
                    !(
                      data.phone && data.phone.replace(/\D/g, "").length >= 10
                    ) ||
                    !data.businessRegistration ||
                    !data.salesProof
                  }
                >
                  다음
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import { Card } from "@vapor-ui/core";
import { OnboardingData } from "../../types/onboarding";
import Image from "next/image";

interface MentorMenteeProps {
  data: OnboardingData;
  onRoleSelect: (role: string) => void;
}

const MentorMentee = ({ data, onRoleSelect }: MentorMenteeProps) => {
  return (
    <div className="pt-[49px] pb-[100px]">
      <div className="mb-[6px]">
        <h2 className="text-2xl font-semibold text-black leading-[32px] -tracking-[0.24px]">
          {data.role === "멘토" ? (
            <>
              멘토님,
              <br />
              환영합니다!
            </>
          ) : (
            <>
              멘티로
              <br />
              시작해볼까요?
            </>
          )}
        </h2>
      </div>

      <div className="mb-[49px]">
        <p className="text-sm text-[#767676] leading-[20px] tracking-[0.14px]">
          {data.role === "멘토"
            ? "초보 사장님들이 멘토님을 기다리고 있어요."
            : "선택한 역할에 따라 맞춤 서비스를 제공해드려요"}
        </p>
      </div>

      <div className="flex gap-[9px] ml-1">
        <Card.Root
          className="relative w-[163px] h-[163px] cursor-pointer transition-all duration-200"
          style={{
            boxShadow:
              data.role === "멘토"
                ? "0px 0px 19px 11px rgba(255, 213, 189, 1)"
                : "0px 0px 18px 11px rgba(0, 0, 0, 0.05)",
            borderRadius: "16px",
            border: "none",
            padding: 0,
          }}
          onClick={() => onRoleSelect("멘토")}
        >
          <Card.Footer className="absolute bottom-3 left-4 right-4 p-0 bg-transparent border-none">
            <div>
              <Image
                src="/mentorIcon.svg"
                alt="mentor"
                width={34}
                height={34}
              />
              <h3 className="text-lg font-semibold text-black mb-0.5 leading-[26px]">
                멘토
              </h3>
              <p className="text-xs text-[#767676] leading-[15px] tracking-[0.24px]">
                어려움을 겪고 있는 후배
                <br />
                사장님에게 조언을 줄래요
              </p>
            </div>
          </Card.Footer>
        </Card.Root>

        {/* 멘티 카드 */}
        <Card.Root
          className="relative w-[163px] h-[163px] cursor-pointer transition-all duration-200"
          style={{
            boxShadow:
              data.role === "멘티"
                ? "0px 0px 19px 11px rgba(255, 213, 189, 1)"
                : "0px 0px 18px 11px rgba(0, 0, 0, 0.05)",
            borderRadius: "16px",
            border: "none",
            padding: 0,
          }}
          onClick={() => onRoleSelect("멘티")}
        >
          <Card.Footer className="absolute bottom-3 left-4 right-4 p-0 bg-transparent border-none">
            <div>
              <Image
                src="/menteeIcon.svg"
                alt="mentee"
                width={34}
                height={34}
              />
              <h3 className="text-lg font-semibold text-black mb-0.5 leading-[26px]">
                멘티
              </h3>
              <p className="text-xs text-[#767676] leading-[15px] tracking-[0.24px]">
                선배 사장님에게 조언을
                <br />
                받고 싶어요
              </p>
            </div>
          </Card.Footer>
        </Card.Root>
      </div>
    </div>
  );
};

export default MentorMentee;

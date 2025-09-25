import { Card } from "@vapor-ui/core";
import { OnboardingData } from "../../types/onboarding";

interface MentorMenteeProps {
  data: OnboardingData;
  onRoleSelect: (role: string) => void;
}

const MentorMentee = ({ data, onRoleSelect }: MentorMenteeProps) => {
  return (
    <div className="pt-[53px] pb-[100px]">
      <div className="mb-[6px]">
        <h2 className="text-2xl font-semibold text-black leading-[32px] -tracking-[0.24px]">
          {data.role ? (
            <>
              {data.role}로
              <br />
              시작해볼까요?
            </>
          ) : (
            <>
              반가워요 :)
              <br />
              어떤 역할로 시작하시나요?
            </>
          )}
        </h2>
      </div>

      <div className="mb-[49px]">
        <p className="text-sm text-[#767676] leading-[20px] tracking-[0.14px]">
          선택한 역할에 따라 맞춤 서비스를 제공해드려요
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
          <Card.Body className="relative w-full h-full p-0">
            {/* 장식적 요소들 */}
            <div className="absolute top-[46px] right-[46px] w-[52px] h-[52px]">
              <div
                className="w-full h-full rounded-full"
                style={{
                  background:
                    "linear-gradient(136deg, rgba(221, 255, 208, 1) 12%, rgba(98, 183, 65, 1) 85%)",
                  boxShadow:
                    "inset 0.83px 0.83px 0.83px 0px rgba(255, 246, 174, 0.25), inset -1.04px -1.04px 1.24px 0px rgba(20, 160, 87, 0.25)",
                }}
              >
                <div className="absolute top-[21px] left-[20.61px] w-[2.6px] h-[3.12px] bg-[#22952B] rounded-full"></div>
                <div className="absolute top-[21px] left-[26.45px] w-[2.6px] h-[3.12px] bg-[#22952B] rounded-full"></div>
                <div className="absolute top-[22.17px] left-[22.17px] w-[0.78px] h-[0.91px] bg-white/80 rounded-full"></div>
                <div className="absolute top-[22.17px] left-[28.01px] w-[0.78px] h-[0.91px] bg-white/80 rounded-full"></div>
              </div>
            </div>
            <div className="absolute bottom-[57px] left-4 w-[34px] h-[29px]">
              <div
                className="w-full h-full rounded-full"
                style={{
                  background:
                    "linear-gradient(137deg, rgba(255, 255, 255, 1) 0%, rgba(246, 90, 0, 1) 100%)",
                  boxShadow:
                    "inset -3.42px -3.42px 3.42px 0px rgba(255, 197, 138, 0.25), inset 3.42px 3.42px 3.42px 0px rgba(255, 255, 255, 0.25)",
                }}
              >
                <div className="absolute top-[11.7px] left-[10.78px] w-[9.74px] h-[3.57px] bg-black rounded-sm"></div>
                <div className="absolute top-[13.18px] left-[12.73px] w-[0.75px] h-[0.74px] bg-white rounded-full"></div>
                <div className="absolute top-[13.18px] left-[19.62px] w-[0.75px] h-[0.74px] bg-white rounded-full"></div>
              </div>
            </div>
          </Card.Body>
          <Card.Footer className="absolute bottom-3 left-4 right-4 p-0 bg-transparent border-none">
            <div>
              <h3 className="text-lg font-semibold text-black mb-0.5 leading-[26px]">
                멘토
              </h3>
              <p className="text-xs text-[#767676] leading-[15px] tracking-[0.24px]">
                성공한 경험을 공유하고
                <br />
                수익을 창출하세요
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
          <Card.Body className="relative w-full h-full p-0">
            <div className="absolute top-[46px] right-[46px] w-[52px] h-[52px]">
              <div
                className="w-full h-full rounded-full"
                style={{
                  background:
                    "linear-gradient(136deg, rgba(221, 255, 208, 1) 12%, rgba(98, 183, 65, 1) 85%)",
                  boxShadow:
                    "inset 0.83px 0.83px 0.83px 0px rgba(255, 246, 174, 0.25), inset -1.04px -1.04px 1.24px 0px rgba(20, 160, 87, 0.25)",
                }}
              >
                <div className="absolute top-[21px] left-[20.61px] w-[2.6px] h-[3.12px] bg-[#22952B] rounded-full"></div>
                <div className="absolute top-[21px] left-[26.45px] w-[2.6px] h-[3.12px] bg-[#22952B] rounded-full"></div>
                <div className="absolute top-[22.17px] left-[22.17px] w-[0.78px] h-[0.91px] bg-white/80 rounded-full"></div>
                <div className="absolute top-[22.17px] left-[28.01px] w-[0.78px] h-[0.91px] bg-white/80 rounded-full"></div>
              </div>
            </div>
            <div className="absolute bottom-[57px] left-4 w-[34px] h-[29px]">
              <div
                className="w-full h-full rounded-full"
                style={{
                  background:
                    "linear-gradient(137deg, rgba(255, 255, 255, 1) 0%, rgba(246, 90, 0, 1) 100%)",
                  boxShadow:
                    "inset -3.42px -3.42px 3.42px 0px rgba(255, 197, 138, 0.25), inset 3.42px 3.42px 3.42px 0px rgba(255, 255, 255, 0.25)",
                }}
              >
                <div className="absolute top-[11.7px] left-[10.78px] w-[9.74px] h-[3.57px] bg-black rounded-sm"></div>
                <div className="absolute top-[13.18px] left-[12.73px] w-[0.75px] h-[0.74px] bg-white rounded-full"></div>
                <div className="absolute top-[13.18px] left-[19.62px] w-[0.75px] h-[0.74px] bg-white rounded-full"></div>
              </div>
            </div>
          </Card.Body>
          <Card.Footer className="absolute bottom-3 left-4 right-4 p-0 bg-transparent border-none">
            <div>
              <h3 className="text-lg font-semibold text-black mb-0.5 leading-[26px]">
                멘티
              </h3>
              <p className="text-xs text-[#767676] leading-[15px] tracking-[0.24px]">
                성공한 경험을 공유하고
                <br />
                수익을 창출하세요
              </p>
            </div>
          </Card.Footer>
        </Card.Root>
      </div>
    </div>
  );
};

export default MentorMentee;

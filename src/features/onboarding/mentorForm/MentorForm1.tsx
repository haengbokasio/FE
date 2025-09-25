import { CheckCircleOutlineIcon } from "@vapor-ui/icons";

import { Form, InputGroup, TextInput, VStack } from "@vapor-ui/core";
import { Field } from "@vapor-ui/core/field";
import { PublishOutlineIcon } from "@vapor-ui/icons";
import React from "react";
import { OnboardingData } from "../../../types/onboarding";

interface MentorForm1Props {
  data: OnboardingData;
  setData: React.Dispatch<React.SetStateAction<OnboardingData>>;
}

const MentorForm1 = ({ data, setData }: MentorForm1Props) => {
  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, "");

    if (numbers.length > 11) return data.phone || "";

    if (numbers.length <= 3) {
      return numbers;
    } else if (numbers.length <= 7) {
      return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    } else {
      return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(
        7
      )}`;
    }
  };

  const handleFileUpload = (type: "businessRegistration" | "salesProof") => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        if (file.size > 100 * 1024 * 1024) {
          alert("파일 크기는 100MB 이하여야 합니다.");
          return;
        }

        setData((prev) => ({
          ...prev,
          [type]: true,
        }));
      }
    };
    input.click();
  };

  return (
    <div className="pt-[53px] pb-[100px]">
      <div>
        <h2 className="text-2xl font-semibold text-black leading-[32px] -tracking-[0.24px] mb-1">
          인증 서류를
          <br />
          업로드해주세요
        </h2>
        <p className="text-sm text-[#767676] leading-[20px] tracking-[0.14px] mb-8">
          멘토 자격 검증을 위한 서류를 업로드해주세요
        </p>
      </div>

      <div className="flex-1">
        <Form onSubmit={(event) => event.preventDefault()}>
          <VStack gap="$200">
            <Field.Root render={<VStack gap="$100" />}>
              <Field.Label className="flex items-center gap-1 text-xs font-medium text-[#4C4C4C] leading-[18px]">
                전화번호
                <span className="text-[#AB3406]">*</span>
              </Field.Label>
              <InputGroup.Root>
                <div className="flex">
                  <TextInput
                    id="mentor-phone"
                    size="lg"
                    placeholder="010-0000-0000"
                    value={data.phone || ""}
                    onChange={(e) => {
                      const formatted = formatPhoneNumber(e.target.value);
                      setData((prev) => ({ ...prev, phone: formatted }));
                    }}
                    className="h-10 px-4 border border-[#E1E1E1] rounded-lg text-sm leading-[22px] -tracking-[0.1px] placeholder-[#5D5D5D] flex-1"
                    required
                  />
                </div>
              </InputGroup.Root>
            </Field.Root>
          </VStack>
        </Form>

        <div className="flex items-center gap-4 mt-3">
          <div
            className="w-[163px] h-[165px] bg-white rounded-2xl p-3 flex flex-col justify-end gap-0.5 cursor-pointer transition-all border border-gray-200 hover:border-gray-300 active:shadow-[0px_0px_19px_11px_rgba(255,213,189,1)] active:border-orange-200"
            onClick={() => handleFileUpload("businessRegistration")}
          >
            <div className="flex flex-col gap-0.5">
              {data.businessRegistration ? (
                <CheckCircleOutlineIcon width={24} height={24} fill="green" />
              ) : (
                <PublishOutlineIcon fill="#c1c1c1" width={24} height={24} />
              )}
              <div className="flex items-stretch justify-stretch gap-1">
                <h3 className="text-lg font-semibold text-black leading-[26px]">
                  사업자 등록증
                </h3>
              </div>
              <p className="text-xs text-[#767676] leading-[15px] tracking-[0.24px] w-[120px]">
                {data.businessRegistration ? "업로드 완료" : "100MB 이하 첨부"}
              </p>
            </div>
          </div>

          <div
            className="w-[163px] h-[165px] bg-white rounded-2xl p-3 flex flex-col justify-end gap-0.5 cursor-pointer transition-all border border-gray-200 hover:border-gray-300 active:shadow-[0px_0px_19px_11px_rgba(255,213,189,1)] active:border-orange-200"
            onClick={() => handleFileUpload("salesProof")}
          >
            {data.salesProof ? (
              <CheckCircleOutlineIcon width={24} height={24} fill="green" />
            ) : (
              <PublishOutlineIcon fill="#c1c1c1" width={24} height={24} />
            )}

            <div className="flex flex-col gap-0.5">
              <div className="flex items-stretch justify-stretch gap-1">
                <h3 className="text-lg font-semibold text-black leading-[26px]">
                  매출인증
                </h3>
              </div>
              <p className="text-xs text-[#767676] leading-[15px] tracking-[0.24px] w-[120px]">
                {data.salesProof ? "업로드 완료" : "100MB 이하 첨부"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorForm1;

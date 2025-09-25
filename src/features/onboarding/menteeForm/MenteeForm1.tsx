import {
  Button,
  Checkbox,
  Radio,
  RadioGroup,
  TextInput,
  VStack,
} from "@vapor-ui/core";
import { Field } from "@vapor-ui/core/field";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { CUSTOMER_OPTIONS } from "../types/selectTypes";
import { MenteeAnalysisResult } from "@/pages/api/aiAnalyzedReportMentee";
import { haengbokasioApi, MentiRegisterRequest } from "@/services/api";

interface MenteeFormData {
  businessType: string;
  detailedBusinessType?: string;
  operatingPeriod: number;
  revenueAvg: number;
  salesAvg: number;
  storeLocation: string;
  representativeProduct: string;
  mainCustomers: string[];
  phoneNumber: string;
}

interface MenteeForm1Props {
  onNext: () => void;
}

const MenteeForm1 = ({ onNext }: MenteeForm1Props) => {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<MenteeFormData>({
    defaultValues: {
      businessType: "",
      detailedBusinessType: "",
      operatingPeriod: 0,
      revenueAvg: 0,
      salesAvg: 0,
      storeLocation: "",
      representativeProduct: "",
      mainCustomers: [],
      phoneNumber: "",
    },
  });

  const businessType = watch("businessType");

  const aiAnalyzedReportMentee = async (
    formData: MenteeFormData
  ): Promise<MenteeAnalysisResult> => {
    const response = await fetch("/api/aiAnalyzedReportMentee", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "분석 요청에 실패했습니다.");
    }

    return response.json();
  };

  useEffect(() => {
    const savedPhoneNumber = sessionStorage.getItem("phoneNumber");
    if (savedPhoneNumber) {
      setValue("phoneNumber", savedPhoneNumber);
    }
  }, [setValue]);

  const getDetailedOptions = (type: string) => {
    switch (type) {
      case "음식업":
        return ["식당", "주점", "카페", "푸드트럭", "기타"];
      case "소매업":
        return ["편의점", "소품샵", "빈티지샵", "서점", "기타 (직접입력)"];
      case "서비스업":
        return ["사진작가", "서핑샵", "네일샵", "미용실", "기타"];
      case "숙박업":
        return ["에어비앤비", "게스트하우스", "캠핑장", "기타"];
      default:
        return [];
    }
  };

  const handleBusinessTypeChange = (value: string) => {
    setValue("businessType", value);
    setValue("detailedBusinessType", "");
  };

  const onSubmit = async (data: MenteeFormData) => {
    const phoneNumber = sessionStorage.getItem("phoneNumber") || "";
    const kakaoId = localStorage.getItem("kakaoId") || "";

    const formDataWithPhone = {
      ...data,
      phoneNumber: phoneNumber,
      kakaoId: kakaoId,
    };

    console.log("멘티 폼 데이터:", formDataWithPhone);

    // 로딩 상태를 sessionStorage에 저장
    sessionStorage.setItem("aiAnalysisStatus", "loading");
    sessionStorage.setItem("menteeFormData", JSON.stringify(formDataWithPhone));

    // 즉시 다음 화면으로 이동
    onNext();

    // 백그라운드에서 AI 분석 요청
    try {
      const result = await aiAnalyzedReportMentee(formDataWithPhone);
      // 결과를 sessionStorage에 저장
      sessionStorage.setItem("aiAnalysisStatus", "completed");
      sessionStorage.setItem("aiAnalysisResult", JSON.stringify(result));

      // AI 성공 후 registerMenti 호출
      const kakaoId = localStorage.getItem("kakaoId");
      if (kakaoId && result) {
        try {
          const convertedAnalysis = {
            strengths: result.coachingPoints || [],
            topStrengthCopy: result.topWeaknessCopy || "",
            coachingPoints: result.weakness || [],
          };

          const mentiRegisterData: MentiRegisterRequest = {
            kakaoId: parseInt(kakaoId),
            phoneNumber: formDataWithPhone.phoneNumber,
            businessType: formDataWithPhone.businessType,
            businessDetail: formDataWithPhone.detailedBusinessType || "",
            businessAddress: formDataWithPhone.storeLocation,
            mainProductService: formDataWithPhone.representativeProduct,
            operationMethod: "",
            supplySource: "",
            operationPeriod: formDataWithPhone.operatingPeriod,
            monthAvgRevenue: formDataWithPhone.revenueAvg,
            weekAvgDailyRevenue: formDataWithPhone.salesAvg,
            targetCustomer: formDataWithPhone.mainCustomers?.join(", ") || "",
            customerAcquisitionMethod: "",
            marketingMethod: "",
            aiAnalysis: JSON.stringify(convertedAnalysis),
          };

          console.log("🚀 멘티 등록 요청 데이터:", {
            url: `/users/menti/register/${kakaoId}`,
            data: mentiRegisterData,
          });

          const registerResponse = await haengbokasioApi.registerMenti(
            kakaoId,
            mentiRegisterData
          );
          console.log("멘티 등록 성공:", registerResponse);

          sessionStorage.setItem("mentiRegisterStatus", "completed");
          sessionStorage.setItem(
            "mentiRegisterResult",
            JSON.stringify(registerResponse)
          );
        } catch (registerError) {
          console.error("멘티 등록 오류:", registerError);
          sessionStorage.setItem("mentiRegisterStatus", "error");
          sessionStorage.setItem(
            "mentiRegisterError",
            JSON.stringify(registerError)
          );
        }
      }
    } catch (error) {
      console.error("AI 분석 오류:", error);
      sessionStorage.setItem("aiAnalysisStatus", "error");
      sessionStorage.setItem("aiAnalysisError", JSON.stringify(error));
    }
  };

  const isFormComplete = () => {
    const formData = watch();

    console.log("폼 완성도 체크:", {
      businessType: formData.businessType,
      detailedBusinessType: formData.detailedBusinessType,
      operatingPeriod: formData.operatingPeriod,
      revenueAvg: formData.revenueAvg,
      salesAvg: formData.salesAvg,
      storeLocation: formData.storeLocation,
      representativeProduct: formData.representativeProduct,
      mainCustomers: formData.mainCustomers,
    });

    return (
      formData.businessType &&
      formData.detailedBusinessType &&
      formData.operatingPeriod >= 0 &&
      formData.revenueAvg >= 0 &&
      formData.salesAvg >= 0 &&
      formData.storeLocation &&
      formData.representativeProduct &&
      formData.mainCustomers.length > 0
    );
  };

  return (
    <div className="pt-[49px] pb-[100px]">
      <div>
        <h2 className="text-2xl font-semibold text-black leading-[32px] -tracking-[0.24px] mb-1">
          세부 정보를 입력해주세요
        </h2>
        <p className="text-sm text-[#767676] leading-[20px] tracking-[0.14px] mb-8">
          선택한 역할에 따라 맞춤 서비스를 제공해드려요
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack className="mb-8 space-y-14">
          <Controller
            name="businessType"
            control={control}
            rules={{ required: "업종을 선택해주세요" }}
            render={({ field }) => (
              <RadioSection
                title="어떤 업종에서 일 하시나요?"
                options={["음식업", "소매업", "서비스업", "숙박업"]}
                value={field.value}
                onValueChange={(value) => {
                  field.onChange(value);
                  handleBusinessTypeChange(value);
                }}
              />
            )}
          />

          {businessType && (
            <Controller
              name="detailedBusinessType"
              control={control}
              rules={{ required: "상세 업종을 선택해주세요" }}
              render={({ field }) => (
                <RadioSection
                  title="더 자세한 업종이 궁금해요"
                  options={getDetailedOptions(businessType)}
                  value={field.value || ""}
                  onValueChange={field.onChange}
                />
              )}
            />
          )}

          <Controller
            name="operatingPeriod"
            control={control}
            rules={{ required: "운영 기간을 선택해주세요", min: 0 }}
            render={({ field }) => (
              <SliderSection
                title="운영 기간"
                min={0}
                max={10}
                step={1}
                value={field.value}
                onValueChange={field.onChange}
                unit="년차"
              />
            )}
          />

          <Controller
            name="revenueAvg"
            control={control}
            rules={{ required: "지난달 평균 월매출을 입력해주세요", min: 0 }}
            render={({ field }) => (
              <SliderSection
                title="월 평균 매출"
                subtitle="한 달 동안 벌어들인 총 수입을 알려주세요"
                min={0}
                max={1200}
                step={10}
                value={field.value}
                onValueChange={field.onChange}
                unit="만원"
              />
            )}
          />

          <Controller
            name="salesAvg"
            control={control}
            rules={{ required: "이번주 평균 일매출을 입력해주세요", min: 0 }}
            render={({ field }) => (
              <SliderSection
                title="월 평균 순수익"
                subtitle="인건비, 재료비 등 비용을 제외한 순수익을 알려주세요"
                min={0}
                max={100}
                step={1}
                value={field.value}
                onValueChange={field.onChange}
                unit="만원"
              />
            )}
          />

          <Controller
            name="storeLocation"
            control={control}
            rules={{ required: "매장 위치를 입력해주세요" }}
            render={({ field }) => (
              <Field.Root>
                <Field.Label className="text-lg font-bold text-[#262626] leading-[26px] mb-1">
                  매장 위치
                </Field.Label>
                <span className="text-sm text-[#2B2D36] leading-[22px] block">
                  아직 준비 중이라면, 고민중인 상권을 선택해주세요.
                </span>
                <TextInput
                  placeholder="예: 서울시 강남구"
                  {...field}
                  className="w-full h-10 px-4 border border-[#E1E1E1] rounded-lg mt-4"
                />
                {errors.storeLocation && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.storeLocation.message}
                  </p>
                )}
              </Field.Root>
            )}
          />

          <Controller
            name="representativeProduct"
            control={control}
            rules={{ required: "대표 상품을 입력해주세요" }}
            render={({ field }) => (
              <Field.Root>
                <Field.Label className="text-lg font-bold text-[#262626] leading-[26px] mb-1">
                  매장의 대표 상품이나 서비스를 알려주세요.
                </Field.Label>
                <TextInput
                  placeholder="예: 아메리카노, 파스타"
                  {...field}
                  className="w-full h-10 px-4 border border-[#E1E1E1] rounded-lg mt-4"
                />
                {errors.representativeProduct && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.representativeProduct.message}
                  </p>
                )}
              </Field.Root>
            )}
          />

          <Controller
            name="mainCustomers"
            control={control}
            rules={{ required: "주 고객층을 선택해주세요" }}
            render={({ field }) => (
              <CheckboxSection
                title="어떤 고객들이 방문하시나요?"
                subtitle="복수 선택 가능"
                options={CUSTOMER_OPTIONS}
                value={field.value}
                onValueChange={field.onChange}
              />
            )}
          />
        </VStack>
      </form>

      <div className="w-full flex  bg-white border-t border-gray-100">
        <Button
          type="submit"
          onClick={handleSubmit(onSubmit)}
          className="w-full h-12 text-white font-medium rounded-xl transition-all duration-200"
          style={{
            backgroundColor: !isFormComplete() ? "#ECECEC" : "#FF782A",
            color: !isFormComplete() ? "#393939" : "#FFFFFF",
          }}
          size="lg"
          disabled={!isFormComplete()}
        >
          완료하기
        </Button>
      </div>
    </div>
  );
};

interface RadioSectionProps {
  title: string;
  subtitle?: string;
  options: string[];
  value: string;
  onValueChange: (value: string) => void;
}

const RadioSection = ({
  title,
  subtitle,
  options,
  value,
  onValueChange,
}: RadioSectionProps) => {
  return (
    <div>
      <div className="mb-4">
        <h3 className="text-lg font-bold text-[#262626] leading-[26px] mb-1">
          {title}
        </h3>
        {subtitle && (
          <p className="text-sm text-[#4C4C4C] leading-[22px]">{subtitle}</p>
        )}
      </div>

      <div>
        <RadioGroup.Root
          value={value}
          onValueChange={(newValue) => onValueChange(newValue as string)}
          orientation="vertical"
          className="space-y-3"
        >
          {options.map((option) => (
            <div key={option} className="flex items-center">
              <Radio.Root
                value={option}
                className="w-6 h-6 border-2 border-gray-300 rounded-full cursor-pointer flex items-center bg-white mr-3"
                style={{
                  borderColor: value === option ? "#FF782A" : "#D1D5DB",
                  backgroundColor: value === option ? "#FF782A" : "#FFFFFF",
                }}
              >
                {value === option && (
                  <div className="w-2 h-2 bg-white rounded-full" />
                )}
              </Radio.Root>
              <span className="text-sm text-[#2B2D36] leading-[22px]">
                {option}
              </span>
            </div>
          ))}
        </RadioGroup.Root>
      </div>
    </div>
  );
};

interface CheckboxSectionProps {
  title: string;
  subtitle?: string;
  options: string[];
  value: string[];
  onValueChange: (value: string[]) => void;
}

const CheckboxSection = ({
  title,
  subtitle,
  options,
  value,
  onValueChange,
}: CheckboxSectionProps) => {
  const handleCheckboxChange = (option: string, isChecked: boolean) => {
    if (isChecked) {
      onValueChange([...value, option]);
    } else {
      onValueChange(value.filter((item) => item !== option));
    }
  };

  return (
    <div>
      <div className="mb-4">
        <h3 className="text-lg font-bold text-[#262626] leading-[26px] mb-1">
          {title}
        </h3>
        {subtitle && (
          <p className="text-sm text-[#4C4C4C] leading-[22px]">{subtitle}</p>
        )}
      </div>

      <div>
        <div className="space-y-3">
          {options.map((option) => (
            <div key={option} className="flex items-center">
              <Checkbox.Root
                checked={value.includes(option)}
                onCheckedChange={(isChecked) =>
                  handleCheckboxChange(option, isChecked as boolean)
                }
                className="w-6 h-6 border-2 border-gray-300 rounded cursor-pointer flex items-center justify-center bg-white mr-3"
                style={{
                  borderColor: value.includes(option) ? "#FF782A" : "#D1D5DB",
                  backgroundColor: value.includes(option)
                    ? "#FF782A"
                    : "#FFFFFF",
                }}
              >
                {value.includes(option) && (
                  <Checkbox.Indicator className="text-white">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="currentColor"
                    >
                      <path
                        d="M10 3L4.5 8.5L2 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Checkbox.Indicator>
                )}
              </Checkbox.Root>
              <span className="text-sm text-[#2B2D36] leading-[22px]">
                {option}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface SliderSectionProps {
  title: string;
  subtitle?: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onValueChange: (value: number) => void;
  unit?: string;
}

const SliderSection = ({
  title,
  subtitle,
  min,
  max,
  step,
  value,
  onValueChange,
  unit = "",
}: SliderSectionProps) => {
  return (
    <div className=" rounded-lg border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-bold text-[#262626] leading-[26px] mb-1">
            {title}
          </h3>
          {subtitle && (
            <p className="text-sm text-[#4C4C4C] leading-[22px]">{subtitle}</p>
          )}
        </div>
        <span className="text-xs p-2.5 rounded-xl text-[#FF782A] bg-[#fff2ea] shrink-0">
          {value}
          {unit}
        </span>
      </div>

      <div className="pt-4">
        <div className="relative px-4">
          <div className="relative w-full h-2 bg-gray-200 rounded-lg">
            <div
              className="absolute left-0 top-0 h-full bg-[#FF782A] rounded-lg"
              style={{ width: `${((value - min) / (max - min)) * 100}%` }}
            />
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={value}
              onChange={(e) => onValueChange(Number(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div
              className="absolute top-1/2 w-7 h-7 bg-[#FF782A] rounded-full transform -translate-y-1/2 -translate-x-1/2 cursor-pointer pointer-events-none"
              style={{
                left: `${((value - min) / (max - min)) * 100}%`,
                boxShadow:
                  "0 0.5px 4px rgba(0, 0, 0, 0.25), 0 0 13px rgba(255, 120, 42, 0.4)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenteeForm1;

// 1. pages/api/analyze-mentor.ts (API Route 파일 - 별도로 생성)

import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

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

export interface MenteeAnalysisResult {
  weakness: string[];
  topWeaknessCopy: string;
  coachingPoints: string[];
}

// OpenAI 클라이언트 초기화
// 퓨샷 추가
const openai = new OpenAI({
  apiKey:
    "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",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MenteeAnalysisResult | { error: string }>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const formData: MenteeFormData = req.body;

    // 데이터 검증
    if (!formData.businessType) {
      return res.status(400).json({ error: "필수 필드가 누락되었습니다." });
    }

    const prompt = `
    gemini-4o-mini 모델을 사용해!

    당신은  초보 자영업자 멘티가 본인에게 맞는 고수 자영업자 멘토를 고를 수 있도록 돕는 멘토링 지원 AI입니다.
아래 설문조사 결과를 바탕으로, 이 초보 자영업자 멘티의 약점 3가지를 정리하고 멘토에게 요청할 수 있는 질문 리스트 3가지를 만들어주세요.


설문조사 결과:
- 업종: ${formData.businessType}${
      formData.detailedBusinessType ? ` (${formData.detailedBusinessType})` : ""
    }
- 운영 기간: ${formData.operatingPeriod}년
- 평균 매출: ${formData.revenueAvg}만원
- 평균 순수익: ${formData.salesAvg}만원
- 매장 위치: ${formData.storeLocation}
- 대표 상품: ${formData.representativeProduct}
- 주요 고객층: ${formData.mainCustomers.join(", ")}

[요청사항]

1. 위 설문을 바탕으로 현재 약점 3가지를 정리해줘.
2. 현재 약점 3가지를 출력하되, 약점이 큰 순서대로 나열해줘 글자 수는 25자 이내여야 해.
3. 가장 큰 약점 한 가지를 선정하고, 왜 이 부분이 가장 고쳐야 하는 부분인지 설명하는 카피를 작성해줘. 글자수는 30자 이내로.
4. 멘토 입장에서 이 멘티에게 줄 수 있는 코칭 포인트 3가지를 정리해서 초보 자영업자가 멘토에게 직접 던질 수 있는 질문 리스트 3가지를 만들어줘. 글자수는 25자 이내로.
6. 질문 리스트 3가지를 출력하되, 중요도 순으로 나열해줘 글자 수는 25자 이내여야 해.


예를들어,
- 업종: 음식점 식당
- 운영 기간: 1년
- 평균 매출: 200만원
- 평균 순수익: 80만원
- 매장 위치: 구좌읍
- 대표 상품: 후라이드 치킨
- 주요 고객층: 2030도민, 4050 도민

이렇게 답한 초보 자영업자를 분석하면,


{
    "weakness": ["타겟 고객층 불일치 문제", "홍보 마케팅 전략 부재", "1인 운영의 확장성 한계"],
    "topWeaknessCopy": "현재 4050 도민이 방문하지만 2030 도민 유입을 원하는 타겟 고객층 불일치가 가장 근본적인 문제입니다. 이 부분이 해결되지 않으면 매출 증대와 브랜드 성장이 어렵습니다.",
    "coachingPoints": ["2030 고객 유입 비법 알려주세요", "SNS 마케팅 어떻게 시작하죠?", "혼자서도 매출 늘리는 방법은?"]
}
이렇게 오면 돼.

두번째 예를 들어보자면,
- 업종: 소매업 소품샵
- 운영 기간: 1년
- 평균 매출: 300만원
- 평균 순수익: 170만원
- 매장 위치: 구좌읍
- 대표 상품: 제주도 기념품
- 주요 고객층: 2030도민
- 마케팅 방법: SNS 운영

이렇게 답한 고수 자영업자를 분석하면,

{
    "weakness": ["관광객→도민 전환 전략 부재", "SNS 외 마케팅 채널 부족", "1인 운영의 확장성 한계"],
    "topWeaknessCopy": "고객층 전환 없이는 성장 정체",
    coachingPotins: ["도민 타겟 상품 구성 조언법?", "구좌읍서 도심 고객 유치법?", "관광객 의존도 줄이는 방법?"]
}
이렇게 오면 돼.


위 예시들처럼 응답은 반드시 다음 JSON 형태로만 해줘:
{
  "strengths": ["강점1", "강점2", "강점3"],
  "topStrengthCopy": "가장 큰 강점 카피",
  "coachingPoints": ["질문1", "질문2", "질문3"]
}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const response = completion.choices[0].message.content;

    if (!response) {
      throw new Error("OpenAI API 응답이 비어있습니다.");
    }

    // JSON 응답 파싱 시 에러 처리
    let result: MenteeAnalysisResult;
    try {
      result = JSON.parse(response);
    } catch (parseError) {
      console.error("JSON 파싱 오류:", parseError);
      console.error("원본 응답:", response);
      throw new Error("AI 응답을 해석할 수 없습니다.");
    }

    // 응답 데이터 검증
    if (
      !result.weakness ||
      !Array.isArray(result.weakness) ||
      result.weakness.length !== 3
    ) {
      throw new Error("AI 응답 형식이 올바르지 않습니다.");
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error("OpenAI API 호출 오류:", error);

    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(500).json({ error: "서버 내부 오류가 발생했습니다." });
  }
}

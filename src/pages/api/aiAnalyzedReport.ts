// 1. pages/api/analyze-mentor.ts (API Route 파일 - 별도로 생성)

import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

interface MentorFormData {
  businessType: string;
  detailedBusinessType?: string;
  operatingPeriod: number;
  revenueAvg: number;
  salesAvg: number;
  storeLocation: string;
  representativeProduct: string;
  mainCustomers: string[];
  marketingMethod: string[];
  phoneNumber: string;
}

export interface MentorAnalysisResult {
  strengths: string[];
  topStrengthCopy: string;
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
  res: NextApiResponse<MentorAnalysisResult | { error: string }>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // OpenAI API 키 체크
    // if (!process.env.OPENAI_API_KEY) {
    //   console.error("OPENAI_API_KEY 환경변수가 설정되지 않았습니다.");
    //   return res
    //     .status(500)
    //     .json({ error: "서버 설정 오류: API 키가 없습니다." });
    // }

    const formData: MentorFormData = req.body;

    // 데이터 검증
    if (!formData.businessType) {
      return res.status(400).json({ error: "필수 필드가 누락되었습니다." });
    }

    const prompt = `당신은 초보 자영업자 멘티가 본인에게 맞는 고수 자영업자 멘토를 고를 수 있도록 돕는 멘토링 지원 AI입니다. 아래 설문조사 결과를 바탕으로, 이 고수 자영업자의 강점 3가지를 정리하고 멘티에게 어떤 도움을 줄 수 있는지 분석해서 정리해주세요.

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
- 마케팅 방법: ${formData.marketingMethod.join(", ")}

[요청사항]
1. 위 설문을 바탕으로 현재 강점 3가지를 정리해줘.
2. 현재 강점 3가지를 출력하되, 강점이 큰 순서대로 나열해줘 글자 수는 25자 이내여야 해.
3. 가장 큰 강점 한 가지를 선정하고, 왜 이 부분이 가장 대단한 부분인지 설명하는 카피를 작성해줘. 가장 큰 강점을 기반으로 후킹한 포인트가 담기면 좋겠어. 글자수는 25자 이내로.
4. 멘티들이 이 멘토로부터 배워갈 수 있을만한 대표 세가지를 뽑아줘. 그 세가지는 중요도 순으로 나열하고 각각의 글자 수는 25자 이내여야 해.

예를들어,
- 업종: 음식점 치킨집
- 운영 기간: 5년
- 평균 매출: 2000만원
- 평균 순수익: 600만원
- 매장 위치: 구좌읍
- 대표 상품: 후라이드 치킨
- 주요 고객층: 2030도민, 4050 도민
- 마케팅 방법: SNS 운영, 검색광고, 체험단

이렇게 답한 고수 자영업자를 분석하면,

{
    "strengths": ["5년간 안정적 매출 달성", "월 600만원 순수익 확보", "직원 채용한 규모 운영"],
    "topStrengthCopy": "5년 생존률 30% 시대, 안정 경영",
    "coachingPoints": ["어려운 시기 버티는 방법", "직원 관리 노하우", "단골손님 만드는 비결"]
}
이렇게 오면 돼.

두번째 예를 들어보자면,
- 업종: 서핑샵
- 운영 기간: 2년
- 평균 매출: 3000만원
- 평균 순수익: 1600만원
- 매장 위치: 애월
- 대표 상품: 서핑 일회권
- 주요 고객층: 2030도민, 관광객
- 마케팅 방법: SNS 운영, 검색광고, 체험단

이렇게 답한 고수 자영업자를 분석하면,

{
    "strengths": ["높은 수익성 달성", "안정적 운영시스템", "효과적 마케팅 전략"],
    "topStrengthCopy": "2년만에 월 1600만원 순익 달성",
    coachingPotins: ["높은 순이익률 달성 비결", "직원 관리 시스템 노하우", "효과적인 홍보 채널 선택법"]
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
    let result: MentorAnalysisResult;
    try {
      result = JSON.parse(response);
    } catch (parseError) {
      console.error("JSON 파싱 오류:", parseError);
      console.error("원본 응답:", response);
      throw new Error("AI 응답을 해석할 수 없습니다.");
    }

    // 응답 데이터 검증
    if (
      !result.strengths ||
      !Array.isArray(result.strengths) ||
      result.strengths.length !== 3
    ) {
      throw new Error("AI 응답 형식이 올바르지 않습니다.");
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error("OpenAI API 호출 오류:", error);

    // 더 상세한 에러 로깅
    if (error instanceof Error) {
      console.error("에러 메시지:", error.message);
      console.error("에러 스택:", error.stack);

      // OpenAI API 관련 에러 처리
      if (error.message.includes("API key")) {
        return res.status(500).json({ error: "API 키 설정 오류입니다." });
      }
      if (
        error.message.includes("quota") ||
        error.message.includes("billing")
      ) {
        return res
          .status(500)
          .json({ error: "API 사용량 초과 또는 결제 문제입니다." });
      }
      if (error.message.includes("rate limit")) {
        return res.status(429).json({
          error: "API 요청 한도를 초과했습니다. 잠시 후 다시 시도해주세요.",
        });
      }

      return res.status(500).json({ error: `서버 오류: ${error.message}` });
    }

    return res.status(500).json({ error: "서버 내부 오류가 발생했습니다." });
  }
}

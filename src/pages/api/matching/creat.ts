// pages/api/matching/create.ts
import type { NextApiRequest, NextApiResponse } from "next";

const API_URL = "https://haengbokasio.goorm.training/api/matching/create";

interface MatchingRequest {
  mentorKakaoId: number;
  mentiKakaoId: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { mentorKakaoId, mentiKakaoId }: MatchingRequest = req.body;

    if (!mentorKakaoId || !mentiKakaoId) {
      return res.status(400).json({
        success: false,
        message: "mentorKakaoId와 mentiKakaoId를 모두 입력해주세요.",
      });
    }

    // 실제 백엔드 API 호출
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mentorKakaoId, mentiKakaoId }),
    });

    if (!response.ok) {
      console.error("API 호출 실패:", response.status, response.statusText);
      return res.status(500).json({
        success: false,
        message: "매칭 API 호출 중 오류가 발생했습니다.",
      });
    }

    const result = await response.json();
    return res.status(200).json({
      success: true,
      message: "멘토-멘티 매칭이 성공적으로 생성되었습니다.",
      data: result,
    });
  } catch (error) {
    console.error("매칭 API 인증 오류:", error);
    return res.status(500).json({
      success: false,
      message: "매칭 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
    });
  }
}

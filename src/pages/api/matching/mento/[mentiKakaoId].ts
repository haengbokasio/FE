import type { NextApiRequest, NextApiResponse } from "next";

const BACKEND_URL = "http://haengbokasio.goorm.training/api";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { mentiKakaoId } = req.query;

    if (!mentiKakaoId) {
      return res.status(400).json({
        error: "mentiKakaoId가 필요합니다.",
      });
    }

    const response = await fetch(`${BACKEND_URL}/matching/mento/${mentiKakaoId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("연결된 멘토 조회 API 호출 실패:", response.status, response.statusText, errorData);
      return res.status(response.status).json({
        error: "연결된 멘토 조회 API 호출 실패",
        status: response.status,
        statusText: response.statusText,
        details: errorData,
      });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error("연결된 멘토 조회 API 오류:", error);
    return res.status(500).json({
      error: "연결된 멘토 조회 중 오류가 발생했습니다.",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

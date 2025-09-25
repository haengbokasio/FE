import type { NextApiRequest, NextApiResponse } from "next";

const API_KEY =
  "466f8b87be85d76ded159f0231444cf6044ffb4c9660c7baecec0f7a148bcb3c";
const API_URL = "https://api.odcloud.kr/api/nts-businessman/v1/status";

interface BusinessVerificationRequest {
  businessNumber: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { businessNumber }: BusinessVerificationRequest = req.body;

    if (!businessNumber) {
      return res.status(400).json({
        success: false,
        message: "사업자등록번호를 입력해주세요.",
      });
    }

    // 하이픈 제거 및 숫자만 추출
    const cleanNumber = businessNumber.replace(/[^0-9]/g, "");

    // 사업자등록번호 형식 검증 (10자리)
    if (cleanNumber.length !== 10) {
      return res.status(400).json({
        success: false,
        message: "사업자등록번호는 10자리 숫자여야 합니다.",
      });
    }

    // API 요청 데이터 (상태조회용)
    const requestData = {
      b_no: [cleanNumber], // 배열 형태로 전송
    };

    // 공공데이터포털 API 호출
    const response = await fetch(`${API_URL}?serviceKey=${API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      console.error("API 호출 실패:", response.status, response.statusText);
      return res.status(500).json({
        success: false,
        message: "API 호출 중 오류가 발생했습니다.",
      });
    }

    const result = await response.json();

    // API 응답 검증
    if (result.status_code !== "OK") {
      console.error("API 응답 오류:", result);
      return res.status(400).json({
        success: false,
        message: "API 호출 중 오류가 발생했습니다.",
      });
    }

    // 데이터가 없는 경우
    if (!result.data || result.data.length === 0) {
      return res.status(400).json({
        success: false,
        message: "등록되지 않은 사업자등록번호입니다.",
      });
    }

    const businessInfo = result.data[0];

    // 사업자 상태 확인 (b_stt_cd 기준)
    switch (businessInfo.b_stt_cd) {
      case "01":
        return res.status(200).json({
          success: true,
          message: "유효한 사업자등록번호입니다. (계속사업자)",
          data: businessInfo,
        });
      case "02":
        return res.status(400).json({
          success: false,
          message: "휴업 중인 사업자입니다.",
        });
      case "03":
        return res.status(400).json({
          success: false,
          message: "폐업한 사업자입니다.",
        });
      default:
        return res.status(400).json({
          success: false,
          message: "사업자 상태를 확인할 수 없습니다.",
        });
    }
  } catch (error) {
    console.error("사업자등록번호 인증 오류:", error);
    return res.status(500).json({
      success: false,
      message: "인증 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
    });
  }
}

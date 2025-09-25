/**
 * 사업자등록번호 진위확인 (Next.js API 라우트 사용)
 * @param businessNumber 사업자등록번호 (하이픈 포함/미포함 모두 가능)
 * @returns 사업자 정보 또는 에러
 */
export async function verifyBusinessNumber(businessNumber: string): Promise<{
  success: boolean;
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
}> {
  try {
    const response = await fetch("/api/verify-business", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        businessNumber: businessNumber,
      }),
    });

    const result = await response.json();

    return result;
  } catch (error) {
    console.error("사업자등록번호 인증 오류:", error);
    return {
      success: false,
      message: "인증 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
    };
  }
}

/**
 * 사업자등록번호 형식 포맷팅 (000-00-00000)
 * @param value 입력된 값
 * @returns 포맷팅된 사업자등록번호
 */
export function formatBusinessNumber(value: string): string {
  const numbers = value.replace(/\D/g, "");

  if (numbers.length > 10) return value.slice(0, -1);

  if (numbers.length <= 3) {
    return numbers;
  } else if (numbers.length <= 5) {
    return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
  } else {
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 5)}-${numbers.slice(5)}`;
  }
}

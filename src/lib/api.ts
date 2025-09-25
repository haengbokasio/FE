// src/lib/api.ts
const BASE_URL = "http://haengbokasio.goorm.training/api";

export async function createMatching(mentorKakaoId: number, mentiKakaoId: number) {
  const res = await fetch(`${BASE_URL}/matching/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mentorKakaoId, mentiKakaoId }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "매칭 요청 실패");
  }

  return data; // { id, mentor, menti, sts }
}

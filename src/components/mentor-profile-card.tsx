"use client";

import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "@vapor-ui/core";

interface MentorProfileCardProps {
  name: string;
  job: string;
  avatar?: string;
  mentorKakaoId: number;
  mentiKakaoId: number;
}

export function MentorProfileCard({
  name,
  job,
  avatar,
  mentorKakaoId,
  mentiKakaoId,
}: MentorProfileCardProps) {
  const [status, setStatus] = useState<"apply" | "completed">("apply");
  const [loading, setLoading] = useState(false);

  const handleApply = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/matching/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mentorKakaoId, mentiKakaoId }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        alert(data.message || "매칭 요청에 실패했습니다.");
        return;
      }

      console.log("매칭 성공:", data);
      setStatus("completed");
    } catch (err) {
      console.error(err);
      alert("서버 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full border-0 shadow-[0_0_18px_11px_rgba(0,0,0,0.05)]">
      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img
              src={avatar || "/placeholder.svg"}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-medium text-sm">{name}</h3>
            <p className="text-xs text-muted-foreground">{job}</p>
          </div>
        </div>
        <Button
          className={
            "w-full h-[36px] text-[14px] rounded-lg " +
            (status === "completed"
              ? "bg-[#DEECFF] text-[#1D4ED8]"
              : "bg-[#FFF2EA] text-[#FF782A] border border-[#FFD5BD]")
          }
          onClick={handleApply}
          disabled={status === "completed" || loading}
        >
          {status === "completed"
            ? "신청완료"
            : loading
              ? "신청 중..."
              : "신청하기"}
        </Button>
      </CardContent>
    </Card>
  );
}

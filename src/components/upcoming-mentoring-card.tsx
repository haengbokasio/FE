"use client"

import { Card, CardContent } from "@/components/ui/card"

interface UpcomingMentoringCardProps {
  name: string
  specialty: string
  avatar?: string
  /** 부모 카드 안에서 '행'만 그릴 때 */
  variant?: "card" | "inline"
}

export function UpcomingMentoringCard({
  name,
  specialty,
  avatar,
  variant = "card",
}: UpcomingMentoringCardProps) {
  // ✅ 부모 카드가 여백/간격을 관리할 때: 'inline' 행만 렌더
  if (variant === "inline") {
    return (
      <div className="flex items-center justify-between border-0">
        <div className="flex items-start min-w-0"> {/* ← 여기 수정 */}
          <div className="w-12 h-12 rounded-full overflow-hidden shrink-0">
            <img src={avatar || "/placeholder.svg"} alt={name} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-gray-900 truncate">{name}</h4>
            <p className="text-sm text-gray-600 truncate">{specialty}</p>
          </div>
        </div>
        <span className="text-xs text-gray-500 shrink-0">곧 시작</span>
      </div>
    )
  }

  // 기존처럼 단독 카드로 쓸 때(다른 화면 재사용 용도)
  return (
    <Card className="bg-white rounded-2xl border-0  px-4 !border-0 !shadow-none">
      <CardContent>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-start gap-3 min-w-0"> {/* ← 여기도 수정 */}
            <div className="w-12 h-12 rounded-full overflow-hidden shrink-0">
              <img src={avatar || "/placeholder.svg"} alt={name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-gray-900 truncate">{name}</h4>
              <p className="text-sm text-gray-600 truncate">{specialty}</p>
            </div>
          </div>
          <span className="text-xs text-gray-500 shrink-0">곧 시작</span>
        </div>
      </CardContent>
    </Card>
  )
}
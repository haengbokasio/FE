"use client"

import { Card, CardContent } from "./ui/card"
import { Button } from "@vapor-ui/core"

interface MentorProfileCardProps {
  name: string
  job: string
  avatar?: string
  status?: "apply" | "completed"
  onApply?: () => void
}

export function MentorProfileCard({ name, job, avatar, status = "apply", onApply }: MentorProfileCardProps) {
  return (
    <Card className="w-full border-0 shadow-[0_0_18px_11px_rgba(0,0,0,0.05)]">
      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img src={avatar || "/placeholder.svg"} alt={name} className="w-full h-full object-cover" />
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
          onClick={onApply}
        >
        {status === "completed" ? "신청완료" : "신청하기"}
      </Button>
      </CardContent>
    </Card>
  )
}



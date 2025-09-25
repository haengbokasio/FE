"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@vapor-ui/core"
import { ProfileAvatar } from "./profile-avatar"

interface MentorProfileCardProps {
  name: string
  job: string
  avatar?: string
  status?: "apply" | "completed"
  onApply?: () => void
}

export function MentorProfileCard({ name, job, avatar, status = "apply", onApply }: MentorProfileCardProps) {
  return (
    <Card className="w-full max-w-sm">
      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-4">
          <ProfileAvatar src={avatar} alt={`${name} 프로필`} fallback={name.charAt(0)} />
          <div>
            <h3 className="font-medium text-sm">{name}</h3>
            <p className="text-xs text-muted-foreground">{job}</p>
          </div>
        </div>

        <Button
          className={`w-full text-sm ${
            status === "completed"
              ? "bg-blue-100 text-blue-600 hover:bg-blue-200"
              : "bg-orange-100 text-orange-600 hover:bg-orange-200"
          }`}
          color="secondary"
          onClick={onApply}
        >
          {status === "completed" ? "신청완료" : "신청하기"}
        </Button>
      </CardContent>
    </Card>
  )
}

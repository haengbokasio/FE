import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProfileAvatar } from "./profile-avatar"

interface MentorApplication {
  id: string
  name: string
  job: string
  avatar?: string
  status: "completed" | "waiting" | "rejected"
}

interface MentorApplicationListProps {
  applications: MentorApplication[]
}

export function MentorApplicationList({ applications }: MentorApplicationListProps) {
  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "신청완료"
      case "waiting":
        return "대기중"
      case "rejected":
        return "거절"
      default:
        return status
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-blue-600"
      case "waiting":
        return "text-orange-600"
      case "rejected":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">멘토 신청 현황</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {applications.map((application) => (
          <div key={application.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ProfileAvatar
                src={application.avatar}
                alt={`${application.name} 프로필`}
                fallback={application.name.charAt(0)}
                size="sm"
              />
              <div>
                <h4 className="font-medium text-sm">{application.name}</h4>
                <p className="text-xs text-muted-foreground">{application.job}</p>
              </div>
            </div>
            <span className={`text-xs font-medium ${getStatusColor(application.status)}`}>
              {getStatusText(application.status)}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

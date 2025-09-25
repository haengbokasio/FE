import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

const mentors = [
  { id: "1", name: "이수아", job: "카페 · 애월읍", avatar: "/korean-woman-cafe-owner.jpg" },
  { id: "2", name: "윤서우", job: "카페 · 애월읍", avatar: "/korean-man-cafe-owner.jpg" },
  { id: "3", name: "김민재", job: "카페 · 애월읍", avatar: "/korean-man-restaurant-owner.jpg" },
  { id: "4", name: "한지민", job: "카페 · 애월읍", avatar: "/korean-woman-business-owner.jpg" },
]

export function AiMentorSection() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">✨ Ai기반 멘토 추천</span>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {mentors.map((mentor) => (
          <div key={mentor.id} className="text-center">
            <Avatar className="w-16 h-16 mx-auto mb-2">
              <AvatarImage src={mentor.avatar || "/placeholder.svg"} alt={mentor.name} />
              <AvatarFallback>{mentor.name[0]}</AvatarFallback>
            </Avatar>
            <p className="text-sm font-medium">{mentor.name}</p>
            <p className="text-xs text-gray-500">{mentor.job}</p>
          </div>
        ))}
      </div>
    </div>
  )
}



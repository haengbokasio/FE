"use client"

import { Button } from "@vapor-ui/core"

interface MentorWaitingCardProps {
  name: string
  specialty: string
  avatar: string
  onAccept: () => void  
  onReject: () => void
}

export function MentorWaitingCard({ name, specialty, avatar, onAccept, onReject }: MentorWaitingCardProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <img src={avatar || "/placeholder.svg"} alt={name} className="w-full h-full object-cover" />
        </div>
        <div>
          <h4 className="font-medium text-gray-900">{name}</h4>
          <p className="text-sm text-gray-600">{specialty}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <Button onClick={onReject} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm">
          거절
        </Button>
        <Button onClick={onAccept} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm">
          수락
        </Button>
      </div>
    </div>
  )
}

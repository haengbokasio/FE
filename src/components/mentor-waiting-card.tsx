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
    <div className="flex items-center justify-between bg-white rounded-2xl border-0 p-4">
      <div className="flex items-center gap-6">
        <div className="w-[49px] h-[49px] rounded-full overflow-hidden bg-gray-200">
          <img src={avatar || "/placeholder.svg"} alt={name} className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col gap-1">
          <h4 className="text-[16px] leading-6 font-semibold text-black">{name}</h4>
          <p className="text-[14px] leading-5 text-black/80 tracking-[0.01em]">{specialty}</p>
        </div>
      </div>

      <div className="flex gap-2">
        <Button 
          variant="fill" 
          size="md"
          className="rounded-[300px]"
          style={{ 
            backgroundColor: '#ECECEC', 
            color: '#767676'
          }}
        >
          거절
        </Button>
        <Button 
          variant="fill" 
          size="md"
          className="rounded-[300px]"
          style={{ 
            backgroundColor: '#8774FF', 
            color: 'white'
          }}
        >
          수락
        </Button>
      </div>
    </div>
  )
}
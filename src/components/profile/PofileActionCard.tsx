// src/components/profile/ProfileActionCard.tsx
import { Card, CardContent } from "@/components/ui/card"
import { ProfileListItem } from "./ProfileListItem"
import { Button } from "@vapor-ui/core"

type Props = {
  name: string
  desc: string
  img?: string
  buttonText: string
  onClick?: () => void
}

export function ProfileActionCard({ name, desc, img, buttonText, onClick }: Props) {
  return (
    <Card className="w-[360px] rounded-2xl border-0 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
      <CardContent className="pt-4 space-y-3">
        <ProfileListItem name={name} desc={desc} img={img} />
        <Button
          onClick={onClick}
          className="w-full h-[36px] text-[13px] font-medium 
                     text-[#FF782A] bg-[#FFF2EA] border border-[#FFD5BD] 
                     rounded-lg"
        >
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  )
}

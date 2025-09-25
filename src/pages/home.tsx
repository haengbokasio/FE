import { MentorStatusCard, ProfileApplyCard, ProfileBadge, ProfileActionCard } from "@/components/profile"

export default function HomePage() {
  return (
    <main className="min-h-screen p-8 flex flex-col items-center gap-6">
      <MentorStatusCard />
      <ProfileApplyCard />
      <ProfileActionCard
        name="김철수"
        desc="식당 · 제주시"
        img="/avatars/mentor-2.jpg"
        buttonText="승인하기"
        onClick={() => alert("승인!")}
      />
      <div className="mt-4">
        <ProfileBadge name="윤수민" desc="카페 · 애월읍" img="/avatars/mentor-1.jpg" />
      </div>
    </main>
  )
}

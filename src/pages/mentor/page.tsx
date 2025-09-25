"use client"

import { useState } from "react"
import { AppHeader } from "@/components/app-header"
import { TabNavigation } from "@/components/tab-navigation"
import { ExpandableMainCard } from "@/components/expandable-main-card"
import { UpcomingMentoringCard } from "@/components/upcoming-mentoring-card"
import { MentorWaitingCard } from "@/components/mentor-waiting-card"

const upcomingMentoring = {
  name: "아메리카노 #99",
  specialty: "식당 · 한림읍",
  avatar: "/americano-99.png",
}

const waitingMentees = [
  {
    id: "1",
    name: "윤수민",
    specialty: "애완점 · N번차",
    avatar: "/yoon-soomin.png",
  },
  {
    id: "2",
    name: "윤수민",
    specialty: "애완점 · N번차",
    avatar: "/yoon-soomin.png",
  },
  {
    id: "3",
    name: "윤수민",
    specialty: "애완점 · N번차",
    avatar: "/yoon-soomin.png",
  },
]

const tabs = [
  { id: "recommendation", label: "추천" },
  { id: "list", label: "목록" },
]

export default function MentorHome() {
  const [activeTab, setActiveTab] = useState("recommendation")

  const handleAccept = (id: string) => {
    console.log("[v0] Accepting mentee:", id)
  }

  const handleReject = (id: string) => {
    console.log("[v0] Rejecting mentee:", id)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader />
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} tabs={tabs} />

      <div className="p-4 space-y-6">
        <ExpandableMainCard />

        {/* Upcoming mentoring section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">곧 멘토링을 시작할 수 있어요</h3>
          <UpcomingMentoringCard {...upcomingMentoring} />
        </div>

        {/* Waiting mentees section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">멘토링을 기다리고 있어요</h3>
          <div className="space-y-3">
            {waitingMentees.map((mentee) => (
              <MentorWaitingCard
                key={mentee.id}
                name={mentee.name}
                specialty={mentee.specialty}
                avatar={mentee.avatar}
                onAccept={() => handleAccept(mentee.id)}
                onReject={() => handleReject(mentee.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

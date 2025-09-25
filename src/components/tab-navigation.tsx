"use client"

import { cn } from "@/lib/utils"

interface TabNavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
  tabs: { id: string; label: string }[]
}

export function TabNavigation({ activeTab, onTabChange, tabs }: TabNavigationProps) {
  return (
    <div className="flex border-b border-gray-200 px-4">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "px-4 py-3 text-sm font-medium border-b-2 transition-colors",
            activeTab === tab.id ? "border-black text-black" : "border-transparent text-gray-500 hover:text-gray-700",
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

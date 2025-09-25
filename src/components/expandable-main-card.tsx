"use client"

import { useState } from "react"
import { Badge } from "./ui/badge"
import { Button } from "@vapor-ui/core"

export function ExpandableMainCard() {
  const [isExpanded, setIsExpanded] = useState(false)

  if (isExpanded) {
    return (
      <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
        <div className="p-4">
          <div className="h-16"></div>
          <div className="h-12 mb-6"></div>
          <div className="bg-white rounded-3xl p-6 relative overflow-hidden min-h-[400px]">
            <div className="space-y-4 mb-8">
              <h2 className="text-2xl font-bold text-gray-900">#성공형 멘토</h2>
              <h2 className="text-2xl font-bold text-gray-900">#끈기있는</h2>
              <h2 className="text-2xl font-bold text-gray-900">#의문의 사나이</h2>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-8">
              당신은 목표를 세우면 끝까지 해내는 추진력이 돋보이는 멘토입니다. 작은 성과에도 만족하지 않고, 구체적인 결과로
              증명하는 것을 중요하게 생각하죠. 도전 속에서 성장하며, 함께하는 이들에게도 성공의 자신감을 전해주는 유형입니다.
            </p>
            <div className="absolute bottom-6 right-8">
              <Button onClick={() => setIsExpanded(false)} className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full">
                확인했어요
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="rounded-[16px] py-6 px-2 text-white relative overflow-hidden"
      style={{ backgroundColor: "#8774FF" }}
      onClick={() => setIsExpanded(true)}
    >
      <div className="inline-flex items-center justify-center h-[23px] px-[10px] rounded-full bg-white/25 shadow-[0_0_12px_9px_rgba(0,0,0,0.05)] text-[12px] leading-[15px] font-medium mb-4">
        ai 분석
      </div>
  
      <div className="flex flex-col gap-4">
        <h2 className="text-[18px] leading-[26px] font-semibold">온라인 홍보 경험이 부족해요!</h2>
          <p className="text-[12px] leading-[15px] tracking-[0.02em] text-[#ECECEC]">
            현재 SNS 채널을 꾸준히 운영하거나 콘텐츠를 제작한 경험이 적어요
          </p>
      </div>
      {/* 장식 요소 (간단 버전) */}
      <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-orange-400 rounded-full" />
      <div className="absolute top-8 right-16 w-3 h-3 bg-yellow-300 rounded-full" />
      <div className="absolute top-12 right-20 w-2 h-2 bg-yellow-300 rounded-full" />
    </div>
  )
}



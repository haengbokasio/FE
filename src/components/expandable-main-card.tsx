"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@vapor-ui/core"

export function ExpandableMainCard() {
  const [isExpanded, setIsExpanded] = useState(false)

  if (isExpanded) {
    return (
      <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
        <div className="p-4">
          {/* Header space */}
          <div className="h-16"></div>

          {/* Tab navigation space */}
          <div className="h-12 mb-6"></div>

          {/* Expanded content */}
          <div className="bg-white rounded-3xl p-6 relative overflow-hidden min-h-[400px]">
            <div className="space-y-4 mb-8">
              <h2 className="text-2xl font-bold text-gray-900">#성공형 멘토</h2>
              <h2 className="text-2xl font-bold text-gray-900">#끈기있는</h2>
              <h2 className="text-2xl font-bold text-gray-900">#의문의 사나이</h2>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed mb-8">
              당신은 목표를 세우면 끝까지 해내는 추진력이 돋보이는 멘토입니다. 작은 성과에도 만족하지 않고, 구체적인
              결과로 증명하는 것을 중요하게 생각하죠. 도전 속에서 성장하며, 함께하는 이들에게도 성공의 자신감을 전해주는
              유형입니다.
            </p>

            {/* Blue characters */}
            <div className="absolute bottom-20 right-8">
              <div className="relative">
                {/* Star character */}
                <div
                  className="w-16 h-16 bg-blue-400 rounded-full relative mb-4"
                  style={{
                    clipPath:
                      "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
                  }}
                >
                  <div className="absolute top-6 left-6 w-2 h-2 bg-black rounded-full"></div>
                  <div className="absolute top-6 left-8 w-2 h-2 bg-black rounded-full"></div>
                </div>

                {/* Cloud character */}
                <div className="w-24 h-16 bg-blue-400 rounded-full relative">
                  <div className="absolute -top-2 left-4 w-8 h-8 bg-blue-400 rounded-full"></div>
                  <div className="absolute -top-1 right-6 w-6 h-6 bg-blue-400 rounded-full"></div>
                  <div className="absolute top-4 left-8 w-4 h-4 bg-black rounded-full"></div>
                  <div className="absolute top-4 left-12 w-4 h-4 bg-black rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Confirm button */}
            <div className="absolute bottom-6 right-8">
              <Button
                onClick={() => setIsExpanded(false)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full"
              >
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
      className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-3xl p-6 text-white relative overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]"
      onClick={() => setIsExpanded(true)}
    >
      <Badge className="bg-white/20 text-white text-xs mb-4">ai 분석</Badge>

      <h2 className="text-xl font-bold mb-2">온라인 홍보 경험이 부족해요!</h2>
      <p className="text-sm opacity-90 mb-6">현재 SNS 채널을 꾸준히 운영하지나 콘텐츠를 제작한 경험이 적어요</p>

      {/* Cute character illustration */}
      <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-orange-400 rounded-full">
        <div className="absolute top-3 left-3 w-4 h-4 bg-green-400 rounded-full"></div>
        <div className="w-8 h-8 bg-black rounded-full absolute top-6 left-6"></div>
        <div className="w-8 h-8 bg-black rounded-full absolute top-6 left-10"></div>
      </div>

      <div className="absolute top-8 right-16 w-3 h-3 bg-yellow-300 rounded-full"></div>
      <div className="absolute top-12 right-20 w-2 h-2 bg-yellow-300 rounded-full"></div>
    </div>
  )
}

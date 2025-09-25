import { Badge } from "@/components/ui/badge"

interface MainCardProps {
  variant?: "default" | "compact"
}

export function MainCard({ variant = "default" }: MainCardProps) {
  if (variant === "compact") {
    return (
      <div className="space-y-4">
        <div className="text-right mb-2">
          <p className="text-lg font-semibold">멘토님의 역량을</p>
          <p className="text-lg font-semibold">분석해봤어요!</p>
          <div className="inline-block w-12 h-12 bg-blue-400 rounded-full mt-2 relative">
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-300 rounded-full"></div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-4 text-white relative overflow-hidden">
            <Badge className="bg-white/20 text-white text-xs mb-3">ai 분석</Badge>
            <h3 className="font-semibold text-sm mb-1">온라인 홍보 경험이 부족해요!</h3>
            <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-orange-400 rounded-full">
              <div className="absolute top-2 left-2 w-3 h-3 bg-green-400 rounded-full"></div>
              <div className="w-6 h-6 bg-black rounded-full absolute top-4 left-4"></div>
              <div className="w-6 h-6 bg-black rounded-full absolute top-4 left-8"></div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-4 text-white relative overflow-hidden">
            <Badge className="bg-white/20 text-white text-xs mb-3">ai 분석</Badge>
            <h3 className="font-semibold text-sm mb-1">마케팅 전략이 약해요!</h3>
            <div className="flex items-center justify-end">
              <span className="text-2xl">?</span>
              <div className="w-8 h-8 bg-green-400 rounded-full ml-2"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-3xl p-6 text-white relative overflow-hidden">
      <Badge className="bg-white/20 text-white text-xs mb-4">ai 분석</Badge>

      <h2 className="text-xl font-bold mb-2">온라인 홍보 경험이 부족해요!</h2>
      <p className="text-sm opacity-90 mb-6">
        현재 SNS 채널을 꾸준히 운영하지
        <br />나 콘텐츠를 제작한 경험이 적어요
      </p>

      <div className="flex items-center gap-2 mb-6">
        <span className="text-sm">✨ Ai기반 멘토 추천</span>
      </div>

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

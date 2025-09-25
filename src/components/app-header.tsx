"use client";

import { useRouter } from "next/navigation";

export function AppHeader() {
  const router = useRouter();

  return (
    <header className="flex items-center justify-between px-4 py-2 h-[50px] bg-white">
      <h1 className="text-[20px] leading-[21px] font-semibold">butty</h1>
      <div
        className="w-[42px] h-[42px] rounded-full bg-gray-300 cursor-pointer"
        onClick={() => router.push("/mentoring")}  // 👈 클릭 시 이동
      />
    </header>
  )
}

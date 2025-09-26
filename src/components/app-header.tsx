"use client";

// import { useRouter } from "next/navigation";
import localFont from "next/font/local";

const hakgyoansim = localFont({
  src: "../../public/fonts/Hakgyoansim Dunggeunmiso TTF B.ttf",
  display: "swap",
  variable: "--font-hakgyoansim",
});

export function AppHeader() {
  // const router = useRouter();

  return (
    <header className="flex items-center justify-between px-4 py-2 h-[50px]">
      <h1
        className={`text-[20px] leading-[21px] font-semibold ${hakgyoansim.className}`}
      >
        장사살랑
      </h1>
      {/* <div
        className="w-[42px] h-[42px] rounded-full bg-gray-300 cursor-pointer"
        onClick={() => router.push("/mentoring")} // 👈 클릭 시 이동
      /> */}
    </header>
  );
}

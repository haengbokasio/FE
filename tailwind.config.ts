// tailwind.config.ts
import type { Config } from "tailwindcss"

export default {
  // Vapor reset을 확실히 이기기 위해 전역 !important
  // (App Router/Pages Router 모두 안전)
  important: '#__next',            // 필요하면 '#__next' 로 바꿔도 됨
  content: [
    "./src/**/*.{ts,tsx,js,jsx}",
    "./components/**/*.{ts,tsx,js,jsx}",
    "./app/**/*.{ts,tsx,js,jsx}",
    "./pages/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Pretendard Variable","Pretendard","system-ui","sans-serif"],
      },
      // 필요시 tokens 확장
    },
  },
} satisfies Config

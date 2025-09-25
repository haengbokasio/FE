import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cn } from "@/lib/utils"

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col", className)}
      {...props}
    />
  )
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        // ✅ 밑줄형 탭바: 배경/라운드/패딩 제거 + 하단 기준선
        "flex w-full items-center gap-0 bg-transparent rounded-none p-0 h-[56px] border-b border-neutral-200",
        className
      )}
      {...props}
    />
  )
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        // ✅ 밑줄은 가상요소로, 활성 상태에서만 보이게
        "relative inline-flex w-[52px] h-[56px] items-center justify-center whitespace-nowrap",
        "text-sm font-medium text-gray-500",
        "bg-transparent rounded-none shadow-none",
        "focus-visible:outline-none focus-visible:ring-0",
        // 밑줄 애니메이션
        "after:content-[''] after:absolute after:left-0 after:-bottom-[1px] after:h-[2px] after:w-full",
        "after:scale-x-0 after:origin-left after:transition-transform after:bg-black",
        "data-[state=active]:text-black data-[state=active]:after:scale-x-100",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }

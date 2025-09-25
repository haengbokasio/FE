import { Menu, User } from "lucide-react"
import { Button } from "@vapor-ui/core"

export function HomeHeader() {
  return (
    <header className="flex items-center justify-between p-4 bg-white">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold">버디</h1>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm">
          <Menu className="h-5 w-5" />
        </Button>
        <span className="text-sm text-gray-600">로그</span>
        <Button variant="ghost" size="sm" className="rounded-full bg-gray-200">
          <User className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">버디</h1>
      </div>
    </header>
  )
}

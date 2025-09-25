interface UpcomingMentoringCardProps {
    name: string
    specialty: string
    avatar: string
  }
  
  export function UpcomingMentoringCard({ name, specialty, avatar }: UpcomingMentoringCardProps) {
    return (
      <div className="flex items-center gap-3 p-4 bg-white rounded-lg">
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <img src={avatar || "/placeholder.svg"} alt={name} className="w-full h-full object-cover" />
        </div>
        <div>
          <h4 className="font-medium text-gray-900">{name}</h4>
          <p className="text-sm text-gray-600">{specialty}</p>
        </div>
      </div>
    )
  }
  
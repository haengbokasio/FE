export function StatusPill({ status }: { status: "신청완료" | "대기중" | "거절" }) {
  const styles: Record<string, string> = {
    신청완료: "bg-[#DEECFF] text-blue-700",
    대기중: "bg-[#FFF4E5] text-orange-700",
    거절: "bg-[#FFEAEA] text-red-700",
  }

  return (

    <span className={`inline-flex items-center justify-center h-[28px] px-3 text-[13px] font-medium ${styles[status]}`}>

      {status}
    </span>
  )
}

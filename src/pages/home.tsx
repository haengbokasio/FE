// import { AppHeader } from "@/components/app-header"
// import { AiMentorSection } from "@/components/ai-mentor-section"
// import { MentorApplicationList } from "@/components/mentor-application-list"
// import { ExpandableMainCard } from "@/components/expandable-main-card"
// import { MentorWaitingCard } from "@/components/mentor-waiting-card"

// const sampleApplications = [
//   {
//     id: "1",
//     name: "윤수민",
//     job: "카페 · 애완점",
//     avatar: "/yoon-soomin.png",
//     status: "completed" as const,
//   },
//   {
//     id: "2",
//     name: "김은수",
//     job: "카페 · 제주시",
//     avatar: "/kim-eunsu.png",
//     status: "waiting" as const,
//   },
//   {
//     id: "3",
//     name: "신명자",
//     job: "식당 · 한림읍",
//     avatar: "/shin-myungja.png",
//     status: "rejected" as const,
//   },
// ]

// const waitingMentors = [
//   {
//     id: "w1",
//     name: "드립커피 #47",
//     specialty: "애월읍 · 1년차",
//     avatar: "/korean-man-cafe-owner.jpg",
//   },
//   {
//     id: "w2",
//     name: "드립커피 #47",
//     specialty: "애월읍 · 1년차",
//     avatar: "/korean-woman-cafe-owner.jpg",
//   },
//   {
//     id: "w3",
//     name: "드립커피 #47",
//     specialty: "애월읍 · 2년차",
//     avatar: "/korean-man-restaurant-owner.jpg",
//   },
// ]

// export default function Home() {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <AppHeader />

//       <div className="p-4 space-y-8">
//         <div className="space-y-2">
//           <h2 className="text-2xl font-bold">추천</h2>
//           <div className="h-1 w-24 bg-black rounded"></div>
//         </div>

//         {/* Main promotional card (expandable) */}
//         <ExpandableMainCard />

//         {/* AI Mentor recommendations */}
//         <AiMentorSection />

//         {/* Mentor application status (badge style list) */}
//         <div className="space-y-4 pt-2">
//           <h3 className="text-lg font-semibold">멘토 신청 현황</h3>
//           <MentorApplicationList applications={sampleApplications} />
//         </div>

//         {/* Waiting mentors with accept / reject actions */}
//         <div className="space-y-4 pt-4">
//           <h3 className="text-lg font-semibold">멘토링을 기다리고 있어요</h3>
//           <div className="space-y-3 bg-white rounded-2xl p-4 shadow-sm">
//             {waitingMentors.map((m) => (
//               <MentorWaitingCard
//                 key={m.id}
//                 name={m.name}
//                 specialty={m.specialty}
//                 avatar={m.avatar}
//                 onAccept={() => {}}
//                 onReject={() => {}}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

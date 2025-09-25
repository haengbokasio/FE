// API 클라이언트와 유틸리티 내보내기
export { apiClient, apiUtils } from "./client";

// 타입들 내보내기
export type {
  LoginCreateResponse,
  MentorAnalysisResult,
  MentiRegisterRequest,
  MentiRegisterResponse,
  MentorRegisterRequest,
  MentorRegisterResponse,
  ConnectedMentor,
  ConnectedMentorList,
  ConnectedMenti,
  ConnectedMentiList,
  CreateMatchingRequest,
  ApproveMatchingRequest,
  RejectMatchingRequest,
  MyPageResponse,
} from "./types";

// API 함수들 내보내기
export { haengbokasioApi } from "./haengbokasio";

// 사용 예시:
// import { haengbokasioApi, MyPageResponse, ConnectedMentorList, ConnectedMentiList } from '@/services/api';
//
// // 로그인 생성
// const loginData = await haengbokasioApi.createLogin();
//
// // 마이페이지 정보 조회
// const kakaoId = "7522502447";
// const myPageData: MyPageResponse = await haengbokasioApi.getMyPage(kakaoId);
//
// // 멘티 기준: 연결된 멘토 리스트 조회
// const mentiKakaoId = 123456;
// const mentors: ConnectedMentorList = await haengbokasioApi.getConnectedMentors(mentiKakaoId);
//
// // 멘토 기준: 연결된 멘티 리스트 조회
// const mentorKakaoId = 789012;
// const mentis: ConnectedMentiList = await haengbokasioApi.getConnectedMentis(mentorKakaoId);
//
// // 매칭 생성 (멘토와 멘티 연결)
// try {
//   await haengbokasioApi.createMatching(mentorKakaoId, mentiKakaoId);
//   console.log("매칭 생성 성공!");
// } catch (error) {
//   console.error("매칭 생성 실패:", error);
// }
//
// // 매칭 승인
// try {
//   await haengbokasioApi.approveMatching(mentorKakaoId, mentiKakaoId);
//   console.log("매칭 승인 성공!");
// } catch (error) {
//   console.error("매칭 승인 실패:", error);
// }
//
// // 매칭 거절
// try {
//   await haengbokasioApi.rejectMatching(mentorKakaoId, mentiKakaoId);
//   console.log("매칭 거절 성공!");
// } catch (error) {
//   console.error("매칭 거절 실패:", error);
// }

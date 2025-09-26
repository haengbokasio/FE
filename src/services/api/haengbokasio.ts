import { apiUtils } from "./client";
import type {
  LoginCreateResponse,
  MentiRegisterRequest,
  MentiRegisterResponse,
  MentorRegisterRequest,
  MentorRegisterResponse,
  ConnectedMentorList,
  ConnectedMentiList,
  MentiOrderByMonthAvgList,
  CreateMatchingRequest,
  ApproveMatchingRequest,
  RejectMatchingRequest,
  MyPageResponse,
} from "./types";

/**
 * 행복아시오 API 함수들
 */
export const haengbokasioApi = {
  /**
   * 로그인 생성
   * POST /login/create
   */
  createLogin: async (): Promise<LoginCreateResponse> => {
    return apiUtils.post<LoginCreateResponse>("/login/create");
  },

  /**
   * 멘티 등록
   * POST /users/menti/register/{kakaoId}
   */
  registerMenti: async (
    kakaoId: string,
    mentiData: MentiRegisterRequest
  ): Promise<MentiRegisterResponse> => {
    return apiUtils.post<MentiRegisterResponse>(
      `/users/menti/register/${kakaoId}`,
      mentiData
    );
  },

  /**
   * 멘토 등록
   * POST /users/mentor/register/{kakaoId}
   */
  registerMentor: async (
    kakaoId: string,
    mentorData: MentorRegisterRequest
  ): Promise<MentorRegisterResponse> => {
    return apiUtils.post<MentorRegisterResponse>(
      `/users/mentor/register/${kakaoId}`,
      mentorData
    );
  },

  /**
   * 연결중인 멘토 리스트 조회 (멘티 기준)
   * GET /matching/mento/{menti_kakaoId}
   */
  getConnectedMentors: async (
    mentiKakaoId: number,
    status?: string[]
  ): Promise<ConnectedMentorList> => {
    const params = new URLSearchParams();
    if (status && status.length > 0) {
      status.forEach((s) => params.append("status", s));
    }

    const queryString = params.toString();
    const url = `/matching/mento/${mentiKakaoId}${queryString ? `?${queryString}` : ""}`;

    return apiUtils.get<ConnectedMentorList>(url);
  },

  /**
   * 연결중인 멘티 리스트 조회 (멘토 기준)
   * GET /matching/menti/{mentor_kakaoId}
   */
  getConnectedMentis: async (
    mentorKakaoId: number
  ): Promise<ConnectedMentiList> => {
    return apiUtils.get<ConnectedMentiList>(`/matching/menti/${mentorKakaoId}`);
  },

  /**
   * 매칭 생성
   * POST /matching/create
   */
  createMatching: async (
    mentorKakaoId: number,
    mentiKakaoId: number
  ): Promise<void> => {
    const requestData: CreateMatchingRequest = {
      mentorKakaoId,
      mentiKakaoId,
    };

    await apiUtils.post<void>("/matching/create", requestData);
  },

  /**
   * 매칭 승인
   * PUT /matching/approve
   */
  approveMatching: async (
    mentorKakaoId: number,
    mentiKakaoId: number
  ): Promise<void> => {
    const requestData: ApproveMatchingRequest = {
      mentorKakaoId,
      mentiKakaoId,
    };

    await apiUtils.put<void>("/matching/approve", requestData);
  },

  /**
   * 매칭 거절
   * PUT /matching/reject
   */
  rejectMatching: async (
    mentorKakaoId: number,
    mentiKakaoId: number
  ): Promise<void> => {
    const requestData: RejectMatchingRequest = {
      mentorKakaoId,
      mentiKakaoId,
    };

    await apiUtils.put<void>("/matching/reject", requestData);
  },

  /**
   * 월 평균 매출 순 멘티 리스트 조회
   * GET /users/mentisOrderByMonthAvg
   */
  getMentisOrderByMonthAvg: async (): Promise<MentiOrderByMonthAvgList> => {
    return apiUtils.get<MentiOrderByMonthAvgList>(
      "/users/mentisOrderByMonthAvg"
    );
  },

  /**
   * 마이페이지 정보 조회
   * GET /users/mypage/{kakaoId}
   */
  getMyPage: async (kakaoId: string): Promise<MyPageResponse> => {
    return apiUtils.get<MyPageResponse>(`/users/mypage/${kakaoId}`);
  },
};

import { apiUtils } from "./client";
import type {
  LoginCreateResponse,
  MentiRegisterRequest,
  MentiRegisterResponse,
  MentorRegisterRequest,
  MentorRegisterResponse,
  ConnectedMentorList,
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
   * 연결중인 멘토 리스트 조회
   * GET /matching/mento/{mento_kakaoId}
   */
  getConnectedMentors: async (
    mentoKakaoId: number
  ): Promise<ConnectedMentorList> => {
    return apiUtils.get<ConnectedMentorList>(`/matching/mento/${mentoKakaoId}`);
  },
};

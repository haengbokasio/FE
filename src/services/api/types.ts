// 로그인 생성 응답 타입
export interface LoginCreateResponse {
  id: number;
  kakaoId: number;
}

// MentorAnalysisResult 타입 (AI 분석 결과)
export interface MentorAnalysisResult {
  strengths: string[];
  topStrengthCopy: string;
  coachingPoints: string[];
}

// 멘티 등록 요청 타입 (body에 실어보낼 데이터) - kakaoId는 path parameter로 제거
export interface MentiRegisterRequest {
  phoneNumber: string;
  businessType: string;
  businessDetail: string;
  businessAddress: string;
  mainProductService: string;
  operationMethod: string;
  supplySource: string;
  operationPeriod: number;
  monthAvgRevenue: number;
  weekAvgDailyRevenue: number;
  targetCustomer: string;
  customerAcquisitionMethod: string;
  marketingMethod: string;
  aiAnalysis: string; // 서버는 문자열을 기대하는 것 같음
}

// 멘티 등록 응답 타입
export interface MentiRegisterResponse {
  kakaoId: number;
  phoneNumber: string;
  businessType: string;
  businessDetail: string;
  businessAddress: string;
  mainProductService: string;
  operationMethod: string;
  supplySource: string;
  operationPeriod: number;
  monthAvgRevenue: number;
  weekAvgDailyRevenue: number;
  targetCustomer: string;
  customerAcquisitionMethod: string;
  marketingMethod: string;
  aiAnalysis: string;
}

// 멘토 등록 요청 타입 (body에 실어보낼 데이터) - kakaoId는 path parameter로 제거
export interface MentorRegisterRequest {
  phoneNumber: string;
  businessType: string;
  businessDetail: string;
  businessAddress: string;
  mainProductService: string;
  operationMethod: string;
  supplySource: string;
  operationPeriod: number;
  monthAvgRevenue: number;
  weekAvgDailyRevenue: number;
  targetCustomer: string;
  customerAcquisitionMethod: string;
  marketingMethod: string;
  aiAnalysis: string; // 서버는 문자열을 기대하는 것 같음
}

// 멘토 등록 응답 타입
export interface MentorRegisterResponse {
  kakaoId: number;
  phoneNumber: string;
  businessType: string;
  businessDetail: string;
  businessAddress: string;
  mainProductService: string;
  operationMethod: string;
  supplySource: string;
  operationPeriod: number;
  monthAvgRevenue: number;
  weekAvgDailyRevenue: number;
  targetCustomer: string;
  customerAcquisitionMethod: string;
  marketingMethod: string;
  aiAnalysis: string;
}

// 연결중인 멘토 리스트 응답 타입
export interface ConnectedMentor {
  id: number;
  kakaoId: number;
  phoneNumber: string;
  businessType: string;
  businessDetail: string;
  operationPeriod: number;
  monthAvgRevenue: number;
  weekAvgDailyRevenue: number;
  businessAddress: string;
  mainProductService: string;
  targetCustomer: string;
  customerAcquisitionMethod: string;
  marketingMethod: string;
  operationMethod: string;
  supplySource: string;
  aiAnalysis: string;
}

export type ConnectedMentorList = ConnectedMentor[];

// 연결중인 멘티 리스트 응답 타입 (멘토와 동일한 구조)
export interface ConnectedMenti {
  id: number;
  kakaoId: number;
  phoneNumber: string;
  businessType: string;
  businessDetail: string;
  operationPeriod: number;
  monthAvgRevenue: number;
  weekAvgDailyRevenue: number;
  businessAddress: string;
  mainProductService: string;
  targetCustomer: string;
  customerAcquisitionMethod: string;
  marketingMethod: string;
  operationMethod: string;
  supplySource: string;
  aiAnalysis: string;
}

export type ConnectedMentiList = ConnectedMenti[];

// 월 평균 매출 순 멘티 리스트 응답 타입
export interface MentiOrderByMonthAvg {
  id: number;
  kakaoId: number;
  phoneNumber: string;
  businessType: string;
  businessDetail: string;
  businessAddress: string;
  mainProductService: string;
  operationMethod: string;
  supplySource: string;
  operationPeriod: number;
  monthAvgRevenue: number;
  weekAvgDailyRevenue: number;
  targetCustomer: string;
  customerAcquisitionMethod: string;
  marketingMethod: string;
  aiAnalysis: string;
}

export type MentiOrderByMonthAvgList = MentiOrderByMonthAvg[];

// 매칭 생성 요청 타입
export interface CreateMatchingRequest {
  mentorKakaoId: number;
  mentiKakaoId: number;
}

// 매칭 승인 요청 타입
export interface ApproveMatchingRequest {
  mentorKakaoId: number;
  mentiKakaoId: number;
}

// 매칭 거절 요청 타입
export interface RejectMatchingRequest {
  mentorKakaoId: number;
  mentiKakaoId: number;
}

// 마이페이지 응답 타입
export interface MyPageResponse {
  kakaoId: number;
  phoneNumber: string;
  businessType: string;
  businessDetail: string;
  businessAddress: string;
  mainProductService: string;
  operationMethod: string;
  supplySource: string;
  operationPeriod: number;
  monthAvgRevenue: number;
  weekAvgDailyRevenue: number;
  targetCustomer: string;
  customerAcquisitionMethod: string;
  marketingMethod: string;
  aiAnalysis: string;
}

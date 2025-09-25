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

// 멘티 등록 요청 타입 (body에 실어보낼 데이터)
export interface MentiRegisterRequest {
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

// 멘토 등록 요청 타입 (body에 실어보낼 데이터)
export interface MentorRegisterRequest {
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

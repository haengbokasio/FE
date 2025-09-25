// 주 고객층 타입 정의
export enum CustomerType {
  TOURIST = "관광객",
  TEENS = "10대 도민",
  TWENTIES_THIRTIES = "20~30대 도민",
  FORTIES_FIFTIES = "40~50대 도민",
  SIXTIES_PLUS = "60대 이상",
}

export const CUSTOMER_OPTIONS = Object.values(CustomerType);

export enum MarketingMethod {
  SNS_OPERATION = "SNS 운영",
  SEARCH_AD = "검색 광고",
  SNS_AD = "SNS 광고",
  EXPERIENCE = "체험단",
  OTHER = "기타",
}

export const MARKETING_OPTIONS = Object.values(MarketingMethod);

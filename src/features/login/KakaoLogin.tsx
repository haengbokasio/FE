const KakaoLogin = () => {
  const Rest_api_key = process.env.NEXT_PUBLIC_REST_API_KEY;
  const redirect_uri = "http://localhost:3000"; //Redirect URI
  // oauth 요청 URL
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${Rest_api_key}&redirect_uri=${redirect_uri}`;
  const handleLogin = () => {
    window.location.href = kakaoURL;
  };
  return (
    <>
      <button onClick={handleLogin}>카카오 로그인</button>
    </>
  );
};
export default KakaoLogin;

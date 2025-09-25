import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>장사살랑 - 제주도 소상 공인 멘토링 플랫폼</title>
        <meta name="description" content="제주도 소상 공인 멘토링 플랫폼" />
        <link rel="icon" href="/mainIcons.svg" />
        <link rel="alternate icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/variable/pretendardvariable.css"
        />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

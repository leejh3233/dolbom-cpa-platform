"use client";

import { useEffect, useState } from "react";

export default function RefPageClient() {
  const [code, setCode] = useState("");

  // 브라우저에서만 코드 읽기
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const refCode = params.get("code") || "";
      setCode(refCode);

      // 30일짜리 쿠키 저장 (선택)
      document.cookie = `ref=${refCode}; path=/; max-age=2592000`;

      // 0.2초 뒤 카카오 채널로 이동
      setTimeout(() => {
        window.location.href =
          `https://pf.kakao.com/_UMyBK/chat?ref=${refCode}`;
      }, 200);
    }
  }, []);

  return (
    <div style={{ padding: "30px", fontSize: "20px" }}>
      상담 연결 중입니다… 잠시만 기다려주세요.
      <br />
      직원코드: {code}
    </div>
  );
}

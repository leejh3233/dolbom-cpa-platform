"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function RefPage(): JSX.Element {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  useEffect(() => {
    if (!code) return;

    // 직원 코드 쿠키 저장 (30일 유지)
    document.cookie = `ref=${code}; path=/; max-age=2592000`;

    // 0.2초 뒤 카카오채널로 이동
    const timer = setTimeout(() => {
      window.location.href = "https://pf.kakao.com/_UMyBK/chat";
    }, 200);

    return () => clearTimeout(timer);
  }, [code]);

  return (
    <div style={{ padding: 40, fontSize: 24 }}>
      상담 연결 중입니다… 잠시만 기다려주세요.
    </div>
  );
}

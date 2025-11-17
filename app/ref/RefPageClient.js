"use client";

import { useEffect, useState } from "react";

export default function RefPageClient() {
  const [code, setCode] = useState("");

  // URL 파라미터 읽기 (CSR 전용 방식)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const refCode = params.get("code") || "";
      setCode(refCode);
    }
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>직원 코드 확인 페이지</h2>
      <p>code: {code}</p>

      <a
        href={`https://pf.kakao.com/_UMyBK/chat?ref=${code}`}
        target="_blank"
        style={{
          display: "inline-block",
          marginTop: "20px",
          padding: "10px 16px",
          background: "#00b900",
          color: "white",
          borderRadius: "8px",
        }}
      >
        카카오톡 상담 바로가기
      </a>
    </div>
  );
}

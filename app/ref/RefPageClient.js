"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function RefPageClient() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  return (
    <div style={{ padding: "20px" }}>
      <h1>직원 코드 확인</h1>

      {!code && (
        <p>잘못된 접근입니다. 직원 코드가 없습니다.</p>
      )}

      {code && (
        <>
          <p>직원 코드: <strong>{code}</strong></p>

          <Link
            href={`/apply?staff=${code}`}
            style={{
              display: "inline-block",
              marginTop: "20px",
              padding: "10px 20px",
              background: "green",
              color: "white",
              borderRadius: "6px"
            }}
          >
            상담 신청하러 가기
          </Link>
        </>
      )}
    </div>
  );
}

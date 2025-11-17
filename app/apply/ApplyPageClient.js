"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const employees = [
  { name: "허민석", code: "hms_ad", team: "마케팅/광고" },
  { name: "이아람", code: "iar_ad", team: "마케팅/광고" },

  { name: "김소현", code: "ksh_cs", team: "상담(CS)" },

  { name: "이준형", code: "ljh_bs", team: "부산팀" },
  { name: "송주환", code: "sjh_bs", team: "부산팀" },
  { name: "강승재", code: "ksj_bs", team: "부산팀" },
  { name: "강동민", code: "kdm_bs", team: "부산팀" },
  { name: "김호진", code: "khj_bs", team: "부산팀" },
  { name: "최윤철", code: "cyc_bs", team: "부산팀" },
  { name: "이세옥", code: "lso_bs", team: "부산팀" },

  { name: "이민우", code: "lmw_gg", team: "경기도팀" },
  { name: "박선재", code: "psj_gg", team: "경기도팀" },
  { name: "장현진", code: "jhj_gg", team: "경기도팀" },
  { name: "황찬진", code: "hcj_gg", team: "경기도팀" },
  { name: "이해승", code: "lhs_gg", team: "경기도팀" },
  { name: "유현수", code: "yhs_gg", team: "경기도팀" },
  { name: "김재문", code: "kjm_gg", team: "경기도팀" },
  { name: "전재민", code: "jjm_gg", team: "경기도팀" },
];

function getRefFromCookie() {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^|;\s*)ref=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}

export default function ApplyPageClient() {
  const searchParams = useSearchParams();

  const [refCode, setRefCode] = useState(null);
  const [refEmployee, setRefEmployee] = useState(null);

  const [aptRegion, setAptRegion] = useState("");
  const [pyung, setPyung] = useState("");
  const [extension, setExtension] = useState("");
  const [scope, setScope] = useState("");
  const [memo, setMemo] = useState("");

  // URL 코드 > 쿠키 코드
  useEffect(() => {
    const cookieCode = getRefFromCookie();
    const urlCode = searchParams.get("code");

    const finalCode = urlCode || cookieCode || null;

    if (urlCode) {
      document.cookie = `ref=${urlCode}; path=/; max-age=2592000`;
    }

    setRefCode(finalCode);

    if (finalCode) {
      const emp = employees.find((e) => e.code === finalCode);
      if (emp) setRefEmployee(emp);
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const 담당직원텍스트 = refEmployee
      ? `${refEmployee.team} ${refEmployee.name} (${refEmployee.code})`
      : refCode
      ? `알 수 없는 직원 코드: ${refCode}`
      : "담당 직원 정보 없음";

    const message =
      `[돌봄매트 상담 신청]\n` +
      `담당 직원: ${담당직원텍스트}\n\n` +
      `아파트명+지역: ${aptRegion || "-"}\n` +
      `평수: ${pyung || "-"}\n` +
      `확장여부: ${extension || "-"}\n` +
      `시공범위: ${scope || "-"}\n` +
      `궁금하신 내용:\n${memo || "-"}`;

    try {
      await navigator.clipboard.writeText(message);
      alert(
        "상담 신청 내용이 복사되었습니다.\n\n" +
          "열리는 카카오 채널 채팅창에 붙여넣기 후 전송해 주세요."
      );
    } catch (err) {
      alert(
        "자동 복사에 실패했습니다.\n\n" +
          "다음 내용을 직접 복사해서 카카오 채팅에 붙여넣어 주세요.\n\n" +
          message
      );
    }

    window.location.href = "https://pf.kakao.com/_UMyBK/chat";

    setAptRegion("");
    setPyung("");
    setExtension("");
    setScope("");
    setMemo("");
  };

  return (
    <div
      style={{
        padding: "32px",
        maxWidth: "640px",
        margin: "0 auto",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "26px", fontWeight: 700, marginBottom: "8px" }}>
        돌봄매트 상담 신청
      </h1>
      <p style={{ marginBottom: "20px", color: "#555", fontSize: "14px" }}>
        기본 정보와 시공 희망 내용을 작성해 주시면 담당 직원이 확인 후 연락드립니다.
      </p>

      <div
        style={{
          marginBottom: "16px",
          padding: "12px 16px",
          borderRadius: "8px",
          backgroundColor: "#f5f5f5",
          fontSize: "14px",
          color: "#333",
        }}
      >
        <div style={{ marginBottom: "4px", fontWeight: 600 }}>담당 직원</div>
        {refEmployee ? (
          <div>
            {refEmployee.team} {refEmployee.name} ({refEmployee.code})
          </div>
        ) : refCode ? (
          <div>알 수 없는 직원 코드: {refCode}</div>
        ) : (
          <div>
            담당 직원 정보가 없습니다. (직원 전용 링크가 아닌 경로로 들어온 경우)
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "12px" }}>
          <label style={{ display: "block", marginBottom: "4px", fontSize: "14px" }}>
            아파트명+지역
          </label>
          <input
            type="text"
            value={aptRegion}
            onChange={(e) => setAptRegion(e.target.value)}
            placeholder="예: 망미동 ○○아파트, 부산 수영구"
            style={{
              width: "100%",
              padding: "8px 10px",
              borderRadius: "6px",
              border: "1px solid "#ccc",
              fontSize: "14px",
            }}
          />
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label style={{ display: "block", marginBottom: "4px", fontSize: "14px" }}>
            평수
          </label>
          <input
            type="text"
            value={pyung}
            onChange={(e) => setPyung(e.target.value)}
            placeholder="예: 34평, B타입"
            style={{
              width: "100%",
              padding: "8px 10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              fontSize: "14px",
            }}
          />
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label style={{ display: "block", marginBottom: "4px", fontSize: "14px" }}>
            확장여부
          </label>
          <input
            type="text"
            value={extension}
            onChange={(e) => setExtension(e.target.value)}
            placeholder="예: 확장, 비확장"
            style={{
              width: "100%",
              padding: "8px 10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              fontSize: "14px",
            }}
          />
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label style={{ display: "block", marginBottom: "4px", fontSize: "14px" }}>
            시공범위
          </label>
          <input
            type="text"
            value={scope}
            onChange={(e) => setScope(e.target.value)}
            placeholder="예: 거실+복도+주방"
            style={{
              width: "100%",
              padding: "8px 10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              fontSize: "14px",
            }}
          />
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label style={{ display: "block", marginBottom: "4px", fontSize: "14px" }}>
            궁금하신 내용
          </label>
          <textarea
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            rows={4}
            placeholder="궁금한 사항 자유롭게 적어주세요."
            style={{
              width: "100%",
              padding: "8px 10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              fontSize: "14px",
              resize: "vertical",
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
            border: "none",
            fontSize: "16px",
            fontWeight: 600,
            cursor: "pointer",
            backgroundColor: "#2e7d32",
            color: "#fff",
          }}
        >
          상담 신청하기
        </button>
      </form>

      <p style={{ marginTop: "12px", fontSize: "12px", color: "#777" }}>
        ※ 버튼을 누르면 상담 내용이 자동으로 복사되고, 카카오 채널 채팅창이 열립니다. 열리는
        채팅창에 붙여넣기 후 전송해 주세요.
      </p>
    </div>
  );
}

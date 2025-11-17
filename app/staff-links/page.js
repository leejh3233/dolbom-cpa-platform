"use client";

import { useEffect, useState } from "react";

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

export default function StaffLinksPage() {
  const [baseChatUrl, setBaseChatUrl] = useState("");
  const [baseFormUrl, setBaseFormUrl] = useState("");
  const [copied, setCopied] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const origin = window.location.origin;
      setBaseChatUrl(origin + "/ref?code=");
      setBaseFormUrl(origin + "/apply?code=");
    }
  }, []);

  const handleCopy = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(url);
      setTimeout(() => setCopied(null), 1500);
    } catch (err) {
      alert("클립보드 복사에 실패했습니다. 직접 복사해 주세요.");
    }
  };

  return (
    <div
      style={{
        padding: "32px",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "28px", fontWeight: 700, marginBottom: "8px" }}>
        직원 전용 상담 URL 생성
      </h1>
      <p style={{ marginBottom: "16px", color: "#555", fontSize: "14px" }}>
        각 직원별 상담폼 링크와 바로 채팅 링크를 복사해 카카오채널 홍보, 블로그, 문자 등에
        사용하세요.
      </p>

      <div
        style={{
          marginBottom: "16px",
          padding: "12px 16px",
          borderRadius: "8px",
          backgroundColor: "#f5f5f5",
          fontSize: "13px",
          color: "#333",
        }}
      >
        <div style={{ marginBottom: "4px" }}>
          <strong>설명</strong>
        </div>
        <div>• 상담폼 링크: 고객이 폼 작성 → 내용 자동복사 → 카카오 채팅창 열림</div>
        <div>• 바로 채팅 링크: 폼 없이 곧바로 카카오 채팅창으로 이동</div>
      </div>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "13px",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f0f0f0" }}>
            <th style={{ border: "1px solid #ddd", padding: 8, width: 100 }}>팀</th>
            <th style={{ border: "1px solid #ddd", padding: 8, width: 80 }}>이름</th>
            <th style={{ border: "1px solid #ddd", padding: 8, width: 120 }}>코드</th>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>상담폼 링크</th>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>바로 채팅 링크</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => {
            const formUrl = baseFormUrl ? baseFormUrl + emp.code : emp.code;
            const chatUrl = baseChatUrl ? baseChatUrl + emp.code : emp.code;

            return (
              <tr key={emp.code}>
                <td style={{ border: "1px solid #eee", padding: 8, textAlign: "center" }}>
                  {emp.team}
                </td>
                <td style={{ border: "1px solid #eee", padding: 8, textAlign: "center" }}>
                  {emp.name}
                </td>
                <td
                  style={{
                    border: "1px solid #eee",
                    padding: 8,
                    textAlign: "center",
                    fontFamily: "monospace",
                  }}
                >
                  {emp.code}
                </td>
                <td
                  style={{
                    border: "1px solid #eee",
                    padding: 8,
                    fontFamily: "monospace",
                  }}
                >
                  <div style={{ marginBottom: 4, overflowX: "auto" }}>{formUrl}</div>
                  <button
                    onClick={() => handleCopy(formUrl)}
                    style={{
                      padding: "4px 8px",
                      fontSize: 12,
                      borderRadius: 6,
                      border: "1px solid #ccc",
                      cursor: "pointer",
                      backgroundColor: copied === formUrl ? "#4caf50" : "#fff",
                      color: copied === formUrl ? "#fff" : "#333",
                    }}
                  >
                    {copied === formUrl ? "복사됨" : "폼 링크 복사"}
                  </button>
                </td>
                <td
                  style={{
                    border: "1px solid #eee",
                    padding: 8,
                    fontFamily: "monospace",
                  }}
                >
                  <div style={{ marginBottom: 4, overflowX: "auto" }}>{chatUrl}</div>
                  <button
                    onClick={() => handleCopy(chatUrl)}
                    style={{
                      padding: "4px 8px",
                      fontSize: 12,
                      borderRadius: 6,
                      border: "1px solid #ccc",
                      cursor: "pointer",
                      backgroundColor: copied === chatUrl ? "#4caf50" : "#fff",
                      color: copied === chatUrl ? "#fff" : "#333",
                    }}
                  >
                    {copied === chatUrl ? "복사됨" : "채팅 링크 복사"}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <p style={{ marginTop: 16, fontSize: 12, color: "#777" }}>
        👉 직원들에게는 보통 “상담폼 링크”를 안내하고, 빠른 문의용으로는 “바로 채팅 링크”를
        사용할 수 있습니다.
      </p>
    </div>
  );
}

import { Suspense } from "react";
import ApplyPageClient from "./ApplyPageClient";

export default function ApplyPage() {
  return (
    <Suspense fallback={<div style={{ padding: 40 }}>로딩 중입니다…</div>}>
      <ApplyPageClient />
    </Suspense>
  );
}

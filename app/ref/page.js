import { Suspense } from "react";
import RefPageClient from "./RefPageClient";

export default function RefPage() {
  return (
    <Suspense fallback={<div style={{ padding: 40 }}>연결 중입니다…</div>}>
      <RefPageClient />
    </Suspense>
  );
}

import { Suspense } from "react";
import RefPageClient from "./RefPageClient";

export default function RefPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RefPageClient />
    </Suspense>
  );
}

"use client";

import dynamic from "next/dynamic";

const RefPageClient = dynamic(() => import("./RefPageClient"), {
  ssr: false,
});

export default function RefPage() {
  return <RefPageClient />;
}

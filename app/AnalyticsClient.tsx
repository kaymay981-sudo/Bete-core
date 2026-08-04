"use client";

import { Analytics } from "@vercel/analytics/next";

export default function AnalyticsClient() {
  // Enable analytics only when NEXT_PUBLIC_ENABLE_ANALYTICS is set to "1"
  // This value is baked into the client bundle at build time.
  if (process.env.NEXT_PUBLIC_ENABLE_ANALYTICS !== "1") return null;

  return <Analytics />;
}

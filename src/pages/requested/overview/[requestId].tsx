import RequestedTimeline from "@/components/requested/RequestedTimeline";
import { useRouter } from "next/router";
import React from "react";

export default function Page() {
  const router = useRouter();
  const requestId = router.query.requestId as string | undefined;
  return <RequestedTimeline requestId={requestId} overview />;
}

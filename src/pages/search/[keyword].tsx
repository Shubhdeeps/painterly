import Header from "@/components/headings/Header";
import Member from "@/components/userProfile/components/Member";
import { useRouter } from "next/router";
import React from "react";

export default function Page() {
  const router = useRouter();
  const { keyword } = router.query;
  return (
    <div className="d-flex flex-column">
      <Header title="SEARCH" />
      <div className="secondary-bg border-radius-14 p-3 mt-2">
        <span className="fontSecondary text-4 fw-bold">Keyword: </span>
        <span>{keyword}</span>
        <div className="d-flex flex-wrap gap-5 mt-4">
          <Member date={undefined} size="md" src={undefined} title="Simon" />
          <Member date={undefined} size="md" src={undefined} title="Simon" />
          <Member date={undefined} size="md" src={undefined} title="Simon" />
          <Member date={undefined} size="md" src={undefined} title="Simon" />
          <Member date={undefined} size="md" src={undefined} title="Simon" />
          <Member date={undefined} size="md" src={undefined} title="Simon" />
          <Member date={undefined} size="md" src={undefined} title="Simon" />
          <Member date={undefined} size="md" src={undefined} title="Simon" />
          <Member date={undefined} size="md" src={undefined} title="Simon" />
        </div>
      </div>
    </div>
  );
}

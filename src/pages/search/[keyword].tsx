import React, { useEffect, useState } from "react";
import Header from "@/components/headings/Header";
import Member from "@/components/userProfile/components/Member";
import { Profile } from "@/models/Profile";
import { useRouter } from "next/router";
import { searchUserByName } from "@/services/firestore/search/searchUserByName";
import Loader from "@/components/loader/Loader";

export default function Page() {
  const router = useRouter();
  const [users, setUsers] = useState<Profile[] | null>(null);
  const keyword = router.query.keyword as string;

  useEffect(() => {
    if (keyword) {
      (async () => {
        const data = await searchUserByName(keyword);
        setUsers(data);
      })();
    }
  }, [keyword]);

  if (!keyword) {
    return <>Empty</>;
  }
  if (!users) {
    return <Loader text="Searching..." />;
  }
  return (
    <div className="d-flex flex-column">
      <Header title="SEARCH" />
      <div className="secondary-bg border-radius-14 p-3 mt-2">
        <span className="fontSecondary text-4 fw-bold">Keyword: </span>
        <span>{keyword}</span>
        <div className="d-flex flex-wrap gap-5 mt-4">
          {users.map((user) => {
            return (
              <React.Fragment key={user.uid}>
                <Member
                  date={undefined}
                  size="md"
                  src={user.profileURL}
                  title={user.displayName}
                  uid={user.uid}
                />
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}

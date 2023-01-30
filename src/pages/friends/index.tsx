import Link from "next/link";
import React from "react";

export default function Page({ users }: { users: any }) {
  return (
    <div>
      List of Friends
      {users.map((post: any, ind: number) => {
        return (
          <React.Fragment key={post.id}>
            <div className="secondary-bg d-flex gap-2 align-items-center p-2 mb-2">
              <Link href={`friends/${post.id}`}>
                <h4>
                  {" "}
                  {ind + 1}. {post.title}
                </h4>
              </Link>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}

export async function getStaticProps() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await response.json();

  return {
    props: {
      users: data,
    },
  };
}

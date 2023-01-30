import Link from "next/link";
import PrimaryHighlighter from "../highlighter/PrimaryHighlighter";
import { useRouter } from "next/router";

const paths: { [title: string]: string } = {
  all: "all",
  friends: "friends",
  favourite: "favourite",
  requested: "requested",
  faqs: "faqs",
  "privacy%20policy": "privacy policy",
  "contact%20us": "contact us",
  "about%20us": "about us",
  feedback: "feedback",
};

export function NavButton({
  title,
  path,
}: {
  title: string;
  path: string | undefined;
}) {
  const router = useRouter();
  const currActivePath = paths[router.asPath.split("/")[1]];
  return (
    <div
      onClick={() => router.replace(path ? path : `/${title.toLowerCase()}`)}
      className="w-100"
    >
      <div className="position-relative text-center d-flex justify-content-center nav-button w-100">
        <span
          className={`${
            currActivePath !== title.toLowerCase() && "cursor"
          } z-1 noselect`}
        >
          {title}
        </span>
        {currActivePath === title.toLowerCase() && (
          <div
            style={{
              position: "absolute",
              top: "0px",
            }}
          >
            <PrimaryHighlighter />
          </div>
        )}
      </div>
    </div>
  );
}

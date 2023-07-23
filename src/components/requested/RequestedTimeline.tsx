import * as React from "react";
import TimelineImage from "./timeline/TimelineImage";
import TimelineWrapper from "./timeline/TimelineWrapper";
import { Box, Typography } from "@mui/material";
import { RequestedArt, Timeline, TimelineComment } from "@/models/Timeline";
import {
  createTimelineComment,
  createTimelineImage,
  getTimelineRequestBasedOnRequestId,
} from "@/services/firestore/requests/timeline";
import Loader from "../loader/Loader";
import Comment from "../comment";
import { auth } from "@/services/firebaseConfig";
import CreateComment from "../comment/CreateComment";
import { mui_consts } from "@/styles/mui";
import NewPost from "../modals/NewPost";
export default function RequestedTimeline({
  requestId,
}: {
  requestId: string;
}) {
  const [timelinePost, setTimelinePost] = React.useState<
    (TimelineComment | RequestedArt)[]
  >([]);
  const [loading, setLoading] = React.useState(false);
  const [timeline, setTimelineData] = React.useState<Timeline | null>(null);
  const [number, setNumber] = React.useState(0);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  // const commentRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    (async function fetch() {
      setLoading(true);
      const { outputTimeline, timelineData } =
        await getTimelineRequestBasedOnRequestId(requestId);
      setTimelinePost(outputTimeline);
      setTimelineData(timelineData);
      setLoading(false);
    })();
  }, [requestId, number]);

  if (!timelinePost.length || !timeline) {
    return (
      <>
        <Loader text="Fetching request..." />
      </>
    );
  }

  function updateImageCallBack(image: File) {
    createTimelineImage(timeline!, image);
  }

  return (
    <>
      {isOpen && (
        <NewPost
          isOpen={isOpen}
          setOpen={setIsOpen}
          callbackForTimeline={updateImageCallBack}
        />
      )}
      <TimelineWrapper bottomLine>
        <Box p={1} py={2}>
          <Typography
            sx={{
              height: "fit-content",
              color: mui_consts.fontSecondary,
              fontWeight: 300,
              fontSize: 18,
            }}
          >
            {timeline.description}
          </Typography>
        </Box>
      </TimelineWrapper>
      {timelinePost.map((content, index) => {
        return (
          <React.Fragment key={content.itemNumber}>
            {content.type === "image" && (
              <TimelineImage
                created={content.created}
                imageURL={content.imageURL}
                bottomLine
              />
            )}
            {content.type === "comment" && (
              <TimelineWrapper bottomLine>
                <Comment
                  comment={content}
                  highlighted={false}
                  currUserId={auth.currentUser?.uid}
                />
              </TimelineWrapper>
            )}
          </React.Fragment>
        );
      })}
      {loading ? (
        <Loader text="" />
      ) : (
        <TimelineWrapper>
          <CreateComment
            postAuthorId={timeline!.requestAuthor}
            postId={timeline!.requestId}
            callbackForTimeline={async (text: string) => {
              await createTimelineComment(timeline, text);
              setNumber((prev) => prev + 1);
            }}
          />

          {/* <Typography
            sx={{
              height: "fit-content",
              p: 1,
              cursor: "pointer",
              color: mui_consts.primary,
            }}
            onClick={() => setIsOpen(true)}
          >
            Upload image
          </Typography> */}
        </TimelineWrapper>
      )}
    </>
  );
}

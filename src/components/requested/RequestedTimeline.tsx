import React from "react";
import TimelineImage from "./timeline/TimelineImage";
import TimelineWrapper from "./timeline/TimelineWrapper";
import { Box, Button, Typography } from "@mui/material";
import { RequestedArt, Timeline, TimelineComment } from "@/models/Timeline";
import {
  createTimelineComment,
  createTimelineImage,
  deleteTimelineItem,
  getTimelineRequestBasedOnRequestId,
  requestAcceptedOrRejectedByMentor,
} from "@/services/firestore/requests/timeline";
import Loader from "../loader/Loader";
import Comment from "../comment";
import { auth } from "@/services/firebaseConfig";
import CreateComment from "../comment/CreateComment";
import { mui_consts } from "@/styles/mui";
import InputFileUploader from "../inputFields/InputFileUploader";
import { useRouter } from "next/router";
import RequestReviewModal from "../modals/RequestReviewModal";

export default function RequestedTimeline({
  requestId,
  overview,
}: {
  requestId?: string;
  overview?: boolean;
}) {
  const [timelinePost, setTimelinePost] = React.useState<
    (TimelineComment | RequestedArt | null)[]
  >([]);

  const currUserID = auth.currentUser?.uid;
  const [loading, setLoading] = React.useState(false);
  const [timeline, setTimelineData] = React.useState<Timeline | null>(null);
  const [number, setNumber] = React.useState(0);
  const [error, setError] = React.useState("");
  const [requestReview, setRequestReview] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    if (!requestId) {
      return;
    }
    (async function fetch() {
      setLoading(true);
      try {
        const { outputTimeline, timelineData } =
          await getTimelineRequestBasedOnRequestId(requestId);
        setTimelinePost(outputTimeline);
        setTimelineData(timelineData);
        setLoading(false);
      } catch (e: any) {
        setError(e.message);
      }
    })();
  }, [requestId, number]);

  if (!requestId) {
    return <>No request found!</>;
  }
  if (!!error) {
    return <Typography>{error}</Typography>;
  }
  if (!timelinePost.length || !timeline) {
    return (
      <>
        <Loader text="Fetching request..." />
      </>
    );
  }

  if (!currUserID) {
    return <>No access</>;
  }

  const belongToCurrUser = currUserID === timeline.requestAuthor;
  const belongToCurrAssignee = currUserID === timeline.assigneeId;
  const currUserCanOverview = timeline.requestedTo.includes(currUserID);

  if (
    (overview && !currUserCanOverview) ||
    (!overview && !belongToCurrAssignee && !belongToCurrUser)
  ) {
    return <Typography>Access denied</Typography>;
  }

  async function updateImageCallBack(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      await createTimelineImage(timeline!, e.target.files[0]);
      handleRefreshTimeline();
    }
  }

  async function deleteTimelineItemBasedONItemNumber(itemNumber: number) {
    if (timeline) {
      await deleteTimelineItem(timeline?.requestId, itemNumber);
      handleRefreshTimeline();
    }
  }

  function handleRefreshTimeline() {
    setNumber((prev) => prev + 1);
  }

  async function acceptOrRejectReview(status: "accept" | "reject") {
    if (timeline) {
      await requestAcceptedOrRejectedByMentor(timeline, status);

      if (status === "accept") {
        router.push(`/requested/${timeline.requestId}`);
      } else {
        router.push("/requested");
      }
    }
  }

  function handleSendRequests(val: boolean) {
    setRequestReview(val);
    handleRefreshTimeline();
  }
  return (
    <>
      {requestReview && (
        <RequestReviewModal
          timelineData={timeline}
          isOpen={requestReview}
          setOpen={handleSendRequests}
        />
      )}
      {/* belong to current user and no author assigned */}
      {currUserID === timeline.requestAuthor && !timeline.assigneeId && (
        <Button
          disabled={!!timeline.requestedTo.length}
          onClick={() => setRequestReview(true)}
          variant="contained"
          sx={{
            background: mui_consts.secondary,
            py: 2,
            borderRadius: "18px",
            width: "fit-content",
            px: 5,
            mb: 2,
            color: mui_consts.fontPrimary,
            "&:focus": {
              border: "none",
              outline: "none",
            },
            "&:disabled": {
              color: "gray",
            },
          }}
        >
          Request for a review
        </Button>
      )}
      <TimelineWrapper created={timeline.created} bottomLine>
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
      {timelinePost.map((content, ind) => {
        if (!content) {
          return (
            <TimelineWrapper bottomLine key={ind + 1}>
              <Box py={1} px={2}>
                Comment Deleted!
              </Box>
            </TimelineWrapper>
          );
        }
        return (
          <React.Fragment key={content.itemNumber}>
            {content.type === "image" && (
              <TimelineImage
                created={content.created}
                imageURL={content.imageURL}
                bottomLine
                isMentor={content.isMentor}
              />
            )}
            {content.type === "comment" && (
              <TimelineWrapper bottomLine created={content.date}>
                <Comment
                  handleDelete={() =>
                    deleteTimelineItemBasedONItemNumber(content.itemNumber)
                  }
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
        <>
          {!overview ? (
            <>
              <TimelineWrapper bottomLine>
                <CreateComment
                  postAuthorId={timeline!.requestAuthor}
                  postId={timeline!.requestId}
                  callbackForTimeline={async (text: string) => {
                    await createTimelineComment(timeline, text);
                    handleRefreshTimeline();
                  }}
                />
              </TimelineWrapper>

              <Box
                sx={{
                  background: mui_consts.secondary,
                  p: 0.5,
                  borderRadius: "18px",
                  width: "fit-content",
                }}
              >
                <InputFileUploader handleImageUpload={updateImageCallBack} />
              </Box>
            </>
          ) : (
            <>
              <Button
                variant="outlined"
                sx={{
                  background: mui_consts.secondary,
                  py: 1,
                  borderRadius: "18px",
                  width: "fit-content",
                  px: 5,
                  color: mui_consts.fontPrimary,
                  "&:hover": {
                    border: `1px solid white`,
                  },
                  "&:focus": {
                    border: "none",
                    outline: "none",
                  },
                }}
                onClick={() => acceptOrRejectReview("reject")}
              >
                Reject review
              </Button>
              <Button
                variant="outlined"
                sx={{
                  ml: 1,
                  background: mui_consts.secondary,
                  py: 1,
                  borderRadius: "18px",
                  width: "fit-content",
                  px: 3,
                  color: mui_consts.primary,
                  "&:hover": {
                    border: `1px solid ${mui_consts.primary}`,
                  },
                  "&:focus": {
                    border: "none",
                    outline: "none",
                  },
                }}
                onClick={() => acceptOrRejectReview("accept")}
              >
                Accept review
              </Button>
            </>
          )}
        </>
      )}
    </>
  );
}

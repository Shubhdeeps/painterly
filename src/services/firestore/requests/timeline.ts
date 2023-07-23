import { ArtRequests } from "@/models/Requests";
import { RequestedArt, Timeline, TimelineComment } from "@/models/Timeline";
import {
  Timestamp,
  auth,
  firestore,
  serverTimestamp,
} from "@/services/firebaseConfig";
import { v4 } from "uuid";
import { createComment, getCommentsOfCurrentPost } from "../post/comments";
import { getCurrUserProfile } from "../profile";
import { uploadImagesAndGetURL } from "@/services/storage/imageStorage";

const ref = firestore.collection("request_timeline");
export function createFirstTimeline(
  content: string,
  artId: string,
  description: string
) {
  const currUser = auth.currentUser!;
  const requestId = v4();

  const newRequest: Timeline = {
    description,
    requestAuthor: currUser?.uid,
    requestId,
    resolved: false,
    artId,
    created: serverTimestamp.now(),
    timeline: {
      1: {
        authorUid: currUser?.uid,
        contentId: content,
        created: serverTimestamp.now(),
        isMentor: false,
        itemNumber: 1,
        type: "image",
      },
    },
  };

  ref.doc(requestId).set(newRequest);
}

export async function createTimelineComment(
  timeline: Timeline,
  commentText: string
) {
  const currentUser = await getCurrUserProfile();
  // create new comment
  const newComment = await createComment(
    timeline.requestId,
    commentText,
    timeline.requestAuthor
  );

  const itemNumber = Object.keys(timeline.timeline).length + 1;
  //update the timeline
  const timelineContent: Timeline["timeline"][0] = {
    authorUid: currentUser.uid,
    contentId: newComment.commentId,
    created: newComment.date,
    isMentor: newComment.isMentor,
    itemNumber,
    type: "comment",
  };

  ref.doc(timeline.requestId).update({
    [`timeline.${itemNumber}`]: timelineContent,
  });
}

export async function createTimelineImage(timeline: Timeline, image: File) {
  const currentUser = await getCurrUserProfile();
  const imageURL = await uploadImagesAndGetURL(image);

  const itemNumber = Object.keys(timeline.timeline).length + 1;

  const timelineContent: Timeline["timeline"][1] = {
    authorUid: currentUser.uid,
    contentId: imageURL,
    created: serverTimestamp.now(),
    isMentor: currentUser.profileType === "Advisor",
    itemNumber,
    type: "image",
  };

  ref.doc(timeline.requestId).update({
    [`timeline.${itemNumber}`]: timelineContent,
  });
}

export async function getCurrUserRequests(
  lastPostDate: Timestamp | undefined,
  userId: string
) {
  const requestedPost = await ref
    .where("requestAuthor", "==", userId)
    .limit(10)
    .get();

  const userRequests: ArtRequests[] = [];

  for (const artRequest of requestedPost.docs) {
    const requestData = artRequest.data() as Timeline;
    userRequests.push({
      artId: requestData.artId,
      artURL: requestData.timeline[1].contentId,
      assigneeId: requestData.assigneeId,
      authorId: requestData.requestAuthor,
      created: requestData.created,
      requestId: requestData.requestId,
      resolved: requestData.resolved,
    });
  }

  return userRequests;
}

export async function getTimelineRequestBasedOnRequestId(requestId: string) {
  const requestQuery = ref.doc(requestId).get();
  const commentsQuery = getCommentsOfCurrentPost(requestId);
  const [requestResolvedQuery, requestComments] = await Promise.all([
    requestQuery,
    commentsQuery,
  ]);
  const timelineData = requestResolvedQuery.data() as Timeline;

  const outputTimeline: (TimelineComment | RequestedArt)[] = [];
  for (const timelineComps of Object.values(timelineData.timeline)) {
    if (timelineComps.type === "comment" && requestComments) {
      // if type is comment then find the comment from comments based on comment id;
      const currentComment = requestComments.find(
        (comment) => comment.commentId === timelineComps.contentId
      )!;

      outputTimeline.push({
        ...currentComment,
        type: "comment",
        itemNumber: timelineComps.itemNumber,
      });
    } else if (timelineComps.type === "image") {
      const currentImage: RequestedArt = {
        artId: timelineData.artId,
        imageURL: timelineComps.contentId,
        isMentor: timelineComps.isMentor,
        itemNumber: timelineComps.itemNumber,
        type: "image",
        created: timelineComps.created,
      };

      outputTimeline.push(currentImage);
    }
  }

  return { outputTimeline, timelineData };
}

import React, { useRef, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import CircularProgress from "@mui/material/CircularProgress";
import SendIcon from "@mui/icons-material/Send";
import { auth } from "@/services/firebaseConfig";
import FormControl from "@mui/material/FormControl";
import InputTextFieldProps from "../inputFields/InputTextFieldState";
import { createComment } from "@/services/firestore/posts";
import Comment from ".";
import ReactDOM from "react-dom";
import { CommentsProps } from "@/models/Comment";
import { sendNewNotification } from "@/services/firestore/notifications";
import { sendFriendRequest } from "@/services/firestore/friendRequest";

export default function CreateComment({
  postId,
  commentsParentRef,
}: {
  postId: string;
  commentsParentRef: React.MutableRefObject<HTMLDivElement | null>;
}) {
  const [commentText, setCommentText] = useState("");
  const [isLoding, setLoading] = useState(false);
  const [commented, setComments] = useState<CommentsProps | null>(null);
  const currUser = auth.currentUser;

  const handleSubmit = async () => {
    setLoading(true);
    const res = await createComment(postId, commentText, false);
    console.log(res);
    setComments(res);
    setLoading(false);
    setCommentText("");
  };

  useEffect(() => {
    // sendNewNotification(
    //   "18KG8ErcJ3hC9R7O001CLsBAKtA2",
    //   "You have new notification",
    //   "new-comment"
    // );
    // sendFriendRequest("shubhdeep");
    if (commentsParentRef.current && commented) {
      const allChildren = Array.prototype.slice.call(
        commentsParentRef.current.children
      );
      const elements = allChildren.map((item, index) => (
        <Box
          sx={{
            padding: "5px",
            background: "#2B2B2B",
            borderRadius: "16px",
          }}
          key={index}
          dangerouslySetInnerHTML={{ __html: item.innerHTML }}
        ></Box>
      ));

      const newComment = <Comment comment={commented} highlighted={true} />;
      elements.splice(0, 0, newComment);
      ReactDOM.render(<>{elements}</>, commentsParentRef.current);
      const parentContainer = document.getElementById("art-section");
      parentContainer?.scrollTo(0, document.body.scrollHeight);
      // commentsParentRef.current.appendChild(child);
    }
  }, [commented, commentsParentRef]);
  return (
    <form onSubmit={handleSubmit}>
      <FormControl
        fullWidth
        sx={{
          borderRadius: "12px",
          padding: "10px",
          background: "#2B2B2B",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Avatar
          src={
            currUser?.photoURL
              ? currUser.photoURL
              : currUser?.displayName?.charAt(0)
          }
        />
        <Box flexGrow={1}>
          <InputTextFieldProps
            onChange={(e: any) => setCommentText(e.target.value)}
            value={commentText}
            placeholder="Add a comment..."
          />
        </Box>
        <IconButton
          type="submit"
          sx={{
            border: "none !important",
            outline: "none !important",
            width: "62px",
            height: "62px",
          }}
          onClick={handleSubmit}
        >
          {isLoding ? (
            <CircularProgress color="secondary" size="36px" />
          ) : (
            <SendIcon color="secondary" fontSize="large" />
          )}
        </IconButton>
      </FormControl>
    </form>
  );
}

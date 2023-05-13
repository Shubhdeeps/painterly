import React, { useRef, useState } from "react";
import Popper from "@mui/material/Popper";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Animation from "./Animation";
import ReactionsPallet from "./ReactionsPallet";
import ClickAwayListener from "@mui/base/ClickAwayListener";
import { sortReactionBasedOnCount } from "@/services/helperFunctions/sortReactionsBasedOnLength";
import { auth } from "@/services/firebaseConfig";
import { updateReactionOnPost } from "@/services/firestore/post/reactions";

type Props = {
  heart: string[];
  fire: string[];
  smile: string[];
  sad: string[];
  shocked: string[];
  postId: string;
  artAuthorId: string;
};
export default function Reactions({
  heart,
  fire,
  smile,
  sad,
  shocked,
  postId,
  artAuthorId,
}: Props) {
  const [reactions, setReaction] = useState({
    heart,
    fire,
    smile,
    sad,
    shocked,
  });
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const containerRef = useRef(null);
  const { uid } = auth.currentUser!;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleUserReacted = async (
    type: "sad" | "smile" | "shocked" | "fire" | "heart"
  ) => {
    const { uid } = auth.currentUser!;
    let newReactions = { ...reactions };
    const alreadyReacted = newReactions[type].includes(uid);

    if (!alreadyReacted) {
      //if true add a new like, else remove like
      const arrayOfUids = reactions[type];
      arrayOfUids.push(uid);
      newReactions = {
        ...reactions,
        [type]: arrayOfUids,
      };

      //firebase add reaction
      await updateReactionOnPost(postId, type, "LIKE", artAuthorId);
    } else {
      const newReactionWithSpecificType = newReactions[type].filter(
        (value) => value !== uid
      );
      newReactions[type] = newReactionWithSpecificType;
      //firebase remove reaction
      await updateReactionOnPost(postId, type, "DISLIKE", artAuthorId);
    }
    setReaction(newReactions);
  };

  const { sortedReactions, totalReactionCount } =
    sortReactionBasedOnCount(reactions);

  return (
    <Box ref={containerRef}>
      <ClickAwayListener
        touchEvent="onTouchStart"
        mouseEvent="onMouseDown"
        onClickAway={() => setOpen(false)}
      >
        <Button
          sx={{
            outline: "none !important",
          }}
          onMouseEnter={handleClick}
        >
          <ReactionsPallet
            data={sortedReactions}
            totalCount={totalReactionCount}
          />
        </Button>
      </ClickAwayListener>
      <Popper open={open} anchorEl={anchorEl} placement="top-start" transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper
              sx={{
                borderRadius: "50px",
                height: "45px",
                width: "fit-content",
                display: "flex",
                alignItems: "center",
                px: 0,
                backgroundColor: "primary.dark",
              }}
            >
              <Animation
                handleClick={handleUserReacted}
                type="fire"
                doesCurrUserReacted={reactions.fire.includes(uid)}
              />
              <Animation
                handleClick={handleUserReacted}
                type="heart"
                doesCurrUserReacted={reactions.heart.includes(uid)}
              />
              <Animation
                handleClick={handleUserReacted}
                type="smile"
                doesCurrUserReacted={reactions.smile.includes(uid)}
              />
              <Animation
                handleClick={handleUserReacted}
                type="shocked"
                doesCurrUserReacted={reactions.shocked.includes(uid)}
              />
              <Animation
                handleClick={handleUserReacted}
                type="sad"
                doesCurrUserReacted={reactions.sad.includes(uid)}
              />
            </Paper>
          </Fade>
        )}
      </Popper>
    </Box>
  );
}

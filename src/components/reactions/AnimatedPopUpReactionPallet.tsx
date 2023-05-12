import React, { useRef } from "react";
import Popper from "@mui/material/Popper";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Animation from "./Animation";
import ReactionsPallet from "./ReactionsPallet";
import ClickAwayListener from "@mui/base/ClickAwayListener";

export default function AnimatedPopUpReactionPallet() {
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const containerRef = useRef(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    console.log(event.currentTarget);
    setOpen(true);
  };

  return (
    <Box ref={containerRef}>
      <ClickAwayListener onClickAway={() => setOpen(false)}>
        <Button
          sx={{
            outline: "none !important",
          }}
          onMouseEnter={handleClick}
        >
          <ReactionsPallet />
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
                px: 0.3,
              }}
            >
              <Animation type="fire" />
              <Animation type="heart" />
              <Animation type="smile" />
              <Animation type="shocked" />
              <Animation type="sad" />
            </Paper>
          </Fade>
        )}
      </Popper>
    </Box>
  );
}

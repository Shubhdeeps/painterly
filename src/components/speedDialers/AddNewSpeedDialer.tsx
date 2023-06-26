import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import PaletteIcon from "@mui/icons-material/Palette";
import NewPost from "../modals/NewPost";
import NewRequest from "../modals/NewRequest";
export default function AddNewSpeedDialer() {
  const [newPost, setNewPost] = useState(false);
  const [newRequest, setNewRequest] = useState(false);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const actions = [
    {
      icon: <AssignmentIndIcon />,
      name: "Request review",
      onClick: () => setNewRequest(true),
    },
    { icon: <PaletteIcon />, name: "New Art", onClick: () => setNewPost(true) },
  ];

  const isPopUpOpen = newPost || newRequest;

  return (
    <>
      <NewPost isOpen={newPost} setOpen={setNewPost} />
      <NewRequest isOpen={newRequest} setOpen={setNewRequest} />
      {open && <div className="modal-bg" />}
      {!isPopUpOpen && (
        <SpeedDial
          ariaLabel="SpeedDial tooltip example"
          sx={{
            position: "fixed",
            bottom: 22,
            right: 22,
            "& .MuiSpeedDial-fab": {
              outline: "none !important",
              backgroundColor: "secondary.main", // Change the color to your desired color
            },
          }}
          icon={<SpeedDialIcon />}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={() => {
                handleClose();
                action.onClick();
              }}
            />
          ))}
        </SpeedDial>
      )}
    </>
  );
}

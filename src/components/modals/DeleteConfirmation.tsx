import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Divider } from "@mui/material";

export default function ArtDeleteConfirmation({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<string>>;
}) {
  const handleClose = () => {
    setOpen("");
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Delete</DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description" mt={2}>
            Deleting this art cannot be undone. Are you certain you want to
            proceed?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              outline: "none !important",
            }}
            color="inherit"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            sx={{
              outline: "none !important",
            }}
            color="inherit"
            onClick={handleClose}
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

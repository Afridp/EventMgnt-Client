import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";

import PropTypes from "prop-types";

export default function SubModal() {
  const [open, setOpen] = useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
  };

  SubModal.propTypes = {
    message: PropTypes.string.isRequired,
  };

  return (
    <>
 
      <Dialog
        open={open}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Subcription Ended"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           asdfkghasdkjfhaskldj
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose}>Disagree</Button> */}
          <Button onClick={handleClose} autoFocus>
            Explore Plans
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

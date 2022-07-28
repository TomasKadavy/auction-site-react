import { useState } from "react";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import AddAuctionForm from "./forms/AddAuctionForm";
import { sideButtonStyle } from "../styles/sidebarStyles";
import AddIcon from "@mui/icons-material/Add";

function AuctionButton() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <Button
        startIcon={<AddIcon />}
        onClick={handleClickOpen}
        sx={sideButtonStyle}
      >
        Vytvoř aukci
      </Button>
      <Dialog open={open} onClose={handleClickOpen}>
        <DialogContent>
          <AddAuctionForm />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AuctionButton;

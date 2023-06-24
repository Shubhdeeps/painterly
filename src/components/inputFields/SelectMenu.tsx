import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import MoreVertIcon from "@mui/icons-material/MoreVert";

type Options = {
  value: string;
  action: () => void;
};

export default function SelectMenu({
  list,
  size,
}: {
  list: Options[];
  size?: "sm" | "md";
}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const marginTop = size === "sm" ? -1.5 : 0;

  return (
    <Box
      sx={{
        position: "absolute",
        right: "0px",
        top: "0px",
        backgroundColor: `${size !== "sm" ? "primary.dark" : ""}`,
        width: "40px",
        height: "40px",
        borderRadius: "50%",
      }}
    >
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        sx={{
          border: "none !important",
          outline: "none !important",
        }}
      >
        <MoreVertIcon
          sx={{
            color: "common.white",
          }}
        />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: "20ch",
            height: `${size === "sm" ? "40px" : ""}`,
          },
        }}
      >
        {list.map((option) => (
          <MenuItem
            sx={{
              mt: marginTop,
            }}
            key={option.value}
            onClick={() => {
              setAnchorEl(null);
              option.action();
            }}
          >
            {option.value}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}

import { Box } from "@mui/material";

export default function UserBackground() {
  return (
    <Box
      sx={{
        position: "absolute",
        width: "100%",
        height: "100%",
        top: "0",
        left: "0",
        background: "rgba(217, 217, 217, 0.35)",
        borderRadius: "0 0 0 190px",
        zIndex: "-999",
      }}
    />
  );
}

import { Box, Typography } from "@mui/material";

export default function UserMonth() {
  const d = new Date();
  const monthName = d.toLocaleString("default", { month: "long" });

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
      }}
      pt={2}
      pb={2}
    >
      <Typography variant="h5" sx={{ textTransform: "uppercase" }}>
        {monthName} {d.getFullYear()}
      </Typography>
    </Box>
  );
}

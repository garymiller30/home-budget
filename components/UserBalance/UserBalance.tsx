import { Box, Typography } from "@mui/material";

export default function UserBalance() {
  return (
    <Box
      sx={{
        width: "calc(100% - 42px - 42px)",
        background:
          "linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0.37) 100%)",
        borderRadius: "20px",
        filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
      }}
    >
      <Typography
        variant="h5"
        fontWeight={300}
        textAlign={"center"}
        pt={3}
        pb={2}
      >
        balance
      </Typography>
      <Box
        sx={{
          display: "inline-flex",
          width: "100%",
          justifyContent: "center",
          alignItems: "start",
        }}
        pb={2}
      >
        <Typography sx={{ display: "block" }} variant="h2" fontWeight={500}>
          12345
        </Typography>
        <Typography sx={{ display: "block" }} variant="h5" fontWeight={300}>
          00
        </Typography>
      </Box>
    </Box>
  );
}

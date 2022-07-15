import { Box, Divider, Typography } from "@mui/material";

export default function UserDebitCredit() {
  return (
    <Box
      sx={{
        display: "flex",
        width: "calc(100% - 16px - 16px)",
        filter: "drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.25))",
        background: "white",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        borderRadius: "20px",
      }}
      pt={3}
      pb={3}
    >
      <Box sx={{ width: "50%" }}>
        <Typography variant="h6" fontWeight={400} textAlign="center">
          debit:
        </Typography>
        <Typography
          sx={{ fontSize: "24px" }}
          fontWeight={700}
          textAlign="center"
          color={"primary"}
          pt={1}
          pb={1}
        >
          + 45000
        </Typography>
      </Box>
      <Divider orientation="vertical" flexItem />
      <Box sx={{ width: "50%" }}>
        <Typography variant="h6" fontWeight={400} textAlign="center">
          credit:
        </Typography>
        <Typography
          sx={{ fontSize: "24px" }}
          fontWeight={700}
          textAlign="center"
          color={"secondary"}
          pt={1}
          pb={1}
        >
          - 18000
        </Typography>
      </Box>
    </Box>
  );
}

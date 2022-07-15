import { Box, Button } from "@mui/material";

export default function UserBottomButtons() {
  return (
    <Box sx={{ width: "100%", display: "flex" }}>
      <Button
        variant="contained"
        color="primary"
        size="large"
        sx={{ width: "50%" }}
      >
        ADD DEBIT
      </Button>
      <Button
        variant="contained"
        color="secondary"
        size="large"
        sx={{ width: "50%", height: "50px" }}
      >
        ADD CREDIT
      </Button>
    </Box>
  );
}

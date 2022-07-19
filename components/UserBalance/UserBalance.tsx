import { Box, Typography } from "@mui/material";
import { useRecoilValue } from "recoil";
import { splitFloatNumber } from "../../lib";
import { balanceSelector } from "../../recoil/selectors/balanceSelector";

export default function UserBalance() {
  const balance = useRecoilValue(balanceSelector);

  const [budgetMain, budgetKop] = splitFloatNumber(balance);
  return (
    <Box
      sx={{
        width: "calc(100% - 42px - 42px)",
        background:
          "linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0.37) 100%)",
        backgroundColor: "white",
        borderRadius: "20px",
        filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
      }}
      mb={3}
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
          {budgetMain}
        </Typography>
        <Typography sx={{ display: "block" }} variant="h5" fontWeight={300}>
          {budgetKop}
        </Typography>
      </Box>
    </Box>
  );
}

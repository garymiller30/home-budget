import { Box, Divider, Typography } from "@mui/material";
import { useRecoilValue } from "recoil";
import { creditSumSelector } from "../../recoil/selectors/creditSumSelector";
import { debitCreditSumSelector } from "../../recoil/selectors/debitCreditSumSelector";
import { debitSumSelector } from "../../recoil/selectors/debitSumSelector";

export default function UserDebitCredit() {
  const { creditSum, debitSum } = useRecoilValue(debitCreditSumSelector);

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
      pt={1}
      pb={1}
      mb={3}
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
        >
          + {debitSum}
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
        >
          - {creditSum}
        </Typography>
      </Box>
    </Box>
  );
}

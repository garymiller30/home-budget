import { Box, Divider, Typography } from "@mui/material";
import { useRecoilValue } from "recoil";
import { splitFloatNumber } from "../../lib";
import { debitCreditSumSelector } from "../../recoil/selectors/debitCreditSumSelector";

export default function UserDebitCredit() {
  const { creditSum, debitSum } = useRecoilValue(debitCreditSumSelector);
  const [debM, debK] = splitFloatNumber(debitSum);
  const [credM, credK] = splitFloatNumber(creditSum);
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
        <Box
          sx={{
            display: "inline-flex",
            width: "100%",
            justifyContent: "center",
            alignItems: "start",
          }}
        >
          <Typography
            sx={{ fontSize: "1.5rem", lineHeight: "1.7rem" }}
            fontWeight={700}
            textAlign="center"
            color={"primary"}
          >
            + {debM}
          </Typography>
          <Typography
            sx={{ fontSize: "0.875rem" }}
            fontWeight={300}
            textAlign="center"
            color={"primary"}
          >
            {debK}
          </Typography>
        </Box>
      </Box>
      <Divider orientation="vertical" flexItem />
      <Box sx={{ width: "50%" }}>
        <Typography variant="h6" fontWeight={400} textAlign="center">
          credit:
        </Typography>
        <Box
          sx={{
            display: "inline-flex",
            width: "100%",
            justifyContent: "center",
            alignItems: "start",
          }}
        >
          <Typography
            sx={{ fontSize: "1.5rem", lineHeight: "1.7rem" }}
            fontWeight={700}
            textAlign="center"
            color={"secondary"}
          >
            - {credM}
          </Typography>
          <Typography
            sx={{ fontSize: "0.875rem" }}
            fontWeight={300}
            textAlign="center"
            color={"secondary"}
          >
            {credK}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

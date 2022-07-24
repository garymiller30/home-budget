//import { Box, Divider, Typography } from "@mui/material";
import { Box, Divider, Text, useColorModeValue } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { splitFloatNumber } from "../../lib";
import { debitCreditSumSelector } from "../../recoil/selectors/debitCreditSumSelector";

export default function UserDebitCredit() {
  const { creditSum, debitSum } = useRecoilValue(debitCreditSumSelector);
  const [debM, debK] = splitFloatNumber(debitSum);
  const [credM, credK] = splitFloatNumber(creditSum);
  const bg = useColorModeValue("white", "black");
  const color = useColorModeValue("black", "white");
  return (
    <Box
      bg={bg}
      boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
      sx={{
        display: "flex",
        width: "calc(100% - 16px - 16px)",
        filter: "drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.25))",
        borderRadius: "10px",
      }}
      pt={2}
      pb={2}
      mb={3}
      mt={2}
    >
      <Box sx={{ width: "50%" }}>
        <Text variant="h6" fontWeight={400} textAlign="center" color={color}>
          debit:
        </Text>
        <Box
          sx={{
            display: "inline-flex",
            width: "100%",
            justifyContent: "center",
            alignItems: "start",
          }}
        >
          <Text
            fontSize="1.5rem"
            lineHeight="1.7rem"
            fontWeight={700}
            textAlign="center"
            color={"green"}
          >
            + {debM}
          </Text>
          <Text
            fontSize="0.875rem"
            fontWeight={300}
            textAlign="center"
            color={"green"}
          >
            {debK.toString().padStart(2, "0")}
          </Text>
        </Box>
      </Box>
      <Divider orientation="vertical" />
      <Box sx={{ width: "50%" }}>
        <Text fontWeight={400} textAlign="center" color={color}>
          credit:
        </Text>
        <Box
          sx={{
            display: "inline-flex",
            width: "100%",
            justifyContent: "center",
            alignItems: "start",
          }}
        >
          <Text
            sx={{ fontSize: "1.5rem", lineHeight: "1.7rem" }}
            fontWeight={700}
            textAlign="center"
            color="pink.500"
          >
            - {credM}
          </Text>
          <Text
            color="pink.500"
            fontSize="0.875rem"
            fontWeight={300}
            textAlign="center"
          >
            {credK.toString().padStart(2, "0")}
          </Text>
        </Box>
      </Box>
    </Box>
  );
}

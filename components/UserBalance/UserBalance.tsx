import { Box, Text } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { splitFloatNumber } from "../../lib";
import { balanceSelector } from "../../recoil/selectors/balanceSelector";

type UserBalanceProp = {
  isLoaded: boolean;
};

export default function UserBalance() {
  const balance = useRecoilValue(balanceSelector);

  const [budgetMain, budgetKop] = splitFloatNumber(balance);
  return (
    <Box
      w="calc(100% - 42px - 42px)"
      sx={{
        width: "calc(100% - 42px - 42px)",
        background:
          "linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0.37) 100%)",
        backgroundColor: "white",
        borderRadius: "20px",
        filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
      }}
      mb={2}
    >
      <Text
        fontSize="1.2rem"
        fontWeight={300}
        textAlign={"center"}
        pt={1}
        pb={1}
      >
        balance
      </Text>
      <Box
        sx={{
          display: "inline-flex",
          width: "100%",
          justifyContent: "center",
          alignItems: "start",
        }}
        pb={4}
      >
        <Text fontSize="3rem" fontWeight={600} lineHeight="2.5rem">
          {budgetMain}
        </Text>
        <Text fontWeight={300}>{budgetKop.toString().padStart(2, "0")}</Text>
      </Box>
    </Box>
  );
}

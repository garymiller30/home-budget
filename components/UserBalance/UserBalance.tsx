import { Box, Text, useColorModeValue } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { splitFloatNumber } from "../../lib";
import { balanceSelector } from "../../recoil/selectors/balanceSelector";

type UserBalanceProp = {
  isLoaded: boolean;
};

export default function UserBalance() {
  const balance = useRecoilValue(balanceSelector);

  const [budgetMain, budgetKop] = splitFloatNumber(balance);

  const bg = useColorModeValue("white", "gray.700");
  const color = useColorModeValue("black", "white");
  return (
    <Box
      w="calc(100% - 42px - 42px)"
      bg={bg}
      borderRadius="20px"
      filter="drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))"
      mb={2}
    >
      <Text
        fontSize="1.2rem"
        fontWeight={300}
        textAlign={"center"}
        color={color}
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
        <Text
          fontSize="3rem"
          color="{color}"
          fontWeight={600}
          lineHeight="2.5rem"
        >
          {budgetMain}
        </Text>
        <Text fontWeight={300} color={color}>
          {budgetKop.toString().padStart(2, "0")}
        </Text>
      </Box>
    </Box>
  );
}

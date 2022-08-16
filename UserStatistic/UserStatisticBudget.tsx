import { Flex, Text } from "@chakra-ui/react";
import { splitFloatNumber } from "lib";

interface Props {
  budget: number;
  style?: any;
}

export default function UserStatisticBudget({ budget, style }: Props) {
  const [budgetMain, budgetKop] = splitFloatNumber(budget);
  return (
    <Flex
      w="100%"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      {...style}
    >
      <Text mb={2}>budget</Text>
      <Flex>
        <Text fontWeight={600} fontSize="3rem" lineHeight="2.8rem">
          {budgetMain}
        </Text>
        <Text>{budgetKop}</Text>
      </Flex>
    </Flex>
  );
}

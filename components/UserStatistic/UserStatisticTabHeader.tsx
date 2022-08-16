import { Flex, Text } from "@chakra-ui/react";
import { splitFloatNumber } from "lib";

interface Props {
  title: string;
  amount: number;
}
export default function UserStatisticTabHeader({ title, amount }: Props) {
  const [main, kop] = splitFloatNumber(amount);
  return (
    <Flex flexDirection="column">
      <Text>{title}</Text>
      <Flex>
        <Text fontWeight={600} fontSize="1.8rem" lineHeight="2.1rem">
          {main}
        </Text>
        <Text>{kop}</Text>
      </Flex>
    </Flex>
  );
}

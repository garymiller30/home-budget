//@ts-ignore
import { iTransaction } from "@/interfaces/iTransaction";
import { AiOutlineMore } from "react-icons/ai";
import {
  Box,
  Divider,
  Flex,
  IconButton,
  ListItem,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { splitFloatNumber } from "lib";
import { TRANSACTION_TYPE } from "vars/variables";

type UserLastTransactionsItemProp = {
  item: iTransaction;

  onEdit?: (t: iTransaction) => void;
  percent?: string;
};
export default function UserLastTransactionsItem({
  item,
  onEdit,
}: UserLastTransactionsItemProp) {
  const color = item.type === TRANSACTION_TYPE.DEBIT ? "green" : "pink.500";

  const [m, k] = splitFloatNumber(item.amount);

  const sign = item.type === TRANSACTION_TYPE.DEBIT ? "+" : "-";
  return (
    <ListItem w="100%" key={item._id.toString()}>
      <Flex alignItems="center">
        <Box paddingRight={2} pl={2}>
          <Text fontWeight="600" fontSize="1rem">
            {item.description}
          </Text>
        </Box>
        <Box>
          <Text>{item.comment}</Text>
        </Box>
        <Spacer />
        <Flex>
          <Text fontWeight="700" color={color} pr={1}>
            {m >= 0 ? sign : ""}
          </Text>
          <Text fontWeight="700" fontSize="1.2rem" color={color}>
            {m}
          </Text>
          <Text color={color} fontSize="0.8rem">
            {k.toString().padStart(2, "0")}
          </Text>
        </Flex>
        <Box>
          <IconButton
            icon={<AiOutlineMore color="gray.500" />}
            aria-label="delete"
            bg="transparent"
            onClick={() => {
              if (onEdit) onEdit(item);
            }}
          />
        </Box>
      </Flex>
      <Divider />
    </ListItem>
  );
}

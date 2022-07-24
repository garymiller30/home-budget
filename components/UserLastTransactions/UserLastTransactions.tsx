import { TRANSACTION_TYPE } from "../../vars/variables";
import { iTransaction } from "../../interfaces/iTransaction";
import { useTransactionController } from "../../hooks/useTransactionController";
import { splitFloatNumber } from "../../lib";
import {
  Box,
  Divider,
  Flex,
  IconButton,
  List,
  ListItem,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

export default function UserLastTransactions() {
  const controller = useTransactionController();
  const revList = controller.getAllDesc();

  const handleDelete = async (t: iTransaction) => {
    await controller.remove(t);
  };

  return (
    <Box sx={{ flexGrow: 1, height: "100%", overflowY: "scroll" }}>
      <List>
        {revList.map((item) => {
          const color =
            item.type === TRANSACTION_TYPE.DEBIT ? "green" : "pink.500";

          const [m, k] = splitFloatNumber(item.amount);

          const sign = item.type === TRANSACTION_TYPE.DEBIT ? "+" : "-";
          return (
            <ListItem w="100%" key={item._id.toString()}>
              <Flex alignItems="center">
                <Box paddingRight={2} pl={2}>
                  <Text fontWeight="600" fontSize="1rem">
                    {item.description}
                  </Text>
                  <Text
                    color="gray"
                    fontWeight="0.9rem"
                  >{`${item.date.day}.${item.date.month}.${item.date.year}`}</Text>
                </Box>
                <Box>
                  <Text>{item.comment}</Text>
                </Box>
                <Spacer />
                <Flex>
                  <Text fontWeight="700" color={color} pr={1}>
                    {sign}
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
                    icon={<DeleteIcon color="gray.500" />}
                    aria-label="delete"
                    bg="transparent"
                    onClick={() => handleDelete(item)}
                  />
                </Box>
              </Flex>
              <Divider />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}

import { iTransaction } from "../../interfaces/iTransaction";
import { useTransactionController } from "../../hooks/useTransactionController";
import { Box, List } from "@chakra-ui/react";
import UserLastTransactionsItem from "./UserLastTransactionsItem";

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
          return (
            <UserLastTransactionsItem
              key={item._id}
              item={item}
              onDelete={handleDelete}
            />
          );
        })}
      </List>
    </Box>
  );
}

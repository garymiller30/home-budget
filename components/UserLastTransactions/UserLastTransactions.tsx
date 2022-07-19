import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useRecoilValue } from "recoil";
import { transactionsAtom } from "../../recoil/atoms/transactionsAtom";
import DeleteIcon from "@mui/icons-material/Delete";
import { TRANSACTION_TYPE } from "../../vars/variables";
import { iTransaction } from "../../interfaces/iTransaction";
import { useTransactionController } from "../../hooks/useTransactionController";

export default function UserLastTransactions() {
  const list = useRecoilValue(transactionsAtom);
  const controller = useTransactionController();
  const revList = [...list];
  revList.reverse();

  const handleDelete = async (t: iTransaction) => {
    await controller.remove(t);
  };

  return (
    <Box sx={{ flexGrow: 1, height: "100%", overflow: "scroll" }}>
      <List dense>
        {revList.map((item) => {
          const color =
            item.type === TRANSACTION_TYPE.DEBIT ? "primary" : "secondary";
          return (
            <ListItem
              key={item._id}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDelete(item)}
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText
                primary={item.description}
                secondary={`${item.date.day}.${item.date.month}.${item.date.year}`}
              />
              <ListItemText
                primary={
                  <Typography textAlign={"left"}>{item.comment}</Typography>
                }
              />
              <ListItemText
                primary={
                  <Typography color={color} variant="h6" textAlign={"right"}>
                    {Number(item.amount).toFixed(2)}
                  </Typography>
                }
              />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}

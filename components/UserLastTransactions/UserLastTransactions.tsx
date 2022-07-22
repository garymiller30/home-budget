import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { TRANSACTION_TYPE } from "../../vars/variables";
import { iTransaction } from "../../interfaces/iTransaction";
import { useTransactionController } from "../../hooks/useTransactionController";
import { splitFloatNumber } from "../../lib";

export default function UserLastTransactions() {
  const controller = useTransactionController();
  const revList = controller.getAllDesc();

  const handleDelete = async (t: iTransaction) => {
    await controller.remove(t);
  };

  return (
    <Box sx={{ flexGrow: 1, height: "100%", overflowY: "scroll" }}>
      <List dense>
        {revList.map((item) => {
          const color =
            item.type === TRANSACTION_TYPE.DEBIT ? "primary" : "secondary";

          const [m, k] = splitFloatNumber(item.amount);

          const sign = item.type === TRANSACTION_TYPE.DEBIT ? "+" : "-";
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
                  <Box
                    sx={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "flex-end",
                      alignItems: "flex-start",
                    }}
                  >
                    <Typography
                      color={color}
                      textAlign={"right"}
                      variant="h6"
                      sx={{ display: "inline", lineHeight: "1.6rem" }}
                      mr="0.2rem"
                    >
                      {sign}
                    </Typography>
                    <Typography
                      color={color}
                      textAlign={"right"}
                      variant="h6"
                      sx={{ display: "inline", lineHeight: "1.6rem" }}
                    >
                      {m}
                    </Typography>
                    <Typography
                      variant="h6"
                      color={color}
                      sx={{
                        display: "inline",
                        fontWeight: "300",
                        fontSize: "0.8rem",
                      }}
                      pl="0.1rem"
                    >
                      {k.toString().padStart(2, "0")}
                    </Typography>
                  </Box>
                }
              />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}

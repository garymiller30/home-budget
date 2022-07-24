// import {
//   Box,
//   IconButton,
//   List,
//   ListItem,
//   ListItemText,
//   Typography,
// } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
import { TRANSACTION_TYPE } from "../../vars/variables";
import { iTransaction } from "../../interfaces/iTransaction";
import { useTransactionController } from "../../hooks/useTransactionController";
import { splitFloatNumber } from "../../lib";
import {
  Box,
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
            item.type === TRANSACTION_TYPE.DEBIT ? "green" : "darkMagenta";

          const [m, k] = splitFloatNumber(item.amount);

          const sign = item.type === TRANSACTION_TYPE.DEBIT ? "+" : "-";
          return (
            <ListItem w="100%" key={item._id.toString()}>
              <Flex alignItems="center">
                <Box paddingRight={2}>
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
                    icon={<DeleteIcon />}
                    aria-label="delete"
                    onClick={() => handleDelete(item)}
                  />
                </Box>
              </Flex>
            </ListItem>
            // <ListItem
            //   key={item._id}
            //   // secondaryAction={
            //   //   <IconButton
            //   //     edge="end"
            //   //     aria-label="delete"
            //   //     onClick={() => handleDelete(item)}
            //   //   >
            //   //     <DeleteIcon />
            //   //   </IconButton>
            //   // }
            // >
            //   <Text
            //   // primary={item.description}
            //   // secondary={`${item.date.day}.${item.date.month}.${item.date.year}`}
            //   />
            //   {item.description}
            //   <Text
            //   // primary={
            //   // <Text textAlign={"left"}>{item.comment}</Text>
            //   //}
            //   />
            //   <Text
            //   // primary={
            //   //   <Box
            //   //     sx={{
            //   //       display: "flex",
            //   //       width: "100%",
            //   //       justifyContent: "flex-end",
            //   //       alignItems: "flex-start",
            //   //     }}
            //   //   >
            //   //     <Text
            //   //       color={color}
            //   //       textAlign={"right"}
            //   //       variant="h6"
            //   //       sx={{ display: "inline", lineHeight: "1.6rem" }}
            //   //       mr="0.2rem"
            //   //     >
            //   //       {sign}
            //   //     </Text>
            //   //     <Text
            //   //       color={color}
            //   //       textAlign={"right"}
            //   //       variant="h6"
            //   //       sx={{ display: "inline", lineHeight: "1.6rem" }}
            //   //     >
            //   //       {m}
            //   //     </Text>
            //   //     <Text
            //   //       variant="h6"
            //   //       color={color}
            //   //       sx={{
            //   //         display: "inline",
            //   //         fontWeight: "300",
            //   //         fontSize: "0.8rem",
            //   //       }}
            //   //       pl="0.1rem"
            //   //     >
            //   //       {k.toString().padStart(2, "0")}
            //   //     </Text>
            //   //   </Box>
            //   // }
            //   />
            // </ListItem>
          );
        })}
      </List>
    </Box>
  );
}

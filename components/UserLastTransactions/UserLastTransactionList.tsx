import { iTransaction } from "@/interfaces/iTransaction";
import { List, Text } from "@chakra-ui/react";
import UserLastTransactionsItem from "./UserLastTransactionsItem";

export default function UserLastTransactionList({
  transactions,
  onEdit,
}: {
  transactions: iTransaction[];
  onEdit: (t: iTransaction) => void;
}) {
  var groupByDate = transactions.reduce((p: any, c: iTransaction) => {
    const key = `${c.date.year}-${c.date.month}-${c.date.day}`;

    if (!p[key]) p[key] = [];

    p[key].push(c);

    return p;
  }, {});

  return (
    <List>
      {Object.keys(groupByDate).map((x: any) => (
        <>
          <Text fontSize={12} textAlign={"center"}>
            {x}
          </Text>
          {groupByDate[x].map((i: iTransaction) => (
            <UserLastTransactionsItem key={i._id} item={i} onEdit={onEdit} />
          ))}
        </>
      ))}
    </List>
  );
}

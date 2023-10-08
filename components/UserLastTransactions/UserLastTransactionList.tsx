import { iTransaction } from "@/interfaces/iTransaction";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  List,
} from "@chakra-ui/react";
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
    <Accordion defaultIndex={[0]} allowMultiple allowToggle>
      {Object.keys(groupByDate).map((x: any) => (
        <AccordionItem key={x}>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              {x}
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            <List>
              {groupByDate[x].map((i: iTransaction) => (
                <UserLastTransactionsItem
                  key={i._id}
                  item={i}
                  onEdit={onEdit}
                />
              ))}
            </List>
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

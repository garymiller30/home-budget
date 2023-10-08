import { iTransaction } from "@/interfaces/iTransaction";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  List,
  Stack,
  Text,
} from "@chakra-ui/react";
import { PieController } from "chart.js";
import { TRANSACTION_TYPE } from "vars/variables";
import UserLastTransactionsItem from "./UserLastTransactionsItem";

interface iDayResult {
  credit: number;
  debit: number;
  budget: number;
}

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

  function getDayBudget(tl: iTransaction[]): iDayResult {
    const result: { credit: number; debit: number; budget: number } = tl.reduce(
      (p: iDayResult, c: iTransaction) => {
        const amount = Number(c.amount);
        if (c.type === TRANSACTION_TYPE.CREDIT) {
          p.credit += amount;
          p.budget -= amount;
        } else {
          p.debit += amount;
          p.budget += amount;
        }

        return p;
      },
      { credit: 0, debit: 0, budget: 0 }
    );

    return result;
  }

  return (
    <Accordion defaultIndex={[0]} allowMultiple>
      {Object.keys(groupByDate).map((x: any) => (
        <AccordionItem key={x}>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              <AccordionTitle
                title={x}
                dayResult={getDayBudget(groupByDate[x])}
              />
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

function AccordionTitle({
  title,
  dayResult,
}: {
  title: string;
  dayResult: iDayResult;
}) {
  return (
    <Stack>
      <Text fontWeight={"bold"} fontSize={14}>
        {title} [
        <Text
          fontWeight={"semibold"}
          as="span"
          color={"green.600"}
        >{`+${dayResult.debit},`}</Text>
        <Text
          fontWeight={"semibold"}
          as="span"
          color={"pink.500"}
        >{` -${dayResult.credit},`}</Text>
        <Text
          fontWeight={"semibold"}
          as="span"
          color={"black.500"}
        >{` ${dayResult.budget}`}</Text>
        ]
      </Text>
    </Stack>
  );
}

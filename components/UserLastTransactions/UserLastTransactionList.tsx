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
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
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
    <Accordion
      defaultIndex={[0]}
      allowMultiple
      bg={"blackAlpha.200"}
      borderRadius={25}
    >
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
    <Box>
      <Text
        fontWeight={"bold"}
        fontSize={14}
        textAlign="center"
        decoration="underline"
        pb={2}
      >
        {title}
      </Text>
      <StatGroup>
        <Stat>
          <StatLabel>debit</StatLabel>
          <StatHelpText>
            <StatArrow type="increase" />
            {dayResult.debit.toFixed(2)}
          </StatHelpText>
        </Stat>
        <Stat>
          <StatLabel>credit</StatLabel>
          <StatHelpText>
            <StatArrow type="decrease" />-{dayResult.credit.toFixed(2)}
          </StatHelpText>
        </Stat>
        <Stat>
          <StatLabel>balance</StatLabel>
          <StatHelpText>
            <StatArrow type={dayResult.budget >= 0 ? "increase" : "decrease"} />
            {dayResult.budget.toFixed(2)}
          </StatHelpText>
        </Stat>
      </StatGroup>
    </Box>
  );
}

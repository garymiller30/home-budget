import { iTransaction } from "@/interfaces/iTransaction";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
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
      bg={"gray.600"}
      m={3}
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
    <Box borderRadius={20}>
      <Flex alignItems={"baseline"} justifyItems="space-between">
        <Text
          display={"block"}
          fontWeight={500}
          fontSize={18}
          textAlign="left"
          pl={3}
          pr={3}
          pb={1}
          pt={1}
          bg="gray.800"
          borderRadius={10}
        >
          {title}
        </Text>
        <Box m="0 auto"></Box>
        <Box>
          <Stat>
            <StatHelpText>
              <StatArrow
                type={dayResult.budget >= 0 ? "increase" : "decrease"}
              />
              {dayResult.budget.toFixed(2)}
            </StatHelpText>
          </Stat>
        </Box>
      </Flex>
    </Box>
  );
}

import ReportList from "@/components/ReportList/ReportList";
import { iTransaction } from "@/interfaces/iTransaction";
import { transactionsAtom } from "@/recoil/atoms/transactionsAtom";
import { ArrowBackIcon, CalendarIcon } from "@chakra-ui/icons";
import {
  Flex,
  IconButton,
  Spacer,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { getBudget, getSum, transactionSplitByType } from "lib";
import groupByDescription from "lib/groupByDescription";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fetchTransactions } from "@/db/transaction/fetchTransactions";
import { userAtom } from "@/recoil/atoms/userAtom";

export default function Statistic() {
  const curMonthList = useRecoilValue(transactionsAtom);
  const user = useRecoilValue(userAtom);
  const [list, setList] = useState<iTransaction[]>([]);
  const [date, setDate] = useState<Date>(new Date());
  const router = useRouter();

  const monthName = date.toLocaleString("default", { month: "long" });

  useEffect(() => {
    setList(curMonthList);
  }, []);

  useEffect(() => {
    async function loadTrans() {
      if (!user) return;
      console.log("loadTrans");
      const trans = await fetchTransactions(
        user._id,
        date.getFullYear(),
        date.getMonth() + 1
      );
      setList(trans);
    }

    loadTrans();
  }, [date]);

  const { debit, credit } = transactionSplitByType(list);
  const budget = getBudget(debit, credit);
  const debitGroup = groupByDescription(debit);
  const creditGroup = groupByDescription(credit);

  return (
    <Flex maxW="md" m="0 auto" flexDirection="column">
      <Flex w="100%" alignItems="center">
        <IconButton
          aria-label="back"
          icon={<ArrowBackIcon />}
          onClick={() => router.back()}
        ></IconButton>
        <Spacer />
        <Text>
          {monthName} {date.getFullYear()}
        </Text>

        <Spacer />

        <DatePicker
          selected={date}
          maxDate={new Date()}
          dateFormat="MM/yyyy"
          onChange={(date: Date) => {
            setDate(date);
          }}
          showMonthYearPicker
          customInput={
            <IconButton aria-label="back" icon={<CalendarIcon />}></IconButton>
          }
          withPortal
          portalId="root-portal"
        />
      </Flex>
      <Flex w="100%" justifyContent="center">
        <Text fontWeight="bold" fontSize="2rem">
          {budget.toFixed(2)}
        </Text>
      </Flex>
      <Flex w="100%" grow="1" overflow="hidden">
        <Tabs isFitted w="inherit">
          <TabList>
            <Tab>
              <Flex flexDirection="column">
                <Text>debit</Text>
                <Text fontWeight="bold">{getSum(debit)}</Text>
              </Flex>
            </Tab>
            <Tab>
              <Flex flexDirection="column">
                <Text>credit</Text>
                <Text fontWeight="bold">{getSum(credit)}</Text>
              </Flex>
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <ReportList list={debitGroup} />
            </TabPanel>
            <TabPanel>
              <ReportList list={creditGroup} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
      <div id="root-portal" />
    </Flex>
  );
}

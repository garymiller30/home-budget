import ReportList from "@/components/ReportList/ReportList";
import { iTransaction } from "@/interfaces/iTransaction";
import { transactionsAtom } from "@/recoil/atoms/transactionsAtom";
import {
  ArrowBackIcon,
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
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
import {
  getBudget,
  getSum,
  splitFloatNumber,
  transactionSplitByType,
} from "lib";
import groupByDescription from "lib/groupByDescription";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fetchTransactions } from "@/db/transaction/fetchTransactions";
import { userAtom } from "@/recoil/atoms/userAtom";
import UserStatisticBudget from "UserStatistic/UserStatisticBudget";
import UserStatisticTabHeader from "UserStatistic/UserStatisticTabHeader";

export default function Statistic() {
  const curMonthList = useRecoilValue(transactionsAtom);
  const user = useRecoilValue(userAtom);
  const [list, setList] = useState<iTransaction[]>([]);
  const [date, setDate] = useState<Date>(new Date());
  const router = useRouter();

  const monthName = date.toLocaleString("default", { month: "long" });
  const isCurDate = getDateId(date) === getDateId(new Date());

  function getDateId(date: Date) {
    return date.getFullYear() * 12 + date.getMonth();
  }

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
  const [budgetMain, budgetKop] = splitFloatNumber(budget);
  return (
    <Flex maxW="md" m="0 auto" flexDirection="column">
      <Flex w="100%" alignItems="center">
        <IconButton
          aria-label="back"
          icon={<ArrowBackIcon />}
          onClick={() => router.back()}
        ></IconButton>
        <Spacer />
        <IconButton
          aria-label="prev month"
          bg="transparent"
          icon={<ChevronLeftIcon />}
          onClick={() => setDate(new Date(date.setMonth(date.getMonth() - 1)))}
        ></IconButton>
        <Text>
          {monthName} {date.getFullYear()}
        </Text>
        <IconButton
          visibility={isCurDate ? "hidden" : "visible"}
          aria-label="next month"
          bg="transparent"
          icon={<ChevronRightIcon />}
          onClick={() => {
            if (!isCurDate)
              setDate(new Date(date.setMonth(date.getMonth() + 1)));
          }}
        ></IconButton>
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
      <UserStatisticBudget budget={budget} style={{ mt: 6, mb: 5 }} />
      <Flex w="100%" grow="1" overflow="hidden">
        <Tabs isFitted w="inherit">
          <TabList>
            <Tab>
              <UserStatisticTabHeader title="debit" amount={getSum(debit)} />
            </Tab>
            <Tab>
              <UserStatisticTabHeader title="credit" amount={getSum(credit)} />
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

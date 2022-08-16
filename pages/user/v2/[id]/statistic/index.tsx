import { iTransaction } from "@/interfaces/iTransaction";
import { transactionsAtom } from "@/recoil/atoms/transactionsAtom";
import { ArrowBackIcon, CalendarIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  IconButton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { transactionSplitByType } from "lib";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fetchTransactions } from "@/db/transaction/fetchTransactions";
import { userAtom } from "@/recoil/atoms/userAtom";

import UserStatisticMonth from "@/components/UserStatistic/UserStatisticMonth";
import UserStatisticYear from "@/components/UserStatistic/UserStatisticYear";

export default function Statistic() {
  const curMonthList = useRecoilValue(transactionsAtom);
  const user = useRecoilValue(userAtom);
  const [list, setList] = useState<iTransaction[]>([]);
  const [date, setDate] = useState<Date>(new Date());
  const router = useRouter();

  useEffect(() => {
    setList(curMonthList);
  }, []);

  useEffect(() => {
    async function loadTrans() {
      if (!user) return;

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

  return (
    <Flex
      maxW="md"
      m="0 auto"
      flexDirection="column"
      position="relative"
      top="0"
      left="0"
    >
      <IconButton
        position="absolute"
        top="0"
        left="0"
        aria-label="back"
        icon={<ArrowBackIcon />}
        onClick={() => router.back()}
      ></IconButton>
      <Box position="absolute" top="0" right="0">
        <DatePicker
          selected={date}
          maxDate={new Date()}
          dateFormat="MM/yyyy"
          onChange={(date: Date) => {
            setDate(date);
          }}
          showMonthYearPicker
          customInput={
            <IconButton
              aria-label="select month"
              icon={<CalendarIcon />}
            ></IconButton>
          }
          withPortal
          portalId="root-portal"
        />
      </Box>

      <Tabs>
        <TabList justifyContent="center">
          <Tab>month</Tab>
          <Tab>year</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <UserStatisticMonth
              date={date}
              onDateChange={setDate}
              debitList={debit}
              creditList={credit}
            />
          </TabPanel>
          <TabPanel>
            <UserStatisticYear />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
}

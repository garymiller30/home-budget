import { iTransaction } from "@/interfaces/iTransaction";
import { getMonthName } from "@/utils/getMonthName";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
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
import { getBudget, getSum } from "lib";
import { getDateId } from "lib/getDateId";
import groupByDescription from "lib/groupByDescription";
import ReportList from "../ReportList/ReportList";
import ReportListDetail from "../ReportListDetail/ReportListDetail";
import UserStatisticBudget from "./UserStatisticBudget";
import UserStatisticTabHeader from "./UserStatisticTabHeader";

interface Props {
  date: Date;
  onDateChange: (date: Date) => void;
  debitList: iTransaction[];
  creditList: iTransaction[];
}
export default function UserStatisticMonth({
  date,
  onDateChange,
  debitList,
  creditList,
}: Props) {
  const monthName = getMonthName(date);
  const isCurDate = getDateId(date) === getDateId(new Date());

  const budget = getBudget(debitList, creditList);
  const debitGroup = groupByDescription(debitList);
  const creditGroup = groupByDescription(creditList);

  return (
    <>
      <Flex w="100%" alignItems="center" justifyContent="center">
        <IconButton
          aria-label="prev month"
          bg="transparent"
          icon={<ChevronLeftIcon />}
          onClick={() =>
            onDateChange(new Date(date.setMonth(date.getMonth() - 1)))
          }
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
              onDateChange(new Date(date.setMonth(date.getMonth() + 1)));
          }}
        ></IconButton>
      </Flex>
      <UserStatisticBudget budget={budget} style={{ mt: 3, mb: 3 }} />
      <Flex w="100%" grow="1" overflow="hidden">
        <Tabs isFitted w="inherit">
          <TabList>
            <Tab>
              <UserStatisticTabHeader
                title="debit"
                amount={getSum(debitList)}
              />
            </Tab>
            <Tab>
              <UserStatisticTabHeader
                title="credit"
                amount={getSum(creditList)}
              />
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <ReportListDetail list={debitList} />
              {/* <ReportList list={debitGroup} /> */}
            </TabPanel>
            <TabPanel>
              <ReportListDetail list={creditList} />
              {/* <ReportList list={creditGroup} /> */}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
      <div id="root-portal" />
    </>
  );
}

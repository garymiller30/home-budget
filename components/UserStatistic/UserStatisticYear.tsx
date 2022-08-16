import fetchYearTransactions from "@/db/transaction/fetchYearTransactions";
import { iStatisticYearItem } from "@/interfaces/iStatisticYearItem";
import { userAtom } from "@/recoil/atoms/userAtom";
import { getMonthName } from "@/utils/getMonthName";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  Flex,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { getDateId } from "lib/getDateId";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { TRANSACTION_TYPE } from "vars/variables";

export default function UserStatisticYear() {
  const [date, setDate] = useState<Date>(new Date());
  const [list, setList] = useState<iStatisticYearItem[]>([]);
  const user = useRecoilValue(userAtom);
  const isCurDate = getDateId(date) === getDateId(new Date());

  useEffect(() => {
    async function fetchYearTrans() {
      try {
        if (!user) return;
        const trans = await fetchYearTransactions(user._id, date.getFullYear());

        setList(trans);
      } catch (err: unknown) {}
    }

    fetchYearTrans();
  }, [date]);

  return (
    <>
      <Flex w="100%" alignItems="center" justifyContent="center">
        <IconButton
          aria-label="prev year"
          bg="transparent"
          icon={<ChevronLeftIcon />}
          onClick={() =>
            setDate(new Date(date.setFullYear(date.getFullYear() - 1)))
          }
        />
        <Text fontSize="1.8rem">{date.getFullYear()}</Text>
        <IconButton
          visibility={isCurDate ? "hidden" : "visible"}
          aria-label="next year"
          bg="transparent"
          icon={<ChevronRightIcon />}
          onClick={() => {
            if (!isCurDate)
              setDate(new Date(date.setFullYear(date.getFullYear() + 1)));
          }}
        />
      </Flex>
      <TableContainer w="100%" mt={5}>
        <Table variant="simple" size="sm">
          <Thead>
            <Tr>
              <Th>month</Th>
              <Th isNumeric>debit</Th>
              <Th isNumeric>credit</Th>
              <Th isNumeric>balance</Th>
            </Tr>
          </Thead>
          <Tbody>
            {list.map((item, index) => {
              const monthName = getMonthName(
                new Date(date.getFullYear(), item._id - 1)
              );

              const debit = item.amount.find(
                (x) => x.type === TRANSACTION_TYPE.DEBIT
              );
              const credit = item.amount.find(
                (x) => x.type === TRANSACTION_TYPE.CREDIT
              );

              let balance = 0;
              if (debit && credit) balance = debit.sum - credit.sum;

              return (
                <Tr key={index}>
                  <Td>{monthName}</Td>
                  <Td isNumeric>{debit?.sum.toFixed(2)}</Td>
                  <Td isNumeric>{credit?.sum.toFixed(2)}</Td>
                  <Td isNumeric>{balance.toFixed(2)}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}

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
import { splitFloatNumber } from "lib";
import { getDateId } from "lib/getDateId";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { TRANSACTION_TYPE } from "vars/variables";

interface TdCustomProps {
  mD: number;
  kD: number;
  color?: string;
}
function TdCustom({ mD, kD, color = "inherit" }: TdCustomProps) {
  return (
    <Td isNumeric color={color}>
      <Text fontWeight={600} as="span">
        {mD}
      </Text>
      <Text as="sup" fontSize="0.5rem">
        {kD.toString().padStart(2, "0")}
      </Text>
    </Td>
  );
}

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
              const tdArr = [];
              tdArr.push(<Td>{monthName}</Td>);
              const debit = item.amount.find(
                (x) => x.type === TRANSACTION_TYPE.DEBIT
              );
              const credit = item.amount.find(
                (x) => x.type === TRANSACTION_TYPE.CREDIT
              );
              if (debit) {
                const [mD, kD] = splitFloatNumber(debit.sum);
                tdArr.push(<TdCustom mD={mD} kD={kD} color="green" />);
              } else {
                tdArr.push(<Td></Td>);
              }

              if (credit) {
                const [mD, kD] = splitFloatNumber(credit.sum);
                tdArr.push(<TdCustom mD={mD} kD={kD} color="pink.500" />);
              } else {
                tdArr.push(<Td></Td>);
              }

              if (debit && credit) {
                const balance = debit.sum - credit.sum;
                const [mD, kD] = splitFloatNumber(balance);
                tdArr.push(<TdCustom mD={mD} kD={kD} />);
              } else {
                tdArr.push(<Td></Td>);
              }
              return <Tr key={index}>{tdArr}</Tr>;
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}

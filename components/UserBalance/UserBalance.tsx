import { useTransactionController } from "@/hooks/useTransactionController";
import { userAtom } from "@/recoil/atoms/userAtom";
import { RepeatIcon } from "@chakra-ui/icons";
import {
  Box,
  Icon,
  IconButton,
  Skeleton,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { splitFloatNumber } from "../../lib";
import { balanceSelector } from "../../recoil/selectors/balanceSelector";
import { AiFillPieChart } from "react-icons/ai";
import { useRouter } from "next/router";
import { transactionsFilterAtom } from "@/recoil/atoms/transactionsFilterAtom";
import { TRANSACTIONS_FILTER_ENUM } from "@/recoil/transactionsFilterEnum";

type UserBalanceProp = {
  isLoaded: boolean;
};

export default function UserBalance({ isLoaded }: UserBalanceProp) {
  const balance = useRecoilValue(balanceSelector);
  const user = useRecoilValue(userAtom);
  const transController = useTransactionController();
  const setFilter = useSetRecoilState(transactionsFilterAtom);
  const router = useRouter();
  const [budgetMain, budgetKop] = splitFloatNumber(balance);

  const bg = useColorModeValue("white", "gray.700");
  const color = useColorModeValue("black", "white");
  return (
    <Box
      position="relative"
      w="calc(100% - 42px - 42px)"
      bg={bg}
      borderRadius="20px"
      filter="drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))"
      mb={2}
    >
      <Text
        fontSize="1.2rem"
        fontWeight={300}
        textAlign={"center"}
        color={color}
        pt={1}
        pb={1}
      >
        balance
      </Text>
      <Skeleton
        display="flex"
        justifyContent="center"
        margin="0 auto"
        borderRadius="13px"
        ml={2}
        mr={2}
        mb={2}
        isLoaded={isLoaded}
      >
        <Box
          sx={{
            display: "inline-flex",
            justifyItems: "center",
            justifyContent: "center",
            alignItems: "start",
          }}
        >
          <Text
            fontSize="3rem"
            color="{color}"
            fontWeight={600}
            lineHeight="2.8rem"
            cursor="pointer"
            onClick={() => setFilter(TRANSACTIONS_FILTER_ENUM.ALL)}
          >
            {budgetMain}
          </Text>
          <Text fontWeight={300} color={color}>
            {budgetKop.toString().padStart(2, "0")}
          </Text>
        </Box>
      </Skeleton>
      <IconButton
        icon={<RepeatIcon />}
        aria-label="refresh"
        position="absolute"
        bg="transparent"
        top={0}
        right="0"
        _hover={{
          bg: "transparent",
          transform: "rotate(180deg)",
        }}
        _active={{
          bg: "transparent",
          transform: "rotate(360deg)",
        }}
        onClick={async () => {
          if (user?._id) await transController.refresh(user?._id);
        }}
      ></IconButton>
      <IconButton
        aria-label="chart"
        position="absolute"
        left="0"
        top="0"
        isRound={true}
        icon={<Icon as={AiFillPieChart} />}
        bg="transparent"
        _hover={{ bg: "transparent", transform: "rotate(270deg)" }}
        _active={{ bg: "transparent" }}
        onClick={() =>
          router.push(`${router.asPath}/statistic`, undefined, {
            shallow: true,
          })
        }
      ></IconButton>
    </Box>
  );
}

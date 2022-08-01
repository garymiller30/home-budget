import { useTransactionController } from "@/hooks/useTransactionController";
import { userAtom } from "@/recoil/atoms/userAtom";
import { RepeatIcon } from "@chakra-ui/icons";
import {
  Box,
  IconButton,
  Skeleton,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { splitFloatNumber } from "../../lib";
import { balanceSelector } from "../../recoil/selectors/balanceSelector";

type UserBalanceProp = {
  isLoaded: boolean;
};

export default function UserBalance({ isLoaded }: UserBalanceProp) {
  const balance = useRecoilValue(balanceSelector);
  const user = useRecoilValue(userAtom);
  const transController = useTransactionController();

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
        onClick={() => {
          if (user?._id) transController.refresh(user?._id);
        }}
      ></IconButton>
    </Box>
  );
}

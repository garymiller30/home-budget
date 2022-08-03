import { iReportListItem } from "@/interfaces/iReportListItem";
import { Box, Divider, Flex, ListItem, Spacer, Text } from "@chakra-ui/react";
import { splitFloatNumber } from "lib";
interface ReportListItemProps {
  item: iReportListItem;
}

export default function ReportListItem({ item }: ReportListItemProps) {
  const [m, k] = splitFloatNumber(item.amount);
  return (
    <ListItem w="100%">
      <Flex alignItems="center">
        <Box paddingRight={2} pl={2}>
          <Text fontWeight="600" fontSize="1rem" textTransform="capitalize">
            {item.description}
          </Text>
        </Box>
        <Spacer />
        <Flex>
          <Text fontWeight="700" fontSize="1.2rem">
            {m}
          </Text>
          <Text fontSize="0.8rem">{k.toString().padStart(2, "0")}</Text>
        </Flex>
        <Box width="60px">
          <Text ml={3} fontWeight="300" fontSize="0.8rem" align="right">
            {item.percent}%
          </Text>
        </Box>
      </Flex>
    </ListItem>
  );
}

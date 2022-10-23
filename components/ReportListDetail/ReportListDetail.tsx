import { iTransaction } from "@/interfaces/iTransaction";
import { List, ListItem } from "@chakra-ui/react";
import groupByDescriptionAndComment from "lib/groupByDescriptionAndComment";
import ReportListDetailItem from "./ReportListDetailItem";

interface ReportListProps {
  list: iTransaction[];
}
export default function ReportListDetail({ list = [] }: ReportListProps) {
  const group = groupByDescriptionAndComment(list);

  const keys = Object.keys(group);
  return (
    <List>
      {keys.map((key, idx) => {
        return (
          <ListItem key={idx} w="100%">
            <ReportListDetailItem title={key} item={group[key]} />
          </ListItem>
        );
      })}
    </List>
  );
}

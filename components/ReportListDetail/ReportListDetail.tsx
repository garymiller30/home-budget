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

  const sortedKeys = keys.sort((a, b) => {
    //@ts-ignore
    return group[b].getDescriptionTotal() - group[a].getDescriptionTotal();
  });

  return (
    <List>
      {sortedKeys.map((key, idx) => {
        //@ts-ignore
        const item = group[key];

        return (
          <ListItem key={idx} w="100%">
            <ReportListDetailItem title={key} item={item} />
          </ListItem>
        );
      })}
    </List>
  );
}

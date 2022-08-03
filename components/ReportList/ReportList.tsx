import { iReportListItem } from "@/interfaces/iReportListItem";
import { List, ListItem } from "@chakra-ui/react";
import { getSum } from "lib";
import ReportListItem from "./ReportListItem";

interface ReportListProps {
  list: iReportListItem[];
}

export default function ReportList({ list = [] }: ReportListProps) {
  function getSum(arr: iReportListItem[]) {
    return arr.reduce((sum, item) => sum + Number(item.amount), 0);
  }
  function getPercent(arr: iReportListItem[], item: iReportListItem) {
    const sum = getSum(arr);
    return ((item.amount * 100) / sum).toFixed(1);
  }

  return (
    <List w="100%">
      {list.map((item, idx) => {
        return <ReportListItem key={idx.toString()} item={item} />;
      })}
    </List>
  );
}

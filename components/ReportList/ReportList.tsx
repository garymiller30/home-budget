import { iReportListItem } from "@/interfaces/iReportListItem";
import { List } from "@chakra-ui/react";
import ReportListItem from "./ReportListItem";

interface ReportListProps {
  list: iReportListItem[];
}

export default function ReportList({ list = [] }: ReportListProps) {
  return (
    <List w="100%">
      {list.map((item, idx) => {
        return <ReportListItem key={idx.toString()} item={item} />;
      })}
    </List>
  );
}

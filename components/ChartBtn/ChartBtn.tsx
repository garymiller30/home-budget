import BarChartIcon from "@mui/icons-material/BarChart";
import IconButton from "@mui/material/IconButton";
import Router from "next/router";
import { iDate } from "../../interfaces/iDate";

import s from "./ChartBtn.module.css";

interface ChartBtnProps {
  date: iDate;
  sx?: any;
}

export default function ChartBtn({ date }: ChartBtnProps) {
  return (
    <IconButton
      color="primary"
      className={s.btn}
      onClick={() =>
        Router.push(`/statistic?year=${date.year}&month=${date.month}`)
      }
    >
      <BarChartIcon
        sx={{
          display: "block",
          width: "100%",
          height: "100%",
        }}
      />
    </IconButton>
  );
}

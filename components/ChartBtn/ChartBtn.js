import BarChartIcon from "@mui/icons-material/BarChart";
import Router from "next/router";
import s from "./ChartBtn.module.css";

export default function ChartBtn({ date }) {
  return (
    <button
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
    </button>
  );
}

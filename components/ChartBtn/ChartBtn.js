import BarChartIcon from "@mui/icons-material/BarChart";
import s from "./ChartBtn.module.css";

export default function ChartBtn() {
  return (
    <button className={s.btn}>
      <BarChartIcon
        sx={{
          width: "100%",
          height: "100%",
        }}
      />
    </button>
  );
}

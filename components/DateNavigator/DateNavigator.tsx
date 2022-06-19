import { useState } from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
//import MobileDatePicker from "@mui/lab/DatePicker";
import Box from "@mui/material/Box";
import { iDate } from "../../interfaces/iDate";
import dynamic from "next/dynamic";

const DynamicMobileDatePicker = dynamic(() => import("@mui/lab/DatePicker"));

interface DateNavigatorProps {
  date: iDate;
  onChangeDate: (date: iDate) => void;
}

export default function DateNavigator({
  date,
  onChangeDate,
}: DateNavigatorProps) {
  const [value, setValue] = useState<Date | null>(
    new Date(date.year, date.month - 1)
  );

  function handleOnChange(d: Date | unknown) {
    if (d instanceof Date)
      onChangeDate({ year: d.getFullYear(), month: d.getMonth() + 1 });
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ width: 130 }}>
        <DynamicMobileDatePicker
          inputFormat="yyyy-MM"
          views={["year", "month"]}
          maxDate={new Date()}
          value={value}
          onChange={(e: any) => setValue(e)}
          onMonthChange={handleOnChange}
          renderInput={(params) => (
            <TextField {...params} helperText={null} size="small" />
          )}
        />
      </Box>
    </LocalizationProvider>
  );
}

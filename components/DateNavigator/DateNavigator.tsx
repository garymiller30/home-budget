import { useState } from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MobileDatePicker from "@mui/lab/DatePicker";
import Box from "@mui/material/Box";
import { iDate } from "../../interfaces/iDate";

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

  function handleOnChange(d: Date) {
    onChangeDate({ year: d.getFullYear(), month: d.getMonth() + 1 });
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ width: 90 }}>
        <MobileDatePicker
          inputFormat="yyyy-MM"
          views={["year", "month"]}
          maxDate={new Date()}
          value={value}
          onChange={(e) => setValue(e)}
          onMonthChange={handleOnChange}
          renderInput={(params) => (
            <TextField {...params} helperText={null} size="small" />
          )}
        />
      </Box>
    </LocalizationProvider>
  );
}

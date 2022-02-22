import { useState } from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DatePicker";
import Box from "@mui/material/Box";

export default function DateNavigator({ date, onChangeDate }) {
  const [value, setValue] = useState(new Date(date.year, date.month - 1));

  function handleOnChange(d) {
    onChangeDate({ year: d.getFullYear(), month: d.getMonth() + 1 });
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ width: 90 }}>
        <DesktopDatePicker
          inputFormat="yyyy-MM"
          views={["year", "month"]}
          maxDate={new Date()}
          value={value}
          onChange={setValue}
          onMonthChange={handleOnChange}
          renderInput={(params) => (
            <TextField {...params} helperText={null} size="small" />
          )}
        />
      </Box>
    </LocalizationProvider>
  );
}

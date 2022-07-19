import { Box, TextField } from "@mui/material";
import { useEffect, useState } from "react";

const PriceOfUnitItem = () => {
  const [price, setPrice] = useState<number>(0);
  const [units, setUnits] = useState<number>(1);
  const [result, setResult] = useState<string>();

  useEffect(() => {
    if (units <= 0) setResult("---");
    else setResult((price / units).toFixed(2));
  }, [price, units]);

  return (
    <Box display="flex">
      <TextField
        sx={{ marginRight: "4px" }}
        label="Price"
        variant="outlined"
        type="number"
        onChange={(e: any) => setPrice(Number(e.target.value))}
        // value={price}
      />
      <TextField
        sx={{ marginLeft: "4px", marginRight: "4px" }}
        label="Units"
        variant="outlined"
        type="number"
        onChange={(e: any) => setUnits(Number(e.target.value))}
        // value={units}
      />
      <TextField
        sx={{ marginLeft: "4px" }}
        variant="outlined"
        value={result}
        InputProps={{
          readOnly: true,
        }}
      />
    </Box>
  );
};

export default PriceOfUnitItem;

import { Box, Button, List, ListItem } from "@mui/material";
import { useEffect, useState } from "react";
import PriceOfUnitItem from "./PriceOfUnitItem";

const PriceOfUnitComponent = () => {
  const [units, setUnits] = useState<any>([]);

  const handleAdd = () => {
    const item = <PriceOfUnitItem />;
    setUnits([...units, item]);
  };

  useEffect(() => {
    handleAdd();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      width="100%"
    >
      <List>
        {units.map((unit: any, unitIndex: number) => (
          <ListItem key={unitIndex}>{unit}</ListItem>
        ))}
      </List>
      <Button variant="contained" onClick={handleAdd}>
        Add
      </Button>
    </Box>
  );
};

export default PriceOfUnitComponent;

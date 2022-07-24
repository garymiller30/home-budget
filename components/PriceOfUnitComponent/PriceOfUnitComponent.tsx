import { Button, List, ListItem, VStack } from "@chakra-ui/react";
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
    <VStack>
      <List spacing={1} mb={4}>
        {units.map((unit: any, unitIndex: number) => (
          <ListItem key={unitIndex}>{unit}</ListItem>
        ))}
      </List>
      <Button onClick={handleAdd}>ADD ROW</Button>
    </VStack>
  );
};

export default PriceOfUnitComponent;

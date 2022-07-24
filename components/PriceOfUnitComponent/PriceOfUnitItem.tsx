import { HStack, Input, Text } from "@chakra-ui/react";
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
    <HStack>
      <Input
        htmlSize={5}
        width="auto"
        placeholder="Price"
        type="number"
        step="0.01"
        onChange={(e: any) => setPrice(Number(e.target.value))}
      ></Input>
      <Input
        htmlSize={5}
        width="auto"
        placeholder="Units"
        type="number"
        step="0.01"
        onChange={(e: any) => setUnits(Number(e.target.value))}
      ></Input>
      <Text> = </Text>
      <Text fontSize="1.3rem">{result}</Text>
    </HStack>
  );
};

export default PriceOfUnitItem;

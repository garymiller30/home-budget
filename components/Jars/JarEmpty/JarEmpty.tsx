import { Box, Button, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useState } from "react";

export default function JarEmpty() {
  const [style, setStyle] = useState<any>({ display: "none" });
  return (
    <Box
      position="relative"
      onMouseEnter={() => setStyle({ display: "block" })}
      onMouseLeave={() => setStyle({ display: "none" })}
    >
      <Image src="/jar-empty@2x.png" width="150px" height="170px" />
      <Flex
        position="absolute"
        top={10}
        left={0}
        width="100%"
        height="75px"
        p={2}
        justifyContent="center"
        alignItems="center"
      >
        <Button rounded="full" size="lg" colorScheme="blue" sx={style}>
          Add
        </Button>
      </Flex>
    </Box>
  );
}

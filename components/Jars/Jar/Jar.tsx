import { Box, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";

export default function Jar() {
  return (
    <Box position="relative">
      <Image src="/jar-full@2x.png" width="150px" height="170px" />
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
        <Text
          align="center"
          fontWeight="medium"
          height="100%"
          overflow="scroll"
          lineHeight="1rem"
        >
          посудомийка + пральна машина + швейна машина
        </Text>
      </Flex>
    </Box>
  );
}

import { Box, Flex, Image, Spacer, Text } from "@chakra-ui/react";
import Jar from "../Jar/Jar";
import JarEmpty from "../JarEmpty/JarEmpty";
import JarShelf from "../JarShelf/JarShelf";

export default function JarShelfWithJars() {
  return (
    <Box w="80%" position="relative">
      <JarShelf />
      <Flex position="absolute" left="0" bottom="0" width="100%">
        <Spacer />
        <JarEmpty />
        <Spacer />
        <Jar />
        <Spacer />
        <Jar />
        <Spacer />
      </Flex>
    </Box>
  );
}

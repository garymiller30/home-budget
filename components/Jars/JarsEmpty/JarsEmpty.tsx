import { Box, Flex, Spacer } from "@chakra-ui/react";
import Image from "next/image";
import JarShelf from "../JarShelf/JarShelf";
import JarShelfWithJars from "../JarShelfWithJars/JarShelfWithJars";

export default function JarsEmpty() {
  return (
    <Flex
      height="100vh"
      width="100%"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <Spacer />
      <Spacer />
      <Spacer />
      <JarShelfWithJars />
      <Spacer />
      <Spacer />
      <JarShelfWithJars />
      <Spacer />
      <Spacer />
      <JarShelfWithJars />
      <Spacer />
    </Flex>
  );
}

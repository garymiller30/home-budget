import { Box, Flex, Spacer } from "@chakra-ui/react";

import JarEmpty from "../JarEmpty/JarEmpty";
import JarShelf from "../JarShelf/JarShelf";

type Props = { start: number; count: number };

export default function JarShelfWithJars({ start, count }: Props) {
  const jars = [];
  jars.push(<Spacer />);
  for (let index = 0; index < count; index++) {
    const jar = <JarEmpty key={index} idx={start + index} />;
    jars.push(jar);
    jars.push(<Spacer />);
  }

  return (
    <Box w="80%" position="relative">
      <JarShelf />

      <Flex position="absolute" left="0" bottom="0" width="100%">
        {jars}
      </Flex>
    </Box>
  );
}

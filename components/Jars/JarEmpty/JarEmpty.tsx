import { AddIcon } from "@chakra-ui/icons";
import { Badge, Box, Button, Flex, IconButton, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useState } from "react";

type Props = { idx: number };
export default function JarEmpty({ idx }: Props) {
  const [style, setStyle] = useState<any>({ display: "none" });
  return (
    <Box
      position="relative"
      bottom="17px"
      onMouseEnter={() => setStyle({ display: "block" })}
      onMouseLeave={() => setStyle({ display: "none" })}
    >
      <Image
        src="/jar-empty@2x.png"
        width="90px"
        height="110px"
        layout="fixed"
      />
      <Flex
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        p={2}
        justifyContent="center"
        alignItems="center"
      >
        <IconButton
          aria-label="add"
          isRound
          size="lg"
          colorScheme="blue"
          icon={<AddIcon />}
          sx={style}
        ></IconButton>
        <Badge
          variant="solid"
          rounded="full"
          position="absolute"
          right="0"
          top="0"
        >
          #{idx}
        </Badge>
      </Flex>
    </Box>
  );
}

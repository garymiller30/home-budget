import { Box } from "@chakra-ui/react";
import s from "./PaperCutEffect.module.css";

interface PaperCutEffectProps {
  text?: string;
}
export default function PaperCutEffect({
  text = "HELLO",
}: PaperCutEffectProps) {
  return (
    <Box display="flex">
      {text.split("").map((char, i) => (
        <Box
          key={i}
          position="relative"
          fontWeight="extrabold"
          fontSize="4rem"
          //@ts-ignore
          style={{ "--delay": `${i * 0.1}s` }}
        >
          <Box as="span" className={s.source}>
            {char}
          </Box>
          <Box as="span" className={s.shadow}>
            {char}
          </Box>
          <Box as="span" className={s.overlay} color="white">
            {char}
          </Box>
        </Box>
      ))}
      <Box></Box>
    </Box>
  );
}

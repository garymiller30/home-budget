import { Box } from "@chakra-ui/react";

export default function JarShelf() {
  return (
    <Box
      w="100%"
      h={5}
      backgroundColor="blackAlpha.700"
      position="relative"
      borderBottomRadius={5}
      boxShadow="0px 0.2px 0.2px rgba(0,0,0,0.15),
    0px 0.7px 0.8px -0.3px rgba(0,0,0,0.15),
    0px 1.3px 1.5px -0.6px rgba(0,0,0,0.15),
    0.1px 2px 2.3px -0.8px rgba(0,0,0,0.15),
    0.1px 2.9px 3.3px -1.1px rgba(0,0,0,0.15),
    0.1px 4.2px 4.7px -1.4px rgba(0,0,0,0.15),
    0.2px 5.9px 6.6px -1.7px rgba(0,0,0,0.15),
    0.2px 10px 9.3px -2px rgba(0,0,0,0.15),
    0.3px 15px 12.8px -3px rgba(0,0,0,0.15),
    0.5px 20px 17.3px -5px rgba(0,0,0,0.15)"
      _before={{
        content: '""',
        display: "block",
        position: "absolute",
        top: "-14px",
        left: "0",
        borderBottomColor: "blackAlpha.500",
        borderBottomStyle: "solid",
        borderBottomWidth: "15px",
        borderLeft: "20px solid transparent",
        borderRight: "20px solid transparent",
        height: "0",
        width: "100%",
      }}
    ></Box>
  );
}

//import { Box, Typography } from "@mui/material";

import { Box, Text } from "@chakra-ui/react";

export default function UserMonth() {
  const d = new Date();
  const monthName = d.toLocaleString("default", { month: "long" });

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
      }}
      pt={2}
      pb={2}
    >
      <Text textTransform="uppercase" fontSize="1.2rem" fontWeight="600">
        {monthName} {d.getFullYear()}
      </Text>
    </Box>
  );
}

import { Box, Link } from "@mui/material";
import NextLink from "next/link";

export default function UserGoToReport() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "50px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <NextLink href="/">
        <Link href="#" underline="hover">
          go to report
        </Link>
      </NextLink>
    </Box>
  );
}

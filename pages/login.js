import { Box } from "@mui/material";
import { signIn } from "next-auth/react";
export default function login() {
  signIn("google", { callbackUrl: `${process.env.ROOT_URL}` });
  return <Box>Login page</Box>;
}

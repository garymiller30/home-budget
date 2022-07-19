import { Box } from "@mui/material";
import { signIn } from "next-auth/react";
import { useEffect } from "react";
export default function login() {
  useEffect(() => {
    signIn("google", { callbackUrl: "/" });
  }, []);

  return <Box>Login page</Box>;
}

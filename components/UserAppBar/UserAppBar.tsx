import AppMenu from "../AppMenu/AppMenu";
import {
  Button,
  Flex,
  IconButton,
  Spacer,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import AccountMenu from "../AccountMenu/AccountMenu";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

export default function UserAppBar() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex
      position="static"
      bgColor="blue.600"
      w="100%"
      h="3rem"
      alignItems="center"
      p={2}
    >
      <AppMenu />
      <Text
        width="100%"
        fontSize="1.3rem"
        pl={2}
        color="white"
        textAlign="center"
      >
        Home Budget
      </Text>
      <Spacer />
      <IconButton
        bg="transparent"
        aria-label="toggle mode"
        onClick={toggleColorMode}
        icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
      ></IconButton>
      <AccountMenu />
    </Flex>
  );
}

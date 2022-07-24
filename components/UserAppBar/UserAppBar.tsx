import AppMenu from "../AppMenu/AppMenu";
import { Flex, Spacer, Text } from "@chakra-ui/react";
import AccountMenu from "../AccountMenu/AccountMenu";

export default function UserAppBar() {
  return (
    <Flex
      position="static"
      bgColor="royalblue"
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
      <AccountMenu />
    </Flex>
  );
}

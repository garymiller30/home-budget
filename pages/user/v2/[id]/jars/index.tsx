import JarsEmpty from "@/components/Jars/JarsEmpty/JarsEmpty";
import { userAtom } from "@/recoil/atoms/userAtom";
import { Box, Flex } from "@chakra-ui/react";
import Head from "next/head";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";

export default function Jars() {
  const user = useRecoilValue(userAtom);

  if (!user) return <p>Unauthorized</p>;
  useEffect(() => {}, []);
  return (
    <>
      <Head>
        <title>Home budget | Jars</title>
      </Head>
      <Flex h="100vh" w="100%">
        <JarsEmpty />
      </Flex>
    </>
  );
}

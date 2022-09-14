import JarList from "@/components/Jars/JarList/JarList";
import { userAtom } from "@/recoil/atoms/userAtom";
import { Flex } from "@chakra-ui/react";
import Head from "next/head";
import { useRecoilValue } from "recoil";

export default function Jars() {
  const user = useRecoilValue(userAtom);

  if (!user) return <p>Unauthorized</p>;

  return (
    <>
      <Head>
        <title>Home budget | Jars</title>
      </Head>
      <Flex h="100vh" w="100%">
        <JarList />
      </Flex>
    </>
  );
}

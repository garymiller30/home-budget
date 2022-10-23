import AddJarForm from "@/components/Forms/AddJarForm";
import { jarsAtom } from "@/recoil/atoms/jarsAtom";
import { Flex, Spacer, useDisclosure } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { ModalInputForm } from "../..";

import JarShelfWithJars from "../JarShelfWithJars/JarShelfWithJars";

export default function JarList() {
  const [jars, setJars] = useRecoilState(jarsAtom);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleCloseFromBtn = () => {};
  const handleOnClick = (event: React.MouseEvent) => {
    console.log(event.target);
  };
  return (
    <Flex
      height="100vh"
      width="100%"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      onClick={handleOnClick}
    >
      <Spacer />
      <Spacer />
      <Spacer />
      <JarShelfWithJars start={1} count={3} />
      <Spacer />
      <Spacer />
      <JarShelfWithJars start={4} count={3} />
      <Spacer />
      <Spacer />
      <JarShelfWithJars start={7} count={3} />
      <Spacer />
      <ModalInputForm
        isOpen={isOpen}
        onClose={handleCloseFromBtn}
        title="Create Jar"
      >
        <AddJarForm />
      </ModalInputForm>
    </Flex>
  );
}

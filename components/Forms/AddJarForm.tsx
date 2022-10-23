import {
  Button,
  Container,
  FormControl,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";

export default function AddJarForm() {
  const onSubmit = async (event: any) => {};

  return (
    <Container>
      <form onSubmit={onSubmit}>
        <Stack spacing={2}>
          <FormControl isRequired>
            <Input placeholder="Title" id="title" />
          </FormControl>
          <FormControl>
            <Input type="number" step="0.01" id="goal" placeholder="Goal" />
          </FormControl>
          <Button type="submit">
            <Text>CREATE</Text>
          </Button>
        </Stack>
      </form>
    </Container>
  );
}

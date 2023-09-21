import { Button, Container, PasswordInput, Stack, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';

export function Register() {
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmpassword: '',
    },
    validate: {
      name: (value) => value.trim().length < 2,
      email: (value) => !/^\S+@\S+$/.test(value),
      password: (value) => value.trim().length === 0,
    },
  });

  return (
    <Container size={'sm'}>
      <form onSubmit={form.onSubmit(() => {})}>
      <Title
        order={2}
        size="h1"
        style={{ fontFamily: 'Greycliff CF, var(--mantine-font-family)' }}
        fw={900}
        ta="center"
      >
        User Registration
      </Title>

      <TextInput
          label="Name"
          placeholder="Your name"
          name="name"
          variant="filled"
          {...form.getInputProps('name')}
        />
        <TextInput
          label="Email"
          placeholder="Your email"
          name="email"
          variant="filled"
          inputMode='email'
          {...form.getInputProps('email')}
        />

      <PasswordInput
        label="Password"
        placeholder="Password"
        mt="md"
        name="password"
        variant="filled"
        {...form.getInputProps('password')}
      />
      <PasswordInput
        label="Confirm Password"
        placeholder="Password"
        mt="md"
        name="confirmpassword"
        variant="filled"
        {...form.getInputProps('confirmpassword')}
      />

      <Stack justify="center" mt="xl">
        <Button type="submit" >
          Register
        </Button>
      </Stack>
    </form>
    </Container>
    
  );
}

import { Button, Center, Stack, Text, Image, Input } from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import { Session } from "next-auth";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import UserOperations from "../../graphql/operations/user";
import { CreateUsernameData, CreateUsernameVariables } from "../../util/types";

interface IAuthProps {
  session: Session | null;
  reloadSession: () => void;
}

const Auth: React.FC<IAuthProps> = ({ session, reloadSession }) => {
  const [username, setUsername] = useState("");
  const [createUsername, { data, loading, error }] = useMutation<
    CreateUsernameData,
    CreateUsernameVariables
  >(UserOperations.Mutations.createUsername);

  console.log('here is data',data,loading,error)

  const onSubmit = async () => {
    if (!username) return;
    try {
      await createUsername({ variables: { username } });
    } catch (error) {
      console.log("onSubmit error", error);
    }
  };

  return (
    <Center height="100vh">
      <Stack align="center" spacing={8}>
        {session ? (
          <>
            <Text fontSize="3xl">Create a Username</Text>
            <Input
              placeholder="Enter a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Button width="100%" onClick={onSubmit}>
              Save
            </Button>
          </>
        ) : (
          <>
            <Text fontSize="3xl">Messenger</Text>
            <Button
              onClick={() => signIn("google")}
              leftIcon={
                <Image
                  height="20px"
                  src="/images/googlelogo.png"
                  alt="google"
                />
              }
            >
              Continue with Google
            </Button>
          </>
        )}
      </Stack>
    </Center>
  );
};

export default Auth;

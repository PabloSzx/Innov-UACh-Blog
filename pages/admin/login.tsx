import { ChangeEvent, useCallback, useState } from "react";

import { Alert, AlertIcon, Button, Input, Stack } from "@chakra-ui/core";

import { useMutation } from "../../src/graphql";
import { useAdminAuth } from "../../src/hooks/adminAuth";

import type { NextPage } from "next";

const AdminLoginPage: NextPage = () => {
  const [message, setMessage] = useState("");
  const [tokenState, setToken] = useState("");

  const { isCurrentUserLoading } = useAdminAuth({
    redirectOnSuccess: true,
  });

  const [login, { fetchState: loginState }] = useMutation(
    ({ login }, args) => {
      console.log(args);
      return login(args);
    },
    {
      variables: {
        token: tokenState,
      },
      onCompleted(goodLogin, hooksPool) {
        if (goodLogin) {
          hooksPool.currentUser?.refetch?.();
          setMessage("Redirecting...");
        } else {
          setMessage("Wrong token");
        }
      },
    }
  );

  const onInputChange = useCallback<
    (event: ChangeEvent<HTMLInputElement>) => void
  >(({ target: { value } }) => {
    setMessage("");
    setToken(value);
  }, []);

  if (isCurrentUserLoading) return null;

  return (
    <Stack shouldWrapChildren alignItems="center">
      <Input
        marginTop="50px"
        type="password"
        onChange={onInputChange}
        value={tokenState}
        isDisabled={loginState === "loading"}
      />

      <Button
        isDisabled={tokenState.length < 20}
        isLoading={loginState === "loading"}
        onClick={() => {
          login({
            variables: {
              token: tokenState,
            },
          });
          setToken("");
        }}
        variantColor="blue"
      >
        Check token
      </Button>

      <Alert hidden={!message}>
        <AlertIcon />
        {message}
      </Alert>
    </Stack>
  );
};

export default AdminLoginPage;

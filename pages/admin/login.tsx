import Head from "next/head";
import { ChangeEvent, useCallback, useState } from "react";

import {
  Alert,
  AlertIcon,
  Button,
  Input,
  Spinner,
  Stack,
} from "@chakra-ui/core";

import { useMutation } from "../../src/graphql";
import { useAdminAuth, currentUserQuery } from "../../src/hooks/adminAuth";

import type { NextPage } from "next";

const AdminLoginPage: NextPage = () => {
  const [message, setMessage] = useState("");
  const [tokenState, setToken] = useState("");

  const { isCurrentUserLoading } = useAdminAuth({
    redirectOnSuccess: true,
  });

  const [login, { fetchState: loginState }] = useMutation(
    ({ login }, args) => {
      return login(args);
    },
    {
      variables: {
        token: tokenState,
      },
      onCompleted(goodLogin) {
        if (goodLogin) {
          currentUserQuery.setCacheData(true);
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

  if (isCurrentUserLoading) return <Spinner size="xl" margin="50px" />;

  return (
    <>
      <Head>
        <title>Admin Login - Comunidades Práctica INFO</title>
      </Head>
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
                token: tokenState.trim(),
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
    </>
  );
};

export default AdminLoginPage;

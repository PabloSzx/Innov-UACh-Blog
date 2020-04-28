import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { ChangeEvent, FC, useState } from "react";

import { Button, Flex, Input, Spinner, Stack } from "@chakra-ui/core";

import { REBUILD_HOOK_URL } from "../../constants/tokens";
import { useMutation } from "../../src/graphql";
import { useAdminAuth } from "../../src/hooks/adminAuth";

interface AdminPageProps {
  hasRebuildUrl: boolean;
}

const RebuildComponent: FC = () => {
  const [enableRebuild, setEnableRebuild] = useState(false);
  const [adminToken, setAdminToken] = useState("");

  return (
    <>
      <Head key={1}>
        <title>Admin Panel</title>
      </Head>
      {enableRebuild ? (
        <>
          <Flex width="fit-content">
            <Input
              width="fit-content"
              type="password"
              value={adminToken}
              onChange={({
                target: { value },
              }: ChangeEvent<HTMLInputElement>) => {
                setAdminToken(value);
              }}
              placeholder="Re-enter the admin token"
            />
            <Button
              isDisabled={adminToken.length < 20}
              variantColor="blue"
              leftIcon="repeat"
              onClick={() => {
                window.open(`/api/rebuild?secret=${adminToken}`, "_blank");
                setEnableRebuild(false);
              }}
            >
              Rebuild
            </Button>
          </Flex>
        </>
      ) : (
        <Button
          variantColor="blue"
          leftIcon="repeat"
          onClick={() => {
            setEnableRebuild(true);
          }}
        >
          Rebuild
        </Button>
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps<AdminPageProps> = async () => {
  return {
    props: {
      hasRebuildUrl: !!REBUILD_HOOK_URL,
    },
  };
};

const AdminPage: NextPage<AdminPageProps> = ({ hasRebuildUrl }) => {
  const { isCurrentUserLoading, logout } = useAdminAuth({
    requireAdmin: true,
  });

  const [
    enablePreviewMode,
    { fetchState: previewModeFetchState },
  ] = useMutation(({ enablePreviewMode }) => {
    return enablePreviewMode;
  });

  if (isCurrentUserLoading) return <Spinner size="xl" margin="50px" />;

  return (
    <Stack shouldWrapChildren margin="15px">
      <Button
        leftIcon="view"
        variantColor="cyan"
        isDisabled={previewModeFetchState === "done"}
        isLoading={previewModeFetchState === "loading"}
        onClick={() => {
          enablePreviewMode();
        }}
      >
        {previewModeFetchState === "done"
          ? "Preview Mode Active"
          : "Enable Preview Mode"}
      </Button>

      {hasRebuildUrl && <RebuildComponent />}

      <Button
        leftIcon="small-close"
        variantColor="red"
        onClick={() => {
          logout();
        }}
      >
        Logout
      </Button>
    </Stack>
  );
};

export default AdminPage;

import { NextPage } from "next";

import { Button, Stack, Spinner } from "@chakra-ui/core";

import { useAdminAuth } from "../../src/hooks/adminAuth";
import { AdminNavigation } from "../../src/components/AdminNavigation";
import { useMutation } from "../../src/graphql";

const AdminPage: NextPage = () => {
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
      <AdminNavigation />

      <Button
        leftIcon="view"
        variantColor="cyan"
        isLoading={previewModeFetchState === "loading"}
        onClick={() => {
          enablePreviewMode();
        }}
      >
        Enable Preview Mode
      </Button>

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

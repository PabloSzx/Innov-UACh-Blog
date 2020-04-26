import { NextPage } from "next";

import { Button, Stack, Spinner } from "@chakra-ui/core";

import { useAdminAuth } from "../../src/hooks/adminAuth";
import { AdminNavigation } from "../../src/components/AdminNavigation";

const AdminPage: NextPage = () => {
  const { isCurrentUserLoading, logout } = useAdminAuth({
    requireAdmin: true,
  });

  if (isCurrentUserLoading) return <Spinner size="xl" margin="50px" />;

  return (
    <Stack shouldWrapChildren margin="15px">
      <AdminNavigation />

      <Button
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

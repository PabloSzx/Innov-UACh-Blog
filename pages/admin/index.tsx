import { NextPage } from "next";

import { Button, Stack } from "@chakra-ui/core";
import Link from "next/link";

import { useAdminAuth } from "../../src/hooks/adminAuth";
import { Blog } from "../../src/graphql";

const AdminPage: NextPage = () => {
  const { isCurrentUserLoading, logout } = useAdminAuth({
    requireAdmin: true,
  });

  if (isCurrentUserLoading) return null;

  return (
    <Stack shouldWrapChildren margin="10px">
      <Link passHref href="/admin/createBlog">
        <Button as="a" variantColor="blue">
          Create new Blog Post
        </Button>
      </Link>

      <Link passHref href="/admin/editBlog">
        <Button as="a" variantColor="green">
          Edit current Blog posts
        </Button>
      </Link>

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

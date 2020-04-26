import { useRouter } from "next/router";
import { FC, memo, useCallback } from "react";

import { Tab, TabList, Tabs } from "@chakra-ui/core";

const paths = ["/", "/admin", "/admin/createBlog", "/admin/editBlog"];

export const AdminNavigation: FC = memo(() => {
  const { pathname, push } = useRouter();

  const onTabChange = useCallback<(n: number) => void>((index) => {
    push(paths[index]);
  }, []);

  let index = paths.indexOf(pathname);

  return (
    <nav>
      <Tabs marginBottom="20px" index={index} onChange={onTabChange}>
        <TabList>
          <Tab>Home</Tab>
          <Tab>Admin Home</Tab>
          <Tab>Create Blog</Tab>
          <Tab>Edit Blogs</Tab>
        </TabList>
      </Tabs>
    </nav>
  );
});

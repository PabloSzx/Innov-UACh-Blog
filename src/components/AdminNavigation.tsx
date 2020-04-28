import { useRouter } from "next/router";
import { FC, memo, useCallback } from "react";

import { Tab, TabList, Tabs } from "@chakra-ui/core";

import { adminPaths } from "../../constants";

export const AdminNavigation: FC = memo(() => {
  const { pathname, push } = useRouter();

  const onTabChange = useCallback<(n: number) => void>((index) => {
    const path = adminPaths[index];
    if (path) push(path);
  }, []);

  let index = adminPaths.indexOf(pathname);

  if (index === -1) return null;

  return (
    <nav>
      <Tabs marginBottom="20px" index={index} onChange={onTabChange}>
        <TabList>
          <Tab>Admin Home</Tab>
          <Tab>Create Blog</Tab>
          <Tab>Edit Blogs</Tab>
        </TabList>
      </Tabs>
    </nav>
  );
});

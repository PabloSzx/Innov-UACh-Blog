import { useRouter } from "next/router";
import { FC, memo, useCallback } from "react";

import { Tab, TabList, Tabs } from "@chakra-ui/core";

import { adminPaths } from "../../constants";

export const AdminNavigation: FC = memo(() => {
  const { pathname, push } = useRouter();

  const onTabChange = useCallback<(n: number) => void>(
    (index) => {
      const path = adminPaths[index];
      if (path === pathname) {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      } else if (path) push(path);
    },
    [pathname]
  );

  let index = adminPaths.indexOf(pathname);

  return (
    <nav>
      <Tabs
        margin="5px"
        variant="solid-rounded"
        marginBottom="20px"
        index={index}
        onChange={onTabChange}
      >
        <TabList>
          <Tab>Admin Home</Tab>
          <Tab>Create Blog</Tab>
          <Tab>Edit Blogs</Tab>
        </TabList>
      </Tabs>
    </nav>
  );
});

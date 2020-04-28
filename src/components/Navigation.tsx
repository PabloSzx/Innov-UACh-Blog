import { useRouter } from "next/router";
import { FC, MouseEvent, useCallback } from "react";

import { Flex, Tab, TabList, Tabs } from "@chakra-ui/core";

const navigationPaths = ["/", "/community", "/project", "/faq"] as const;

export const Navigation: FC = () => {
  const { pathname, push } = useRouter();

  const onTabChange = useCallback<(n: number) => void>((index) => {
    const path = navigationPaths[index];
    if (path) push(path);
  }, []);

  let index = navigationPaths.indexOf(
    pathname as typeof navigationPaths[number]
  );

  const preventDefault = useCallback((e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
  }, []);

  return (
    <Flex
      position="sticky"
      top={0}
      width="fit-content"
      justify="flex-start"
      paddingTop="5px"
      paddingLeft="5px"
      paddingBottom="5px"
      height="fit-content"
      background="white"
      border="2px solid #999"
      borderBottomLeftRadius="20px"
      borderBottomRightRadius="20px"
    >
      <Tabs
        variantColor="green"
        variant="solid-rounded"
        index={index}
        onChange={onTabChange}
      >
        <TabList>
          <Tab>
            <a href={navigationPaths[0]} onClick={preventDefault}>
              Home
            </a>
          </Tab>
          <Tab>
            <a href={navigationPaths[1]} onClick={preventDefault}>
              Community
            </a>
          </Tab>
          <Tab>
            <a href={navigationPaths[2]} onClick={preventDefault}>
              Project
            </a>
          </Tab>
          <Tab>
            <a href={navigationPaths[3]} onClick={preventDefault}>
              FAQ
            </a>
          </Tab>
          <Tab>
            <a href="#footer">Contact us</a>
          </Tab>
        </TabList>
      </Tabs>
    </Flex>
  );
};
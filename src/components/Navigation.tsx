import { useRouter } from "next/router";
import { FC, MouseEvent, useCallback } from "react";

import { Flex, Tab, TabList, Tabs } from "@chakra-ui/core";

const navigationPaths = ["/", "/community", "/project", "/faq"] as const;

export const Navigation: FC = () => {
  const { pathname, push } = useRouter();

  const onTabChange = useCallback<(n: number) => void>(
    (index) => {
      const path = navigationPaths[index];
      if (path === pathname) {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      } else if (path) push(path);
    },
    [pathname]
  );

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
      zIndex={100}
    >
      <Tabs
        flexWrap="wrap"
        overflowWrap="normal"
        variantColor="green"
        variant="solid-rounded"
        index={index}
        onChange={onTabChange}
      >
        <TabList flexWrap="wrap" justifyContent="center">
          <Tab>
            <a href={navigationPaths[0]} onClick={preventDefault}>
              Noticias
            </a>
          </Tab>
          <Tab disabled={true}>
            {/* <a href={navigationPaths[1]} onClick={preventDefault}> */}
            Comunidades
            {/* </a> */}
          </Tab>
          <Tab>
            <a href={navigationPaths[2]} onClick={preventDefault}>
              Proyecto
            </a>
          </Tab>
          <Tab>
            <a href={navigationPaths[3]} onClick={preventDefault}>
              Preguntas Frecuentes
            </a>
          </Tab>
          <Tab>
            <a href="#contact_us">Contacto</a>
          </Tab>
        </TabList>
      </Tabs>
    </Flex>
  );
};

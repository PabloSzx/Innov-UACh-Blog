import { useRouter } from "next/router";
import { FC, MouseEvent, useCallback } from "react";
import useWindowSize from "react-use/lib/useWindowSize";

import { Flex, Tab, TabList, Tabs } from "@chakra-ui/core";

const navigationPaths = ["/", "/community", "/project", "/faq"] as const;

export const Navigation: FC = () => {
  const { pathname, push } = useRouter();

  const onTabChange = useCallback<(n: number) => void>(
    (index) => {
      const path = navigationPaths[index];
      if (path !== pathname) {
        push(path);
      }
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    },
    [pathname]
  );

  let index = navigationPaths.indexOf(
    pathname as typeof navigationPaths[number]
  );

  const preventDefault = useCallback((e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
  }, []);

  const { height } = useWindowSize(undefined, 1080);

  return (
    <Flex
      position={height < 600 ? "relative" : "sticky"}
      top={0}
      width="100%"
      justify="center"
      zIndex={100}
    >
      <Flex
        width="fit-content"
        justify="center"
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
    </Flex>
  );
};

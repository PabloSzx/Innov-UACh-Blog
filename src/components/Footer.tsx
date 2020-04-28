import { FC } from "react";

import { Divider, Flex, Image } from "@chakra-ui/core";

export const Footer: FC = () => {
  return (
    <>
      <div id="preFooter" />
      <Divider />
      <Flex
        pos="relative"
        bottom={0}
        id="footer"
        justifyContent="center"
        paddingTop="20px"
        paddingBottom="20px"
      >
        <Image maxWidth="400px" alt="logo_uach" src="/logo_uach.jpg" />
      </Flex>
    </>
  );
};
